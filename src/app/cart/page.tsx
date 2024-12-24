'use client';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from './style.module.css';
import LetsTalk from '@/components/home/lets-talk';
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from 'next/link';

interface CartItem {
  id: number;
  img: string;
  title: string;
  des: string; // Assuming this is the price as a string
  amount: number;
  count: number;
  type: string;
}

const CartPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000)); 
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (storedCartItems.length === 0) {
      // If no items in the cart, clear the local storage
      localStorage.removeItem('cartItems');
    }
    setCartItems(storedCartItems);
  }, []);

  const handleIncrease = (id: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );

      // Save the updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));

      return updatedItems;
    });
  };


  const handleDecrease = (id: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === id) {
          const newCount = item.count - 1;
          return { ...item, count: newCount };
        }
        return item;
      }).filter(item => item.count > 0); // Move filter here to remove items with count 0
  
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.amount * item.count), 0).toFixed(2);
  };

  const updateLocalStorage = () => {
    if (cartItems.length === 0) {
      // If cart is empty, remove it from localStorage
      localStorage.removeItem('cartItems');
    } else {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
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
    
    // Prepare the data to be stored
    const checkoutData = {
      cartItems,
      totalAmount
    };
  
    // Log the data to the console before storing it
    console.log('Checkout Data:', checkoutData);
  
    // Store both cart items and total in local storage
    localStorage.setItem('total', JSON.stringify(checkoutData));
  }

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
                       <h1 className={style.pageTitle}>My Cart [{cartItems.reduce((total, item) => total + item.count, 0)}]</h1>
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
                                <img src={item.img} alt={`${item.title} image`} />

                                </div>

                                <div className={style['cart_box_right']}>
                                  <div>
                                    <p>{item.title}</p>
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
                                      Remove &nbsp; <RiDeleteBin6Line />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}


                          {/* Grand Total Section */}
                          <div className={style['grand_total']}>
                            <div className={style['grand_total_box']}>
                              <p>Grand Total:<span>SEK {calculateTotal()}</span></p>
                              <Link href="/checkout" >
                              <button onClick={handleProceedToCheckout}>Proceed To Checkout</button>
                              </Link>
                            </div>
                          </div>

                        </>
                      ) : (
                        // Message when cart is empty
                        <p>Cart is empty</p>
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
