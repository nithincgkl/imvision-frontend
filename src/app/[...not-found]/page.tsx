'use client'


import React from 'react';
import Wrapper from '@/layouts/wrapper';
import Error from '@/components/error';

// export const metadata = {
//   title: "404 error || imvision - Digital  Creative Agency Next js Template",
// };


const index = () => {
  return (
    <Wrapper>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Error />
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default index;