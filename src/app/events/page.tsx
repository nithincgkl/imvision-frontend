'use client';

import React from "react";
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";

import EventsCarousel from "@/components/events/events-carousel";
import EventsCarouselTwo from "@/components/events/events-carousel-two";
import EventsCarouselThree from "@/components/events/events-carousel-three";
import EventsCarouselFour from "@/components/events/events-carousel-four";
import LetsTalk from "@/components/home/lets-talk";
import Link from "next/link";
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const Events: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};

 
interface RecentEvent {
  id: number;
  image: string;
  title: string;
  description: string;
}

const Page: React.FC = () => {
  const recentEvents: RecentEvent[] = [
    {
      id: 1,
      image: "/images/recent-events/01.jpg",
      title: "Transform Your Dealership",
      description:
        "Showcase vehicle design and performance in stunning visual clarity and scale that compels customers to get behind the wheel today.",
    },
    {
      id: 2,
      image: "/images/recent-events/02.jpg",
      title: "Rev Up Your Events",
      description:
        "Elevate your car dealership's visibility with our stunning LED screens.Rent cutting-edge displays that capture attention and drive sales.Transform your showroom into a modern retail experience.",
    },
    {
      id: 3,
      image: "/images/recent-events/03.jpg",
      title: "Automotive",
      description:
        "Rev up your automotive events with vibrant LED screens.Our rentals deliver crystal-clear visuals, engaging audiences and amplifying your brand.",
    },
    {
      id: 4,
      image: "/images/recent-events/01.jpg",
      title: "Transform Your Dealership",
      description:
        "Showcase vehicle design and performance in stunning visual clarity and scale that compels customers to get behind the wheel today.",
    },
    {
      id: 5,
      image: "/images/recent-events/02.jpg",
      title: "Rev Up Your Events",
      description:
        "Elevate your car dealership's visibility with our stunning LED screens.Rent cutting-edge displays that capture attention and drive sales.Transform your showroom into a modern retail experience.",
    },
    {
      id: 6,
      image: "/images/recent-events/03.jpg",
      title: "Automotive",
      description:
        "Rev up your automotive events with vibrant LED screens.Our rentals deliver crystal-clear visuals, engaging audiences and amplifying your brand.",
    },
  ];

  const handleTalkToExpert = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Add your talk to expert logic here
    console.log('Talk to expert clicked');
  };

  return (
    <Wrapper>
        <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["event-banner"]}>
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-1">
                  <img src="/assets/images/events.jpg" className="w-100" alt="Events banner" />
                </div>
                <div className={style["event-banner-text"]}>
                  <h1>Automotive</h1>
                  <Link href="/contact">
                  <button onClick={handleTalkToExpert} className="btn-one">Talk to Expert</button>
                  </Link>
                  <p className="text-center">
                    Rev up your automotive events with vibrant LED screens.
                    <br />
                    Our rentals deliver crystal-clear visuals, engaging audiences and
                    amplifying your brand.
                    <br />
                    Take your car shows, launches, and exhibitions to the next level.
                  </p>
                </div>
              </div>
            </section>

            <EventsCarousel /> 

            

            
            <section className={`${style['event-corporate']} bg-light-black`}>

            
              <div className={style["event-corporate-container"]}>
              <div className="container-fluid">
                  <div className="row">

                  <div className="col-md-12">
                    <img src="/assets/images/events2.jpg" alt="Corporate events" className="w-100" />
                    <div className={style["event-corporate-text"]}>
                      <h3 className="text-center">Corporate</h3>
                      <button onClick={handleTalkToExpert} className="btn-one">Talk to Expert</button>
                    </div>
                    <div className="text-center">
                      Rev up your automotive events with vibrant LED screens.
                      <br />
                      Our rentals deliver crystal-clear visuals, engaging audiences
                      and amplifying your brand.
                      <br />
                      Take your car shows, launches, and exhibitions to the next
                      level.
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <EventsCarouselTwo /> 

            <section className={style["event-corporate"]}>
              <div className={style["event-corporate-container"]}>
              <div className="container-fluid">
                  <div className="row">

                  <div className="col-md-12">
                    <img src="/assets/images/government.jpg" alt="Government events" className="w-100" />
                    <div className={style["event-corporate-text"]} >
                      <h3 className="text-center">Government</h3>
                      <button onClick={handleTalkToExpert} className="btn-one">Talk to Expert</button>
                    </div>
                    <div className="text-center">
                      Rev up your automotive events with vibrant LED screens.
                      <br />
                      Our rentals deliver crystal-clear visuals, engaging audiences
                      and amplifying your brand.
                      <br />
                      Take your car shows, launches, and exhibitions to the next
                      level.
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <EventsCarouselThree />

            <section className={`${style['event-corporate']} bg-light-black`}>
              <div className={style["event-corporate-container"]}>
                <div className="container-fluid">
                  <div className="row">
                 <div className="col-md-12">
                    <img src="/assets/images/retail.jpg" alt="Retail events" className="w-100" />
                    <div className={style["event-corporate-text"]}>
                      <h3 className="text-center">Retail</h3>
                      <button onClick={handleTalkToExpert} className="btn-one">Talk to Expert</button>
                    </div>
                    <div className="text-center">
                      Rev up your automotive events with vibrant LED screens.
                      <br />
                      Our rentals deliver crystal-clear visuals, engaging audiences
                      and amplifying your brand.
                      <br />
                      Take your car shows, launches, and exhibitions to the next
                      level.
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </section>
            
            <EventsCarouselFour /> 
            
            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default Events;