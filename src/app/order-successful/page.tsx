'use client'
import React from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FiDownload } from "react-icons/fi";
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const OrderSuccess: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};

// Main ContactPage Component
const Page = () => {
  return (
    <Wrapper> 
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style.contact_section}>
              

              <div className={style["order_successful"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <div className={style["order_successful_container"]}>
                        <div>
                        <img src="/assets/images/check.svg" className="w-100" alt="" />   
                        <h5>Thank You for Shopping with Us!</h5> 
                        <p>Your order ID is #453232. A detailed report has been sent to your registered email address. If you have any questions, feel free to contact our support team.</p>  
                        <button  className="btn-one">Talk to Expert</button>  
                        </div>              
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </section>

          </main>
          {/* <FooterOne /> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderSuccess;