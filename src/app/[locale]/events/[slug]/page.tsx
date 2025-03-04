import React from 'react'

const Events = () => {
  return (
    <div>Events</div>
  )
}

export default Events
// 'use client';

// import React, { Suspense, useEffect, useState } from "react";
// import style from "./style.module.css";
// import Wrapper from "@/layouts/wrapper";
// import FooterOne from "@/layouts/footers/FooterOne";
// import HeaderOne from "@/layouts/headers/HeaderOne";

// import LetsTalk from "@/components/home/lets-talk";
// import EventGallery from "@/components/event-details/event-gallery";
// import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
// import axios from "axios";
// import { useParams } from 'next/navigation';
// import Loader from "@/components/common/Loader";
// import { useLocale, useTranslations } from 'next-intl';

// const EventDetails: React.FC = () => {
//     return (
//         <CartProvider>
//             <Suspense fallback={<div>loading...</div>}>
//                 <Page />
//             </Suspense>
//         </CartProvider>
//     );
// };

// interface RecentEvent {
//     id: number;
//     image: string;
//     title: string;
//     description: string;
// }
// interface ImageData {
//     id: number;
//     name: string;
//     url: string;
//     formats: {
//         thumbnail?: ImageFormat;
//         small?: ImageFormat;
//         medium?: ImageFormat;
//         large?: ImageFormat;
//     };
// }
// interface ImageFormat {
//     url: string;
//     width: number;
//     height: number;
//     name: string;
// }
// interface Event {
//     id: number;
//     documentId: string;
//     title: string;
//     description: string;
//     slug: string;
//     event_category: EventCategory | null;
//     thumbnail: ImageData | null;
//     images: ImageData[];
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
// }
// interface EventCategory {
//     id: number;
//     title: string;
//     slug: string;
// }
// const Page: React.FC = () => {
//     const [events, setEvents] = useState<Event>();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const { slug } = useParams();
//     const locale = useLocale();

//     const t = useTranslations('events');

//     const recentEvents: RecentEvent[] = [
//         {
//             id: 1,
//             image: "/images/recent-events/01.jpg",
//             title: "Transform Your Dealership",
//             description:
//                 "Showcase vehicle design and performance in stunning visual clarity and scale that compels customers to get behind the wheel today.",
//         },
//         {
//             id: 2,
//             image: "/images/recent-events/02.jpg",
//             title: "Rev Up Your Events",
//             description:
//                 "Elevate your car dealership's visibility with our stunning LED screens.Rent cutting-edge displays that capture attention and drive sales.Transform your showroom into a modern retail experience.",
//         },
//         {
//             id: 3,
//             image: "/images/recent-events/03.jpg",
//             title: "Automotive",
//             description:
//                 "Rev up your automotive events with vibrant LED screens.Our rentals deliver crystal-clear visuals, engaging audiences and amplifying your brand.",
//         },
//         {
//             id: 4,
//             image: "/images/recent-events/01.jpg",
//             title: "Transform Your Dealership",
//             description:
//                 "Showcase vehicle design and performance in stunning visual clarity and scale that compels customers to get behind the wheel today.",
//         },
//         {
//             id: 5,
//             image: "/images/recent-events/02.jpg",
//             title: "Rev Up Your Events",
//             description:
//                 "Elevate your car dealership's visibility with our stunning LED screens.Rent cutting-edge displays that capture attention and drive sales.Transform your showroom into a modern retail experience.",
//         },
//         {
//             id: 6,
//             image: "/images/recent-events/03.jpg",
//             title: "Automotive",
//             description:
//                 "Rev up your automotive events with vibrant LED screens.Our rentals deliver crystal-clear visuals, engaging audiences and amplifying your brand.",
//         },
//     ];

//     const handleTalkToExpert = (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         // Add your talk to expert logic here
//         console.log('Talk to expert clicked');
//     };
//     const fetchEvents = async () => {
//         try {
//             console.log(`${process.env.NEXT_PUBLIC_API_URL}events?${slug}`)
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}events/${slug}?locale=${locale}`, {
//                 headers: {
//                     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
//                 },
//             });
//             setEvents(response.data.data);
//             console.log(response.data)
//         } catch (err: unknown) {
//             if (axios.isAxiosError(err)) {
//                 setError(err.response?.data.data || 'An error occurred');
//             } else {
//                 setError('An unexpected error occurred');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchEvents();
//     }, []);
//     const image = (param: string | undefined) => {
//         if (param === "Automotive") {
//             return "/assets/images/events.jpg"
//         }
//         else if (param === "Corporate") {
//             return "/assets/images/events2.jpg"
//         }
//         else if (param === "Government") {
//             return "/assets/images/government.jpg"
//         }
//         else if (param === "Retail") {
//             return "/assets/images/retail.jpg"
//         }
//         else {
//             return "/assets/images/events.jpg"
//         }
//     }

//     if (loading) {
//         return (
//             <div
//                 style={{
//                     position: 'fixed',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100vh',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     zIndex: 9999
//                 }}
//             >
//                 <Loader size={300} />
//             </div>
//         );
//     }
//     if (error) return <div>{t("eventCarousel.error")} {error}</div>;
//     return (
//         <Wrapper>
//             <HeaderOne />
//             <div id="smooth-wrapper">
//                 <div id="smooth-content">
//                     <main>
//                         <section className={style["event-banner"]}>
//                             <div className="container">
//                                 <div className={style["image_container"]}>
//                                     <img src={image(events?.event_category?.title)} className={`w-100 ${style["image_banner"]}`} alt="Events banner" />
//                                 </div>
//                                 <div className={style["event-banner-text"]}>
//                                     <h1>{events?.title}</h1>
//                                     <button onClick={handleTalkToExpert} className="btn-one">{t("eventCarousel.buttonText")}</button>
//                                     <p className="text-center">{events?.description}</p>
//                                 </div>
//                             </div>
//                         </section>
//                         <EventGallery slug={events?.event_category?.slug} />
//                         <LetsTalk />
//                     </main>
//                     <FooterOne />
//                 </div>
//             </div>
//         </Wrapper>
//     );
// };

// export default EventDetails;