'use client';

import React, { useState, useEffect } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import { FaEye, FaCheckCircle } from "react-icons/fa";
import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";
import Link from 'next/link';
import { FaEyeSlash } from "react-icons/fa6";

const SuccessPopup: React.FC<{ 
  message: string, 
  onClose: () => void 
}> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={style.popup_overlay}>
      <div className={style.popup_content}>
        <button 
          onClick={onClose} 
          className={style.popup_close}
        >
          <IoMdClose />
        </button>
        <FaCheckCircle className={style.popup_icon} />
        <h2 className={style.popup_title}>Success!</h2>
        <p className={style.popup_message}>{message}</p>
        {/* <button 
          onClick={onClose} 
          className={style.popup_button}
        >
          Continue
        </button> */}
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      return 'Email is required';
    }
    
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(password)) {
      return 'Password must include uppercase, lowercase, number, and special character';
    }
    
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setErrors({
      email: emailError,
      password: passwordError
    });
    
    if (!emailError && !passwordError) {
      // Simulating a successful login
      console.log('Login submitted', { email, password });
      setSuccessMessage('You have successfully logged in!');
    }
  };

  const handleCloseSuccessPopup = () => {
    setSuccessMessage('');
    // Add any additional logic like redirecting to dashboard
  };

  return (
    <>
      {successMessage && (
        <SuccessPopup 
          message={successMessage} 
          onClose={handleCloseSuccessPopup} 
        />
      )}
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
                        <source src="/assets/videos/login.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div className={`col-md-6 ${style.form_container_half}`}>
                      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-8">
                        {/* <div className="col-md-12 mb-3">
                          <IoIosArrowRoundBack className={style["form_back_icon"]} />
                        </div> */}
                        <div className="col-md-12 mb-3">
                          <h2 className='mb-0'>Hello,</h2>
                          <h2 className='mb-0'>Welcome Back</h2>
                          <p>We're excited to see you again!</p>
                        </div>

                        <div className="col-md-12 mb-4">
                          <div className={style.formControl}>
                            <input 
                              type="email" 
                              id="Email" 
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors(prev => ({...prev, email: ''}));
                              }}
                              className={`form-control ${style.inputField} ${errors.email ? style.error_input : ''}`} 
                              placeholder=" " 
                            />
                            {!errors.email && (
                              <label htmlFor="Email*" className={style.inputLabel}>Email* </label>
                            )}
                            {errors.email && (
                              <p className={`${style.error_message}`}>{errors.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 mb-4">
                          <div className={style.formControl}>
                            <input 
                              type={showPassword ? 'text' : 'password'} 
                              id="Password" 
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors(prev => ({...prev, password: ''}));
                              }}
                              className={`form-control ${style.inputField} ${errors.password ? style.error_input : ''}`} 
                              placeholder=" " 
                            />
                            {!errors.password && (
                              <label htmlFor="Password*" className={style.inputLabel}>Password* </label>
                            )}
                            <button 
                              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                              type="button"
                              onClick={togglePasswordVisibility}
                            >
                              <FaEye />
                            </button>
                            {errors.password && (
                              <p className={`${style.error_message}`}>{errors.password}</p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 mb-3">
                          <div className={style.formControl}>
                            <Link href="/login" className={style.float_right}>Forgot password ?</Link>
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          className={`mt-2 ${style.form_button}`}
                        >
                          Login
                        </button>
                        <p className='pt-3'>Don't have an account?  <Link href="/sign-up">Sign up</Link></p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Page;