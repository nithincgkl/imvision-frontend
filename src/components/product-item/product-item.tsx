'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { useCart } from '@/context/cart-context'; // Adjust the import path as needed
import styles from './style.module.css';

interface ProductItemProps {
  item: {
    id: any;
    img: any;
    title: string;
    des: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = () => {
    addToCart(item);
    enqueueSnackbar(`${item.title} added to cart`, { variant: 'success' });
  };

  return (
    <div className={styles['our-screen-box']}>
      <div className={styles['main_div']}>
        <div className={`${styles['box']} ${styles['box--top-bot']}`}>
          <div className={`${styles['box__inner']} ${styles['box--top-bot']}`}>
            <div className="cs_post cs_style_1">
              <Link href="/event-details" className={styles['pb-15']}>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={300}
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
                  <button onClick={handleAddToCart}>Add to Cart</button>
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