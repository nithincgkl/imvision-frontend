"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import LetsTalk from '@/components/home/lets-talk';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ProductItem from "@/components/product-item/product-item";
import axios from 'axios';
import { useParams } from 'next/navigation'; // Use next/navigation to get params
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useSnackbar } from 'notistack'; // Import useSnackbar hook
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import Loader from '@/components/common/Loader';
import { useLocale, useTranslations } from 'next-intl';


const ProductSlug: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <Page />
      </Suspense>
    </CartProvider>
  );
};


interface Product {
  id: string;
  title: string;
  amount: string;
  slug: string;
  description: string;
  qty: number;
  article_code: string;
  sale_rent: string;
  specifications: Specification[];
  thumbnail: Thumbnail;
  product_category: ProductCategory;
  createdAt: Date
  product_images: ProductImage[];
  // other product properties
}

interface ProductImage {
  formats: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
  url: string; // Fallback if formats don't exist
}
interface Specification {

  id: number;
  specification: string;
  specification_title_desc?: SpecificationDetail[];
}

interface SpecificationDetail {
  title: string;
  description: string;
}

interface ProductCategory {
  category_name: string;
}

// Update the Thumbnail interface to include all format sizes
interface Thumbnail {
  formats?: {
    large?: { url: string };
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
  url: string;
}

// Update the OrderDetails interface
interface OrderDetails {
  product_name: string;
  qty: number;
  amount: number;
  product_id: string;
  sale_rent: string;
  article_code: string;
  product_images?: any;
}


const Page: React.FC = () => {
  const t = useTranslations('productDetail');
  const { slug } = useParams(); // Get the slug from the URL
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const modalRef = useRef<HTMLDivElement>(null);
  const { enqueueSnackbar } = useSnackbar(); // Initialize useSnackbar hook
  const [isExpanded, setIsExpanded] = useState(false);
  const swiperRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);  // Add this new state
  const locale = useLocale();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    house_no: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    message: '', // Added message to state
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      house_no: '',
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      message: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      console.error('No user data found in localStorage.');
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.documentId;

    if (!token || !featured) {
      console.error('Missing token or featured product data');
      return;
    }

    // Create order details
    const orderDetails = [{
      product_name: featured.title,
      qty: 1,
      amount: parseFloat(featured.amount),
      product_id: featured.id.toString(),
      sale_rent: featured.sale_rent,
      article_code: featured.article_code,
      product_images: featured.thumbnail?.url
    }];

