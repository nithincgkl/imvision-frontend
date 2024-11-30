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



// Contact Info Boxes Component
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
              <div className={style["contact_banner"]}>
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

              <div className={style["contact_video"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <video autoPlay loop muted playsInline className={style["contact-video"]} >
                        <source src="/assets/videos/about.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style["about_year"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6"><h1>10<sup>+</sup></h1> <h4>YEARS</h4></div>
                    <div className="col-md-6"><p>With more than 10 years of
                      experience, we are the market
                      leader in large LED screens.</p></div>
                  </div>
                </div>
              </div>

              <div className={style["about_three_box"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                    <div className={`${style["box"]} ${style["bg_green"]}`}>
                        <h1>2400 m<sup>2</sup></h1>
                        <p>LED screens in stock for rental, with our flexible
                          cabinets you can choose the size of your screen
                          yourself. We deliver according to your wishes.</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={style["box"]}>
                        <h1>8St</h1>
                        <p>We have mobile screens
                          in sizes 7-28 sq m for quick
                          delivery and easy set up.</p>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className={style["box"]}>
                        <h1>220 m<sup>2</sup></h1>
                        <p>We always have sales stock
                          of LEDs for quick installations.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className={style["about_who_we_are"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">

                  
                  



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