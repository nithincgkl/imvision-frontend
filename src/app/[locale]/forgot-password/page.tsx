'use client';

import React, { Suspense, useState } from 'react';
import axios from 'axios';
import style from './style.module.css';
import Wrapper from '@/layouts/wrapper';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';
import LanguageToggle from '@/components/common/LanguageToggle';

const ForgetPassword: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <Page />
      </Suspense>
    </CartProvider>
  );
};


const Page: React.FC = () => {
  const t = useTranslations('forgotPassword');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      console.log("2. Making axios request with email:", email);  // Debug point 2

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/forgot-password`, {
        email: email
      });

      console.log("3. Response received:", response); // Debug point 3
      console.log("4. Response data:", response.data); // Original log

      if (response.status === 200) {
        setSuccessMessage(`${t("success")}`);
      }
      setLoading(false);
    } catch (error: any) {
      console.log("5. Error caught:", error); // Debug point 4
      console.log("6. Error response:", error.response); // Debug error details
      if (error.response?.data?.error?.message === "user.not.found") {
        setErrorMessage(`${t("error")}`);
      }
      else {
        setErrorMessage(error.response?.data?.error?.message || `${t("error2")}`);
      }
      setLoading(false);
    }
    finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    window.location.href = `/login`;
  }

  return (
    <Wrapper>
      <div id="smooth-wrapper">
        <div className={style.toggle_wrapper}>
          <LanguageToggle />
        </div>
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
                      {t("videoError")}
                    </video>
                  </div>
                  <div className={`col-md-6 ${style.form_container_half}`}>
                    <form className="w-full max-w-md space-y-6 px-8" onSubmit={handleSubmit}>
                      <div className="col-md-12 mb-3" onClick={handleBack}>
                        <IoIosArrowRoundBack className={style['form_back_icon']} />
                      </div>
                      <div className="col-md-12 mb-3">
                        <h2 className="mb-0">{t("heading2")}<br />{t("heading")}</h2>
                        <p>{t("subHeading")}</p>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="email"
                            id="Email"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("email")}
                            value={email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      {errorMessage && <div className="col-md-12 text-danger mb-3">{errorMessage}</div>}
                      {successMessage && <div className="col-md-12 text-success mb-3">{successMessage}</div>}

                      <button
                        type="submit"
                        className={`mt-2 ${style.form_button}`}
                        onClick={(e) => console.log("Button clicked")}
                      >
                        {loading ? `${t("submitting")}` : `${t("submit")}`}
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
