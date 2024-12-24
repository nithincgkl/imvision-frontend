"use client";
import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FaEye } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { TbPackage } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import axios from 'axios';


interface ProductImage {
  id: number;
  url: string; // Add the url property
}

interface OrderDetail {
  id: number;
  product_name: string;
  qty: number;
  amount: number;
  product_images: ProductImage[]; // Update to use the new ProductImage interface
  sale_rent: string;
  article_code:string
}


interface DeliveryStatus {
  id: number;
  delivery_status: string;
  status_updated_at: string;
}

interface ShippingAddress {
  City: string;
  CompanyName: string;
  Country: string;
  Email: string;
  FirstName: string;
  HouseNo: string;
  LastName: string;
  Phone: string;
  PostalCode: string;
  Reference: string;
  State: string;
  Street: string;
}

interface Order {
  id: number;
  Reference: string;
  order_details: OrderDetail[];
  ShippingAddress: ShippingAddress;
  DeliveryStatus: DeliveryStatus[];
}

export default function Profilepage() {
  const [isOpen, setIsOpen] = useState<number | null>(null); // Track which order is open
  const toggleAccordion = (orderId: number) => setIsOpen(isOpen === orderId ? null : orderId);
  
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeForm, setActiveForm] = useState<string>('personal');
  
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

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]); // State to hold orders
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false); // Loading state for orders

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryNames = response.data.map((country: any) => ({
          name: country.name.common,
          code: country.cca2
        }));
        setCountries(countryNames);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User may not be logged in.');
      return;
    }
    setLoadingOrders(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}orders?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Orders Response:', response.data);
      if (response.data && response.data.data) {
        console.log('Orders data:', response.data.data);
        setOrders(response.data.data );
      } else {
        console.log('No orders data available.');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

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
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required.';
      isValid = false;
    }
    if (!formData.streetName) {
      newErrors.streetName = 'Street name is required.';
      isValid = false;
    }
    if (!formData.houseNumber) {
      newErrors.houseNumber = 'House number is required.';
      isValid = false;
    }
    if (!formData.postalCode) {
      newErrors.postalCode = 'Postal code is required.';
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = 'City/Town is required.';
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = 'Country/Region is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const token = localStorage.getItem('token');
      const storedUser  = localStorage.getItem('user');
      if (storedUser ) {
        const user = JSON.parse(storedUser );
        const userId = user.documentId;
        if (!token) {
          console.error('No token found. User may not be logged in.');
          return;
        }
        const requestData = {
          user_id: userId,
          FirstName: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Street: formData.streetName,
          HouseNo: formData.houseNumber,
          City: formData.city,
          PostalCode: formData.postalCode,
          Country: formData.country,
        };

        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}update-user-address`, requestData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Error submitting form:', error.response?.data || error.message);
            console.error('Error details:', error.response?.data?.error);
          } else {
            console.error('Unexpected error:', error);
          }
        }
      }
    }
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate new password and confirmation
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.',
      }));
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User may not be logged in.');
      return;
    }

    const requestData = {
      currentPassword: formData.currentPassword,
      password: formData.newPassword,
      passwordConfirmation: formData.confirmPassword,
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/change-password`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error resetting password:', error.response?.data || error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: 'Failed to reset password. Please try again.',
        }));
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const handlePersonalClick = () => setActiveForm('personal');

  const handleOrdersClick = () => {
    setActiveForm('orders');
    fetchOrders();
  };

  const handleAccountClick = () => setActiveForm('account');

  const togglePasswordVisibility = (field: string) => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

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
                  <button onClick={handlePersonalClick} className={activeForm === 'personal' ? style.focused : ''}>
                    Personal
                  </button>
                  <button onClick={handleOrdersClick} className={activeForm === 'orders' ? style.focused : ''}>
                    Orders
                  </button>
                  <button onClick={handleAccountClick} className={activeForm === 'account' ? style.focused : ''}>
                    Account
                  </button>
                </div>
              </div>
              {activeForm === 'personal' && (
                <form onSubmit={handleSubmit} className={`${style.personal_form} justify-content-center container-sm my-5`}>
                  <div className="row">
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
                      {errors .postalCode && <div className="text-danger">{errors.postalCode}</div>}
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
                        {loading ? (
                          <p>Loading countries...</p>
                        ) : (
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
                        )}
                        <IoChevronDown className={style.selectIcon} />
                      </div>
                      {errors.country && <div className="text-danger">{errors.country}</div>}
                    </div>
                  </div>

                  <div className="col-md-12 mb-3 d-flex justify-content-center my-3">
                    <button type="submit" className={style.talk_btn}>
                      Update Change
                    </button>
                  </div>
                </form>
              )}

