'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import Link from 'next/link';
import { IoChevronDown } from 'react-icons/io5';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';

const Checkout: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <RentalConditions />
      </Suspense>
    </CartProvider>
  );
};
interface FormData {
  gdprConsent: boolean;
  serviceAgreement: string;
  Country: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Street: string;
  HouseNo: string;
  City: string;
  PostalCode: string;
  State: string;
  CompanyName: string;
  Reference: string;
  Notes: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingStreet: string;
  shippingHouseNo: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingState: string;
  shippingCompanyName: string;
  shippingReference: string;
  shippingCountry: string;
}

// Main RentalConditions Component
const RentalConditions = () => {
  const t = useTranslations('checkout');
  const [formData, setFormData] = useState({
    gdprConsent: false,
    serviceAgreement: '',
    Country: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Street: '',
    HouseNo: '',
    City: '',
    PostalCode: '',
    State: '',
    CompanyName: '',
    Reference: '',
    Notes: '',
    shippingFirstName: '',
    shippingLastName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingStreet: '',
    shippingHouseNo: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingState: '',
    shippingCompanyName: '',
    shippingReference: '',
    shippingCountry: '',
  });
  const [isPlacing, setPlacingOrder] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({});
  const { enqueueSnackbar } = useSnackbar();


  interface FormErrors {
    [key: string]: string | undefined; // Each key can be a string or undefined
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setErrors((prevErrors: FormErrors) => ({
      ...prevErrors,
      [name]: undefined, // Clear the error for the specific field
    }));

    // Handle checkbox separately
    if (type === 'checkbox') {
      const checkedValue = (e.target as HTMLInputElement).checked;

      setFormData((prevData) => {
        if (name === 'gdprConsent' && checkedValue) {
          // Copy billing details to shipping
          return {
            ...prevData,
            [name]: checkedValue,
            shippingFirstName: prevData.FirstName,
            shippingLastName: prevData.LastName,
            shippingEmail: prevData.Email,
            shippingPhone: prevData.Phone,
            shippingStreet: prevData.Street,
            shippingHouseNo: prevData.HouseNo,
            shippingCity: prevData.City,
            shippingPostalCode: prevData.PostalCode,
            shippingState: prevData.State,
            shippingCompanyName: prevData.CompanyName,
            shippingReference: prevData.Reference,
            shippingCountry: prevData.Country,
          };
        } else if (name === 'gdprConsent' && !checkedValue) {
          // Clear shipping details
          return {
            ...prevData,
            [name]: checkedValue,
            shippingFirstName: '',
            shippingLastName: '',
            shippingEmail: '',
            shippingPhone: '',
            shippingStreet: '',
            shippingHouseNo: '',
            shippingCity: '',
            shippingPostalCode: '',
            shippingState: '',
            shippingCompanyName: '',
            shippingReference: '',
            shippingCountry: '',
          };
        }
        // Handle other checkbox cases
        return {
          ...prevData,
          [name]: checkedValue,
        };
      });
    } else {
      // Handle text inputs and select elements
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    function formatFieldName(field: string): string {
      // Map fields to their translation keys
      const fieldToTranslationKey: { [key: string]: string } = {
        FirstName: 'name',
        LastName: 'surname',
        Email: 'email',
        Phone: 'phone',
        Street: 'street',
        HouseNo: 'house',
        City: 'city',
        PostalCode: 'postalCode',
        State: 'state',
        Country: 'country'
      };

      // Get the translation key for the field
      const translationKey = fieldToTranslationKey[field.replace('shipping', '')];
      // Remove the asterisk (*) from placeholder text if present
      return translationKey ? t(`placeholder.${translationKey}`).replace('*', '') : field;
    }

    const requiredFields = [
      'FirstName', 'LastName', 'Email', 'Phone', 'Street', 'HouseNo',
      'City', 'PostalCode', 'State', 'Country'
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = `${formatFieldName(field)} ${t("isRequired")}`;
      }
    });

    // Email validation
    if (formData.Email && !/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = t("invalidEmail");
    }

    // Phone validation
    if (formData.Phone && !/^\d+$/.test(formData.Phone)) {
      newErrors.Phone = t("invalidPhone");
    }

    // Shipping address validation if checkbox is not checked
    if (!formData.gdprConsent) {
      const shippingRequiredFields = [
        'shippingFirstName', 'shippingLastName', 'shippingEmail',
        'shippingPhone', 'shippingStreet', 'shippingHouseNo',
        'shippingCity', 'shippingPostalCode', 'shippingState', 'shippingCountry'
      ];

      shippingRequiredFields.forEach(field => {
        if (!formData[field as keyof FormData]) {
          const baseField = field.replace('shipping', '');
          newErrors[field] = `${formatFieldName(baseField)} ${t("isRequired")}`;
        }
      });

      // Validate shipping email and phone if provided
      if (formData.shippingEmail && !/\S+@\S+\.\S+/.test(formData.shippingEmail)) {
        newErrors.shippingEmail = t("invalidEmail");
      }
      if (formData.shippingPhone && !/^\d+$/.test(formData.shippingPhone)) {
        newErrors.shippingPhone = t("invalidPhone");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  // Calculate the subtotal (sum of all item totals)
  const calculateSubtotal = () => {
    return cartItems.reduce((total: number, item: any) => {
      return total + item.amount * item.count; // Multiply amount by count for each item
    }, 0).toFixed(2); // Format the subtotal to two decimal places
  };

  // Shipping cost (hardcoded for simplicity, can be dynamic)
  const shippingCost = 0.00;

  // Calculate the grand total (subtotal + shipping)
  const calculateGrandTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal + shippingCost).toFixed(2); // Add shipping cost to the subtotal
  };

  const orderDetails = cartItems.map((item: any) => ({
    product_name: item.title, // Assuming 'title' is the product name
    qty: item.count,          // Quantity is the 'count'
    amount: item.amount,      // Amount for each item
    product_id: item.id.toString(),
    product_images: item.img,
    sale_rent: item.type,
    article_code: item.article_code          // Assuming 'id' is the product ID
  }));

  const totalAmount = parseFloat(calculateSubtotal());
  const [storedUser, setStoredUser] = useState<any | null>(null); // Use 'any' or define a proper type for user

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        setStoredUser(JSON.parse(user));
      }
    }
  }, []);

  useEffect(() => {
    if (!storedUser) {
      console.error('No user data found in localStorage.');
      // Handle the case where there is no user data
    }
  }, [storedUser]);

  // Ensure storedUser  is defined before accessing its properties
  const userId = storedUser ? storedUser.documentId : null;


  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    if (!validateForm()) {
      setPlacingOrder(false)

      return; // Prevent submission if validation fails
    }
    const orderData = {
      userId: userId, // Replace with actual user ID if available
      order_details: orderDetails,
      order_note: formData.Notes,
      total_amount: totalAmount,
      BillingAddress: {
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        Email: formData.Email,
        Phone: formData.Phone,
        Street: formData.Street,
        HouseNo: formData.HouseNo,
        City: formData.City,
        PostalCode: formData.PostalCode,
        State: formData.State,
        Country: formData.Country,
        CompanyName: formData.CompanyName,
        Reference: formData.Reference
      },
      ShippingAddress: {
        FirstName: formData.shippingFirstName,
        LastName: formData.shippingLastName,
        Email: formData.shippingEmail,
        Phone: formData.shippingPhone,
        Street: formData.shippingStreet,
        HouseNo: formData.shippingHouseNo,
        City: formData.shippingCity,
        PostalCode: formData.shippingPostalCode,
        State: formData.shippingState,
        Country: formData.shippingCountry,
        CompanyName: formData.shippingCompanyName,
        Reference: formData.shippingReference
      },
      DeliveryStatus: [
        {
          delivery_status: "PENDING",
          status_updated_at: new Date().toISOString()
        }
      ]
    };
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}orders`,
        {
          data: orderData
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        window.location.href = `/order-successful?id=${response.data.data.id}`;
        localStorage.setItem("cartItems", JSON.stringify([]));

        enqueueSnackbar(`${t("success")}`, { variant: 'success' });

      }
      setPlacingOrder(false)
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        enqueueSnackbar(`${t("error")}`, { variant: 'error' });

      } else {
        console.error("Unexpected error:", error);
      }
      setPlacingOrder(false)
    }
    finally {
      setPlacingOrder(false)
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
                    <div className="col-md-12">
                      <div className='text-center'>
                        <h1 className={style.pageTitle}>{t("heading")}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style["checkout"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-8">
                      <div className={style["checkout_container"]}>
                        <form>
                          <div className={style["checkout_inner_container"]}>
                            <div className="row">
                              <div className="col-md-12"><h4>{t("bAddress")}</h4></div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="FirstName"
                                    name="FirstName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.name")}
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                  />
                                  {errors.FirstName && <span className={style.error}>{errors.FirstName}</span>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="LastName"
                                    name="LastName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.surname")}
                                    value={formData.LastName}
                                    onChange={handleChange}
                                  />
                                  {errors.LastName && <span className={style.error}>{errors.LastName}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="email"
                                    id="Email"
                                    name="Email"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.email")}
                                    value={formData.Email}
                                    onChange={handleChange}
                                  />
                                  {errors.Email && <span className={style.error}>{errors.Email}</span>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="number"
                                    id="Phone"
                                    name="Phone"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.phone")}
                                    value={formData.Phone}
                                    onChange={handleChange}
                                  />
                                  {errors.Phone && <span className={style.error}>{errors.Phone}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Street"
                                    name="Street"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.street")}
                                    value={formData.Street}
                                    onChange={handleChange}
                                  />
                                  {errors.Street && <span className={style.error}>{errors.Street}</span>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="HouseNo"
                                    name="HouseNo"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.house")}
                                    value={formData.HouseNo}
                                    onChange={handleChange}
                                  />
                                  {errors.HouseNo && <span className={style.error}>{errors.HouseNo}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="City"
                                    name="City"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.city")}
                                    value={formData.City}
                                    onChange={handleChange}
                                  />
                                  {errors.City && <span className={style.error}>{errors.City}</span>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="PostalCode"
                                    name="PostalCode"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.postalCode")}
                                    value={formData.PostalCode}
                                    onChange={handleChange}
                                  />
                                  {errors.PostalCode && <span className={style.error}>{errors.PostalCode}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="State"
                                    name="State"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.state")}
                                    value={formData.State}
                                    onChange={handleChange}
                                  />
                                  {errors.State && <span className={style.error}>{errors.State}</span>}
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <div className={style.selectWrapper}>
                                    <select
                                      id="Country"
                                      name="Country"
                                      className={`form-control ${style.inputField}`}
                                      onChange={handleChange}
                                      value={formData.Country || ''}
                                    >
                                      <option value="">{t("placeholder.country")}</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="USA">United States</option>
                                      <option value="Canada">Canada</option>
                                      <option value="Germany">Germany</option>
                                      <option value="France">France</option>
                                      <option value="UK">United Kingdom</option>
                                      <option value="Australia">Australia</option>
                                    </select>
                                    <IoChevronDown className={style.arrowIcon} />
                                  </div>
                                  {errors.Country && <span className={style.error}>{errors.Country}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Company-Name"
                                    name="CompanyName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.companyName")}
                                    value={formData.CompanyName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Reference"
                                    name="Reference"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.reference")}
                                    value={formData.Reference}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={`my-4 ${style.checkout_container}`}>
                            <div className="row">
                              <div className="col-md-12">
                                <div className={`mb-0 ${style.formControl}`}>
                                  <input
                                    type="checkbox"
                                    id="GDPR"
                                    name="gdprConsent"
                                    checked={formData.gdprConsent}
                                    onChange={handleChange}
                                    className={style["custom_checkbox"]}
                                  />
                                  <label htmlFor="GDPR" className='mb-0'>{t("deliver")}</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className={style["checkout_container"]}>
                        <div className={style["checkout_inner_container"]}>
                          <div className="row">
                            <div className="col-md-12"><h4>{t("summary")}</h4></div>

                            <div className="col-md-12">
                              <div className={style["checkout_table"]}>
                                <div className={style["single_row"]}>
                                  <h5>{t("products")}</h5>
                                </div>
                                {cartItems.map((item: any) => (
                                  <div key={item.id} className={style["two_row"]}>
                                    <div className='d-flex flex-row col-md-12 col-lg-6 col-12'>
                                      <p style={{ textOverflow: 'ellipsis', }} className='d-md-none d-sm-none d-block'> {item.title.length > 8 ? `${item.title.substring(0, 8)}...` : item.title} x {item.count}  </p>
                                      <p className='d-md-block d-sm-block d-none'>  {item.title} x {item.count}  </p>
                                      <h6 className='d-md-block d-lg-none d-block ms-auto'>SEK {(item.amount * item.count).toFixed(2)}</h6>
                                    </div>
                                    <div className='d-md-none d-lg-block d-none'>
                                      <p>SEK  {(item.amount * item.count).toFixed(2)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className={style["checkout_table_sec"]}>
                                <div className={style["two_row"]}>
                                  <div>
                                    <p>{t("subtotal")}</p>
                                    <p>{t("shipping")}</p>
                                  </div>
                                  <div>
                                    <p>SEK {calculateSubtotal()}</p>
                                    <p>SEK {shippingCost.toFixed(2)}</p>
                                  </div>
                                </div>
                                <span className={style["im_hr"]}></span>
                              </div>

                              <div className={style["checkout_table_sec"]}>
                                <div className={style["two_row"]}>
                                  <div>
                                    <h6>{t("total")}</h6>
                                  </div>
                                  <div>
                                    <h6><span>SEK {calculateGrandTotal()}</span> </h6>
                                  </div>
                                </div>

                                <div className={style["single_row"]}>
                                  <p className={style["order_info_text"]}>
                                    {t("desc")}{' '}
                                    <Link href="/privacy-policy" className="cs_hero_btn">
                                      <span className={style["text_space"]}> </span><span>{t("privacy")}</span>
                                    </Link>.
                                  </p>
                                </div>
                              </div>

                              <div className={style["checkout_table_sec"]}>
                                <div className={style["single_row"]}>
                                  <button onClick={handlePlaceOrder}>
                                    {isPlacing ? t("placing") : t("place")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className={style["checkout"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-8">
                      <div className={style["checkout_container"]}>
                        <form>
                          <div className={style["checkout_inner_container"]}>
                            <div className="row">
                              <div className="col-md-12"><h4>{t("sAddress")}</h4></div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="FirstName"
                                    name="shippingFirstName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.name")}
                                    value={formData.shippingFirstName}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingFirstName && <span className={style.error}>{errors.shippingFirstName}</span>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="LastName"
                                    name="shippingLastName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.surname")}
                                    value={formData.shippingLastName}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingLastName && <span className={style.error}>{errors.shippingLastName}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="email"
                                    id="Email"
                                    name="shippingEmail"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.email")}
                                    value={formData.shippingEmail}
                                    onChange={handleChange}

                                  />
                                  {errors.shippingEmail && <span className={style.error}>{errors.shippingEmail}</span>}

                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="number"
                                    id="Phone"
                                    name="shippingPhone"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Phone*"
                                    value={formData.shippingPhone}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingPhone && <span className={style.error}>{errors.shippingPhone}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Street"
                                    name="shippingStreet"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.street")}
                                    value={formData.shippingStreet}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingStreet && <span className={style.error}>{errors.shippingStreet}</span>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="HouseNo"
                                    name="shippingHouseNo"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.house")}
                                    value={formData.shippingHouseNo}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingHouseNo && <span className={style.error}>{errors.shippingHouseNo}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="City"
                                    name="shippingCity"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.city")}
                                    value={formData.shippingCity}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingCity && <span className={style.error}>{errors.shippingCity}</span>}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="PostalCode"
                                    name="shippingPostalCode"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.postalCode")}
                                    value={formData.shippingPostalCode}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingPostalCode && <span className={style.error}>{errors.shippingPostalCode}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="State"
                                    name="shippingState"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.state")}
                                    value={formData.shippingState}
                                    onChange={handleChange}
                                  />
                                  {errors.shippingState && <span className={style.error}>{errors.shippingState}</span>}
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <div className={style.selectWrapper}>
                                    <select
                                      id="Country"
                                      name="shippingCountry"
                                      className={`form-control ${style.inputField}`}
                                      onChange={handleChange}
                                      value={formData.shippingCountry || ''}
                                    >
                                      <option value="">{t("placeholder.country")}</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="USA">United States</option>
                                      <option value="Canada">Canada</option>
                                      <option value="Germany">Germany</option>
                                      <option value="France">France</option>
                                      <option value="UK">United Kingdom</option>
                                      <option value="Australia">Australia</option>
                                    </select>
                                    <IoChevronDown className={style.arrowIcon} />
                                  </div>
                                  {errors.shippingCountry && <span className={style.error}>{errors.shippingCountry}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Company-Name"
                                    name="shippingCompanyName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.companyName")}
                                    value={formData.shippingCompanyName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Reference"
                                    name="shippingReference"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.reference")}
                                    value={formData.shippingReference}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={style["checkout_inner_container"]}>
                            <div className="row">
                              <div className="col-md-12">
                                <div className={`mb-0 ${style.formControl}`}>
                                  <input
                                    type="text"
                                    id="Notes"
                                    name="Notes"
                                    className={`form-control ${style.inputField}`}
                                    placeholder={t("placeholder.orderNotes")}
                                    value={formData.Notes}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
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

export default Checkout;





