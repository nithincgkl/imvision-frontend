"use client";
import React, { useState, useEffect, Suspense } from 'react';
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
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useSnackbar } from "notistack";
import { useLocale, useTranslations } from 'next-intl';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

const Profile: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <Page />
      </Suspense>
    </CartProvider>
  );
};

interface OrderDetail {
  id: number;
  product_name: string;
  qty: number;
  amount: number;
  product_images: string; // Update to use the new ProductImage interface
  sale_rent: string;
  article_code: string
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


const Page: React.FC = () => {
  const t = useTranslations('profile');
  const [isOpen, setIsOpen] = useState<number | null>(null); // Track which order is open
  const toggleAccordion = (orderId: number) => setIsOpen(isOpen === orderId ? null : orderId);

  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeForm, setActiveForm] = useState<string>('personal');
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const { enqueueSnackbar } = useSnackbar();
  const locale = useLocale();
  const [footer, setFooter] = useState<any>([])
  const [letsTalk, setLetsTalk] = useState<any>([])
  const [navigation, setNavigation] = useState<any>([])
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profile,setProfile] =  useState<any>([])

  const [orders, setOrders] = useState<Order[]>([]); // State to hold orders
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false); // Loading state for orders

  useEffect(() => {
    // Simulating fetching the user address from localStorage
    const userAddressString = localStorage.getItem("userData");
    if (userAddressString) {
      const userAddress = JSON.parse(userAddressString);

      // Populate the formData with userAddress
      setFormData({
        name: `${userAddress.FirstName || ''} ${userAddress.LastName || ''}`.trim(),
        email: userAddress.Email || '',
        phone: userAddress.Phone || '',
        streetName: userAddress.Street || '',
        houseNumber: userAddress.HouseNo || '',
        postalCode: userAddress.PostalCode || '',
        city: userAddress.City || '',
        country: userAddress.Country || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, []);
  const fetchLetsTalk = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}let-us-talk?locale=${locale}&populate=*`);
      setLetsTalk(response.data);
    } catch (error) {
      console.error("Error fetching Let's Talk data:", error);
      setLetsTalk([]);
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
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}profile?locale=${locale}&populate=*`);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setProfile([]);
    }
  };
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
    }
  };
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true); // Start loader before fetching
            await Promise.all([fetchCountries(),fetchNavigation(),fetchLetsTalk(),fetchFooter(),fetchProfile()]);
            setLoading(false); // Stop loader once all APIs complete
          };
          fetchData();
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
        setOrders(response.data.data);
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
  const validation = profile?.data?.content?.update?.validation
  const validateForm = () => {
    const newErrors: any = {};
    let isValid = true;

    // Personal info validation
    if (!formData.name) {
      newErrors.name = `${validation?.nameRequired}`;
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = `${validation?.emailRequired}`;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = `${validation?.emailInvalid}`;
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = `${validation?.phoneRequired}`;
      isValid = false;
    }
    if (!formData.streetName) {
      newErrors.streetName = `${validation?.streetRequired}`;
      isValid = false;
    }
    if (!formData.houseNumber) {
      newErrors.houseNumber = `${validation?.houseRequired}`;
      isValid = false;
    }
    if (!formData.postalCode) {
      newErrors.postalCode = `${validation?.postalRequired}`;
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = `${validation?.cityRequired}`;
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = `${validation?.countryRequired}`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (!token) {
          console.error('No token found. User may not be logged in.');
          return;
        }
        const requestData = {
          FirstName: formData.name,
          Email: formData.email,
          Phone: Number(formData.phone),
          Street: formData.streetName,
          HouseNo: formData.houseNumber,
          City: formData.city,
          PostalCode: formData.postalCode,
          Country: formData.country,
          LastName: user.LastName,
          State: user.State,
          CompanyName: user.CompanyName,
          Reference: user.Reference,
        };
        console.log(requestData)
        try {
          setIsUpdating(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}update-user-address`,
            {
              FirstName: formData.name,
              Email: formData.email,
              Phone: Number(formData.phone),
              Street: formData.streetName,
              HouseNo: formData.houseNumber,
              City: formData.city,
              PostalCode: formData.postalCode,
              Country: formData.country,
              LastName: user.LastName,
              State: user.State,
              CompanyName: user.CompanyName,
              Reference: user.Reference,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          enqueueSnackbar(`${profile?.data?.content?.success}`, { variant: 'success' });

          // Update localStorage with new user data
          if (response) {
            const updatedUser = {
              ...user, // Keep existing user data
              FirstName: formData.name,
              Email: formData.email,
              Phone: formData.phone,
              Street: formData.streetName,
              HouseNo: formData.houseNumber,
              City: formData.city,
              PostalCode: formData.postalCode,
              Country: formData.country,
            };

            localStorage.setItem('userData', JSON.stringify(updatedUser));
          }
        } catch (error) {
          setIsUpdating(false);
          if (axios.isAxiosError(error)) {
            console.error('Error submitting form:', error.response?.data || error.message);
            console.error('Error details:', error.response?.data?.error);
          } else {
            console.error('Unexpected error:', error);
          }
        } finally {
          setIsUpdating(false);
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
        confirmPassword: `${profile?.data?.content?.error}`,
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
      setIsSubmitting(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/change-password`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      enqueueSnackbar(`${profile?.data?.content?.success2}`, { variant: 'success' });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' })
      setErrors({ ...errors, currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      setIsSubmitting(false)
      if (axios.isAxiosError(error)) {
        console.error('Error resetting password:', error.response?.data || error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          newPassword: `${profile?.data?.content?.error2}`,
        }));
      } else {
        console.error('Unexpected error:', error);
      }
    }
    finally {
      setIsSubmitting(false)
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
  if (loading) {
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
        <Loader size={300} />
      </div>
    );
  }
  else if (!profile || profile.data === null || profile.data.content === null) {
    return (
      <div>
        <HeaderOne data={navigation.data} />
        <Error></Error>
        <FooterOne data={footer.data} />
      </div>
    )
  }
  else {
    const placeholder = profile?.data?.content?.update?.placeholder
    const validation = profile?.data?.content?.update?.validation
    const password = profile?.data?.content?.password


    return (
      <Wrapper>
        <HeaderOne data={navigation.data} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>
              <section className={style["profile_section"]}>
                <h2 className='my-5 pt-2 d-flex justify-content-center col-12'>{profile?.data?.content?.heading}</h2>

                <div className="container d-flex justify-content-center">
                  <div className={`${style.profile_nav} d-flex flex-row gap-3`}>
                    <button onClick={handlePersonalClick} className={activeForm === 'personal' ? style.focused : ''}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 my-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      &nbsp; {profile?.data?.content?.personal}
                    </button>
                    {/* <button onClick={handleOrdersClick} className={activeForm === 'orders' ? style.focused : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    &nbsp;{t("order")}
                  </button> */}
                    <button onClick={handleAccountClick} className={activeForm === 'account' ? style.focused : ''}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                      &nbsp;{profile?.data?.content?.account}
                    </button>
                  </div>
                </div>
                {activeForm === 'personal' && (
                  <form onSubmit={handleSubmit} className={`${style.personal_form} justify-content-center container-sm my-5`}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.name} <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${style.inputField}`}
                          placeholder={placeholder?.name}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.email} <span className='text-danger'>*</span></label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${style.inputField}`}
                          placeholder={placeholder?.email}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.phone} <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="phone"
                          className={`form-control ${style.inputField}`}
                          placeholder={placeholder?.phone}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.street} <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="streetName"
                          className={`form-control ${style.inputField}`}
                          placeholder={placeholder?.street}
                          value={formData.streetName}
                          onChange={(e) => setFormData({ ...formData, streetName: e.target.value })}
                        />
                        {errors.streetName && <div className="text-danger">{errors.streetName}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.house}<span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="houseNumber"
                          className={`form-control ${style.inputField}`}
                          placeholder={placeholder?.house}
                          value={formData.houseNumber}
                          onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                        />
                        {errors.houseNumber && <div className="text-danger">{errors.houseNumber}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.postalCode} <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="postalCode"
                          className={`form-control ${style.inputField}`}
                          placeholder={placeholder?.postalCode}
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        />
                        {errors.postalCode && <div className="text-danger">{errors.postalCode}</div>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.city} <span className='text-danger'>*</span></label>
                        <input
                          type="text"
                          name="city"
                          className={`form-control ${style.inputField}`}
                          placeholder={placeholder?.city}
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                        {errors.city && <div className="text-danger">{errors.city}</div>}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label>{placeholder?.country} <span className='text-danger'>*</span></label>
                        <div className="position-relative">
                          {loading ? (
                            <p>{validation?.countryLoading}</p>
                          ) : (
                            <select
                              name="country"
                              className={`form-control ${style.inputField}`}
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            >
                              <option value="">{validation?.selectCountry}</option>
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
                      <button
                        type="submit"
                        className={style.talk_btn}
                        disabled={isUpdating}
                        style={{
                          opacity: isUpdating ? 0.6 : 1,
                          cursor: isUpdating ? "not-allowed" : "pointer",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          height={25}
                          width={25}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-7 me-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        {isUpdating ? validation?.updating : validation?.update}
                      </button>
                    </div>
                  </form>
                )}

                {/* {activeForm === 'orders' && (
                <div className='d-flex flex-column gap-3 container'>
                  <div className={`${style.orders_form_main} gap-5`}>
                    {loadingOrders ? (
                      <p>{t("orders.loading")}</p>
                    ) : orders.length === 0 ? (
                      <p>{t("orders.noProducts")}</p>
                    ) : (
                      orders.map((order) => {
                        const totalAmount = order.order_details.reduce((acc, detail) => acc + detail.amount, 0);

                        const isCancelled = order.DeliveryStatus.some(status => status.delivery_status === 'CANCELLED');
                        const isDelivered = order.DeliveryStatus.some(status => status.delivery_status === 'DELIVERED');
                        const isShipped = order.DeliveryStatus.some(status => status.delivery_status === 'SHIPPING');

                        const displayedArticleCodes = new Set();

                        return (
                          <div key={order.id} className={`${style.orders_form} ${isOpen === order.id ? style.ordersFormOpen : ''}`} style={{ background: windowWidth < 766 ? (order.order_details[0]?.sale_rent === 'Rent' ? '#5C553A' : '#3F3A5C') : '#2E2D2D' }}>

                            <div className='d-flex col-12'>
                              <p className={`${style.type} mb-0`} style={{ background: order.order_details[0]?.sale_rent === 'Rent' ? '#5C553A' : '#3F3A5C', }}>
                                {order.order_details[0]?.sale_rent}
                              </p>
                              <p className={`${style.order_num}`}>{t("orders.orderId")} {order.id}</p>
                              <p className={`${style.model} d-md-block d-none`}>{order.order_details[0]?.product_name}</p>
                              <p className='mb-0 pt-2 align-items-center'>
                                <span className='py-lg-2 px-lg-4 px-md-3 d-md-block d-none'>
                                  {order.DeliveryStatus.length > 0 ? order.DeliveryStatus[0].delivery_status : `${t("orders.noStatus")}`}
                                </span>
                              </p>

                              <h3 className='pt-lg-1 pt-md-3 pt-3 ' onClick={() => toggleAccordion(order.id)}>
                                <span style={{ position: 'relative', display: 'inline-block' }} className=''>
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

                                      <img
                                        src={detail.product_images}
                                        alt={detail.product_name}
                                        className={style.productImage}
                                      />

                                      <div className="d-flex flex-column ">
                                        <p className={`${style.model}`}>{detail.product_name}:</p>
                                        <p className={`${style.SEK}`}>SEK {detail.amount} NOK</p>
                                        <p className={`${style.model}`}>{t("orders.quantity")} {detail.qty} | {t("orders.articleCode")} {detail.article_code}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className={`${style.status_details} p-3 pb-1 d-flex flex-md-row flex-column-reverse gap-lg-5 gap-4 my-2`}>
                                  <div className='d-flex flex-column gap-1 my-2'>
                                    <div className={`${style.order_tracker}`} style={{
                                      borderLeft: `3px dashed ${isShipped ? '#0CB60F' : '#505050'}`,
                                      color: `${isShipped ? '#0CB60F' : '#505050'}`,
                                    }}>
                                      <p><span><TbPackage /></span> {t("orders.packed")}</p>
                                    </div>
                                    <div className={`${style.order_tracker}`} style={{
                                      borderLeft: `3px dashed ${isShipped ? '#0CB60F' : '#505050'}`,
                                      color: `${isShipped ? '#0CB60F' : isCancelled ? 'red' : '#505050'}`,
                                    }}>
                                      <p><span><MdOutlineLocalShipping /></span> {isCancelled ? 'Cancelled' : 'Shipping'}</p>
                                    </div>
                                    <div className={`${style.order_tracker}`} style={{
                                      borderLeft: `3px dashed ${isDelivered ? '#0CB60F' : '#505050'}`,
                                      color: `${isDelivered ? '#0CB60F' : '#505050'}`,
                                    }}>
                                      <p><span><CiCircleCheck /></span> {t("orders.delivered")}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className={`${style.order_details} mb-0`}>
                                      <p className={`${style.order_details_heading} ms-0`}>{t("orders.contact")}</p>
                                      <p className={`${style.order_fill}`}>{order.ShippingAddress.Phone}</p>
                                    </div>
                                    <div className={`${style.order_details}`}>
                                      <p className={`${style.order_details_heading} ms-3 ms-md-0`}>{t("orders.shipping")}</p>
                                      <p className={`${style.order_address}`}>
                                        {order.ShippingAddress.Street}, {order.ShippingAddress.City}, {order.ShippingAddress.State}, {order.ShippingAddress.PostalCode}, {order.ShippingAddress.Country}
                                      </p>
                                    </div>
                                    <div className={`${style.order_details}`}>
                                      <p className={`${style.order_details_heading}`}>{t("orders.total")}</p>
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
              )} */}



                {activeForm === 'account' && (
                  <form onSubmit={handleAccountSubmit} className={`${style.accounts_form} justify-content-center container-sm my-5`}>

                    <div className={`${style.form_align}`}>
                      <h4>{password.change}</h4>
                      {/* Current Password */}
                      <div className="col-xl-6 col-lg-8 mb-3">
                        <div className={style.formControl}>
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            className={`form-control ${style.inputField}`}
                            placeholder={password.currentPassword}
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
                            placeholder={password.newPassword}
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
                            placeholder={password.confirmPassword}
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
                        <button
                          type="submit"
                          className={style.submit_btn}
                          disabled={isSubmitting}
                          style={{
                            opacity: isSubmitting ? 0.6 : 1,
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                          }}
                        >
                          {isSubmitting ? password.submitting : password.submit}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </section>
              <LetsTalk data={letsTalk.data} />
            </main>
            <FooterOne data={footer.data} />
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Profile;