'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ContactArea from '@/components/contact/ContactArea';
import LetsTalk from '@/components/home/lets-talk';

// New ContactInfoBoxes Component
const ContactInfoBoxes = () => {
  const boxData = [
    {
      title: "CEO",
      subtitle: "Ivan Martic",
      description: "ivan@imvision.se <br /> +46 73 913 01 29 <br />+46 10 330 46 36"
    },
    {
      title: "Sales",
      subtitle: "Ivan Martic",
      description: "ivan@imvision.se <br /> 076 -307 22 25"
    },
    {
      title: "Rental",
      subtitle: "Jonas Möller - Salesperson",
      description: "jonas@imvision.se <br /> 073 -97 77 614"
    },
    {
      title: "Warehouse",
      subtitle: "Jönköping Dragan Martic - Logistik",
      description: "dragan@imvision.se <br /> 010-330 46 36"
    },
    {
      title: "Support",
      subtitle: "Simon Ljunggren - Service manager",
      description: "simon@imvision.se <br /> 010-330 46 36"
    },
    {
      title: "Finance",
      subtitle: "Ivan Martic",
      description: "info@imvision.se"
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {boxData.map((box, index) => (
          <div key={index} className="col-md-4 col-sm-6">
            <div className={style["card_contact"]}>
              <div className="card-body p-4">
                <h3>{box.title}</h3>
                <h4>{box.subtitle}</h4>
                <p dangerouslySetInnerHTML={{ __html: box.description }} />
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
    service?: string;
    industryType?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const validateForm = () => {
    const newErrors: {
      Name?: string;
      email?: string; 
      Phone?: string;
      comment?: string;
      service?: string;
      industryType?: string;
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

    // Service validation
    if (!service) {
      newErrors.service = 'Please select a service';
    }

    // Industry Type validation
    if (!industryType) {
      newErrors.industryType = 'Please select an industry type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}contact-uses`,
        {
          data: {
            name: Name,
            email: email,
            phone: Phone,
            service: service,
            industry_type: industryType,
            comments: comment,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        }
      );

      enqueueSnackbar('Message sent successfully!', { variant: 'success' });

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setIndustryType('');
      setComment('');
    } catch (error) {
      console.error('Error submitting the form:', error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          'Failed to send the message. Please try again.';
        enqueueSnackbar(errorMessage, { variant: 'error' });
      } else {
        enqueueSnackbar('An unexpected error occurred. Please try again.', {
          variant: 'error',
        });
      }
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

              <div  className={style["contact_banner"]}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-8">
                    <h1 className={style.pageTitle}>Get in Touch<br />
                      With Us</h1>
                  </div>
                  <div className="col-md-4">
                    <p>Are you ready to make the leap to the ultimate innovation in LED technology?<br />
                      Leave your contact details and our sales team will help you take the first step to discover the power of LED technology in sales & rental.</p>
                  </div>
                </div>
              </div>
              </div>

              <div  className={style["contact_video"]}>
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
              </div>

              <div  className={style["contact_form_container"]}>
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
                                className={`form-control ${style.inputField} ${errors.service ? style.errorInput : ''}`}
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                aria-invalid={errors.service ? "true" : "false"}
                                aria-describedby="service-error"
                              >
                                <option value="">Select Service *</option>
                                <option value="Sale">Sale</option>
                                <option value="Rent">Rent</option>
                                <option value="Career">Career</option>
                                <option value="Other">Other</option>
                              </select>
                              {errors.service && (
                                <p
                                  id="service-error"
                                  className={style.error}
                                >
                                  {errors.service}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className={style.formControl}>
                              <select
                                className={`form-control ${style.inputField} ${errors.industryType ? style.errorInput : ''}`}
                                value={industryType}
                                onChange={(e) => setIndustryType(e.target.value)}
                                aria-invalid={errors.industryType ? "true" : "false"}
                                aria-describedby="industry-error"
                              >
                                <option value="">Industry Type *</option>
                                <option value="Automotive">Automotive</option>
                                <option value="Retail">Retail</option>
                                <option value="Government">Government</option>
                                <option value="Cooperate">Cooperate</option>
                              </select>
                              {errors.industryType && (
                                <p
                                  id="industry-error"
                                  className={style.error}
                                >
                                  {errors.industryType}
                                </p>
                              )}
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
              </div>

              <div  className={style["contact_box"]}>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <ContactInfoBoxes />
                  </div>
                </div>
              </div>
              </div>

              <div  className={style["contact_map"]}>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className='mb-0'>Jönköping</h4>
                  <p>Herkulesvägen 56, 553 02 Jönköping</p>
                    <div className="cs_google_map cs_bg" data-src="assets/img/map_img.png">
                    
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.7486218071434!2d14.155522576560296!3d57.78195697282992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a0441ba937bc7%3A0x8c3d50363d781860!2sHerkulesv%C3%A4gen%2056%2C%20553%2002%20J%C3%B6nk%C3%B6ping!5e0!3m2!1sen!2sse!4v1701193248347!5m2!1sen!2sse"
                        allowFullScreen={true}></iframe>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div  className={style["mb_pt_2"]}>
                  <h4 className='mb-0'>Stockholm</h4>
                  <p>Skeppargatan 11, 114 52 Stockholm</p>
                    <div className="cs_google_map cs_bg" data-src="assets/img/map_img.png">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2036.2497134455126!2d18.07935507656016!3d59.33554217283708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d7aadf71dcf%3A0xbd49b70c41faf7f3!2sSkeppargatan%2011%2C%20114%2052%20Stockholm!5e0!3m2!1sen!2sse!4v1701193348944!5m2!1sen!2sse"
                        allowFullScreen={true}></iframe>
                    </div>
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

export default ContactPage;