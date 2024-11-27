'use client';

import React, { useState } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import { FaEye } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from 'next/link';

const Page: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Wrapper>
     
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["sign_up"]}>
            <div className={`container-fluid ${style.video_container}`}>
                <div className="row">
                  <div className={`col-md-6 ${style.video_container_half}`}>
                  <video
                autoPlay
                loop
                muted
                playsInline
                className={style["banner-video"]} 
              >
                <source src="/assets/videos/sign-up.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
                  </div>
                  <div className={`col-md-6 ${style.form_container_half}`}>
                    <form className="w-full max-w-md space-y-6 px-8">

                    <div className="col-md-12 mb-3">
                    <IoIosArrowRoundBack  className={style["form_back_icon"]} />
                    </div>
                    <div className="col-md-12 mb-3">
                     
                        <h2 className='mb-0'>Hello,<br />Forgot password ?</h2>
                        <p>We’re excited to see you again!</p>
                    </div>



                
                
                <div className="col-md-12 mb-3">
                  <div className={style.formControl}>
                    <input type="Email" id="Email" className={`form-control ${style.inputField}`} placeholder="Email*"/>
                    {/* <label htmlFor="Email*" className={style.inputLabel}>Email* </label> */}
                  </div>
                </div>


                <div className="col-md-12 mb-3">
                  <div className={style.formControl}>
                    <input type={showPassword ? 'text' : 'password'} id="Password" className={`form-control ${style.inputField}`} placeholder="Password*"/>
                    {/* <label htmlFor="Password*" className={style.inputLabel}>Password* </label> */}


                    <button  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <FaEye />
                            ) : (
                              <FaEye />
                            )}
                          </button>
                  </div>
                </div>


                <div className="col-md-12 mb-3">
                  <div className={style.formControl}>
                  <Link href="/forgot-password"  className={style["float_right"]}>Forgot password ?</Link>
                    
                  </div>
                </div>
                 
                    
                      <button type="submit" className={`mt-2 ${style.form_button}`} >
                      Login
                      </button>
                      <p className='pt-3'>Don’t have an account? <Link href="/sign-up">Sign up</Link></p>
                    </form>
                  </div>
                </div>
              </div>
            </section>

          </main>
        
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;