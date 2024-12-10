'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from './style.module.css';
import LetsTalk from '@/components/home/lets-talk';

const RentalConditions = () => {
  const [startDate, setStartDate] = useState<Date>(new Date()); // Default to today
  const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000)); // Default to tomorrow
  const [itemCount, setItemCount] = useState<number>(1);

  const handleIncrease = () => setItemCount((prevCount) => prevCount + 1);
  const handleDecrease = () => setItemCount((prevCount) => Math.max(1, prevCount - 1)); // Minimum count is 1

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
        <span className={style.calendarIcon}>
          📅
        </span>
      </div>
    )
  );

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
                      <div className={style['cart_box']}>
                        <div className={style['cart_box_header']}>
                          <div>
                            <p>Rental</p>
                          </div>
                          <div className='float-left'>
                            <p className='float-start'>Select Rental Period:</p>
                            <div className={style.datePickers}>
                              <div className={style.datePickerLabel}>
                                <span>From:</span>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date || new Date())}
                                  customInput={<CalendarInput />}
                                  dateFormat="yyyy-MM-dd"
                                />
                              </div>
                              <div className={style.datePickerLabel}>
                                <span>To:</span>
                                <DatePicker
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date || new Date())}
                                  customInput={<CalendarInput />}
                                  dateFormat="yyyy-MM-dd"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={style['cart_box_header']}>
                          <div>
                            <img
                              src="/assets/images/events.jpg"
                              className="w-100"
                              alt="Events banner"
                            />
                          </div>
                          <div>
                            <p>ABSENnicon C Slim Series 165″</p>
                            <br />
                            <div className={style.itemAdjuster}>
                              <button onClick={handleDecrease}>-</button>
                              <span>{itemCount}</span>
                              <button onClick={handleIncrease}>+</button>
                            </div>
                            <p>SEK 100.00</p>
                          </div>
                          <div>
                            <button>Remove</button>
                          </div>
                        </div>
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
