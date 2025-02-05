'use client';
import React, { useState, ChangeEvent, FormEvent, useRef, Suspense } from 'react';
import Image from 'next/image';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import axios from 'axios';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';

const ErrorReporting: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <ErrorReportings />
      </Suspense>
    </CartProvider>
  );
};


// Define the shape of the form data
interface FormData {
  name: string;
  address: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  file: File | null;
  serviceAgreement: string; // This will hold "Yes", "No", or "Dont_know"
  gdprConsent: boolean; // Changed to boolean
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

const ErrorReportings: React.FC = () => {
  const t = useTranslations('errorReporting');
  const fileInputRef = useRef<HTMLInputElement>(null); // Add a ref for the file input
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    file: null,
    serviceAgreement: '', // Initialize as an empty string
    gdprConsent: false // Initialize as a boolean
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let processedValue: string | boolean | File | null = value;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;

      if (file) {
        const maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes
        if (file.size > maxFileSize) {
          setErrors(prevErrors => ({
            ...prevErrors,
            file: `${t("fileSize")}`,
          }));
          setFormData(prev => ({
            ...prev,
            file: null,
          }));
          fileInput.value = ''; // Clear the file input
          return; // Stop further processing if the file is too large
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            file: '',
          }));
        }
      }
      processedValue = file;
    } else if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement;
      processedValue = checkboxInput.checked; // This should be a boolean
    } else if (name === 'phone') {
      processedValue = value.replace(/\D/g, '');
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: processedValue,
    }));

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Update the serviceAgreement based on the selected radio button
    }));

    // Clear specific field error when user selects an option
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
      newErrors.name = `${t("form.validation.nameRequired")}`;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = `${t("form.validation.invalidName")}`;
    }

    if (!formData.address.trim()) {
      newErrors.address = `${t("form.validation.addressRequired")}`;
    }

    if (!formData.email.trim()) {
      newErrors.email = `${t("form.validation.emailRequired")}`;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = `${t("form.validation.emailInvalid")}`;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = `${t("form.validation.phoneRequired")}`;
    }

    if (!formData.company.trim()) {
      newErrors.company = `${t("form.validation.companyRequired")}`;
    }

    if (!formData.message.trim()) {
      newErrors.message = `${t("form.validation.messageRequired")}`;
    }

    if (!formData.file) {
      newErrors.file = `${t("form.validation.file")}`;
    }

    if (!formData.serviceAgreement) {
      newErrors.serviceAgreement = `${t("form.validation.serviceAgreement")}`;
    } else if (!['Yes', 'No', "Don't know"].includes(formData.serviceAgreement)) {
      newErrors.serviceAgreement = `${t("form.validation.invalidServiceAgreement")}`;
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = `${t("form.validation.gdprConsent")}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}upload`, formData, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      });

      return response.data[0].id; // Assuming the API returns the file ID
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  };

  const createTicket = async (documentId: string) => {
    try {
      // Transform the service agreement value to match API expectations
      const transformServiceAgreement = (value: string): string => {
        switch (value) {
          case "Don't know":
            return "Don't Know";  // Transform to match API expectation
          default:
            return value;  // Keep Yes and No as is
        }
      };
      const ticketData = {
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.company,
          address: formData.address,
          issue: formData.message,
          service_agreement_improd_ab: transformServiceAgreement(formData.serviceAgreement),
          document: documentId
        }
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}tickets`, ticketData, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
      });

      return response.data; // Assuming the API returns the created ticket data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Ticket creation error:', error.response.data);
        throw new Error(error.response.data.message || 'Failed to create ticket');
      } else {
        console.error('Ticket creation error:', error);
        throw new Error('Failed to create ticket');
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
    setSubmitError(null);
  
    try {
      if (!formData.file) {
        throw new Error('No file selected');
      }
  
      // Upload file and create ticket in sequence using Promise.all
      const [documentId] = await Promise.all([
        uploadFile(formData.file),
      ]);
  
      await createTicket(documentId);
  
      // Reset form after successful submission
      setFormData({
        name: '',
        address: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        file: null,
        serviceAgreement: '',
        gdprConsent: false,
      });
  
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
  
      // Clear errors and set success state
      setErrors({});
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(`${t("error")}`);
    } finally {
      setIsSubmitting(false);
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
                      <h1 className={style.pageTitle}>{t("heading")}</h1>
                    </div>
                    <div className="col-md-4">
                      <p>{t("para1")}</p>
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
                                placeholder={t("form.placeHolders.name")}
                              />
                              {errors.name && <div className={`text-danger ${style.input_error}`}>{errors.name}</div>}
                            </div>
                            <div className="col -md-7">
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`form-control ${style.inputField} ${errors.address ? 'is-invalid' : ''}`}
                                placeholder={t("form.placeHolders.address")}
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
                                placeholder={t("form.placeHolders.email")}
                              />
                              {errors.email && <div className={`text-danger ${style.input_error}`}>{errors.email}</div>}

                              <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`form-control ${style.inputField} ${errors.phone ? 'is-invalid' : ''}`}
                                placeholder={t("form.placeHolders.phone")}
                                pattern="\d*"
                              />
                              {errors.phone && <div className={`text-danger ${style.input_error}`}>{errors.phone}</div>}

                              <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className={`form-control ${style.inputField} ${errors.company ? 'is-invalid' : ''}`}
                                placeholder={t("form.placeHolders.company")}
                              />
                              {errors.company && <div className={`text-danger ${style.input_error}`}>{errors.company}</div>}
                            </div>
                            <div className="col-md-7">
                              <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`form-control ${style.textareaField} ${errors.message ? 'is-invalid' : ''}`}
                                placeholder={t("form.placeHolders.description")}
                              />
                              {errors.message && <div className={`text-danger ${style.textarea_error}`}>{errors.message}</div>}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-5">
                              <div className={style["dot_box"]}>
                                <p>{t("form.placeHolders.docHeading")}</p>
                                <input
                                  type="file"
                                  name="file"
                                  onChange={handleChange}
                                  ref={fileInputRef}
                                  className={`form-control ${style.inputField} ${errors.file ? 'is-invalid' : ''}`}
                                  placeholder={t("form.placeHolders.upload")}
                                />
                                {errors.file && <div className={`text-danger ${style.input_error}`}>{errors.file}</div>}
                                <p><span>{t("form.placeHolders.docDesc")}</span></p>
                              </div>
                            </div>

                            <div className="col-md-7">
                              <div className={style["dot_box"]}>
                                <p>{t("form.placeHolders.serviceHeading")}</p>

                                <fieldset>
                                  <div className={style.fieldset_radio}>
                                    <input
                                      type="radio"
                                      className="radio"
                                      name="serviceAgreement"
                                      value="Yes"
                                      id="Yes"
                                      onChange={handleRadioChange}
                                      checked={formData.serviceAgreement === 'Yes'}
                                    />
                                    <label htmlFor="Yes">{t("form.placeHolders.yes")}</label>

                                    <input
                                      type="radio"
                                      className={`radio ${style.radio_input}`}
                                      name="serviceAgreement"
                                      value="No"
                                      id="No"
                                      onChange={handleRadioChange}
                                      checked={formData.serviceAgreement === 'No'}
                                    />
                                    <label htmlFor="No">{t("form.placeHolders.no")}</label>

                                    <input
                                      type="radio"
                                      className={`radio ${style.radio_input_two}`}
                                      name="serviceAgreement"
                                      value="Don't know"
                                      id="Don't know"
                                      onChange={handleRadioChange}
                                      checked={formData.serviceAgreement === "Don't know"}
                                    />
                                    <label htmlFor="Don't know">{t("form.placeHolders.dontKnow")}</label>
                                  </div>
                                </fieldset>
                                {errors.serviceAgreement && <div className={`text-danger ${style.input_error}`}>{errors.serviceAgreement}</div>}

                                <p><span>{t("form.placeHolders.agreementDesc")}</span></p>
                              </div>
                            </div>
                          </div>

                          < div className={style["error_form_footer"]}>
                            <div className={style["error_form_footer_inner"]}>
                              <input
                                type="checkbox"
                                id="GDPR"
                                name="gdprConsent"
                                checked={formData.gdprConsent}
                                onChange={handleChange}
                                className={style["custom_checkbox"]}
                              />
                              <label htmlFor="GDPR">{t("form.placeHolders.consent")}</label>
                              <p>
                                <span>
                                  {t("form.placeHolders.consentDesc")}<br /> {t("form.placeHolders.consentDesc2")}
                                </span>
                              </p>
                              {errors.gdprConsent && <div className={`text-danger ${style.input_error}`}>{errors.gdprConsent}</div>}
                              {submitError && <div className={`text-danger ${style.submit_error}`}>{submitError}</div>}
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                  opacity: isSubmitting ? 0.6 : 1,
                                  cursor: isSubmitting ? "not-allowed" : "pointer",
                                }}
                              >
                                {isSubmitting ? t("form.placeHolders.sending") : t("form.placeHolders.send")}
                              </button>

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
      {isSuccess && (
        <div className={style.modal}>
          <div className={style.modal_content}>
            <button
              type="button"
              className={style.close_btn}
              onClick={() => setIsSuccess(false)}
            >
              <Image
                src="/assets/images/close.svg"
                alt="close"
                width={17}
                height={17}
                priority
              />
            </button>
            <div className="thanks-icon">
              <Image
                src="/assets/gif/success.gif"
                alt="Displays"
                width={120}
                height={120}
                priority
              />
            </div>
            <h1 className={style["header-text"]}>{t("thanks")}</h1>
            <p className={style["sub-text"]}>{t("subtext")}</p>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ErrorReporting;