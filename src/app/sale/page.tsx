'use client'
import style from "./style.module.css";
import React, { useState } from 'react';
import HeaderOne from '@/layouts/headers/HeaderOne'
import Wrapper from '@/layouts/wrapper'
import LetsTalk from '@/components/home/lets-talk'
import FooterOne from '@/layouts/footers/FooterOne'


const Page: React.FC = () => {
    return (


        <Wrapper>
            <HeaderOne />
            <div id="smooth-wrapper">
                <div id="smooth-content" className='smooth-content'>
                    <main>
                        <section className={style["without-banner"]}>
                            <div className={style["sale_container"]}>


                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <h1 className={style.pageTitle}>Event Gallery</h1>
                                            {/* Add breadcrumb or other top content if needed */}
                                        </div>
                                    </div>
                                </div>


                                <div className={style["sale_filter_container"]}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-6">
                                                <button className={style.filter_button}>Filter Product List </button>
                                            </div>
                                            <div className="col-6">
                                                <div className={style.sale_filter_right}>

                                                    <button>Default Sorting</button>
                                                    <p>Showing 1-12 of 92 results</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </section>




                        <LetsTalk />
                        <FooterOne />
                    </main>
                </div>
            </div>
        </Wrapper>



    );
};

export default Page;
