'use client';
import React from 'react';
import Link from 'next/link';
import styles from './style.module.css';

interface ProductItemProps {
  item: {
    id: any;
    img: any; // Use string for dynamic URLs
    title: string;
    des: string;
    slug: string;
    sale_rent: string;
  };
  linkEnabled?: boolean; // Add optional boolean prop to control the link
}

const ProductItem: React.FC<ProductItemProps> = ({ item, linkEnabled = true }) => {
  const productLink = `/products/${item.slug}`; // Link to product page

  const redirectToLogin = () => {
    window.location.href = '/login'; // Adjust the path to your login page
  };

  const addToCart = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

    if (!isLoggedIn) {
      redirectToLogin(); // Redirect to login if not logged in
      return;
    }

    // Create a cart item object
    const cartItem = {
      id: item.id,
      img: item.img,
      title: item.title,
      des: item.des,
      amount: item.des, // Assuming 'des' holds the amount; adjust if necessary
      type: item.sale_rent,
      count: 1, // Start with 1 item added
    };

    // Retrieve existing cart items from local storage
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Check if the item already exists in the cart
    const existingItemIndex = existingCart.findIndex((cart: any) => cart.id === item.id);

    if (existingItemIndex !== -1) {
      // Item already exists in the cart, so update the count
      existingCart[existingItemIndex].count += 1; // Increment count by 1 (or adjust as needed)

      // If the count goes below 1, remove the item from the cart
      if (existingCart[existingItemIndex].count < 1) {
        existingCart.splice(existingItemIndex, 1); // Remove the item
      }
    } else {
      // If item does not exist, add the new item to the cart
      existingCart.push(cartItem);
    }

    // Save updated cart back to local storage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));

    alert(`${item.title} has been added to your cart!`);
  };

  return (
    <div className={styles['our-screen-box']}>
      <div className={styles['main_div']}>
        <div className={`${styles['box']} ${styles['box--top-bot']}`}>
          <div className={`${styles['box__inner']} ${styles['box--top-bot']}`}>
            <div className="cs_post cs_style_1">
              {linkEnabled ? (
                <Link href={productLink} className={styles['pb-15']}>
                  <img
                    src={item.img}
                    alt={item.title}
                    width={300}
                    height={200}
                    className={styles['product-image']}
                  />
                </Link>
              ) : (
                <div className={styles['pb-15']}>
                  <img
                    src={item.img}
                    alt={item.title}
                    width={300}
                    height={200}
                    className={styles['product-image']}
                  />
                </div>
              )}
              <div className="cs_post_info">
                <h2 className="cs_post_title" style={{ minHeight: '60px' }}>
                  {item.title}
                </h2>
                <p className="cs_m0">SEK {item.des}</p>
                <div className={styles['button-section']}>
                  <button onClick={addToCart}>Add to Cart</button>
                  {/* <button onClick={toggleModal}>Quick Enquiry</button> */}
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