    // Prepare request data with the correct structure
    const requestData = {
      data: {
        userId,
        order_details: orderDetails,
        total_amount: featured.amount,
        order_note: formData.message || null,
        BillingAddress: {
          FirstName: formData.name,
          LastName: "-", // Added default last name as it's required
          Email: formData.email,
          Phone: formData.phone,
          Street: formData.street,
          HouseNo: formData.house_no,
          City: formData.city,
          PostalCode: formData.postalCode,
          State: formData.state,
          Country: formData.country,
          CompanyName: "-",
          Reference: `-`
        },
        ShippingAddress: {
          FirstName: formData.name,
          LastName: "-", // Added default last name as it's required
          Email: formData.email,
          Phone: formData.phone,
          Street: formData.street,
          HouseNo: formData.house_no,
          City: formData.city,
          PostalCode: formData.postalCode,
          State: formData.state,
          Country: formData.country,
          CompanyName: "-",
          Reference: `-`
        },
        DeliveryStatus: [{
          delivery_status: "PENDING",
          status_updated_at: new Date().toISOString()
        }]
      }
    };
    console.log("Request Data:", requestData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}orders`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // console.log('Order submitted successfully:', response.data);
      enqueueSnackbar(`${t("success")}`, { variant: 'success' });
      resetForm();

      toggleModal(); // Close the modal on success
      // Add success notification here
    } catch (error) {
      console.error('Error submitting order:', error);
      enqueueSnackbar(`${t("error")}`, { variant: 'error' });

      // Add error notification here
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error response:', error.response.data);

      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Close modal when clicking outside of it
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalVisible(false);
    }
  };
  // Image sources array
  const images = featured?.product_images?.map(
    (image) => image.formats?.large?.url || image.url
  ) || [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products?locale=${locale}&page=1&limit=8`;
        const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
        const requestData = {
          categoryIds: [],
          subCategoryIds: [],
          subSubCategoryIds: [],
        };
        const response = await axios.post(API_URL, requestData, {
          headers: { Authorization: `Bearer ${API_TOKEN}` }
        });
        setProducts(response?.data?.products);
      } catch (error) {
        setError(`${t("error2")}`);
      }
    };

    const fetchProductDetails = async () => {
      if (!slug) {
        setError(`${t("error3")}`);
        return;
      }

      try {
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products/${slug}?locale=${locale}`;
        const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${API_TOKEN}` }
        });
        setFeatured(response.data);
      } catch (error) {
        setError(`${t("error4")}`);
      }
    };

    const fetchAllData = async () => {
      setPageLoading(true); // Start with page loading
      setLoading(true);
      try {
        await Promise.all([fetchProducts(), fetchProductDetails()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        // Add a small delay before hiding the page loader to ensure smooth transition
        setTimeout(() => {
          setPageLoading(false);
        }, 300);
      }
    };

    fetchAllData();
  }, [slug]); // Dependencies array includes slug

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first image if we're at the end
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1); // Loop back to last image if we're at the beginning
    }
  };
  const handleDotClick = (index: number) => {
    setCurrentIndex(index); // Set current index based on clicked dot
  };
  const { cartItems, removeFromCart, updateCartItemCount, addToCart } = useCart();

  const redirectToLogin = () => {
    window.location.href = '/login'; // Adjust the path to your login page
  };

  const handleAddToCart = () => {

    const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

    if (!isLoggedIn) {
      redirectToLogin(); // Redirect to login if not logged in
      return;
    }

    if (!featured) return; // Ensure featured product is available

    const cartItem = {
      id: featured.id,
      img: featured.thumbnail.formats?.large?.url || featured.thumbnail.url,
      title: featured.title,
      des: featured.description,
      amount: parseFloat(featured.amount), // Assuming amount is a string, convert to number
      type: featured.sale_rent,
      count: 1,
      article_code: featured.article_code, // Start with 1 item added
    };

    addToCart(cartItem); // Use the addToCart function from the context
    enqueueSnackbar(`${featured.title} ${t("success2")}`, { variant: 'success' });

  };

  const handleIncrease = (id: string) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      updateCartItemCount(id, currentItem.count + 1); // Increase count by 1
    } else {
      // If the item is not in the cart, add it
      handleAddToCart();
    }
  };

  const handleDecrease = (id: string) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (currentItem) {
      const newCount = currentItem.count - 1;
      if (newCount > 0) {
        updateCartItemCount(id, newCount); // Decrease count
      } else {
        removeFromCart(id); // Remove item if count is 0
      }
    }
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Safely access featured.description using optional chaining
  const description = featured?.description ?? ''; // fallback to empty string if null or undefined
  const truncatedDescription = description.slice(0, 900);
  if (pageLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
      >
        <Loader size={300} />
      </div>
    );
  }
  if (error) return <div>{error}</div>; // Show error if any
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["product_detail_section"]}>
              {featured && (

                <div key={featured.id} className="container-fluid my-5">
                  <div className="d-flex flex-md-row flex-column">
                    <div className="col-lg-7 col-md-7 col-12">
                      <div className={style["carousel_container"]}>
                        <div className='d-flex flex-row'>
                          <button onClick={handlePrevious} className={`${style.arrow}`} style={{ visibility: images.length > 1 ? 'visible' : 'hidden' }}>❮</button>
                          <div className={`${style.carousel_image}`}>
                            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                          </div>
                          <button onClick={handleNext} className={`${style.arrow}`} style={{ visibility: images.length > 1 ? 'visible' : 'hidden' }}>❯</button>
                        </div>
                        <div className={`${style.carousel_dots}`}>
                          {images.map((_, index) => (
                            <span
                              key={index}
                              className={`dot ${currentIndex === index ? 'active' : ''}`}
                              onClick={() => handleDotClick(index)}
                              style={{
                                display: 'inline-block',
                                width: currentIndex === index ? '10.5px' : '10px',
                                height: currentIndex === index ? '10.5px' : '10px',
                                backgroundColor: currentIndex === index ? 'white' : 'gray',
                                borderRadius: '60%',
                                margin: '0 2px',
                                cursor: 'pointer',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`${style.main_details} col-lg-5 col-md-5 col-12`}>
                      <h4>{featured.title}</h4>
                      <h5 className={`${style.SEK} my-lg-2 my-md-0`}> SEK {featured.amount} NOK </h5>
                      <div className="d-flex">
                        <div className={style["button-section"]}>
                          <div className={style.itemAdjuster}>
                            <button onClick={() => handleDecrease(featured.id)}>-</button>
                            <span className="m-1">{cartItems.find(item => item.id === featured.id)?.count || 0}</span>
                            <button onClick={() => handleIncrease(featured.id)}>+</button>
                          </div>

                          <div className="d-flex my-md-2">
                            <button
                              className={`${style.add_to_cart} ms-xl-3 ms-lg-1 ms-md-0 ms-0 me-xxl-1 me-xl-1 me-3 me-md-2 my-2`}
                              onClick={handleAddToCart}
                            >
                              {t("add")}
                              <span>
                                <HiOutlineShoppingBag style={{ height: '20px', width: '20px' }} />
                              </span>
                            </button>
                            <button className={`${style.quick_enquiry} fs-5 bg-black border-0 my-md-3`} onClick={toggleModal}> {t("enquiry")} </button>
                          </div>
                        </div>
                      </div>

                      {/* Sale Section */}
                      <div className={`${style.sale_section} my-lg-3 my-md-0`}>
                        <h6 className="ps-4 p-2" style={{ backgroundColor: featured.sale_rent === 'Rent' ? '#5C553A' : '#3F3A5C', }}>{featured.sale_rent}</h6>
                        <div className="p-lg-3 p-md-4 p-4 ps-4 pt-lg-1 pt-md-0 pt-0">
                          <p className="text-success fw-bold">{t("stock")}</p>
                          <p> <span className="fw-bold text-white">{t("code")}</span> {featured.article_code} </p>{" "} {/* Display article code */}
                          <p><span className='fw-bold text-white'>{t("category")}</span> {featured.product_category?.category_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${style.para_section} my-5 `}>
                    <p>
                      {isExpanded ? description : truncatedDescription}
                      {description.length > 900 && (
                        <span
                          className="text-decoration-underline "
                          style={{ cursor: 'pointer' }}
                          onClick={handleReadMore}
                        >
                          {isExpanded ? `${t("less")}` : `${t("more")}`}
                        </span>
                      )}
                    </p>
                  </div>


                  {featured?.specifications && featured.specifications.length > 0 && (
                    <>
                      <h3 className='mb-4'>{t("productSpecification")}</h3>
                      <div className={`${style.product_spec}`}>
                        {featured.specifications.map((spec, index) => (
                          <div key={spec.id} className={`${style.spec_detail}`}>
                            <h5 className='col-md-4 col-12'>{spec.specification}</h5>
                            {spec.specification_title_desc && spec.specification_title_desc.length > 0 && (
                              <div className='col-md-8 col-12' >
                                <div className="row">
                                  {spec.specification_title_desc.map((desc, descIndex) => (
                                    <div className='col-6 ' key={descIndex}>
                                      <p className='fw-bold'>{desc.title}<br /> <span className='fw-thin'>{desc.description}</span></p>
                                    </div>
                                  ))}
                                </div>

                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                </div>
              )}

              {isModalVisible && (
                <div className={style.modal} onClick={handleOutsideClick}>
                  <div ref={modalRef} className={style.modal_content}>
                    <button
                      type="button"
                      className={style.close_btn}
                      onClick={toggleModal} // Close modal when clicked
                    >
                      <IoMdClose />
                    </button>
                    <form className={style.form}>
                      <h4>{t("enquiry")}</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="name"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.name")}
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.email")}
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="phone"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.phone")}
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="house_no"
                            name="house_no"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.building")}
                            value={formData.house_no}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="street"
                            name="street"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.street")}
                            value={formData.street}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="city"
                            name="city"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.city")}
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="state"
                            name="state"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.state")}
                            value={formData.state}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="country"
                            name="country"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.country")}
                            value={formData.country}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="postalCode"
                            name="postalCode"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.postalCode")}
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <textarea
                            name="message"
                            className={`form-control ${style.inputField}`}
                            placeholder={t("placeholder.message")}
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <button onClick={handleSubmit} type="submit" className={style.talk_btn}
                            disabled={isLoading}>
                            {isLoading ? `${t("sending")}` : `${t("send")}`}
                          </button>
                          <button
                            type="button"
                            className={style.cancel_btn}
                            onClick={toggleModal} // Close modal on cancel
                          >
                            {t("cancel")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <div className='my-5 container-fluid'>
                <div className={style.action_container_products}>
                  <h3> {t("related")}</h3>
                  <div className={style.arrows}>
                    <FaRegArrowAltCircleLeft
                      onClick={() => swiperRef.current?.slidePrev()}
                      style={{ cursor: 'pointer', height: '40px', width: '40px' }}
                      className={style.arrowIcon}
                    />
                    <FaRegArrowAltCircleRight
                      onClick={() => swiperRef.current?.slideNext()}
                      style={{ cursor: 'pointer', height: '40px', width: '40px' }}
                      className={style.arrowIcon}
                    />
                  </div>
                </div>
                <div className="d-flex">

                  <Swiper
                    modules={[Autoplay]}
                    loop={true}
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
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign Swiper instance to ref
                    className={`cs_slider pt-5 cs_slider_3 anim_blog ${style ? '' : 'style_slider'}`}
                  >
                    {products.map((product) => (
                      <SwiperSlide key={product.id} className="swiper-slide">
                        <Link href={`/products/${product.slug}`} passHref>
                          <ProductItem
                            item={{
                              id: product.id,
                              img: product.thumbnail?.formats?.large?.url || product.thumbnail?.url,
                              title: product.title,
                              des: product.amount,
                              slug: product.slug,
                              sale_rent: product.sale_rent,
                              article_code: product.article_code,
                              amount: product.amount,// Correctly pass the slug,
                              createdAt: product.createdAt

                            }}
                            linkEnabled={false} // Link is enabled, will navigate to product page

                          />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
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
}

export default ProductSlug;
