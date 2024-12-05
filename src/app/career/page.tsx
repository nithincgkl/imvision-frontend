"use client"; // Ensure this is at the very top of the file

import React, { useState, useEffect, useRef } from "react";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import LetsTalk from "@/components/home/lets-talk";
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { LuMoveUpRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import style from "./style.module.css";

// Career opening data
const careerOpenings = [
  {
    id: 1,
    image: "/assets/images/career-01.jpg",
    title: "Summer Job At Tour!",
    description:
      "We are looking for a driven person with some technical competence.",
    details:
      "The work is mostly scheduled for evenings and weekends, some work outside the summer period may occur.",
    location: "Herkulesvägen 56, Skeppargatan 11",
    expertise: "Image technology LED, Grand Ma2, timecode & DMX",
  },
  {
    id: 2,
    image: "/assets/images/career-02.jpg",
    title: "Technical Support Specialist",
    description: "Seeking a proactive problem solver for our support team.",
    details:
      "Provide exceptional customer support and technical assistance for our cutting-edge solutions.",
    location: "IM Vision Headquarters",
    expertise: "Customer Service, Technical Troubleshooting, Communication",
  },
  {
    id: 3,
    image: "/assets/images/career-03.jpg",
    title: "Creative Designer",
    description: "Looking for innovative design talent to join our team.",
    details:
      "Create compelling visual solutions that push the boundaries of design and technology.",
    location: "Stockholm Creative Hub",
    expertise: "Graphic Design, UI/UX, Adobe Creative Suite",
  },
];

type CareerJob = (typeof careerOpenings)[0];

const CareerBox = ({
  job,
  onApply,
}: {
  job: CareerJob;
  onApply: (job: CareerJob) => void;
}) => (
  <div className={style["career_box"]}>
    <div>
      <img src={job.image} className="w-100" alt={job.title} loading="lazy" />
    </div>
    <div>
      <h4>{job.title}</h4>
      <p>{job.description}</p>
      <p>
        <span>{job.details}</span>
      </p>
      <p>
        <IoLocationOutline /> Location: {job.location}
      </p>
      <p>
        <PiSuitcaseSimpleLight /> Expert in: {job.expertise}
      </p>
      <div className={style["career_box_btn"]}>
        <span>
          <a
            href="mailto:career@imvision.se"
            className="d-inline-flex align-items-center"
          >
            Send mail to career@imvision.se <LuMoveUpRight />
          </a>
        </span>
        <span>
          <button className={style["apply_btn"]} onClick={() => onApply(job)}>
            Apply Now
          </button>
        </span>
      </div>
    </div>
  </div>
);

const Career = () => {
  const [displayedJobs, setDisplayedJobs] = useState(3);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const [service, setService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    Message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    service: "",
    Message: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

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
        smoothContentEl.style.pointerEvents = "none";
      }
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "unset";
      if (smoothContentEl) {
        smoothContentEl.style.pointerEvents = "";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      if (smoothContentEl) {
        smoothContentEl.style.pointerEvents = "";
      }
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedJob]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
   
  
    if (name === "Message" && value.length > 500) {
      setErrors((prev) => ({
        ...prev,
        Message: "Message must be less than 500 characters.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, Message: "" }));
    }
  };
  

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      resume: "",
      service: "",
      Message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required.";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required.";
      isValid = false;
    }

    if (!formData.resume) {
      newErrors.resume = "Resume upload is required.";
      isValid = false;
    }

    if (!service) {
      newErrors.service = "Please select a service.";
      isValid = false;
    }

    if (formData.Message && formData.Message.length > 500) {
      newErrors.Message = "Message must be less than 500 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully:", { ...formData, service });
      handleCloseModal();
    }
  };

  const handleLoadMore = () => setDisplayedJobs((prev) => prev + 3);
  const handleApply = (job: CareerJob) => setSelectedJob(job);
  const handleCloseModal = () => setSelectedJob(null);

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style.full_career_section}>
              {/* Banner */}
              <div className={style.contact_banner}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-8">
                      <h1 className={style.pageTitle}>
                        Let Our Team <br />
                        Be Your New Team
                      </h1>
                    </div>
                    <div className="col-md-4">
                      <p>
                        Glad you are interested in working with us at IM Vision!
                        Below you see a couple of the positions we are
                        currently looking for. Even if the position you are
                        looking for is not currently available, do not hesitate
                        to contact us!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Openings Section */}
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
                          className={style.load_more}
                          onClick={handleLoadMore}
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </section>

            {/* Modal */}
            {selectedJob && (
              <div className={style.modal}>
                <div className={style.modal_overlay} />
                <div
                  role="dialog"
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  ref={modalRef}
                  className={style.modal_content}
                >
                  <button className={style.close_btn} onClick={handleCloseModal}>
                    <IoMdClose />
                  </button>
                  <h4 id="modal-title">Connect With Us</h4>
                  <form
                    className={style.contact_form}
                    onSubmit={handleFormSubmit}
                  >
                    <div className={style.form_group}>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <span className={style.error_msg}>{errors.name}</span>
                      )}
                    </div>
                    <div className={style.form_group}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <span className={style.error_msg}>{errors.email}</span>
                      )}
                    </div>
                    <div className={style.form_group}>
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <span className={style.error_msg}>{errors.phone}</span>
                      )}
                    </div>
                    <div className={style.form_group}>
                      <label htmlFor="resume">Resume</label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleInputChange}
                      />
                      {formData.resume && (
                        <span className={style.file_name}>
                          {formData.resume}
                        </span>
                      )}
                      {errors.resume && (
                        <span className={style.error_msg}>{errors.resume}</span>
                      )}
                    </div>
                    <div className={style.form_group}>
                      <label htmlFor="service">Service</label>
                      <select
                        id="service"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={style.select_dropdown}
                      >
                        <option value="">Select Service</option>
                        <option value="service1">Service 1</option>
                        <option value="service2">Service 2</option>
                        <option value="service3">Service 3</option>
                      </select>
                      {errors.service && (
                        <span className={style.error_msg}>{errors.service}</span>
                      )}
                    </div>
                    <div className={style.form_group}>
                      <label htmlFor="Message">Message</label>
                      <textarea
                        id="Message"
                        name="Message"
                        value={formData.Message}
                        onChange={handleInputChange}
                        placeholder="Enter your message"
                      />
                      {errors.Message && (
                        <span className={style.error_msg}>
                          {errors.Message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={`${style.submit_btn} btn-primary`}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}

            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default Career;
