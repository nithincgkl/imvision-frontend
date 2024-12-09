'use client'
import React from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FiDownload } from "react-icons/fi";

// Main ContactPage Component
const RentalConditions = () => {
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

              <div className={style["rental_conditions"]}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <div className={style["rental_conditions_container"]}>
                        <h4>Rental conditions</h4>
                        <ol>
                          <li>The lessee must take good care of the equipment. Damage caused by carelessness is charged regardless of whether the damage was caused by fault or accident.</li>
                          <li>The lessee does not have the right to sell, pledge, transfer or take the equipment out of the country. Nor, in turn, rent or lend the equipment without written consent from IMPROD AB.</li>
                          <li>The equipment must, unless otherwise agreed, be picked up and left at IMPROD AB, Hekulesvägen 56 in Jönköping.</li>
                          <li>Lately returned equipment is charged according to IMPROD AB rental prices calculated after a 1-day rental per started delayed day.</li>
                          <li>The renter is responsible for damage to the rental equipment, theft, etc., and is liable for compensation up to the full value of the equipment as well as other costs incurred by IMPROD AB due to such damage, from the time the equipment leaves IMPROD AB's warehouse until it is returned. This also applies to cases where IMPROD AB arranged/ordered delivery/collection. To the extent that IMPROD AB's own insurance, according to IMPROD AB's assessment, may apply, the lessee is liable for compensation for all costs incurred by IMPROD AB due to such damage, including deductibles agreed in IMPROD AB's insurance.</li>
                          <li>IMPROD AB does not compensate for failed or canceled performances, recordings or the like caused by equipment faults or other circumstances beyond IMPROD AB's control.</li>
                          <li>Cancellation of booked equipment and staff must be done no later than two weeks before the start of the rental period. If cancellation occurs later, 50% of the rental amount will be charged. If cancellation is made the day before or on the same day as the start of the rental period, 100% of the rental amount will be charged. For equipment booked but not collected, the agreed rental cost is charged unless otherwise agreed.</li>
                          <li>If the lessee does not take into account the above rental conditions, delays the agreed payment, goes bankrupt, ends up insolvent, is declared incompetent, dies or in some other way breaks the rental agreement entered into, IMPROD AB has the right to immediately repossess the equipment and cancel the agreement. In that case, the lessee must pay the rental cost until the day IMPROD AB takes the equipment back.</li>                        
                        </ol>
                        <div  className={style["download_btn_container"]}>
                          <div><img src="/assets/images/download.jpg" className="w-100" alt="" /></div>
                          <a 
                            href="/lease-agreement.pdf" 
                            download 
                            className={style["download-link"]}
                          >
                            <h4>Download Lease Agreement</h4>
                            <div className={style["download_btn"]}>
                              <span>PDF  1.5 MB</span>
                              <span><FiDownload /></span>
                            </div>
                          </a>
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