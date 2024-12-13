"use client"
import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';

export default function ProductDetail() {
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
                            <button>Add to Cart</button>
                            <button>Quick Enquiry</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </section>      
        </main>
        <FooterOne />
      </div>
    </div>
  </Wrapper>

  )
}
