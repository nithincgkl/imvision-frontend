"use client"
import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { HiOutlineShoppingBag } from "react-icons/hi2";


export default function ProductDetail() {
  const [count, setCount] = useState(0); // Initialize count as 0

  const handleIncrease = () => {
    setCount(count + 1); // Increment count by 1
  };

  const handleDecrease = () => {
    setCount(count - 1); // Decrement count by 1
  };

  return (
    <Wrapper>
    <HeaderOne />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
            <section className={style["product_detail_section"]}>
                <div className='container-fluid my-5'>
                    <div className='d-flex flex-row '>
                        <div className='col-7'>
                            <img src='' alt='' />
                        </div>

                        <div className='col-5'>
                            <h1 className=''>ABSENnicon C Slim Series 165″</h1>
                            <h4 className={`${style.SEK} my-2`}>SEK 55.00  NOK</h4>
                            <div className='d-flex'>
                            <div className={style['button-section']}>
                            <div className={style.itemAdjuster}>
                                        <button onClick={() => handleDecrease()}>-</button>
                                        <span className='m-1'>{count}</span>
                                        <button onClick={() => handleIncrease()}>+</button>
                              </div>
                            <button className={`${style.add_to_cart} ms-4`}>Add to Cart <span><HiOutlineShoppingBag height={50} width={50}/></span></button>
                            <button className='ms-4 fs-5 bg-black border-0'>Quick Enquiry</button>
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

  )
}
