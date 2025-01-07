'use client'


import React from 'react';
import Wrapper from '@/layouts/wrapper';
import Error from '@/components/error';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const ErrorPage: React.FC = () => {
  return (
    <CartProvider>
      <ErrorIndex />
    </CartProvider>
  );
}

// export const metadata = {
//   title: "404 error || imvision - Digital  Creative Agency Next js Template",
// };


const ErrorIndex = () => {
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

export default ErrorPage;