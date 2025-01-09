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
import { useTranslations } from 'next-intl';

const SignUp: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};

const Page: React.FC = () => {
  const t = useTranslations('signup');
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
    if (!formData.name.trim()) newErrors.name = `${t("form.validation.nameRequired")}`
    if (!formData.email.trim()) newErrors.email = `${t("form.validation.emailRequired")}`
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = `${t("form.validation.emailInvalid")}`
    if (!formData.phone.trim()) newErrors.phone = `${t("form.validation.phoneRequired")}`
    if (!formData.password.trim()) newErrors.password = `${t("form.validation.passwordRequired")}`
    else if (formData.password.length < 8) // Changed from 6 to 8
      newErrors.password = `${t("form.validation.passwordLength")}`

    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = `${t("form.validation.confirmPassword")}`
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = `${t("form.validation.noMatch")}`

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

          handleResponse(updateResponse, `${t("error")}`);
        } else {
          enqueueSnackbar(registerResponse.data.message || `${t("error2")}`, { variant: 'error' });
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
      enqueueSnackbar(`${t("success")}`, { variant: 'success' });
      window.location.href = '/';
    } else {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data?.error?.message || `${t("error3")}`;
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } else {
      enqueueSnackbar(`${t("success")}`, { variant: 'error' });
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
                      {t("videoError")}
                    </video>
                  </div>
                  <div className={`col-md-6 ${style.form_container_half}`}>
                    <form
                      className="w-full max-w-md space-y-6 px-8"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-md-12 mb-3">
                        <Link href="/"><IoIosArrowRoundBack className={style["form_back_icon"]} />{t("home")}</Link>
                      </div>
                      <div className="col-md-12 mb-3">
                        <h2 className="mb-0">{t("heading")}</h2>
                        <p className="mb-4 pb-2">
                          {t("desc")}
                        </p>
                      </div>

                      {/* Name Field */}
                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="text"
                            id="name"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("form.placeHolders.name")}
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
                            placeholder={t("form.placeHolders.email")}
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
                            placeholder={t("form.placeHolders.phone")}
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
                            placeholder={t("form.placeHolders.password")}
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
                            placeholder={t("form.placeHolders.confirmPassword")}
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
                        {loading ? `${t("creating")}` : `${t("create")}`}
                      </button>

                      <p className="pt-3">
                        {t("existing")}{" "}
                        <Link href="/login">{t("login")}</Link>
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