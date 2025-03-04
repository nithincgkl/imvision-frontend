import React from 'react'

const Order = () => {
  return (
    <div>Order</div>
  )
}

export default Order
// 'use client';

// import React, { Suspense, useEffect, useState } from 'react';
// import Wrapper from '@/layouts/wrapper';
// import FooterOne from '@/layouts/footers/FooterOne';
// import HeaderOne from '@/layouts/headers/HeaderOne';
// import style from "./style.module.css";
// import { CartProvider } from '@/context/cart-context'; // Import the useCart hook
// import { useTranslations } from 'next-intl';

// const OrderSuccess: React.FC = () => {
//   const [orderId, setOrderId] = useState<string | null>(null);

//   useEffect(() => {
//     // Use window.location to get the URL parameters
//     const params = new URLSearchParams(window.location.search);
//     const id = params.get('id'); // Get the 'id' parameter
//     if (id) {
//       setOrderId(id); // Set the order ID if it exists
//     }

//   }, []);

//   useEffect(() => {
//     window.history.pushState(null, '', window.location.href);

//     const handleBackButtonClick = (event: PopStateEvent) => {
//       console.log("Back button was pressed");
//       window.location.replace('/profile');
//     };

//     window.addEventListener('popstate', handleBackButtonClick);

//     return () => {
//       window.removeEventListener('popstate', handleBackButtonClick);
//     };
//   }, []);

//   return (
//     <CartProvider>
//       <Suspense fallback={<div>loading...</div>}>
//         <Page orderId={orderId} />
//       </Suspense>
//     </CartProvider>
//   );
// };


// // Main Page Component
// const Page = ({ orderId }: { orderId: string | null }) => {
//   const t = useTranslations('orderSuccessfull');
//   const handleRedirect = () => {
//     window.location.href = `/products`
//   }
//   return (
//     <Wrapper>
//       <HeaderOne />
//       <div id="smooth-wrapper">
//         <div id="smooth-content">
//           <main>
//             <section className={style.contact_section}>
//               <div className={style["order_successful"]}>
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className={style["order_successful_container"]}>
//                         <div>
//                           <img src="/assets/images/check.svg" className="w-100" alt="" />
//                           <h5>{t("heading")}</h5>
//                           {/* Display the order ID or fallback message */}
//                           <p>
//                             {orderId
//                               ? `${t("para1")}${orderId}${t("para2")}`
//                               : `${t("para3")}`}
//                           </p>
//                           <button className="btn-one" onClick={handleRedirect}>{t("button")}</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </main>
//           {/* Uncomment if you want to include footer */}
//           {/* <FooterOne /> */}
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default OrderSuccess;
