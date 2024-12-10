"use client"
import React, { useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { IoLocationOutline, IoChevronDown } from "react-icons/io5";


export default function Profilepage() {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["profile_section"]}>
              
               <h2 className='my-5 pt-2 d-flex justify-content-center col-12'>Your Profile & Settings</h2>
               <div>
                <div className="container d-flex justify-content-center">
                  <div className={`${style.profile_nav} d-flex flex-row gap-3`}>
                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 my-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <h6 className='my-1 ms-1'>Personal</h6>
                    </button>

                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <h6 className='my-1 ms-1'>Orders</h6>
                    </button>

                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={25} width={25} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <h6 className='my-1 ms-1'>Account</h6>
                    </button>
                  </div>
            
                </div>
                <div className='p-5 bg-white container col-12 h-m justify-content-center'>
                  <form className={style.form}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${style.inputField}`}
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                  <label>Name</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${style.inputField}`}
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                  <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className={`form-control ${style.inputField}`}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                  <label>Street Name</label>
                    <input
                      type="text"
                      name="Message"
                      className={`form-control ${style.inputField}`}
                      placeholder="Message"
                    />
                  </div>
            
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                  <label>House Number</label>
                    <input
                      type="text"
                      name="phone"
                      className={`form-control ${style.inputField}`}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                  <label>Postal Code</label>
                    <input
                      type="text"
                      name="Message"
                      className={`form-control ${style.inputField}`}
                      placeholder="Message"
                    />
                  </div>           
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                  <label>City/Town</label>
                    <input
                      type="text"
                      name="phone"
                      className={`form-control ${style.inputField}`}
                      placeholder="Phone"
                    />
                  </div>
                     
                  <div className="col-md-4 mb-3">
                  <label>City/Town</label>

                    <select
                      name="service"
                      className={`form-control ${style.inputField}`}                    
                    >
                      <option value="">Select Service</option>
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                      <option value="Career">Career</option>
                      <option value="Other">Other</option>
                    </select>
                    <IoChevronDown className={style.selectIcon} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <button type="submit" className={style.talk_btn}>
                    Submit
                    </button>
                    <button
                      type="button"
                    
                      className={style.cancel_btn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
                  </div>
              </div>
            </section>


            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  )
}
