"use client"
import React, { useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const About: React.FC = () => {
  return (
    <CartProvider>
      <AboutPage />
    </CartProvider>
  );
}

const AboutPage = () => {
  useEffect(() => {
    const rectangles: NodeListOf<Element> = document.querySelectorAll(".line-mask");

    const handleScroll = () => {
      // Calculate the scroll percentage for vertical scroll
      const scrollPercentage: number =
        (document.documentElement.scrollTop + window.innerHeight) /
        document.documentElement.scrollHeight;

      rectangles.forEach((rectangle) => {
        // Get the vertical position of the rectangle element
        const rectangleTop: number =
          rectangle.getBoundingClientRect().top + rectangle.clientHeight / 2;

        // Adjust the height calculation to increase sensitivity
        const sensitivity = 200; // Decrease this value to make it more sensitive (faster change)
        const heightPercentage: number =
          100 - Math.min((scrollPercentage - rectangleTop / document.documentElement.scrollHeight) * sensitivity, 100);

        // Apply the new height value, ensuring it doesn't go below 0%
        (rectangle as HTMLElement).style.height = `${Math.max(heightPercentage, 0)}%`;
      });
    };

    // Attach the scroll event listener when the component is mounted
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>


            <section className={style.about_section}>

              <div className={style["about_banner"]}>
                <div className="container-fluid my-5" >
                  <div className="row">
                    <div className="col-md-8">
                      <h1 className={style.pageTitle}>
                        Experts In LED Solutions
                        <br /> For All Types Of Purpose
                      </h1>
                    </div>
                    <div className="col-md-4">
                      <p className={style["header-secondary-text"]}>
                        IM vision is a professional and reliable partner and we<br className='d-xl-block d-lg-none d-md-none d-none' />
                        are with you all the way from order to execution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="container-fluid my-4">
                  <div className="row">
                    <div >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={style["about_video"]}
                      >
                        <source src="/assets/videos/about.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-5">
                <div className="d-flex flex-row gap-md-5 gap-4 bg-black justify-content-center col-12">
                  <div className={style.about_years}>
                    <h1>
                      10<span>+</span>
                      <br />
                      <p className=''>YEARS</p>
                    </h1>
                  </div>
                  <div>
                    <h4 className={`${style.about_years_para} my-md-4 my-3 pt-md-3 pt-0`}>
                      With more than 10 years of
                      <br className='d-md-block d-none' />
                      experience, we are the market
                      <br className='d-md-block d-none' />
                      leader in large LED screens.
                    </h4>
                  </div>
                </div>
              </div>

              {/* ||||card1 |||||| */}
              <div className={`d-flex flex-md-row flex-column container gap-md-5 gap-3 pb-2`}>
                <div
                  className={`${style.about_card1} text-black ms-xxl-5 ms-xl-2`}
                  style={{ background: '#9FDEBE', paddingRight: '55px', paddingLeft: '35px' }}
                >
                  <h2 className="fw-bold text-black">2400 m²</h2>
                  <p>
                    LED screens in stock for rental, with our flexible
                    <br className='d-lg-block d-md-none d-none' />
                    cabinets you can choose the size of your screen
                    <br className='d-lg-block d-md-none d-none' />
                    yourself. We deliver according to your wishes.
                  </p>
                </div>

                <div className={`${style.about_card1}`}>
                  <h2 className="fw-bold">8St</h2>
                  <p>
                    We have mobile screens
                    <br className='d-lg-block d-md-none d-none' />
                    in sizes 7-28 sq m for quick
                    <br className='d-lg-block d-md-none d-none' />
                    delivery and easy set up.
                  </p>
                </div>

                <div className={`${style.about_card1}`}>
                  <h2 className="fw-bold">220m²</h2>
                  <p>
                    We always have sales stock
                    <br className='d-lg-block d-md-none d-none' />
                    of LEDs for quick installations
                  </p>
                </div>
              </div>

              <div className={`${style.whoVR} container pb-5`}>
                <div>
                  <h3 className="">Who we are</h3><br />
                  <div className="">
                    <div className={`line position-relative text-white`}>
                      <div className={`${style.whoVR_para} pt-3 d-flex flex-row`}>
                        <div className='d-flex flex-column gap-2'>
                          <div className={`${style.para_ball}`}></div>
                          <div className={`${style.para_line}`}></div>
                        </div>
                        <p className='pb-3'>
                          Connection and collaboration without boundaries are essential for progress. At IMvision, we believe that intelligent <br className='d-lg-block d-md-none d-none' />solutions are the
                          driving force behind both economic and social development.
                        </p>
                      </div>

                      <div className={`${style.whoVR_para} `}>
                        <div className='d-flex flex-column gap-2'>
                          <div className={`${style.para_ball}`} style={{ height: '27px' }}></div>
                          <div className={`${style.para_line}`}></div>
                        </div>
                        <p>
                          With this in mind, IMvision was created as a platform where information
                          flows seamlessly, fostering creativity and innovation. Our goal is to<br className='d-lg-block d-md-none d-none' />
                          empower a space—both physical and virtual—where genuine
                          connections can be made, and collaboration thrives, whether offline or<br className='d-lg-block d-md-none d-none' />
                          online.
                        </p>
                      </div>

                      <div className={`${style.whoVR_para}`}>
                        <div className='d-flex flex-column gap-2'>
                          <div className={`${style.para_ball}`} style={{ height: '29px' }}></div>
                          <div className={`${style.para_line}`}></div>
                        </div>
                        <p>
                          The name IMvision reflects our commitment to intelligent display
                          solutions that bring people together. <br className='d-lg-block d-md-none d-none' />We aim to provide advanced,
                          integrated technology to elevate organizational efficiency and enhance<br className='d-lg-block d-md-none d-none' />
                          communication.
                        </p>
                      </div>

                      <div className={`${style.whoVR_para}`}>
                        <div className='d-flex flex-column'>
                          <div className={`${style.para_ball}`} style={{ height: '22px' }}></div>
                        </div>
                        <p>
                          By eliminating barriers to connection, we create environments that
                          inspire innovation, enabling full immersion and sparking new<br className='d-lg-block d-md-none d-none' />
                          possibilities for growth. At IMvision, we don’t just rent displays—we
                          help build the future of collaboration.
                        </p>
                      </div>
                      <div className='line-mask d-lg-block d-md-none d-none position-absolute bg-black z-1' style={{ right: '0', width: '100%', bottom: '-10px', opacity: '0.5' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`d-flex flex-lg-row flex-md-column flex-column container mx-auto gap-lg-3 gap-md-3 gap-3 pb-2 col-12`}>
                <div
                  className={`${style.about_card2} ms-xxl-5 ms-xl-2`}
                >
                  <h2 className="fw-bold">01</h2>
                  <p className=''>
                    IM Vision, based in Jönköping, has all of Sweden as a workplace. Our journey started 10 years ago and we have since grown and become a leader in LED screens. We are the small company with the big commitment.
                  </p>
                </div>

                <div className={`${style.about_card2}`}>
                  <h2 className="fw-bold">02</h2>
                  <p>
                    With long and broad experience from LED screens, there are many market-leading companies among our partners, including in the automotive and fitness industry as well as retail chains and arena events.
                  </p>
                </div>

                <div className={`${style.about_card2}`}>
                  <h2 className="fw-bold">03</h2>
                  <p>
                    But we don't want to stop there. We constantly strive to broaden our contact network and to package our offer and delivery in the best way. Maybe you are our new customer?
                  </p>
                </div>

                <div className={`${style.about_card2}`}>
                  <h2 className="fw-bold">04</h2>
                  <p>
                    With us, constant development is the only constant and our goal is to be the best solution in large LED screens. Welcome to IM Vision!
                  </p>
                </div>
              </div>


            </section>

            <LetsTalk />
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
