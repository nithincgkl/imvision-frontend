'use client';

import React, { useState, FormEvent, Suspense } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { CartProvider } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';

const ResetPassword: React.FC = () => {
  const t = useTranslations('resetPassword');
  return (
    <CartProvider>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <Page />
      </Suspense>
    </CartProvider>
  );
};

const Page: React.FC = () => {
  const t = useTranslations('resetPassword');
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeFromURL = searchParams.get('code');

  const [formData, setFormData] = useState({
    code: codeFromURL || '',
    password: '',
    passwordConfirmation: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.password || !formData.passwordConfirmation) {
        throw new Error('All fields are required');
      }

      if (formData.password !== formData.passwordConfirmation) {
        throw new Error('Passwords do not match');
      }

      const response = await axios.post(
        '/api/auth/reset-password',  // Update this to your actual API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        router.push('/login?message=password-reset-successful');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || err.message || `${t("error")}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["reset_password"]}>
              <div className="container justify-content-center">
                <div className="row">
                  <div className={style.form_container_half}>
                    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-8">
                      <div className="col-md-12 mb-3">
                        <h2 className="mb-0">{t("heading")}<br />{t("heading2")}</h2>
                        <p>{t("desc")}</p>
                      </div>

                      {error && (
                        <div className="text-red-500 mb-3">
                          {error}
                        </div>
                      )}

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className={`form-control ${style.inputField}`}
                            placeholder={t("code")}
                            readOnly={!!codeFromURL}
                          />
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-control ${style.inputField}`}
                            placeholder={t("password")}
                            minLength={8}
                            aria-label="Password"
                          />
                          <button
                            type="button"
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            <FaEye />
                          </button>
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="passwordConfirmation"
                            value={formData.passwordConfirmation}
                            onChange={handleChange}
                            className={`form-control ${style.inputField}`}
                            placeholder={t("confirmPassword")}
                            minLength={8}
                            aria-label="Confirm Password"
                          />
                          <button
                            type="button"
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                          >
                            <FaEye />
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className={`mt-2 ${style.form_button}`}
                        disabled={loading}
                      >
                        {loading ? `${t("processing")}` : `${t("submit")}`}
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

export default ResetPassword;