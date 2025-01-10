'use client';
import React, { Suspense, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from './style.module.css';
import LetsTalk from '@/components/home/lets-talk';
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from 'next/link';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';

const CartPage: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <CartContent />
      </Suspense>
    </CartProvider>

  );
};

const CartContent: React.FC = () => {
  const t = useTranslations('cart');
  const { cartItems, removeFromCart, updateCartItemCount } = useCart();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));

  const handleIncrease = (id: string) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      updateCartItemCount(id, currentItem.count + 1);
    }
  };

  const handleDecrease = (id: string) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      const newCount = currentItem.count - 1;
      if (newCount > 0) {
        updateCartItemCount(id, newCount);
      } else {
        removeFromCart(id);
      }
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.amount * item.count), 0).toFixed(2);
  };

  const CalendarInput = React.forwardRef<HTMLInputElement, { value: string; onClick: () => void }>(
    ({ value, onClick }, ref) => (
      <div className={style.datePickerWrapper} onClick={onClick}>
        <input
          type="text"
          value={value}
          readOnly
          ref={ref}
          className={style.dateInput}
        />
        <span className={style.calendarIcon}>📅</span>
      </div>
    )
  );

  CalendarInput.displayName = "CalendarInput";

  const handleProceedToCheckout = () => {
    const totalAmount = calculateTotal();
    const checkoutData = {
      cartItems,
      totalAmount
    };
    localStorage.setItem('total', JSON.stringify(checkoutData));
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
                      <h1 className={style.pageTitle}>{t("heading")} [{cartItems.reduce((total, item) => total + item.count, 0)}]</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className={style['cart_conditions']}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      {cartItems.length > 0 ? (
                        <>
                          {cartItems.map((item) => (
                            <div key={item.id} className={style['cart_box']}>
                              <div className={style['cart_box_header']}>
                                <div>
                                  <p className='mb-0'>{item.type}</p>
                                </div>
                                {item.type === "Rent" && (
                                  <div className='float-left'>
                                    <p className='float-start pt-2'>{t("rental")}</p>
                                    <div className={style.datePickers}>
                                      <div className={style.datePickerLabel}>
                                        <span className={style['from_text']}>{t("from")}</span>
                                        <DatePicker
                                          selected={startDate}
                                          onChange={(date) => setStartDate(date || new Date())}
                                          customInput={<CalendarInput value={startDate.toISOString().split('T')[0]} onClick={() => { }} />}
                                          dateFormat="yyyy-MM-dd"
                                        />
                                      </div>
                                      <div className={`${style.datePickerLabel} ${style.mobile_ml}`}>
                                        <span className={style['to_text']}>{t("to")}</span>
                                        <DatePicker
                                          selected={endDate}
                                          onChange={(date) => setEndDate(date || new Date())}
                                          customInput={<CalendarInput value={endDate.toISOString().split('T')[0]} onClick={() => { }} />}
                                          dateFormat="yyyy-MM-dd"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className={style['cart_box_body']}>
                                <div className={style['cart_box_img']}>
                                  <img src={item.img} alt={`${item.title} image`} />
                                </div>

                                <div className={style['cart_box_right']}>
                                  <div>
                                    <p>{item.title} {item.article_code}</p>
                                    <br />

                                    <div className={style['cart_box_add_btn']}>
                                      <div className={style.itemAdjuster}>
                                        <button onClick={() => handleDecrease(item.id)}>-</button>
                                        <span>{item.count}</span>
                                        <button onClick={() => handleIncrease(item.id)}>+</button>
                                      </div>
                                      <p>SEK {(item.amount * item.count).toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <button onClick={() => handleRemoveItem(item.id)}>
                                      {t("remove")} &nbsp; <RiDeleteBin6Line />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Grand Total Section */}
                          <div className={style['grand_total']}>
                            <div className={style['grand_total_box']}>
                              <p>{t("total")}<span>SEK {calculateTotal()}</span></p>
                              <Link href="/checkout">
                                <button onClick={handleProceedToCheckout}>{t("checkout")}</button>
                              </Link>
                            </div>
                          </div>

                        </>
                      ) : (
                        // Message when cart is empty
                        <p>{t("empty")}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </section>

            {/* Contact Section */}
            <LetsTalk />
          </main>

          {/* Footer */}
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default CartPage;