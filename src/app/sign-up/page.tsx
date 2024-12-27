'use client';

import React, { useState } from "react";
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const SignUp: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) // Changed from 6 to 8
      newErrors.password = "Password must be at least 8 characters.";
  
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required.";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);

      try {
        // Register User
        const registerResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/local/register`,
          {
            username: formData.name,
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (registerResponse.status === 200) {
          const token = registerResponse.data.jwt;
          localStorage.setItem("token", token);

          // Now update the profile with the phone number
          const updateResponse = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}profile`,
            {
              phone: formData.phone,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          handleResponse(updateResponse, 'Profile update failed.');
        } else {
          enqueueSnackbar(registerResponse.data.message || 'Registration failed.', { variant: 'error' });
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResponse = (response: any, errorMessage: string) => {
    if (response.status === 200) {
      enqueueSnackbar('Account registered successfully!', { variant: 'success' });
      window.location.href = '/';
    } else {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data?.error?.message || 'Something went wrong. Please try again.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } else {
      enqueueSnackbar('Something went wrong. Please try again.', { variant: 'error' });
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
                      <source src="/assets/videos/sign-up.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className={`col-md-6 ${style.form_container_half}`}>
                    <form
                      className="w-full max-w-md space-y-6 px-8"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-md-12 mb-3">
                      <Link href="/"><IoIosArrowRoundBack className={style["form_back_icon"]} /> Back to Home</Link>
                      </div>
                      <div className="col-md-12 mb-3">
                        <h2 className="mb-0">Create account</h2>
                        <p className="mb-4 pb-2">
                          Sign up now and start your journey with us!
                        </p>
                      </div>

                      {/* Name Field */}
                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="text"
                            id="name"
                            className={`form-control ${style.inputField}`}
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          {errors.name && (
                            <p className={style.errorText}>{errors.name}</p>
                          )}
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="email"
                            id="email"
                            className={`form-control ${style.inputField}`}
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          {errors.email && (
                            <p className={style.errorText}>{errors.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="text"
                            id="phone"
                            className={`form-control ${style.inputField}`}
                            placeholder="Phone*"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          {errors.phone && (
                            <p className={style.errorText}>{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`form-control ${style.inputField}`}
                            placeholder="Password*"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            className={style.eye_button}
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                          {errors.password && (
                            <p className={style.errorText}>{errors.password}</p>
                          )}
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            className={`form-control ${style.inputField}`}
                            placeholder="Confirm Password*"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                          <button
                            type="button"
                            className={style.eye_button}
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                          </button>
                          {errors.confirmPassword && (
                            <p className={style.errorText}>
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className={`mt-2 ${style.form_button}`}
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </button>

                      <p className="pt-3">
                        Already have an account?{" "}
                        <Link href="/login">Login</Link>
                      </p>
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

export default SignUp;