"use client"
import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FaEye } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'; // Import chevron icons
import { TbPackage } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";


export default function Profilepage() {
    // State to track if the order details are open
    const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [isCanceled, setIsCanceled] = useState(true);
  const [isDelivered, setIsDelivered] = useState(false);

  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeForm, setActiveForm] = useState<string>('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    streetName: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    streetName: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2
        }));
        setCountries(countryNames);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setLoading(false);
      });
  }, []);

  const validateForm = () => {
    const newErrors: any = {};
    let isValid = true;

    // Personal info validation
    if (!formData.name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required.';
    }
    if (!formData.streetName) {
      newErrors.streetName = 'Street name is required.';
    }
    if (!formData.houseNumber) {
      newErrors.houseNumber = 'House number is required.';
    }
    if (!formData.postalCode) {
      newErrors.postalCode = 'Postal code is required.';
    }
    if (!formData.city) {
      newErrors.city = 'City/Town is required.';
    }
    if (!formData.country) {
      newErrors.country = 'Country/Region is required.';
    }

    // Account info validation (Password fields)
    if (activeForm === 'account') {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required.';
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required.';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'New password must be at least 6 characters.';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission logic here
      console.log('Form Submitted:', formData);
    }
  };

  // Handlers for buttons
  const handlePersonalClick = () => setActiveForm('personal');
  const handleOrdersClick = () => setActiveForm('orders');
  const handleAccountClick = () => setActiveForm('account');

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["profile_section"]}>
              <h2 className='my-5 pt-2 d-flex justify-content-center col-12'>Your Profile & Settings</h2>
              
              <div className="container d-flex justify-content-center">
                <div className={`${style.profile_nav} d-flex flex-row gap-3`}>
                  <button
                    onClick={handlePersonalClick}
                    className={activeForm === 'personal' ? style.focused : ''}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 my-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <span className='my-1 ms-1'>Personal</span>
                  </button>

                  <button
                    onClick={handleOrdersClick}
                    className={activeForm === 'orders' ? style.focused : ''}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span className='my-1 ms-1'>Orders</span>
                  </button>

                  <button
                    onClick={handleAccountClick}
                    className={activeForm === 'account' ? style.focused : ''}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <span className='my-1 ms-1'>Account</span>
                  </button>
                </div>
              </div>

              <div className='container my-5'>
                {activeForm === 'personal' && (
                  <form onSubmit={handleSubmit} className={`${style.personal_form}`}>
                    <div className="row ">
                      <div className="col-md-6 mb-3">
                        <label>Name <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${style.inputField}`}
                          placeholder="Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Email <span className='text-danger'>*</span></label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${style.inputField}`}
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Phone <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="phone"
                          className={`form-control ${style.inputField}`}
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Street Name <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="streetName"
                          className={`form-control ${style.inputField}`}
                          placeholder="Street Name"
                          value={formData.streetName}
                          onChange={(e) => setFormData({ ...formData, streetName: e.target.value })}
                        />
                        {errors.streetName && <div className="text-danger">{errors.streetName}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>House Number<span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="houseNumber"
                          className={`form-control ${style.inputField}`}
                          placeholder="House Number"
                          value={formData.houseNumber}
                          onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                        />
                        {errors.houseNumber && <div className="text-danger">{errors.houseNumber}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Postal Code <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="postalCode"
                          className={`form-control ${style.inputField}`}
                          placeholder="Postal Code"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        />
                        {errors.postalCode && <div className="text-danger">{errors.postalCode}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>City/Town <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="city"
                          className={`form-control ${style.inputField}`}
                          placeholder="City/Town"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                        {errors.city && <div className="text-danger">{errors.city}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                      <label>Country/Region <span className='text-danger'>*</span></label>
                      <div className="position-relative">
                        <select
                          name="country"
                          className={`form-control ${style.inputField}`}
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        <IoChevronDown className={style.selectIcon} />
                      </div>
                      {errors.country && <div className="text-danger">{errors.country}</div>}
                    </div>
                    </div>

                    <div className="col-md-12 mb-3 d-flex justify-content-center my-3">
                      <button type="submit" className={style.talk_btn}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 me-2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Update Change
                      </button>
                    </div>
                  </form>
                )}

              {activeForm === 'orders' && (
                    <div className={`${style.orders_form_main}`}>
                      <div className={`${style.orders_form}`}>
                        <p className={`${style.type} mb-0`}>Sale</p>
                        <p className={`${style.order_num} `}>Order Id : 456AWE5</p>
                        <p className={`${style.model} d-md-block d-none`}>IM Series P0.93mm – COB with CCT tech 600×337.5 mm</p>
                        <p className='mb-0 pt-2 align-items-center'>
                          <span className='py-lg-2 px-lg-4 px-md-3 d-md-block d-none'>Shipping</span>
                        </p>
                        <button className='d-md-block d-none'>Cancel Order</button>
                            <h3 className='pt-lg-1 pt-md-3 pt-3' onClick={toggleAccordion}>
                            <span style={{ position: 'relative', display: 'inline-block' }}>
                              {isOpen ? (
                                  <IoChevronUp height={50} width={50}className="pt-lg-2 me-2"/>
                              ) : (
                                  <IoChevronDown height={50} width={50}className="pt-lg-2 me-2"/>
                              )}
                          </span>
                            </h3>
                      </div>

                          {isOpen && (
                            <div className={`${style.orders_form_open} p-4 d-flex flex-column`}>
                              <div className='d-flex flex-md-row flex-column gap-md-4 gap-2'>
                                <img src='/assets/images/career-01.jpg' alt='image' />
                                <div className='gap-0'>
                                  <p className={`${style.model}`}>aspsicon C Slim dbdbdbdSeries 165″...:</p>
                                  <p className={`${style.SEK}`}>SEK 0.00 NOK</p>
                                  <p className={`${style.model}`}>Quantity: 4 | Article code: 435</p>
                                </div>                    
                              </div>
                              <div className={`${style.status_details} p-3 pb-1 d-flex flex-md-row flex-column-reverse gap-lg-5 gap-4`}> 
                                <div className='d-flex flex-column gap-1 my-2' >
                                  <div className={`${style.order_tracker}`}>
                                    <p><span ><TbPackage/></span> Packed</p>
                                  </div>
                                  <div className={`${style.order_tracker}`} style={{
                                      borderLeft: `3px dashed ${isCanceled ? '#505050' : '0CB60F'}`, // Conditional border color
                                      color:`${isCanceled ? 'red' : '0CB60F'}`, // Conditional text color
                                    }}>
                                    <p><span><MdOutlineLocalShipping/></span> cancelled</p>
                                  </div> 
                                  <div className={`${style.order_tracker}`} style={{  borderLeft: `3px dashed ${isDelivered ? '#0CB60F' : '#505050'}`, 
                                      color: `${isDelivered ? '#0CB60F' : '#505050'}`,
                                      paddingBottom: '-20px', height: '30px' }}>
                                    <p><span><CiCircleCheck/></span> Delivered</p>
                                  </div>
                                </div>
                                <div>
                                  <div className={`${style.order_details} mb-0`}>
                                    <p className={`${style.order_details_heading} col-lg-4 col-md-3 col-6`}>Contact no:</p>
                                    <p className='col-12'>+46 0707-7692180</p>
                                  </div>
                                  <div className={`${style.order_details}`}>
                                    <p className={`${style.order_details_heading} col-lg-4 col-md-3 col-8`}>Shipping Address:</p>
                                    <p className='col-12'>Barrgatan 51, Moskosel, 930 86, Sweden</p>
                                  </div>
                                  <div className={`${style.order_details}`}>
                                    <p className={`${style.order_details_heading} col-lg-4 col-md-3 col-6 `}>Grant Total:</p>
                                    <p className='col-12'>SEK 0.00 NOK</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                       </div>
              )}


                {activeForm === 'account' && (
                  <form onSubmit={handleSubmit} className={`${style.accounts_form} justify-content-center`}>
                    <div className={`${style.form_align}`}>
                      <h4>Change Password</h4>

                      {/* Current Password */}
                      <div className="col-xl-6 col-lg-8 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${style.inputField}`}
                            placeholder="Current Password"
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          />
                          <button
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEye /> : <FaEye />}
                          </button>
                        </div>
                        {errors.currentPassword && <div className="text-danger">{errors.currentPassword}</div>}
                      </div>

                      {/* New Password */}
                      <div className="col-xl-6 col-lg-8 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${style.inputField}`}
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          />
                          <button
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEye /> : <FaEye />}
                          </button>
                        </div>
                        {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
                      </div>

                      {/* Confirm Password */}
                      <div className="col-xl-6 col-lg-8 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${style.inputField}`}
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          />
                          <button
                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <FaEye /> : <FaEye />}
                          </button>
                        </div>
                        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                      </div>

                      <div className="col-xl-6 col-lg-8 my-3">
                        <button type="submit" className={style.submit_btn}>Submit</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </section>

            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
}
