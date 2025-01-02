"use client";
import React, { useState, useEffect, useRef } from "react";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import LetsTalk from "@/components/home/lets-talk";
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { LuMoveUpRight } from "react-icons/lu";
import style from "./style.module.css";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { log } from "console";
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useSnackbar } from 'notistack'; // Import useSnackbar hook

const WorkWithUs: React.FC = () => {
  return (
    <CartProvider>
      <Career />
    </CartProvider>
  );
};

interface Thumbnail {
  url: string;
  formats: {
    thumbnail: {
      url: string;
    };
  };
}



interface CareerJob {
  id: number;
  documentId: string;
  title: string;
  location: string;
  expert_in: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string | null;
  slug: string;
  thumbnail: Thumbnail | null;
}


const CareerBox = ({ job, onApply }: { job: CareerJob; onApply: (job: CareerJob) => void; }) => (
  <div className={style["career_box"]}>
    <div>
      {job.thumbnail ? (
        <img src={`${job.thumbnail.formats.thumbnail.url}`} className="w-100" alt={job.title} loading="lazy" />
      ) : (
        <div className={style["no-thumbnail"]}>No Image Available</div>
      )}
    </div>



    <div>
      <h4>{job.title}</h4>
      <p dangerouslySetInnerHTML={{ __html: job.description || "No description available." }} />            {/* <p><span>{`Posted on: ${new Date(job.publishedAt).toLocaleDateString()}`}</span></p> */}
      <p><IoLocationOutline /> Location: {job.location}</p>
      <p><PiSuitcaseSimpleLight /> Expert in: {job.expert_in}</p>
      <div className={style["career_box_btn"]}>
        <span>
          <a href="mailto:career@imvision.se" className="d-inline-flex align-items-center">
            Send mail to career@imvision.se <LuMoveUpRight />
          </a>
        </span>
        <span>
          <button className={style["apply_btn"]} onClick={() => onApply(job)}>Apply Now</button>
        </span>
      </div>
    </div>
  </div>
);

const Career = () => {
  const [careerOpenings, setCareerOpenings] = useState<CareerJob[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState(3);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | string | null,
    message: "",
    service: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}careers?populate=*`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });


        // Accessing the jobs array from the response structure
        const jobsArray = response.data.data;

        // Ensure that the jobsArray is an array before setting state
        if (Array.isArray(jobsArray)) {
          setCareerOpenings(jobsArray);
        } else {
          console.error("Fetched data is not an array:", jobsArray);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const smoothContentEl = document.getElementById("smooth-content");
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectedJob &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedJob(null);
      }
    };

    if (selectedJob) {
      document.body.style.overflow = "hidden";
      if (smoothContentEl) {
        smoothContentEl.style.float = "none";
      }
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "unset";
      if (smoothContentEl) {
        smoothContentEl.style.float = "";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      if (smoothContentEl) {
        smoothContentEl.style.float = "";
      }
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedJob]);

  const handleLoadMore = () => setDisplayedJobs((prev) => prev + 3);
  const handleApply = (job: CareerJob) => setSelectedJob(job);
  const handleCloseModal = () => setSelectedJob(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle file input separately
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;

      setFormData((prevState) => ({
        ...prevState,
        [name]: file ? file.name : '',
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevState) => ({
      ...prevState,
      resume: file,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resume) {
      console.error("No file selected");
      return;
    }


    const uploadData = new FormData();
    uploadData.append("files", formData.resume as File, (formData.resume as File).name);

    try {
      setIsSubmitting(true);
      const uploadResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}upload`, uploadData, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      const uploadId = (uploadResponse.data[0].id);

      const careerFormData = {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          resume: uploadId,
          job: {
            connect: [selectedJob ? selectedJob.documentId : null]
          },
          comments: formData.message

        }
      };


      try {
        const careerResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}job-enquiries?populate=job`, careerFormData, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        enqueueSnackbar('Thank you for applying! Your application has been successfully submitted', { variant: 'success' });
        handleCloseModal();
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
      }
      finally {
        setIsSubmitting(true);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className={style.full_career_section}>
              <div className={style["contact_banner"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <h1 className={style.pageTitle}>
                        Let Our Team <br />
                        Be Your New Team
                      </h1>
                    </div>
                    <div className={`col-md-6 ${style.secondary_text_container}`}>
                      <p className={style.secondary_header_text}>
                        Glad you are interested in working with us at IM Vision!<br />Below you see a couple of the positions we are currently looking for, we are always looking for new talent and even if the position you are looking for is not currently available, do not hesitate to contact us!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style["contact_video"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={style["contact-video"]}
                      >
                        <source
                          src="/assets/videos/career.mp4"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <div className="col-md-12 text-center">
                      <button className={style["talk-btn"]} onClick={() => window.location.href = '/contact'}>
                        Talk to Expert
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <section className={style.contact_section}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h3>Current Openings</h3>
                    </div>
                    <div className="col-12">
                      {careerOpenings.slice(0, displayedJobs).map((job) => (
                        <CareerBox
                          key={job.id}
                          job={job}
                          onApply={handleApply}
                        />
                      ))}
                    </div>
                    {displayedJobs < careerOpenings.length && (
                      <div className="col-md-12 text-center">
                        <button
                          className={style["load_more"]}
                          onClick={handleLoadMore}
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>



              {selectedJob && (
                <div className={style.modal}>
                  <div ref={modalRef} className={style.modal_content}>
                    <h4>Connect With Us</h4>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className={style.close_btn}
                    >
                      <IoMdClose />
                    </button>
                    <form onSubmit={handleFormSubmit} className={style.form}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="name"
                            className={`form-control ${style.inputField}`}
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${style.inputField}`}
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="phone"
                            className={`form-control ${style.inputField}`}
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <select
                            name="service"
                            className={`form-control ${style.inputField}`}
                            value={formData.service}
                            onChange={handleInputChange}
                          >
                            <option value="">{selectedJob ? selectedJob.title : "Select Service"}</option>
                          </select>
                          <IoChevronDown className={style.selectIcon} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="file"
                            name="resume"
                            className={`form-control ${style.inputField}`}
                            placeholder="Upload Resume"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="message"
                            className={`form-control ${style.inputField}`}
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <button type="submit" className={style.talk_btn} onClick={handleFormSubmit}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                          <button
                            type="button"
                            onClick={handleCloseModal}
                            className={style.cancel_btn}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default WorkWithUs;