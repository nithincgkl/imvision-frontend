'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from './style.module.css';
import LetsTalk from '@/components/home/lets-talk';

const ErrorReportingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    agreement: '',
    attachment: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Form submission logic
    console.log('Form submitted successfully:', formData);
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Name is required.';
    if (!data.address.trim()) newErrors.address = 'Address is required.';
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!data.phone.trim() || !/^\d{10,15}$/.test(data.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!data.message.trim()) newErrors.message = 'Message is required.';
    if (!data.agreement) newErrors.agreement = 'Please select an agreement option.';
    return newErrors;
  };

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
                      <h1 className={style.pageTitle}>Error Reporting</h1>
                    </div>
                    <div className="col-md-4">
                      <p>
                        We're here to help you resolve any issues. Please review the details below
                        and follow the provided steps, or contact support for further assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.error_reporting}>
                <div className="container-fluid">
                  <form noValidate onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-5">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-control ${style.inputField}`}
                          placeholder="Your Name*"
                        />
                        {errors.name && (
                          <span className={style.errorMessage}>{errors.name}</span>
                        )}
                      </div>
                      <div className="col-md-7">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`form-control ${style.inputField}`}
                          placeholder="Address*"
                        />
                        {errors.address && (
                          <span className={style.errorMessage}>{errors.address}</span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-5">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control ${style.inputField}`}
                          placeholder="Email*"
                        />
                        {errors.email && (
                          <span className={style.errorMessage}>{errors.email}</span>
                        )}

                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`form-control ${style.inputField}`}
                          placeholder="Phone*"
                        />
                        {errors.phone && (
                          <span className={style.errorMessage}>{errors.phone}</span>
                        )}

                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`form-control ${style.inputField}`}
                          placeholder="Company"
                        />
                      </div>
                      <div className="col-md-7">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`form-control ${style.textareaField}`}
                          placeholder="Message"
                        />
                        {errors.message && (
                          <span className={style.errorMessage}>{errors.message}</span>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-5">
                        <div className={style.dot_box}>
                          <p>Please attach any relevant documents</p>
                          <input
                            type="file"
                            name="attachment"
                            onChange={handleChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                            className={`form-control ${style.inputField}`}
                          />
                        </div>
                      </div>

                      <div className="col-md-7">
                        <div className={style.dot_box}>
                          <p>Do you have a service agreement with IMPROD AB?</p>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="agreement"
                                value="Yes"
                                checked={formData.agreement === 'Yes'}
                                onChange={handleChange}
                              />
                              Yes
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="agreement"
                                value="No"
                                checked={formData.agreement === 'No'}
                                onChange={handleChange}
                              />
                              No
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="agreement"
                                value="Dont_know"
                                checked={formData.agreement === 'Dont_know'}
                                onChange={handleChange}
                              />
                              Don’t know
                            </label>
                          </div>
                          {errors.agreement && (
                            <span className={style.errorMessage}>{errors.agreement}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
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

export default ErrorReportingPage;
