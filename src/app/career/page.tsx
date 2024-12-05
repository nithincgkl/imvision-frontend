"use client"; // Ensure this is at the very top of the file

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

// Career opening data
const careerOpenings = [
  {
    id: 1,
    image: "/assets/images/career-01.jpg",
    title: "Summer Job At Tour!",
    description:
      "We are looking for a driven person with some technical competence",
    details:
      "The work is mostly scheduled for evenings and weekends, some work outside the summer period may occur.",
    location: "Herkulesvägen 56, Skeppargatan 11",
    expertise: "Image technology LED, Grand Ma2, timecode & DMX",
  },
  {
    id: 2,
    image: "/assets/images/career-02.jpg",
    title: "Technical Support Specialist",
    description: "Seeking a proactive problem solver for our support team",
    details:
      "Provide exceptional customer support and technical assistance for our cutting-edge solutions.",
    location: "IM Vision Headquarters",
    expertise: "Customer Service, Technical Troubleshooting, Communication",
  },
  {
    id: 3,
    image: "/assets/images/career-03.jpg",
    title: "Creative Designer",
    description: "Looking for innovative design talent to join our team",
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
  const [service, setService] = useState(""); // State for select dropdown
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle file input differently
    if (name === 'resume' && e.target instanceof HTMLInputElement) {
      setFormData(prev => ({ ...prev, resume: e.target.files?.[0]?.name || '' }));
      return;
    }
  
    // For other fields
    setFormData(prev => ({ ...prev, [name]: value }));
  
    // Specific validations
    if (name === 'Message') {
      if (value.length > 500) {
        setErrors(prev => ({ 
          ...prev, 
          Message: "Message must be less than 500 characters." 
        }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          Message: "" 
        }));
      }
    }
  };
  
  const validateForm = () => {
    const newErrors: typeof errors = {
      name: "",
      email: "",
      phone: "",
      resume: "",
      service: "",
      Message: "",
    };
    let isValid = true;
  
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required.";
      isValid = false;
    }
  
    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required.";
      isValid = false;
    }
  
    // Resume validation
    if (!formData.resume) {
      newErrors.resume = "Resume upload is required.";
      isValid = false;
    }
  
    // Service validation
    if (!service) {
      newErrors.service = "Please select a service.";
      isValid = false;
    }
  
    // Message validation (optional, but with length limit)
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
      // Perform form submission logic
      console.log("Form is valid", { ...formData, service });
      
      // Reset form or close modal
      handleCloseModal();
    } else {
      console.log("Form validation failed", errors);
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
                    <div className="col-md-8">
                      <h1 className={style.pageTitle}>
                        Let Our Team <br />
                        Be Your New Team
                      </h1>
                    </div>
                    <div className="col-md-4">
                      <p>
                        Glad you are interested in working with us at IM
                        Vision! Below you see a couple of the positions we are
                        currently looking for, we are always looking for new
                        talent and even if the position you are looking for is
                        not currently available, do not hesitate to contact us!
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
                      <button className={style["talk-btn"]}>
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
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          {errors.name && <p className={style.error}>{errors.name}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${style.inputField}`}
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          {errors.email && <p className={style.error}>{errors.email}</p>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="phone"
                            className={`form-control ${style.inputField}`}
                            placeholder="Phone*"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          {errors.phone && <p className={style.error}>{errors.phone}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="position-relative">
                            <select
                              name="service"
                              className={`form-control ${style.inputField}`}
                              value={service}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Service *</option>
                              <option value="Sale">Sale</option>
                              <option value="Rent">Rent</option>
                              <option value="Career">Career</option>
                              <option value="Other">Other</option>
                            </select>
                            <IoChevronDown className={style.selectIcon} />
                            {errors.service && <p className={style.error}>{errors.service}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="file"
                            name="resume"
                            className={`form-control ${style.inputField}`}
                            placeholder="Upload Resume*"
                            onChange={(e) =>
                              setFormData({ 
                                ...formData, 
                                resume: e.target.value 
                              })
                            }
                          />
                          {errors.resume && <p className={style.error}>{errors.resume}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="Message"
                            className={`form-control ${style.inputField}`}
                            placeholder="Message"
                            value={formData.Message}
                            onChange={handleInputChange}
                          />
                          {errors.Message && <p className={style.error}>{errors.Message}</p>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <button type="submit" className={style.talk_btn}>
                            Talk to Expert
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

export default Career;