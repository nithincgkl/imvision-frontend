'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";

// New ContactInfoBoxes Component
const ContactInfoBoxes = () => {
  const boxData = [
    {
      title: "Sales Inquiries",
      description: "Get personalized solutions for your LED technology needs. Our sales team is ready to assist you."
    },
    {
      title: "Technical Support",
      description: "Comprehensive support for all your LED display and rental equipment. We're here to help."
    },
    {
      title: "Rental Services",
      description: "Flexible LED display rentals for events, conferences, and corporate gatherings. Tailored to your needs."
    },
    {
      title: "Custom Solutions",
      description: "Innovative LED technologies designed specifically for your industry and unique requirements."
    },
    {
      title: "Training & Workshops",
      description: "Learn from experts about LED technology, installation, and best practices for maximum impact."
    },
    {
      title: "After-Sales Service",
      description: "Ongoing maintenance, warranty support, and expert advice to ensure your LED solutions perform perfectly."
    }
  ];

  return (
    <div className="container-fluid py-5">
      <div className="row g-4">
        {boxData.map((box, index) => (
          <div key={index} className="col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm border-0 transform transition duration-300 hover:scale-105">
              <div className="card-body p-4 text-center">
                <h3 className="card-title mb-3 font-semibold text-xl">{box.title}</h3>
                <p className="card-text text-gray-600">{box.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main ContactPage Component
const ContactPage = () => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [service, setService] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [errors, setErrors] = useState<{
    Name?: string;
    email?: string;
    Phone?: string;
    comment?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {
      Name?: string;
      email?: string;
      Phone?: string;
      comment?: string;
    } = {};

    // Name validation
    if (!Name) {
      newErrors.Name = 'Name is required';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone validation
    if (!Phone) {
      newErrors.Phone = 'Phone number is required';
    }

    // Comment validation
    if (!comment) {
      newErrors.comment = 'Comment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // TODO: Implement actual form submission logic
      console.log('Form submitted with:', { 
        Name, 
        email, 
        Phone, 
        comment, 
        service, 
        industryType 
      });
      
      // Handle successful submission
      // Optionally reset form or show success message
    } catch (error) {
      // Handle submission error
      console.error('Form submission failed:', error);
      setErrors(prevErrors => ({
        ...prevErrors,
        comment: 'Form submission failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["contact_section"]}>
              <div className="container-fluid py-5">
                <div className="row">
                  <div className="col-8">
                    <h1 className={style.pageTitle}>Get in Touch<br />
                      With Us</h1>
                  </div>
                  <div className="col-4">
                    <p>Are you ready to make the leap to the ultimate innovation in LED technology?<br />
                      Leave your contact details and our sales team will help you take the first step to discover the power of LED technology in sales & rental.</p>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <video autoPlay loop muted playsInline className={style["contact-video"]} >
                      <source src="/assets/videos/contact.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className={style["contact_form"]}>
                      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-8">
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <h2 className='text-center'>Send a Message</h2>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className={style.formControl}>
                              <input
                                type="text"
                                id="Name"
                                className={`form-control ${style.inputField} ${errors.Name ? style.errorInput : ''}`}
                                placeholder="Name*"
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                                aria-invalid={errors.Name ? "true" : "false"}
                                aria-describedby="Name-error"
                              />
                              {errors.Name && (
                                <p 
                                  id="Name-error" 
                                  className={style.error}
                                >
                                  {errors.Name}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6 mb-3">
                            <div className={style.formControl}>
                              <input
                                type="email"
                                id="Email"
                                className={`form-control ${style.inputField} ${errors.email ? style.errorInput : ''}`}
                                placeholder="Email*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby="email-error"
                              />
                              {errors.email && (
                                <p 
                                  id="email-error" 
                                  className={style.error}
                                >
                                  {errors.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className={style.formControl}>
                              <input
                                type="text"
                                id="Phone"
                                className={`form-control ${style.inputField} ${errors.Phone ? style.errorInput : ''}`}
                                placeholder="Phone*"
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                                aria-invalid={errors.Phone ? "true" : "false"}
                                aria-describedby="Phone-error"
                              />
                              {errors.Phone && (
                                <p 
                                  id="Phone-error" 
                                  className={style.error}
                                >
                                  {errors.Phone}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6 mb-3">
                            <div className={style.formControl}>
                              <select 
                                className={`form-control ${style.inputField}`}
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                              >
                                <option value="">Select Service</option>
                                <option value="service1">Sale</option>
                                <option value="service2">Rent</option>
                                <option value="service3">Career</option>
                                <option value="service4">Other</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className={style.formControl}>
                              <select 
                                className={`form-control ${style.inputField}`}
                                value={industryType}
                                onChange={(e) => setIndustryType(e.target.value)}
                              >
                                <option value="">Industry Type</option>
                                <option value="type1">Automotive</option>
                                <option value="type2">Retail</option>
                                <option value="type3">Government</option>
                                <option value="type3">Cooperate</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-md-6 mb-3">
                            <div className={style.formControl}>
                              <input
                                type="text"
                                id="comment"
                                className={`form-control ${style.inputField} ${errors.comment ? style.errorInput : ''}`}
                                placeholder="Comment*"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                aria-invalid={errors.comment ? "true" : "false"}
                                aria-describedby="comment-error"
                              />
                              {errors.comment && (
                                <p 
                                  id="comment-error" 
                                  className={style.error}
                                >
                                  {errors.comment}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          className={`mt-2 ${style.form_button}`}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Sending...' : 'Send Message'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Replaced Box_6 with ContactInfoBoxes component */}
              <div className="container-fluid py-5">
                <div className="row">
                  <div className="col-12">
                    <ContactInfoBoxes />
                  </div>
                </div>
              </div>

            </section>
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactPage;