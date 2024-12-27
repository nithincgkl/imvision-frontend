'use client';
import React, { useState ,useEffect} from 'react';
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

const Checkout: React.FC = () => {
  return (
    <CartProvider>
      <RentalConditions />
    </CartProvider>
  );
};

// Main RentalConditions Component
const RentalConditions = () => {
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

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
    product_images:item.img ,
    sale_rent:item.type,
    article_code:item.article_code          // Assuming 'id' is the product ID
  }));

  const totalAmount = parseFloat(calculateSubtotal());
  const storedUser = localStorage.getItem('user');
    
      if (!storedUser) {
        console.error('No user data found in localStorage.');
        return;
      }
    
      const user = JSON.parse(storedUser);
      const userId = user.documentId;

  const handlePlaceOrder = async () => {
    const orderData = {
      userId: userId, // Replace with actual user ID if available
      order_details: orderDetails,
      order_note:formData.Notes,
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
      if (response.status === 201) {
        window.location.href = '/order-successful';  // Triggers a full-page redirect
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
    } else {
        console.error("Unexpected error:", error);
    }    }
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
                        <h1 className={style.pageTitle}>Checkout</h1>
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
                              <div className="col-md-12"><h4>Billing Address</h4></div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="FirstName"
                                    name="FirstName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="First Name*"
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="LastName"
                                    name="LastName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Surname*"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                  />
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
                                    placeholder="Email Address*"
                                    value={formData.Email}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="number"
                                    id="Phone"
                                    name="Phone"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Phone*"
                                    value={formData.Phone}
                                    onChange={handleChange}
                                  />
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
                                    placeholder="Street*"
                                    value={formData.Street}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="HouseNo"
                                    name="HouseNo"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="House Number*"
                                    value={formData.HouseNo}
                                    onChange={handleChange}
                                  />
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
                                    placeholder="City / Town*"
                                    value={formData.City}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="PostalCode"
                                    name="PostalCode"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Postal Code*"
                                    value={formData.PostalCode}
                                    onChange={handleChange}
                                  />
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
                                    placeholder="State*"
                                    value={formData.State}
                                    onChange={handleChange}
                                  />
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
                                      value={formData.Country || ''} // Bind value to state
                                    >
                                      <option value="">Select Country / Region*</option>
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
                                    placeholder="Company Name (optional)"
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
                                    placeholder="Reference (optional)"
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
                                  <label htmlFor="GDPR" className='mb-0'>Deliver to Billing Address</label>
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
                            <div className="col-md-12"><h4>Order Summary</h4></div>

                            <div className="col-md-12">
                              <div className={style["checkout_table"]}>
                                <div className={style["single_row"]}>
                                  <h5>Products</h5>
                                </div>
                                {cartItems.map((item: any) => (

                                <div key={item.id}  className={style["two_row"]}>
                                  <div>
                                  <p>{item.title} x {item.count}</p>
                                  </div>
                                  <div>
                                  <p>SEK  {(item.amount * item.count).toFixed(2)}</p>
                                  </div>
                                </div>
                                                              ) )}

                              </div>
                              <div className={style["checkout_table_sec"]}>
                                <div className={style["two_row"]}>
                                  <div>
                                    <p>Subtotal</p>
                                    <p>Shipping</p>
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
                                    <h6>Grant Total</h6>
                                  </div>
                                  <div>
                                    <h6><span>SEK {calculateGrandTotal()}</span> </h6>
                                  </div>
                                </div>

                                <div className={style["single_row"]}>
                                  <p>Your personal data will be used to process your order, improve your experience on the website and for other purposes described in our
                                    &nbsp;<Link href="/privacy-policy" className="cs_hero_btn">privacy policy</Link> .</p>
                                </div>
                              </div>
                              <div className={style["checkout_table_sec"]}>
                                <div className={style["single_row"]}>
                                  <button onClick={handlePlaceOrder}>Place order</button>
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
              <div className={style["checkout"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-8">
                      <div className={style["checkout_container"]}>
                        <form>
                          <div className={style["checkout_inner_container"]}>
                            <div className="row">
                              <div className="col-md-12"><h4>Shipping Address</h4></div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="FirstName"
                                    name="shippingFirstName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="First Name*"
                                    value={formData.shippingFirstName}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="LastName"
                                    name="shippingLastName"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="LastName*"
                                    value={formData.shippingLastName}
                                    onChange={handleChange}
                                  />
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
                                    placeholder="Email Address*"
                                    value={formData.shippingEmail}
                                    onChange={handleChange}
                                  />
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
                                    placeholder="Street*"
                                    value={formData.shippingStreet}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="HouseNo"
                                    name="shippingHouseNo"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="House Number*"
                                    value={formData.shippingHouseNo}
                                    onChange={handleChange}
                                  />
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
                                    placeholder="City / Town*"
                                    value={formData.shippingCity}

                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="PostalCode"

                                    name="shippingPostalCode"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Postal Code*"
                                    value={formData.shippingPostalCode}

                                    onChange={handleChange}
                                  />
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
                                    placeholder="State*"
                                    value={formData.shippingState}

                                    onChange={handleChange}
                                  />
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
                                      value={formData.shippingCountry || ''} // Bind value to state

                                    >
                                      <option value="">Select Country / Region*</option>
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
                                    placeholder="Company Name (optional)"
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
                                    placeholder="Reference (optional)"
                                    value={formData.shippingReference}

                                    onChange={handleChange}
                                  />
                                </div>
                              </div>

                            </div>
                          </div>
                          <div className={`my-4 ${style.checkout_container}`}>
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
                                    placeholder="Order Notes (optional)"
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





