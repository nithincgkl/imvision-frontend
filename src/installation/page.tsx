'use client'
import React, { useState } from 'react';
import HeaderOne from '@/layouts/headers/HeaderOne'
import Wrapper from '@/layouts/wrapper'
import FooterOne from '@/layouts/footers/FooterOne'
import styles from "./style.module.css";
import InstallationBanner from '@/components/common/InstallationBanner';
import InstallationForm from '@/components/common/InstallationForm';

const Index: React.FC = () => {
    return (
        <Wrapper>
            <HeaderOne />
            <div id="smooth-wrapper">
                <div id="smooth-content" className='smooth-content'>
                    <main>
                        <InstallationBanner />

                        <section className={styles["instructions"]}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className={styles["box-container"]}>

                                        <div className={styles["box"]}>
                                            <h6>1</h6>
                                            <p>Maximum length of painted frames 
                                            – 4 meters.</p>
                                        </div>
                                        <div className={styles["box"]}>
                                            <h6>2</h6>
                                            <p>The price of painted frames is indicated for powder paint RAL 6005, polyester, gloss.</p>
                                        </div>
                                        <div className={styles["box"]}>
                                            <h6>3</h6>
                                            <p>Can be performed: drilling, thermal drilling + threading – 10 rubles/hole.</p>
                                        </div>
                                        <div className={styles["box"]}>
                                            <h6>4</h6>
                                            <p>Prices are inclusive of VAT, and include all costs like packing and loading.</p>
                                        </div>
                                        <div className={styles["box"]}>
                                            <h6>5</h6>
                                            <p>For large and/or constant volumes - individual prices are applied.</p>
                                        </div>
                                        <div className={styles["box"]}>
                                            <h6>6</h6>
                                            <p>Non-standard orders are calculated individually.</p>
                                        </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>

                        <InstallationForm />


                        <FooterOne />
                    </main>
                </div>
            </div>
        </Wrapper>
    )
}

export default Index