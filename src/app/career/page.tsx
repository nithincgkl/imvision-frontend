'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import LetsTalk from '@/components/home/lets-talk';
import { FiDownload } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { LuMoveUpRight } from "react-icons/lu";
import style from './style.module.css';

// Career opening data
const careerOpenings = [
  {
    id: 1,
    image: "/assets/images/career-01.jpg",
    title: "Summer Job At Tour!",
    description: "We are looking for a driven person with some technical competence",
    details: "The work is mostly scheduled for evenings and weekends, some work outside the summer period may occur. Take the chance to see Sweden's Live stages from the back & enjoy the tour life!",
    location: "Herkulesvägen 56, Skeppargatan 11",
    expertise: "Image technology LED, Grand Ma2, timecode & DMX"
  },
  {
    id: 2,
    image: "/assets/images/career-02.jpg",
    title: "Summer Job At Tour!",
    description: "We are looking for a driven person with some technical competence",
    details: "The work is mostly scheduled for evenings and weekends, some work outside the summer period may occur. Take the chance to see Sweden's Live stages from the back & enjoy the tour life!",
    location: "Herkulesvägen 56, Skeppargatan 11",
    expertise: "Image technology LED, Grand Ma2, timecode & DMX"
  },
  {
    id: 3,
    image: "/assets/images/career-03.jpg",
    title: "Summer Job At Tour!",
    description: "We are looking for a driven person with some technical competence",
    details: "The work is mostly scheduled for evenings and weekends, some work outside the summer period may occur. Take the chance to see Sweden's Live stages from the back & enjoy the tour life!",
    location: "Herkulesvägen 56, Skeppargatan 11",
    expertise: "Image technology LED, Grand Ma2, timecode & DMX"
  }
];

const CareerBox = ({ job, onApply }) => (
  <div className={style["career_box"]}>
    <div>
      <img 
        src={job.image} 
        className="w-100" 
        alt={job.title} 
        loading="lazy" 
      />
    </div>
    <div>
      <h4>{job.title}</h4>
      <p>{job.description}</p>
      <p><span>{job.details}</span></p>
      <p><IoLocationOutline /> Location: {job.location}</p>
      <p><PiSuitcaseSimpleLight /> Expert in: {job.expertise}</p>

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
          <button 
            className={style["apply_btn"]}
            onClick={() => onApply(job)}
          >
            Apply Now
          </button>
        </span>
      </div>
    </div>
  </div>
);

const Career = () => {
  const [displayedJobs, setDisplayedJobs] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleLoadMore = () => {
    setDisplayedJobs(prev => prev + 3);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    // You could open a modal or navigate to an application page here
    console.log('Applied for job:', job.title);
  };

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Contact Section */}
            <section className={style.contact_section}>
              {/* Banner Section */}
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
                        Below you see a couple of the positions we are currently
                        looking for. We are always looking for new talent, and even
                        if the position you are looking for is not currently
                        available, do not hesitate to contact us!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Section */}
              <div className={style.contact_video}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={style.contact_video}
                      >
                        <source src="/assets/videos/contact.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Section */}
              <div className={style["career_container"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <button 
                        className={style["talk-btn"]}
                        onClick={() => window.location.href = '/contact'}
                      >
                        Talk to Expert
                      </button>
                    </div>
                    <div className="col-12">
                      <h3>Current Openings</h3>
                    </div>
                    <div className="col-12">
                      {careerOpenings.slice(0, displayedJobs).map(job => (
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
              </div>
            </section>

            {/* Let's Talk Section */}
            <LetsTalk />
          </main>

          {/* Footer Section */}
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default Career;