'use client';

import React, { useEffect, useState } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const Login: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};

const Page: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      setLoading(true);
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/local`, {
          identifier: email,
          password: password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;

        // Success - display success message
        try {
          const addressResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user-address`, {
            headers: {
              Authorization: `Bearer ${data.jwt}`,
            },
          });
          const { user_id, documentId, ...filteredData } = addressResponse.data
          localStorage.setItem("userData", JSON.stringify(filteredData))
        }
        catch (error) {
          localStorage.setItem("userData", JSON.stringify({}))
        }
        // Save token and user info to localStorage
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        enqueueSnackbar('Login successful!', { variant: 'success' });
        window.location.href = '/';
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // API error response
          enqueueSnackbar(error.response.data.message || 'Invalid email or password', { variant: 'error' });
        } else {
          // Other errors
          enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
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
                      <source src="/assets/videos/login.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className={`col-md-6 ${style.form_container_half}`}>
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-8">
                      <div className="col-md-12 mb-3">
                        <Link href="/"><IoIosArrowRoundBack className={style["form_back_icon"]} /> Back to Home</Link>
                      </div>
                      <div className="col-md-12 mb-3">
                        <h2 className="mb-0">Hello,<br />Welcome Back</h2>
                        <p>We’re excited to see you again!</p>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="text"
                            id="Email"
                            className={`form-control ${style.inputField}`}
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && <p className={style.error}>{errors.email}</p>}
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="Password"
                            className={`form-control ${style.inputField}`}
                            placeholder="Password*"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                          {errors.password && <p className={style.error}>{errors.password}</p>}
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <Link href="/forgot-password" className={style["float_right"]}>Forgot password?</Link>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className={`mt-2 ${style.form_button}`}
                        disabled={loading}
                      >
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                      <p className="pt-3">Don’t have an account? <Link href="/sign-up">Sign up</Link></p>
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

export default Login;