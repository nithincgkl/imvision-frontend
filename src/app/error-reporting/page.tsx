'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import axios from 'axios';

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

const ErrorReporting: React.FC = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    let processedValue: string | boolean | File | null = value;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      processedValue = fileInput.files ? fileInput.files[0] : null;
    } else if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement;
      processedValue = checkboxInput.checked; // This should be a boolean
    } else if (name === 'phone') {
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
    } else if (!['Yes', 'No',"Don't know"].includes(formData.serviceAgreement)) {
      newErrors.serviceAgreement = 'Invalid selection for service agreement';
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'You must agree to GDPR consent';
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
  
      console.log('Ticket Data:', ticketData); // Log the ticket data
  
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
      console.log('Form has validation errors');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!formData.file) {
        throw new Error('No file selected');
      }

      // First upload the file
      const documentId = await uploadFile(formData.file);

      // Then create the ticket with the file ID
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
        gdprConsent: false // Reset to boolean
      });

      alert('Error report submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Failed to submit error report. Please try again.');
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
                            <div className="col -md-7">
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
                                      onChange={handleRadioChange}
                                      checked={formData.serviceAgreement === 'Yes'}
                                    />
                                    <label htmlFor="Yes">Yes</label>

                                    <input 
                                      type="radio" 
                                      className={`radio ${style.radio_input}`} 
                                      name="serviceAgreement" 
                                      value="No" 
                                      id="No"
                                      onChange={handleRadioChange}
                                      checked={formData.serviceAgreement === 'No'}
                                    />
                                    <label htmlFor="No">No</label>

                                    <input 
                                      type="radio" 
                                      className={`radio ${style.radio_input_two}`}  
                                      name="serviceAgreement" 
                                      value="Don't know" 
                                      id="Don't know"
                                      onChange={handleRadioChange}
                                      checked={formData.serviceAgreement === "Don't know"}
                                    />
                                    <label htmlFor="Don't know">Don't know</label>
                                  </div>
                                </fieldset>
                                {errors.serviceAgreement && <div className={`text-danger ${style.input_error}`}>{errors.serviceAgreement}</div>}

                                <p><span>(If you do not have a service agreement with IMPROD AB, a cost of SEK 795 per hour will be added for technical support and repair as well as transport.)</span></p>
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
                              <label htmlFor="GDPR">Consent according to GDPR</label>
                              <p>
                                <span>
                                  By using the website/submitting the form, you agree to us<br /> using your
                                  personal data.
                                </span>
                              </p>
                              {errors.gdprConsent && <div className={`text-danger ${style.input_error}`}>{errors.gdprConsent}</div>}
                              {submitError && <div className={`text-danger ${style.submit_error}`}>{submitError}</div>}
                              <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Error Report'}
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
    </Wrapper>
  );
};

export default ErrorReporting;