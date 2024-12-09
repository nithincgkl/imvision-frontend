'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FiDownload } from "react-icons/fi";

// Define the shape of the form data
interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  file: File | null;
  serviceAgreement: string;
  gdprConsent: boolean;
}

// Define the shape of the errors object
interface FormErrors {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  file?: string;
  serviceAgreement?: string;
  gdprConsent?: string;
}

const RentalConditions: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    file: null,
    serviceAgreement: '',
    gdprConsent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let processedValue: string | boolean | File | null = value;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      processedValue = fileInput.files ? fileInput.files[0] : null;
    } else if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement;
      processedValue = checkboxInput.checked;
    } else if (name === 'phone') {
      // Allow only numeric values for phone
      processedValue = value.replace(/\D/g, '');
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: processedValue
    }));

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company / Business Name is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Describe your matter as carefully as possible is required';
    }

    if (!formData.file) {
      newErrors.file = 'Please upload a document';
    }

    if (!formData.serviceAgreement) {
      newErrors.serviceAgreement = 'Please select an option';
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'You must agree to GDPR consent';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
    } else {
      console.log('Form has validation errors');
    }
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
                        <form onSubmit={handleSubmit} noValidate>
                          <div className="row">
                            <div className="col-md-5">
                              <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-control ${style.inputField} ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Your Name*" 
                              />
                              {errors.name && <div className={`text-danger ${style.input_error}`}>{errors.name}</div>}
                            </div>
                            <div className="col-md-7">
                              <input 
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`form-control ${style.inputField} ${errors.address ? 'is-invalid' : ''}`}
                                placeholder="Address*" 
                              />
                              {errors.address && <div className={`text-danger ${style.input_error}`}>{errors.address}</div>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-5">
                              <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-control ${style.inputField} ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Email*" 
                              />
                              {errors.email && <div className={`text-danger ${style.input_error}`}>{errors.email}</div>}

                              <input 
  type="text"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  className={`form-control ${style.inputField} ${errors.phone ? 'is-invalid' : ''}`}
  placeholder="Phone*" 
  pattern="\d*"
/>
                              {errors.phone && <div className={`text-danger ${style.input_error}`}>{errors.phone}</div>}

                              <input 
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className={`form-control ${style.inputField} ${errors.company ? 'is-invalid' : ''}`}
                                placeholder="Company / Business Name*" 
                              />
                              {errors.company && <div className={`text-danger ${style.input_error}`}>{errors.company}</div>}
                            </div>
                            <div className="col-md-7">
                              <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`form-control ${style.textareaField} ${errors.message ? 'is-invalid' : ''}`}
                                placeholder='Describe your matter as carefully as possible, enter room number or similar*'
                              />
                              {errors.message && <div className={`text-danger ${style.textarea_error}`}>{errors.message}</div>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-5">
                              <div className={style["dot_box"]}>
                                <p>Please attach any relevant documents</p>
                                <input
                                  type="file"
                                  name="file"
                                  onChange={handleChange}
                                  className={`form-control ${style.inputField} ${errors.file ? 'is-invalid' : ''}`}
                                  placeholder="Upload Documents"
                                />
                                {errors.file && <div className={`text-danger ${style.input_error}`}>{errors.file}</div>}
                                <p><span>(Images or files that may help us better understand and resolve the issue.)</span></p>
                              </div>
                            </div>

                            <div className="col-md-7">
                              <div className={style["dot_box"]}>
                                <p>Do you have a service agreement with IMPROD AB?</p>

                                <fieldset>
                                  <div className={style.fieldset_radio}>
                                    <input 
                                      type="radio" 
                                      className="radio" 
                                      name="serviceAgreement" 
                                      value="Yes" 
                                      id="Yes"
                                      onChange={handleChange}
                                      checked={formData.serviceAgreement === 'Yes'}
                                    />
                                    <label htmlFor="Yes">Yes</label>

                                    <input 
                                      type="radio" 
                                      className={`radio ${style.radio_input}`} 
                                      name="serviceAgreement" 
                                      value="No" 
                                      id="No"
                                      onChange={handleChange}
                                      checked={formData.serviceAgreement === 'No'}
                                    />
                                    <label htmlFor="No">No</label>

                                    <input 
                                      type="radio" 
                                      className={`radio ${style.radio_input_two}`}  
                                      name="serviceAgreement" 
                                      value="Dont_know" 
                                      id="Dont_know"
                                      onChange={handleChange}
                                      checked={formData.serviceAgreement === 'Dont_know'}
                                    />
                                    <label htmlFor="Dont_know">Don't know</label>
                                  </div>
                                </fieldset>
                                {errors.serviceAgreement && <div className={`text-danger ${style.input_error}`}>{errors.serviceAgreement}</div>}

                                <p><span>(If you do not have a service agreement with IMPROD AB, a cost of SEK 795 per hour will be added for technical support and repair as well as transport.)</span></p>
                              </div>
                            </div>
                          </div>

                          <div className={style["error_form_footer"]}>
                            <div className={style["error_form_footer_inner"]}>
                              <input 
                                type="checkbox" 
                                id="GDPR" 
                                name="gdprConsent" 
                                checked={formData.gdprConsent}
                                onChange={handleChange}
                                className={style["custom_checkbox"]} 
                              />
                              <label htmlFor="GDPR">Consent according to GDPR</label>
                              <p>
                                <span>
                                  By using the website/submitting the form, you agree to us<br /> using your
                                  personal data.
                                </span>
                              </p>
                              {errors.gdprConsent && <div className={`text-danger ${style.input_error}`}>{errors.gdprConsent}</div>}
                              <button type="submit">Send Error Report</button>
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