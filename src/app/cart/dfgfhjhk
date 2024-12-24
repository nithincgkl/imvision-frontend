'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from './style.module.css';
import LetsTalk from '@/components/home/lets-talk';
import { RiDeleteBin6Line } from "react-icons/ri";

interface CartItem {
  id: number;
  name: string;
  type: string;
  count: number;
  price: number;
  image: string;
}

const RentalConditions = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "ABSENnicon C Slim Series 165\"",
      type: "Rental",
      count: 1,
      price: 100.00,
      image: "/assets/images/cart.jpg"
    },
    {
      id: 2,
      name: "ABSENnicon C Slim Series 165\" IM Series P0.93mm – COB with CCT tech",
      type: "Sale",
      count: 1,
      price: 110.00,
      image: "/assets/images/cart.jpg"
    }
  ]);

  const handleIncrease = (id: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2);
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
                      <h1 className={style.pageTitle}>My Cart</h1>
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
                                {item.type === 'Rental' && (
                                  <div className='float-left'>
                                    <p className='float-start pt-2'>Select Rental Period:</p>
                                    <div className={style.datePickers}>
                                      <div className={style.datePickerLabel}>
                                        <span className={style['from_text']}>From:</span>
                                        <DatePicker
                                          selected={startDate}
                                          onChange={(date) => setStartDate(date || new Date())}
                                          customInput={<CalendarInput value={startDate.toISOString().split('T')[0]} onClick={() => { }} />}
                                          dateFormat="yyyy-MM-dd"
                                        />
                                      </div>
                                      <div className={`${style.datePickerLabel} ${style.mobile_ml}`}>
                                        <span className={style['to_text']}>To:</span>
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
                                  <img
                                    src={item.image}
                                    className="w-100"
                                    alt={`${item.name} banner`}
                                  />
                                </div>

                                <div className={style['cart_box_right']}>
                                  <div>
                                    <p>{item.name}</p>
                                    <br />

                                    <div className={style['cart_box_add_btn']}>
                                      <div className={style.itemAdjuster}>
                                        <button onClick={() => handleDecrease(item.id)}>-</button>
                                        <span>{item.count}</span>
                                        <button onClick={() => handleIncrease(item.id)}>+</button>
                                      </div>
                                      <p>SEK {(item.price * item.count).toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <button onClick={() => handleRemoveItem(item.id)}>
                                      Remove &nbsp; <RiDeleteBin6Line />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className={style['grand_total']}>
                            <div className={style['grand_total_box']}>
                              <p>Grand Total:<span>SEK {calculateTotal()}</span></p>
                              <button>Proceed To Checkout</button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p>Cart is empty</p>
                      )}
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