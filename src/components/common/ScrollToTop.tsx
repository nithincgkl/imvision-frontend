"use client"
import UseSticky from "@/hooks/UseSticky";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";


const ScrollToTop = () => {
  const { sticky }: { sticky: boolean } = UseSticky();

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return (
    <>
     <a className={`cs_scrollup ${sticky ? 'whatsapp-float' : ''} `}
              href="https://wa.me/8714240400" 
              target="_blank" 
              rel="noopener noreferrer" 
              // className="whatsapp-float"
              aria-label="Chat with us on WhatsApp"
              onClick={scrollTop}
            >
              <FaWhatsapp />
            </a>

            <style jsx>{`
        .whatsapp-float {
        position:fixed;
          bottom: 120px;
          right: 40px;
          z-index: 1000;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background-color: #25d366;
          display: flex;
          justify-content: center;
          align-items: center;
              font-size: 37px;
        }

        .whatsapp-float img {
          width: 80%;
          height: 80%;
        }

        .whatsapp-float:hover {
          transform: scale(1.1);
          transition: transform 0.2s;
        }
      `}</style>   
      <span className={`cs_scrollup ${sticky ? 'cs_scrollup_show' : ''}`} onClick={scrollTop}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10L1.7625 11.7625L8.75 4.7875V20H11.25V4.7875L18.225 11.775L20 10L10 0L0 10Z" fill="currentColor"></path>
        </svg>
      </span>

    </>
  );
};

export default ScrollToTop;
