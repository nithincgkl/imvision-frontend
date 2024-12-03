"use client"; // Add this at the very top

import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import LetsTalk from "@/components/home/lets-talk";
import { IoLocationOutline } from "react-icons/io5";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { LuMoveUpRight } from "react-icons/lu";
import style from "./style.module.css";

// Career opening data
export const careerOpenings = [
  {
    id: 1,
    image: "/assets/images/career-01.jpg",
    title: "Summer Job At Tour!",
    description: "We are looking for a driven person with some technical competence",
    details: "The work is mostly scheduled for evenings and weekends, some work outside the summer period may occur.",
    location: "Herkulesvägen 56, Skeppargatan 11",
    expertise: "Image technology LED, Grand Ma2, timecode & DMX",
  },
  {
    id: 2,
    image: "/assets/images/career-02.jpg",
    title: "Technical Support Specialist",
    description: "Seeking a proactive problem solver for our support team",
    details: "Provide exceptional customer support and technical assistance for our cutting-edge solutions.",
    location: "IM Vision Headquarters",
    expertise: "Customer Service, Technical Troubleshooting, Communication",
  },
  {
    id: 3,
    image: "/assets/images/career-03.jpg",
    title: "Creative Designer",
    description: "Looking for innovative design talent to join our team",
    details: "Create compelling visual solutions that push the boundaries of design and technology.",
    location: "Stockholm Creative Hub",
    expertise: "Graphic Design, UI/UX, Adobe Creative Suite",
  },
];

// Define the type for a job opening
type CareerJob = typeof careerOpenings[0];

const CareerBox = ({ job, onApply }: { job: CareerJob; onApply: (job: CareerJob) => void }) => (
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
          <a href="mailto:career@imvision.se" className="d-inline-flex align-items-center">
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

  const handleLoadMore = () => setDisplayedJobs((prev) => prev + 3);
  const handleApply = (job: CareerJob) => setSelectedJob(job);
  const handleCloseModal = () => setSelectedJob(null);

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style.contact_section}>
              <div className={style["career_container"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h3>Current Openings</h3>
                    </div>
                    <div className="col-12">
                      {careerOpenings.slice(0, displayedJobs).map((job) => (
                        <CareerBox key={job.id} job={job} onApply={handleApply} />
                      ))}
                    </div>

                    {displayedJobs < careerOpenings.length && (
                      <div className="col-md-12 text-center">
                        <button className={style["load_more"]} onClick={handleLoadMore}>
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Modal Section */}
            {selectedJob && (
              <div className={style.modal}>
                <div className={style.modal_content}>
                  <h3>Apply for {selectedJob.title}</h3>
                  <form className={style.form}>
                    <div>
                      <label>Your Name</label>
                      <input type="text" placeholder="Enter your name" />
                    </div>
                    <div>
                      <label>Email</label>
                      <input type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input type="tel" placeholder="Enter your phone number" />
                    </div>
                    <div>
                      <label>Select Service</label>
                      <select>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label>Upload Resume*</label>
                      <input type="file" />
                    </div>
                    <div>
                      <label>Any Specific Comment?</label>
                      <textarea placeholder="Enter your comment"></textarea>
                    </div>
                    <div className={style.modal_actions}>
                      <button type="button" className={style.talk_btn}>
                        Talk to Expert
                      </button>
                      <button type="button" onClick={handleCloseModal} className={style.cancel_btn}>
                        Cancel
                      </button>
                    </div>
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
