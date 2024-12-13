'use client';
import React, { useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import Link from 'next/link';
import { IoChevronDown } from 'react-icons/io5';

// Main RentalConditions Component
const RentalConditions = () => {
  const [formData, setFormData] = useState({
    gdprConsent: false, // Initialize GDPR consent to false
    serviceAgreement: '', // Initialize serviceAgreement
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Update based on input type
    }));
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
                                    className={`form-control ${style.inputField}`}
                                    placeholder="First Name*"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Surname"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Surname*"
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
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Email Address*"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="number"
                                    id="Phone"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Phone*"
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
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Street*"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="HouseNumber"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="House Number*"
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
                                    className={`form-control ${style.inputField}`}
                                    placeholder="City / Town*"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="PostalCode"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Postal Code*"
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
                                    className={`form-control ${style.inputField}`}
                                    placeholder="State*"
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
                                      {/* Add more countries as needed */}
                                    </select>
                                    <IoChevronDown className={style.arrowIcon} /> {/* Add the icon here */}
                                  </div>
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
                                  <label htmlFor="GDPR" className='mb-0'>Consent according to GDPR</label>
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
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Order Notes (optional)"
                                  />
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
                                <div className={style["two_row"]}>
                                  <div>
                                    <p>ABSENnicon Slim 165″ x 2</p>
                                    <p>IM Series P0.93mm  x 3</p>
                                  </div>
                                  <div>
                                    <p>SEK 0.00</p>
                                    <p>SEK 0.00</p>
                                  </div>
                                </div>
                              </div>
                              <div className={style["checkout_table_sec"]}>
                                <div className={style["two_row"]}>
                                  <div>
                                    <p>Subtotal</p>
                                    <p>Shipping</p>
                                  </div>
                                  <div>
                                    <p>SEK 10.00</p>
                                    <p>SEK 10.00 </p>
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
                                    <h6><span>SEK 10.00</span> </h6>
                                  </div>
                                </div>

                                <div className={style["single_row"]}>
                                  <p>Your personal data will be used to process your order, improve your experience on the website and for other purposes described in our
                                    <Link href="/privacy-policy" className="cs_hero_btn">privacy policy</Link> .</p>

                                </div>
                              </div>
                              <div className={style["checkout_table_sec"]}>
                                <div className={style["single_row"]}>
                                  <button>Place order</button>
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



              <div className={style["checkout_footer"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <div className={style["checkout_container"]}>


                        <form>
                          <div className={style["checkout_inner_container"]}>


                            <div className="row">

                              <div className="col-md-8">
                                <h4>Select Shipment Type</h4>

                                <fieldset>

                                  <div className={style.fieldset_radio}>
                                    <input
                                      type="radio"
                                      className="radio"
                                      name="serviceAgreement"
                                      value="yourself"
                                      id="yourself"
                                      onChange={handleChange}
                                      checked={formData.serviceAgreement === 'yourself'}
                                    />
                                    <label htmlFor="yourself">&nbsp; Pick up yourself - Jönköping</label>
                                    <br />

                                    <input
                                      type="radio"
                                      className={`radio ${style.radio_input}`}
                                      name="serviceAgreement"
                                      value="Platform"
                                      id="Platform"
                                      onChange={handleChange}
                                      checked={formData.serviceAgreement === 'Platform'}
                                    />
                                    <label htmlFor="Platform">&nbsp; Platform price Central Sweden - Calculated upon confirmation:SEK 1000.00 </label>

                                    <br />

                                    <input
                                      type="radio"
                                      className={`radio ${style.radio_input_two}`}
                                      name="serviceAgreement"
                                      value="Download"
                                      id="Download"
                                      onChange={handleChange}
                                      checked={formData.serviceAgreement === 'Download'}
                                    />
                                    <label htmlFor="Download">&nbsp; Download yourself - Stockholm</label>

                                    <p><i>Shipping options will be updated at checkout.</i></p>
                                  </div>
                                </fieldset>

                              </div>


                              <div className="col-md-4">
                                <h6>Calculate Shipping</h6>
                                <div className={style.formControl}>
                                  <div className={style.selectWrapper}>
                                    <select
                                      id="Country"
                                      name="Country"
                                      className={`form-control ${style.inputField}`}
                                      onChange={handleChange}
                                      value={formData.Country || ''} // Bind value to state
                                    >
                                      <option value="">Sweden</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Sweden">Sweden</option>
                                      <option value="Sweden">United Sweden</option>
                                      <option value="Sweden">Sweden</option>
                                      {/* Add more countries as needed */}
                                    </select>
                                    <IoChevronDown className={style.arrowIcon} /> {/* Add the icon here */}
                                  </div>
                                </div>

                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="Place"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="Place"
                                  />
                                </div>

                                <div className={style.formControl}>
                                  <input
                                    type="text"
                                    id="ZIP-Code"
                                    className={`form-control ${style.inputField}`}
                                    placeholder="ZIP Code"
                                  />
                                </div>
                                <div className={style.formControl}>
                                  <button>Update</button>
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

export default RentalConditions;
