'use client'

import ContactArea from '@/components/contact/ContactArea';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import React from 'react';

// export const metadata = {
//   title: "Contact imvision - Digital  Creative Agency Next js Template",  
// };


const index = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
        <ContactArea />
        </main>
        <FooterOne />
      </div>
      </div>
    </Wrapper>
  );
};

export default index;