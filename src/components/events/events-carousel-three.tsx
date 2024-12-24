'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";
import { Autoplay } from 'swiper/modules';
import axios from 'axios';
import Image from 'next/image';

// Updated interfaces to match the API response structure
interface HomeCarouselProps {
  style_2?: boolean;
  style_3?: boolean;
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
  name: string;
}

interface ImageData {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

interface EventCategory {
  id: number;
  title: string;
  slug: string;
}

interface Event {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  event_category: EventCategory | null;
  thumbnail: ImageData | null;
  images: ImageData[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}


const EventsCarouselThree: React.FC<HomeCarouselProps> = ({ style_2, style_3 }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}events?populate=*&filters[event_category][slug]=government`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        });
        console.log("events:",response.data.data);
        
        // Assuming the events are in response.data.data
        setEvents(response.data.data); // Adjust this based on the actual structure of your API response
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.data || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading events: {error}</div>;
  if (!events.length) return <div>No events found</div>;

  return (
    <section className={`${styles['home-carousel']} ${styles['bg-light-black']}`}>
      <div className="container-fluid">
        <div className="cs_section_heading cs_style_1 cs_type_1 m-same-line">
          <div className="cs_section_heading_text">
            <h3>Recent Events</h3>
          </div>
          <div className="cs_section_heading_right cs_btn_anim">
            <Link href="/blog" className="cs_btn cs_style_1">
              <span>View Store</span>
              <svg
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5303 7.03033C18.8232 6.73744 18.8232 6.26256 18.5303 5.96967L13.7574 1.1967C13.4645 0.903806 12.9896 0.903806 12.6967 1.1967C12.4038 1.48959 12.4038 1.96447 12.6967 2.25736L16.9393 6.5L12.6967 10.7426C12.4038 11.0355 12.4038 11.5104 12.6967 11.8033C12.9896 12.0962 13.4645 12.0962 13.7574 11.8033L18.5303 7.03033ZM0 7.25H18V5.75H0V7.25Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        <Swiper
          modules={[Autoplay]}
          loop={events.length > 1}
          speed={1000}
          spaceBetween={30}
          slidesPerView="auto"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".cs_pagination",
            clickable: true,
          }}
          className={`cs_slider pt-5 cs_slider_3 anim_blog ${style_2 ? '' : 'style_slider'}`}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className={styles['event-item']}>
                <Link href={`/events/${event.slug}`}>
                  {event.thumbnail && (
                    <Image
                      src={event.thumbnail.formats?.medium?.url || event.thumbnail.url}
                      alt={event.title}
                      width={500}
                      height={300}
                      className={styles['event-image']}
                    />
                  )}
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                 
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default EventsCarouselThree;