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
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('events');
    const recentEvents: RecentEvent[] = [
        {
            id: 1,
            image: "/images/recent-events/01.jpg",
            title: t('recentEvents.transformDealership.title'),
            description: t('recentEvents.transformDealership.description'),
        },
        {
            id: 2,
            image: "/images/recent-events/02.jpg",
            title: t('recentEvents.revUpEvents.title'),
            description: t('recentEvents.revUpEvents.description'),
        },
        {
            id: 3,
            image: "/images/recent-events/03.jpg",
            title: t('recentEvents.automotive.title'),
            description: t('recentEvents.automotive.description'),
        },
        {
            id: 4,
            image: "/images/recent-events/01.jpg",
            title: t('recentEvents.transformDealership.title'),
            description: t('recentEvents.transformDealership.description'),
        },
        {
            id: 5,
            image: "/images/recent-events/02.jpg",
            title: t('recentEvents.revUpEvents.title'),
            description: t('recentEvents.revUpEvents.description'),
        },
        {
            id: 6,
            image: "/images/recent-events/03.jpg",
            title: t('recentEvents.automotive.title'),
            description: t('recentEvents.automotive.description'),
        },
    ];

    const handleTalkToExpert = (e: React.MouseEvent<HTMLButtonElement>) => {
        window.location.href = '/contact';
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
                                    <h1>{t("sections.automotive.title")}</h1>
                                    <Link href="/contact">
                                        <button onClick={handleTalkToExpert} className="btn-one">
                                            {t('talkToExpert')}
                                        </button>
                                    </Link>
                                    <p className="text-center">
                                        {t('bannerDescription.line1')}<br />
                                        {t('bannerDescription.line2')}<br />
                                        {t('bannerDescription.line3')}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <EventsCarousel />
                            </div>
                        </section>

                        <section className={`${style['event-corporate']} bg-light-black`}>
                            <div className={style["event-corporate-container"]}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <img src="/assets/images/events2.jpg" alt="Corporate events" className="w-100" />
                                            <div className={style["event-corporate-text"]}>
                                                <h3 className="text-center">{t('sections.corporate.title')}</h3>
                                                <button onClick={handleTalkToExpert} className="btn-one">
                                                    {t('talkToExpert')}
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                {t('sections.corporate.description.line1')}<br />
                                                {t('sections.corporate.description.line2')}<br />
                                                {t('sections.corporate.description.line3')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <EventsCarouselTwo />
                        </section>

                        <section className={style["event-corporate"]}>
                            <div className={style["event-corporate-container"]}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <img src="/assets/images/government.jpg" alt="Government events" className="w-100" />
                                            <div className={style["event-corporate-text"]} >
                                                <h3 className="text-center">{t('sections.government.title')}</h3>
                                                <button onClick={handleTalkToExpert} className="btn-one">
                                                    {t('talkToExpert')}
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                {t('sections.government.description.line1')}<br />
                                                {t('sections.government.description.line2')}<br />
                                                {t('sections.government.description.line3')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <EventsCarouselThree />
                        </section>

                        <section className={`${style['event-corporate']} bg-light-black`}>
                            <div className={style["event-corporate-container"]}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <img src="/assets/images/retail.jpg" alt="Retail events" className="w-100" />
                                            <div className={style["event-corporate-text"]}>
                                                <h3 className="text-center">{t('sections.retail.title')}</h3>
                                                <button onClick={handleTalkToExpert} className="btn-one">
                                                    {t('talkToExpert')}
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                {t('sections.retail.description.line1')}<br />
                                                {t('sections.retail.description.line2')}<br />
                                                {t('sections.retail.description.line3')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <EventsCarouselFour />
                        </section>
                        <LetsTalk />
                    </main>
                    <FooterOne />
                </div>
            </div>
        </Wrapper>
    );
};

export default Events;