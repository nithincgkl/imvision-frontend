"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
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
import Loader from "@/components/common/Loader";
import { useLocale, useTranslations } from 'next-intl';
import Error from "@/components/common/Error";

const WorkWithUs: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <Career />
      </Suspense>
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

const Career = () => {
  const CareerBox = ({ job, onApply }: { job: CareerJob; onApply: (job: CareerJob) => void; }) => (
    <div className={style["career_box"]}>
      <div>
        {job.thumbnail ? (
          <img src={`${job.thumbnail.formats.thumbnail.url}`} className="w-100 h-100" alt={job.title} loading="lazy" />
        ) : (
          <div className={style["no-thumbnail"]}>{t("imageError")}</div>
        )}
      </div>



      <div>
        <h4>{job.title}</h4>
        <p dangerouslySetInnerHTML={{ __html: job.description || `${t("noDesc")}` }} />            {/* <p><span>{`Posted on: ${new Date(job.publishedAt).toLocaleDateString()}`}</span></p> */}
        <p><IoLocationOutline /> {workWithUs.content.location} {job.location}</p>
        <p><PiSuitcaseSimpleLight /> {workWithUs.content.expertIn}  {job.expert_in}</p>
        <div className={style["career_box_btn"]}>
          <span>
            <a href="mailto:info@imvision.se" className="d-inline-flex align-items-center">
              {workWithUs.content.mail}  <LuMoveUpRight />
            </a>
          </span>
          <span>
            <button className={style["apply_btn"]} onClick={() => onApply(job)}>{workWithUs.content.apply} </button>
          </span>
        </div>
      </div>
    </div>
  );
  const t = useTranslations('workWithUs');
  const [careerOpenings, setCareerOpenings] = useState<CareerJob[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState(3);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const [openingsLoader, setOpeningsLoader] = useState<Boolean>(false);
  const [footer, setFooter] = useState<any>([])
  const [letsTalk, setLetsTalk] = useState<any>([])
  const [navigation, setNavigation] = useState<any>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | string | null,
    message: "",
    service: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const locale = useLocale();
  const [workWithUs, setWorkWithUs] = useState<any>([]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}careers?locale=${locale}&populate=*`, {
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
  const getWorkWithUsAssets = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}work-with-us?locale=${locale}&populate=*`);
      setWorkWithUs(response.data.data);
    } catch (error) {
      console.error("Error fetching Work with us data:", error);
      setWorkWithUs([]); 
    }
  };
  const fetchLetsTalk = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}let-us-talk?locale=${locale}&populate=*`);
      setLetsTalk(response.data);
    } catch (error) {
      console.error("Error fetching Let's Talk data:", error);
      setLetsTalk([]);
    }
  };
  const fetchNavigation = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}navigation?locale=${locale}&populate=*`);
      setNavigation(response.data);
    } catch (error) {
      console.error("Error fetching navigation data:", error);
      setNavigation([]);
    }
  };
  const fetchFooter = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}footer?locale=${locale}&populate=*`);
      setFooter(response.data);
    } catch (error) {
      console.error("Error fetching footer data:", error);
      setFooter([]);
    }
  };

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setOpeningsLoader(true);
        await Promise.all([fetchJobs(), getWorkWithUsAssets(),fetchNavigation(),fetchLetsTalk(),fetchFooter()]);
        setOpeningsLoader(false);
      } catch (error) {
        console.error("Error fetching Work with us:", error);
      }
    };
    fetchPositions();

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
        const emailDataToSend = new FormData();
        emailDataToSend.append("name", formData.name)
        emailDataToSend.append("email",formData.email)
        emailDataToSend.append("phone", formData.phone)
        emailDataToSend.append("job", selectedJob?.title as string)
        emailDataToSend.append("resume", formData.resume as File)
        emailDataToSend.append("comments", formData.message as string)

        // Send data to error-reporting API
        await fetch('/api/work-with-us', {
          method: 'POST',
          body: emailDataToSend, // Correct format
        });
        enqueueSnackbar(workWithUs?.content?.success, { variant: 'success' });
        handleCloseModal();
        setFormData({ name: "",
          email: "",
          phone: "",
          resume: null as File | string | null,
          message: "",
          service: "",
        })
      } catch (error) {
        console.error(error);
        enqueueSnackbar(workWithUs?.content?.error, { variant: 'error' });
        setIsSubmitting(false);
      }
      finally {
        setIsSubmitting(true);
      }
    } catch (error) {
      enqueueSnackbar(workWithUs?.content?.error, { variant: 'error' });
      console.error(error);
      setIsSubmitting(false);
    }
    finally {
      setIsSubmitting(false);
    }
  };
  if (openingsLoader) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
      >
        <Loader size={150} />
      </div>
    );
  }
  else if (!workWithUs || workWithUs.content === null ) {
    return (
      <div>
        <HeaderOne data={navigation.data} />
        <Error></Error>
        <FooterOne data={footer.data} />
      </div>
    )
  }
  return (
    <Wrapper>
      <HeaderOne data={navigation.data}/>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className={style.full_career_section}>
              <div className={style["contact_banner"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <h1 className={style.pageTitle} dangerouslySetInnerHTML={{__html: workWithUs?.content?.heading}}>
                      </h1>
                    </div>
                    <div className={`col-md-6 ${style.secondary_text_container}`}>
                      <p className={style.secondary_header_text} dangerouslySetInnerHTML={{__html: workWithUs?.content?.description}}>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style["contact_video"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      {workWithUs && workWithUs?.work_with_us_banner && workWithUs?.work_with_us_banner.length > 0 ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={style["contact-video"]}
                            >
                            <source src={workWithUs?.work_with_us_banner[0]?.url} type={workWithUs?.work_with_us_banner[0]?.mime} />
                            {t("videoError")}
                          </video>
                      ) :
                        (
                          <Error></Error>
                        )}
                    </div>

                    <div className="col-md-12 text-center">
                      <button className={style["talk-btn"]} onClick={() => window.location.href = '/contact'}>
                        {workWithUs?.content?.talk}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <section className={style.contact_section}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h3>{workWithUs?.content?.currentOpenings} </h3>
                    </div>
                    <div className="col-12">
                      {openingsLoader ? (
                        <div className={style.loaderContainer}>
                          <Loader /> {/* Ensure Loader component is imported and styled */}
                        </div>
                      ) : (
                        careerOpenings.slice(0, displayedJobs).map((job) => (
                          <CareerBox
                            key={job.id}
                            job={job}
                            onApply={handleApply}
                          />
                        ))
                      )}
                    </div>
                    {!openingsLoader && displayedJobs < careerOpenings.length && (
                      <div className="col-md-12 text-center">
                        <button
                          className={style["load_more"]}
                          onClick={handleLoadMore}
                        >
                          {workWithUs.content.loadMore}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>



              {selectedJob && (
                <div className={style.modal}>
                  <div ref={modalRef} className={style.modal_content}>
                    <h4>{workWithUs.content.form.heading} </h4>
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
                            placeholder={workWithUs.content.form.name}
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${style.inputField}`}
                            placeholder={workWithUs.content.form.email}
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
                            placeholder={workWithUs.content.form.phone}
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
                            placeholder={workWithUs.content.form.upload}
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="message"
                            className={`form-control ${style.inputField}`}
                            placeholder={workWithUs.content.form.message}
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <button
                            type="submit"
                            className={style.talk_btn}
                            onClick={handleFormSubmit}
                            disabled={isSubmitting}
                            style={{
                              opacity: isSubmitting ? 0.6 : 1,
                              cursor: isSubmitting ? "not-allowed" : "pointer",
                            }}
                          >
                            {isSubmitting ? workWithUs.content.form.submitting : workWithUs.content.form.submit}
                          </button>
                          <button
                            type="button"
                            onClick={handleCloseModal}
                            className={style.cancel_btn}
                          >
                            {workWithUs.content.form.cancel}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <LetsTalk data={letsTalk.data}/>
          </main>
          <FooterOne data={footer.data}/>
        </div>
      </div>
    </Wrapper>
  );
};

export default WorkWithUs;