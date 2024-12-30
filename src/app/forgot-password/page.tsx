'use client';

import React, { useState } from 'react';
import axios from 'axios';
import style from './style.module.css';
import Wrapper from '@/layouts/wrapper';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const ForgetPassword: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};


const Page: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    console.log("1. Starting form submission");  // Debug point 1
    console.log("API URL:", `${process.env.NEXT_PUBLIC_API_URL}auth/forgot-password`); // Check API URL

    try {
      console.log("2. Making axios request with email:", email);  // Debug point 2

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/forgot-password`, {
        email: email
      });

      console.log("3. Response received:", response); // Debug point 3
      console.log("4. Response data:", response.data); // Original log

      if (response.status === 200) {
        setSuccessMessage('Password reset link has been sent to your email.');
      }
    } catch (error: any) {
      console.log("5. Error caught:", error); // Debug point 4
      console.log("6. Error response:", error.response); // Debug error details
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };
  const handleBack = () => {
    window.location.href = `/login`;
  }

  return (
    <Wrapper>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style['sign_up']}>
              <div className={`container-fluid ${style.video_container}`}>
                <div className="row">
                  <div className={`col-md-6 ${style.video_container_half}`}>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={style['banner-video']}
                    >
                      <source src="/assets/videos/sign-up.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className={`col-md-6 ${style.form_container_half}`}>
                    <form className="w-full max-w-md space-y-6 px-8" onSubmit={handleSubmit}>
                      <div className="col-md-12 mb-3" onClick={handleBack}>
                        <IoIosArrowRoundBack className={style['form_back_icon']} />
                      </div>
                      <div className="col-md-12 mb-3">
                        <h2 className="mb-0">Hello,<br />Forgot password ?</h2>
                        <p>We’re excited to see you again!</p>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="email"
                            id="Email"
                            className={`form-control ${style.inputField}`}
                            placeholder="Email*"
                            value={email}
                            onChange={handleInputChange}
                            required
                          />
                          <label htmlFor="Email" className={style.inputLabel}>
                            Email*
                          </label>
                        </div>
                      </div>

                      {errorMessage && <div className="col-md-12 text-danger mb-3">{errorMessage}</div>}
                      {successMessage && <div className="col-md-12 text-success mb-3">{successMessage}</div>}

                      <button
                        type="submit"
                        className={`mt-2 ${style.form_button}`}
                        onClick={(e) => console.log("Button clicked")}
                      >
                        Submit
                      </button>

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

export default ForgetPassword;
