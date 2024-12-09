'use client'
import React from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FiDownload } from "react-icons/fi";

// Main ContactPage Component
const RentalConditions = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style.contact_section}>
              <div className={style.contact_banner}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-8">
                      <h1 className={style.pageTitle}>Error  Reporting</h1>
                    </div>
                    <div className="col-md-4">
                      <p>We're here to help you resolve any issues. Please review the details below and follow the provided steps, or contact support for further assistance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style["error_reporting"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">

                    <div className={style["error_reporting_container"]}>
                        <form>

                        <div className="row">
                          <div className="col-md-5">
                          <input  type="text"
                      name="Your Name*"
                      className={`form-control ${style.inputField}`}
                      placeholder="Your Name*"  />
                          </div>
                          <div className="col-md-7">
                          <input  type="text"
                      name="Address*"
                      className={`form-control ${style.inputField}`}
                      placeholder="Address*"  />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-5">
                          <input  type="email"
                      name="Email"
                      className={`form-control ${style.inputField}`}
                      placeholder="Email*"  />

<input  type="text"
                      name="Phone*"
                      className={`form-control ${style.inputField}`}
                      placeholder="Phone*"  />

<input  type="text"
                      name="Company"
                      className={`form-control ${style.inputField}`}
                      placeholder="Company"  />

                          </div>
                          <div className="col-md-7">
                          <textarea id="" name="" placeholder='Message ' />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-5">
                          <div className={style["dot_box"]}>
                            <p>Please attach any relevant documents</p>
                            <input
                      type="file"
                      name="resume"
                      className={`form-control ${style.inputField}`}
                      placeholder="Upload Resume"
                    />
                    <p><span>(Images or files that may help us better
                      understand and resolve the issue.)</span></p>
                          </div>
                          </div>

                          <div className="col-md-7">
                          <div className={style["dot_box"]}>
                            <p>Do you have a service agreement with IMPROD AB?</p>
                            
                    <p><span>(If you do not have a service agreement with IMPROD AB, a cost of SEK 795 per hour will be added for technical support and repair as well as transport.)</span></p>
                          </div>
                          </div>
                        </div>

                        </form>
                    </div>
                      
                    </div>
                  </div>
                </div>
              </div>

            </section>

            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default RentalConditions;