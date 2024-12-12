'use client';
import React from 'react';
import Link from 'next/link'; // Import Image from Next.js
import styles from './style.module.css';
import Image from 'next/image';

interface ProductItemProps {
  item: {
    id: any;
    img: any; // Use string for dynamic URLs
    title: string;
    des: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div className={styles['our-screen-box']}>
      <div className={styles['main_div']}>
        <div className={`${styles['box']} ${styles['box--top-bot']}`}>
          <div className={`${styles['box__inner']} ${styles['box--top-bot']}`}>
            <div className="cs_post cs_style_1">
              <Link href="/event-details" className={styles['pb-15']}>
                {/* Use the imported image directly */}
                <img
                  src={item.img} // Use directly without concatenation
                  alt={item.title}
                  width={300} // Provide dimensions
                  height={200}
                  className={styles['product-image']}
                />
              </Link>
              <div className="cs_post_info">
                <h2 className="cs_post_title">
                  <Link href="/event-details">{item.title}</Link>
                </h2>
                <p className="cs_m0">SEK {item.des}</p>
                <div className={styles['button-section']}>
                  <button>Add to Cart</button>
                  <button>Quick Enquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