{activeForm === 'orders' && (
  <div className='d-flex flex-column gap-3 container'>
    <div className={`${style.orders_form_main} gap-5`}>
      {loadingOrders ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No products found.</p>
      ) : (
        orders.map((order) => {
          const totalAmount = order.order_details.reduce((acc, detail) => acc + detail.amount, 0);
          const isCancelled = order.DeliveryStatus.some(status => status.delivery_status === 'CANCELLED');
          const isDelivered = order.DeliveryStatus.some(status => status.delivery_status === 'DELIVERED');
          const isShipped = order.DeliveryStatus.some(status => status.delivery_status === 'SHIPPING');

          const displayedArticleCodes = new Set();

          return (
            <div key={order.id} className={`${style.orders_form} ${isOpen === order.id ? style.ordersFormOpen : ''}`}>
             
             <div className='d-flex col-12'> <p className={`${style.type} mb-0`} style={{backgroundColor: order.order_details[0]?.sale_rent === 'Rent' ? '#5C553A' : '#3F3A5C',}}>{order.order_details[0]?.sale_rent}</p>
              <p className={`${style.order_num}`}>Order Id : {order.id}</p>
              <p className={`${style.model} d-md-block d-none`}>{order.order_details[0]?.product_name}</p>
              <p className='mb-0 pt-2 align-items-center'> 
                <span className='py-lg-2 px-lg-4 px-md-3 d-md-block d-none'>
                  {order.DeliveryStatus.length > 0 ? order.DeliveryStatus[0].delivery_status : 'No delivery status available'}
                </span>
              </p>
              <button className='d-md-block d-none'>Cancel Order</button>
              <h3 className='pt-lg-1 pt-md-3 pt-3' onClick={() => toggleAccordion(order.id)}>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  {isOpen === order.id ? (
                    <IoChevronUp height={50} width={50} className="pt-lg-2 me-2" />
                  ) : (
                    <IoChevronDown height={50} width={50} className="pt-lg-2 me-2" />
                  )}
                </span>
              </h3>
              </div>

              {isOpen === order.id && (
                <div className={`${style.orders_form_open} p-4 d-flex flex-column`}>
         <div className="d-flex flex-column gap-md-4 gap-2">
  {order.order_details.map((detail: OrderDetail) => (
    <div key={detail.id} className="d-flex flex-md-row flex-column">
      {Array.isArray(detail.product_images) && detail.product_images.length > 0 && (
        <img
          src={detail.product_images[0]?.url}
          alt={detail.product_name}
          className={style.productImage}
        />
      )}
      <div className="d-flex flex-column ">
      <p className={`${style.model}`}>{detail.product_name}:</p>
          <p className={`${style.SEK}`}>SEK {detail.amount} NOK</p>
         <p className={`${style.model}`}>Quantity: {detail.qty} | Article code: {detail.article_code}</p>       
      </div>
    </div>
  ))}
</div>

                  <div className={`${style.status_details} p-3 pb-1 d-flex flex-md-row flex-column-reverse gap-lg-5 gap-4 my-2`}>
                    <div className='d-flex flex-column gap-1 my-2'>
                      <div className={`${style.order_tracker}`}  style={{
                        borderLeft: `3px dashed ${isShipped ? '#0CB60F' : '#505050'}`,
                        color: `${isShipped ? '#0CB60F' : '#505050'}`,
                      }}>
                        <p><span><TbPackage /></span> Packed
                        </p>
                      </div>
                      <div className={`${style.order_tracker}`} style={{
                        borderLeft: `3px dashed ${isShipped ? '#0CB60F' : '#505050'}`,
                        color: `${isShipped ? '#0CB60F' : isCancelled ? 'red' : '#505050'}`,
                      }}>
                        <p><span><MdOutlineLocalShipping /></span> {isCancelled ? 'Cancelled' : 'Shipping'}

                        </p>
                      </div>
                      <div className={`${style.order_tracker}`} style={{
                        borderLeft: `3px dashed ${isDelivered ? '#0CB60F' : '#505050'}`,
                        color: `${isDelivered ? '#0CB60F' : '#505050'}`,
                      }}>
                        <p><span><CiCircleCheck /></span>Delivered
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className={`${style.order_details} mb-0`}>
                        <p className={`${style.order_details_heading} ms-0`}>Contact no:</p>
                        <p className={`${style.order_fill}`}>{order.ShippingAddress.Phone}</p>
                      </div>
                      <div className={`${style.order_details}`}>
                        <p className={`${style.order_details_heading} ms-3 ms-md-0`}>Shipping Address:</p>
                        <p className={`${style.order_address}`} >
                          {order.ShippingAddress.Street}, {order.ShippingAddress.City}, {order.ShippingAddress.State}, {order.ShippingAddress.PostalCode}, {order.ShippingAddress.Country}
                        </p>
                      </div>
                      <div className={`${style.order_details}`}>
                        <p className={`${style.order_details_heading}`}>Total Amount:</p>
                        <p className={`${style.order_fill}`}>SEK {totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  </div>
)}


              {activeForm === 'account' && (
                <form onSubmit={handleAccountSubmit} className={`${style.accounts_form} justify-content-center container-sm my-5`}>
                  <div className={`${style.form_align}`}>
                    <h4>Change Password</h4>
                    {/* Current Password */}
                    <div className="col-xl-6 col-lg-8 mb-3">
                      <div className={style.formControl}>
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          className={`form-control ${style.inputField}`}
                          placeholder="Current Password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        />
                        <button
                          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                          type="button"
                          onClick={() => togglePasswordVisibility('current')}
                        >
                          {showCurrentPassword ? <FaEye /> : <FaEye />}
                        </button>
                      </div>
                      {errors.currentPassword && <div className="text-danger">{errors.currentPassword}</div>}
                    </div>
                    {/* New Password */}
                    <div className="col-xl-6 col-lg-8 mb-3">
                      <div className={style.formControl}>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          className={`form-control ${style.inputField}`}
                          placeholder="New Password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        />
                        <button
                          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                          type="button"
                          onClick={() => togglePasswordVisibility('new')}
                        >
                          {showNewPassword ? <FaEye /> : <FaEye />}
                        </button>
                      </div>
                      {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
                    </div>
                    {/* Confirm Password */}
                    <div className="col-xl-6 col-lg-8 mb-3">
                      <div className={style.formControl}>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className={`form-control ${style.inputField}`}
                          placeholder="Confirm New Password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        <button
                          className={`absolute inset-y-0 right-0 pr-3 flex items-center ${style.eye_button}`}
                          type="button"
                          onClick={() => togglePasswordVisibility('confirm')}
                        >
                          {showConfirmPassword ? <FaEye /> : <FaEye />}
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
            </section>
            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
}