'use client';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";
import { Autoplay } from 'swiper/modules';
import axios from 'axios';
import Image from 'next/image';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

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


const EventsCarouselFour: React.FC<HomeCarouselProps> = ({ style_2, style_3 }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}events?populate=*&filters[event_category][slug]=retail`, {
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

    // Function to handle next slide
    const handleNext = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext();
      }
    };
  
    // Function to handle previous slide
    const handlePrevious = () => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slidePrev();
      }
    };


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
          <div>
              <FaRegArrowAltCircleLeft onClick={handlePrevious} style={{ cursor: 'pointer', height:'40px',width: '40px' }} />
              <FaRegArrowAltCircleRight 
// Increase width
  onClick={handleNext} 
  style={{ cursor: 'pointer', height:'40px',width: '40px' }} 
/>            </div>
          </div>
        </div>

        <Swiper
          ref={swiperRef} // Attach the ref here
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
        <div  className={styles['our-screen-box']}>
                <div className="cs_post cs_style_1">
                  <Link href={`/events/${event.slug}`} className="cs_post_thumb">
                  {event.thumbnail && (
                    <img
                      src={event.thumbnail.formats?.medium?.url || event.thumbnail.url}
                      alt={event.title}
            
                      className={styles['event-image']}
                    />
                  )}
                       </Link>
                  <div className="cs_post_info">
                    <h2 className="cs_post_title">
                      <Link href="/event-details">{event.title}</Link>
                    </h2>
                    <div>
                    <p className="col-12">SEK {event.description}</p>
                    </div>
                    </div>
                    </div>
                    </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default EventsCarouselFour;