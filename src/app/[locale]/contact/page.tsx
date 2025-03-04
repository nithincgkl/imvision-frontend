'use client'
import React, { Suspense, useEffect, useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { IoChevronDown } from "react-icons/io5";
import { CartProvider } from '@/context/cart-context'; // Import the useCart hook
import { useLocale, useTranslations } from 'next-intl';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import Image from 'next/image';
const Contact: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <ContactPage />
      </Suspense>
    </CartProvider>
  );
};


// New ContactInfoBoxes Component
const ContactInfoBoxes = ({ positions }: any) => {
  const t = useTranslations('contactUs');
  return (
    <div className="container-fluid">
      <div className="row g-4">
        {positions.length > 0 ? (
          positions.map((box: any, index: any) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div className={`${style["card_contact"]} h-full flex flex-col`} style={{ height: '100%', minHeight: '200px' }}>
                <div className="flex flex-col h-full">
                  <h3>{box.department}</h3>
                  <h4>{box.name_and_role}</h4>
                  {box.emails && box.emails.length > 0 && (
                    <p>{box.emails.join(", ")}</p>
                  )}
                  {box.phone_numbers && box.phone_numbers.length > 0 && (
                    <p>{box.phone_numbers.join(", ")}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Something went wrong</p>
        )}
      </div>
    </div>
  );
};

// Main ContactPage Component
const ContactPage = () => {
  const t = useTranslations('contactUs');
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [service, setService] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [footer, setFooter] = useState<any>([])
  const [navigation, setNavigation] = useState<any>([])
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
  const [mainLoader, setMainLoader] = useState(true)
  const [positions, setPositions] = useState<any[]>([]); // Default as an empty array
  const locale = useLocale();
  const [contact, setContact] = useState<any>([])
  
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
      newErrors.Name = `${t("form.validation.nameRequired")}`;
    }

    // Email validation
    if (!email) {
      newErrors.email = `${t("form.validation.emailRequired")}`;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = `${t("form.validation.emailInvalid")}`;
    }

    // Phone validation
    if (!Phone) {
      newErrors.Phone = `${t("form.validation.phoneRequired")}`;
    }

    // Comment validation
    if (!comment) {
      newErrors.comment = `${t("form.validation.commentRequired")}`;
    }

    // Service validation
    if (!service) {
      newErrors.service = `${t("form.validation.serviceRequired")}`;
    }

    // Industry Type validation
    if (!industryType) {
      newErrors.industryType = `${t("form.validation.industryRequired")}`;
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
      const emailData = {
        name: Name,
        email: email,
        phone: Phone,
        service: service,
        industry_type: industryType,
        comments: comment,
      }

      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      enqueueSnackbar(`${t("successToast")}`, { variant: 'success' });

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
          `${t("errorToast")}`;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      } else {
        enqueueSnackbar(`${t("errorToast2")}`, {
          variant: 'error',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  const getPositions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}position?locale=${locale}`);
      const data = response.data.data.map((item: any) => ({
        id: item.id,
        department: item.department,
        name_and_role: item.name_and_role,
        emails: item.emails,
        phone_numbers: item.phone_numbers
      }));
      console.log("position data", data)
      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions:", error);
      setPositions([]);
    }
  };
  const getContactAssets = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}contact-banner?locale=${locale}&populate=*`);
      setContact(response.data.data);
    } catch (error) {
      console.error("Error fetching Contact data:", error);
      setContact([]);
    }
  };
  const fetchNavigation = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}navigation?locale=${locale}&populate=*`);
      setNavigation(response.data);
    } catch (error) {
      console.error("Error fetching navigation data:", error);
      setNavigation([]);
    }
  };
  const fetchFooter = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}footer?locale=${locale}&populate=*`);
      setFooter(response.data);
    } catch (error) {
      console.error("Error fetching footer data:", error);
      setFooter([]);
    }
  };
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setMainLoader(true);
        await Promise.all([getPositions(), getContactAssets(), fetchNavigation(), fetchFooter()]);
        setMainLoader(false);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);
  if (mainLoader) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
      >
        <Loader size={150} />
      </div>
    );
  }
  else if (!contact || contact.content === null || contact.content.form === null || contact.content.get_in_touch === null || contact.content.location.length === 0) {
    return (
      <div>
        <HeaderOne data={navigation.data} />
        <Error></Error>
        <FooterOne data={footer.data} />
      </div>
    )
  }
  else {
    const form = contact.content.form;
    return (
      <Wrapper>
        <HeaderOne data={navigation.data} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>
              <section className={style["contact_section"]}>
                <div className={`container-fluid ${style["contact_section_div"]}`}>
                  <div className={`row align-items-center ${style["contact_section_subdiv"]}`}>
                    <div className="col-12 col-md-6 text-center text-md-start"> {/* Text center on mobile, left on larger screens */}
                      <h1 className={style["contact_heading"]}>{contact.content.get_in_touch.heading}</h1>
                      <p className={style["contact_paragraph"]}>
                        {contact.content.get_in_touch.description}
                      </p>
                    </div>
                    <div className="col-12 col-md-6 text-end">
                      <Image
                        src={contact.side_banner_image.url}
                        width={400}
                        height={400}
                        alt="Contact"
                        className={style["contact_image"]}
                      />
                    </div>
                  </div>
                </div>
                <div className={style["contact_video"]}>
                  <div className="container-fluid">
                  </div>
                </div>
                <div className={style["contact_form_container"]}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className={style["contact_form"]}>
                          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-8">
                            <div className="row">
                              <div className="col-md-12 mb-3">
                                <h2 className='text-center'>{form.heading}</h2>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Name"
                                    className={`form-control ${style.inputField} ${errors.Name ? style.errorInput : ''}`}
                                    placeholder={form.placeHolders.name}
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
                                    type="text" // Changed from "email" to "text"
                                    id="Email"
                                    className={`form-control ${style.inputField} ${errors.email ? style.errorInput : ''}`}
                                    placeholder={form.placeHolders.email}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby="email-error"
                                    autoComplete="off" // Optional: To disable autocomplete suggestions
                                  />
                                  {errors.email && (
                                    <p id="email-error" className={style.error}>
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
                                    type="text" // Still using "text" for complete control
                                    id="Phone"
                                    className={`form-control ${style.inputField} ${errors.Phone ? style.errorInput : ''}`}
                                    placeholder={form.placeHolders.phone}
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} // Only allow numbers
                                    onKeyPress={(e) => {
                                      if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault(); // Block non-numeric characters
                                      }
                                    }}
                                    aria-invalid={errors.Phone ? "true" : "false"}
                                    aria-describedby="Phone-error"
                                  />
                                  {errors.Phone && (
                                    <p id="Phone-error" className={style.error}>
                                      {errors.Phone}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6 mb-3">
                                <div className={style.formControl}>
                                  <div className="position-relative">
                                    <select
                                      className={`form-control ${style.inputField} ${errors.service ? style.errorInput : ''}`}
                                      value={service}
                                      onChange={(e) => setService(e.target.value)}
                                      aria-invalid={errors.service ? "true" : "false"}
                                      aria-describedby="service-error"
                                    >
                                      <option value="">{form.placeHolders.service.default}</option>
                                      <option value="Sale">{form.placeHolders.service.sale}</option>
                                      <option value="Rent">{form.placeHolders.service.rent}</option>
                                      <option value="Career">{form.placeHolders.service.career}</option>
                                      <option value="Other">{form.placeHolders.service.other}</option>
                                    </select>
                                    <IoChevronDown className={style.selectIcon} />
                                  </div>
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
                                  <div className="position-relative">
                                    <select
                                      className={`form-control ${style.inputField} ${errors.industryType ? style.errorInput : ''}`}
                                      value={industryType}
                                      onChange={(e) => setIndustryType(e.target.value)}
                                      aria-invalid={errors.industryType ? "true" : "false"}
                                      aria-describedby="industry-error"
                                    >
                                      <option value="">{form.placeHolders.industry.default}</option>
                                      <option value="Automotive">{form.placeHolders.industry.automotive}</option>
                                      <option value="Retail">{form.placeHolders.industry.retail}</option>
                                      <option value="Government">{form.placeHolders.industry.government}</option>
                                      <option value="Cooperate">{form.placeHolders.industry.corporate}</option>
                                    </select>
                                    <IoChevronDown className={style.selectIcon} />
                                  </div>
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
                                    placeholder={form.placeHolders.comment}
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

                            <div className="text-center">
                              <button
                                type="submit"
                                className={`mt-2 ${style.form_button}`}
                                disabled={isLoading}
                                style={{
                                  opacity: isLoading ? 0.6 : 1,
                                  cursor: isLoading ? "not-allowed" : "pointer"
                                }}
                              >
                                {isLoading ? form.sending : form.send}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style["contact_box"]}>

                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <ContactInfoBoxes positions={positions} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style["contact_map"]}>
                  <div className="container-fluid">
                    <div className="row">
                      {contact.content.location.length > 0 ? (
                        contact.content.location.map((item: any, index: any) => (
                          <div key={index} className="col-md-6">
                            <h4 className='mb-0'>{item.place}</h4>
                            <p>{item.address}</p>
                            <div className="cs_google_map cs_bg" data-src="assets/img/map_img.png">
                              <iframe
                                src={item.map}
                                allowFullScreen={true}></iframe>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Something went wrong</p>
                      )}
                    </div>
                  </div>
                </div>

              </section>


              {/* <LetsTalk /> */}
            </main>
            <FooterOne data={footer.data} />
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default Contact;