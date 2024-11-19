'use client';
import React from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Filter from "@/components/sale/filter";
import ProductItem from "@/components/product-item/product-item";

import blog_img_1 from "../../../public/assets/images/post/01.jpg";
import blog_img_2 from "../../../public/assets/images/post/02.jpg";
import blog_img_3 from "../../../public/assets/images/post/03.jpg";
import blog_img_4 from "../../../public/assets/images/post/04.jpg";
import blog_img_5 from "../../../public/assets/images/post/01.jpg";
import blog_img_6 from "../../../public/assets/images/post/02.jpg";
import blog_img_7 from "../../../public/assets/images/post/03.jpg";
import blog_img_8 from "../../../public/assets/images/post/04.jpg";
import blog_img_9 from "../../../public/assets/images/post/01.jpg";
import blog_img_10 from "../../../public/assets/images/post/02.jpg";
import blog_img_11 from "../../../public/assets/images/post/03.jpg";
import blog_img_12 from "../../../public/assets/images/post/04.jpg";
import LetsTalk from '@/components/home/lets-talk';

const blog_data = [
  {
    id: 1,
    img: blog_img_1,
    title: `496×496 P1.9 Corner`,
    des: `1274`,
  },
  {
    id: 2,
    img: blog_img_2,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 3,
    img: blog_img_3,
    title: `ABSENnicon C Slim Series 138″`,
    des: `3000`,
  },
  {
    id: 4,
    img: blog_img_4,
    title: `ABSENnicon C Slim Series 154`,
    des: `6222`,
  },
  {
    id: 5,
    img: blog_img_5,
    title: `496×496 P1.9 Corner`,
    des: `1274`,
  },
  {
    id: 6,
    img: blog_img_6,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 7,
    img: blog_img_7,
    title: `ABSENnicon C Slim Series 138″`,
    des: `3000`,
  },
  {
    id: 8,
    img: blog_img_8,
    title: `ABSENnicon C Slim Series 154`,
    des: `6222`,
  },
  {
    id: 9,
    img: blog_img_9,
    title: `496×496 P1.9 Corner`,
    des: `1274`,
  },
  {
    id: 10,
    img: blog_img_10,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 11,
    img: blog_img_11,
    title: `ABSENnicon C Slim Series 138″`,
    des: `3000`,
  },
  {
    id: 12,
    img: blog_img_12,
    title: `ABSENnicon C Slim Series 154`,
    des: `6222`,
  },
];

const Page: React.FC = () => {
  return (
    <Wrapper>
      <HeaderOne />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className={style["without-banner"]}>
              {/* Common Top Section */}
              <div className={style.topSection}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h1 className={style.pageTitle}>All Products</h1>
                    </div>
                  </div>
                </div>
              </div>

              <Filter />

              <section className={style["product_section"]}>
                <div className="container-fluid">
                  <div className="row">
                    {blog_data.map((item) => (
                      <div className="col-3" key={item.id}>
                        <ProductItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <LetsTalk />
            </div>
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
