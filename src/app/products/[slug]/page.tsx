"use client"; 
import React, { useState, useEffect, useRef } from 'react'; 
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

interface Product {
    id: number;
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

interface Thumbnail {
    formats?: {
        large?: {
            url: string;
        };
    };
    url: string;
}

interface ProductCategory {
    category_name: string;
}

const Page: React.FC = () => {
    const { slug } = useParams(); // Get the slug from the URL
    const [count, setCount] = useState(0); 
    const [products, setProducts] = useState<Product[]>([]); 
    const [featured, setFeatured] = useState<Product | null>(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 
    const [currentIndex, setCurrentIndex] = useState(0); // Track current image index
    const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        house_no: '',
        street:'',
        city:'',
        country:'',
        state:'',
        postal_code:'',
        message: '', // Added message to state
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Debug log - check if we have the required data
        console.log('Featured Product:', featured);
        console.log('Count:', count);
        console.log('Form Data:', formData);
    
        const token = localStorage.getItem('token');
        const storedUser   = localStorage.getItem('user');
    
        if (!storedUser   || !token) {
            console.error('Missing user data or token');
            return;
        }
    
        const user = JSON.parse(storedUser  );
        const userId = user.documentId;
    
        // Determine if this is a quick enquiry or an order
        const isQuickEnquiry = count === 0; // Assuming count of 0 indicates a quick enquiry

        // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
        // Create the order details object
        const orderDetails = featured ? [{
            product_name: featured.title, // Product name
            qty: isQuickEnquiry ? 1 : count, // Set qty to 1 for quick enquiry
            amount: parseFloat(featured.amount), // Amount
            product_id: featured.id.toString(), // Product ID as string
            product_images: [
                {
                    url: featured.thumbnail?.formats?.large?.url || 
                         featured.thumbnail?.url || 
                         ''
                }
            ].filter(img => img.url), // Remove empty URLs
            article_code: featured.article_code, // Article code
            sale_rent: featured.sale_rent // Sale or Rent
        }] : [];
    
        // Calculate total amount
        const totalAmount = orderDetails.reduce((total, item) => total + (item.amount * item.qty), 0);
    
        // Create billing address object
        const billingAddress = {
            FirstName: formData.name || '',
            LastName: '-', // You might want to capture last name as well
            Email: formData.email || '',
            Phone: formData.phone || '',
            Street: formData.street || '',
            HouseNo: formData.house_no || '',
            City: formData.city || '',
            PostalCode: formData.postal_code || '',
            State: formData.state || '',
            Country: formData.country || '',
            CompanyName: '-', // If applicable, capture company name
            Reference: '-', // If applicable, capture reference
        };
    
        const requestData = {
            data: {
                userId: userId,
                order_details: orderDetails,
                total_amount: totalAmount, // Use calculated total amount
                BillingAddress: billingAddress,
                ShippingAddress: billingAddress, // Use same address for shipping
                DeliveryStatus: [{
                    delivery_status: 'PENDING',
                    status_updated_at: new Date().toISOString(),
                }],
                order_note: formData.message || '-', // Include message for quick enquiry
            }
        };
    
        // Debug log - check final request data
        console.log('Request Data:', JSON.stringify(requestData, null, 2));
    
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}orders`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                       
                    }
                }
            );
    
            // Debug log - check response
     console.log('Response:', response.data);
    
            if (response.data) {
                alert('Your enquiry has been submitted successfully!');
                toggleModal();
            }
        } catch (error: any) {
            // Log the error response for more details
            console.error('Error response:', error.response?.data);
            console.error('Error message:', error.message);
            alert('Failed to submit enquiry. Please check the console for details.');
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
    const images = featured?.thumbnail?.formats?.large?.url 
        ? [featured.thumbnail.formats.large.url] 
        : [featured?.thumbnail?.url];

    useEffect(() => {  
        const fetchProducts = async () => { 
            try { 
                const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products`; 
                const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN; 
                const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
                setProducts(response.data); 
            } catch (error) { 
                setError("Error fetching product data."); 
            } 
        }; 

        const fetchProductDetails = async () => {
            if (!slug) {
                setError("Product slug is undefined."); 
                setLoading(false); 
                return; 
            }

            try {
                const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products/${slug}`;  
                const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;  
                const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${API_TOKEN}` } });  
                setFeatured(response.data); 
            } catch (error) {
                setError("Error fetching product details.");  
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();  
        fetchProductDetails();  

    }, [slug]);

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0 ); // Loop back to first image if we're at the end
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

    const handleIncrease = () => setCount(count + 1); 
    const handleDecrease = () => setCount(count > 0 ? count - 1 : 0); 

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
            id: featured?.id,
            img: featured?.thumbnail?.formats?.large?.url || featured?.thumbnail?.url,
            title: featured?.title,
            amount: featured?.amount,
            type: featured?.sale_rent,
            count: count, // Use the count from the state
        };

        // Retrieve existing cart items from local storage
        const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

        // Check if the item already exists in the cart
        const existingItemIndex = existingCart.findIndex((cart: any) => cart.id === cartItem.id);

        if (existingItemIndex !== -1) {
            // Item already exists in the cart, so update the count
            existingCart[existingItemIndex].count += count; // Increment count by the current count

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

        alert(`${featured?.title} has been added to your cart!`);
    };

    if (loading) return <div>Loading...</div>; // Show loading state
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
                                                <button onClick={handlePrevious} className={`${style.arrow}`}>❮</button>
                                                <div className={`${style.carousel_image}`}>
                                                    <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                                                </div>
                                                <button onClick={handleNext} className={`${style.arrow}`}>❯</button>
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
                                                    <button onClick={handleDecrease}>-</button>  
                                                    <span className="m-1">{count}</span>  
                                                    <button onClick={handleIncrease}>+</button>  
                                                </div>  

                                                <div className="d-flex my-md-2">  
                                                    <button className={`${style.add_to_cart} ms-xl-3 ms-lg-1 ms-md-0 ms-0 me-xxl-1 me-xl-1 me-3 me-md-2 my-2`} onClick={addToCart}> 
                                                        Add to Cart <span> <HiOutlineShoppingBag height={45} width={45} /> </span> 
                                                    </button>  
                                                    
                                                    <button className={`${style.quick_enquiry} fs-5 bg-black border-0 my-md-3`} onClick={toggleModal}> Quick Enquiry </button>                                                </div>  
                                            </div>  
                                        </div>  

                                        {/* Sale Section */}  
                                        <div className={`${style.sale_section} my-lg-3 my-md-0`}>  
                                            <h6 className="ps-4 p-2" style={{backgroundColor: featured.sale_rent === 'Rent' ? '#5C553A' : '#3F3A5C',}}>{featured.sale_rent}</h6>  
                                            <div className="p-lg-3 p-md-4 p-4 ps-4 pt-lg-1 pt-md-0 pt-0">  
                                                <p className="text-success fw-bold">Available In Stock</p>  
                                                <p> <span className="fw-bold text-white">Article Code:</span> {featured.article_code} </p>{" "} 
                                                <p><span className='fw-bold text-white'>Category:</span> {featured.product_category.category_name}</p>
                                            </div>  
                                        </div>  
                                    </div>  
                                </div>
                                <div className={`${style.para_section} my-5 `}>
                                    <p>{featured.description}</p>
                                </div>

                                {featured?.specifications && featured.specifications.length > 0 && (
                                    <>
                                        <h3 className='mb-4'>Product Specifications</h3>
                                        <div className={`${style.product_spec}`}>
                                            {featured.specifications.map((spec, index) => (
                                                <div key={spec.id} className={`${style.spec_detail}`}>
                                                    <h5 className='col-md-4 col-12'>{spec.specification}</h5>
                                                    {spec.specification_title_desc && spec.specification_title_desc.length > 0 && (
                                                        <div className='col-md-8 col-12'>
                                                            {spec.specification_title_desc.map((desc, descIndex) => (
                                                                <div key={descIndex}>
                                                                    <h6 className='fw-bold'>{desc.title}</h6>
                                                                    <p>{desc.description}</p>
                                                                </div>
                                                            ))}
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
                                    <h4>Quick Enquiry</h4>
                                    <button
                                    type="button"
                                    className={style.close_btn}
                                    onClick={toggleModal} // Close modal when clicked
                                    >
                                    <IoMdClose />
                                    </button>
                                    <form className={style.form}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="Email"
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
                                            placeholder="Phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            name="house_no"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="House No"
                                            value={formData.house_no}
                                            onChange={handleInputChange}
                                        />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            name="street"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="Street"
                                            value={formData.street}
                                            onChange={handleInputChange}
                                        />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            name="city"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            name="country"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="Country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                        />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            name="state"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            name="postal_code"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="Postal Code"
                                            value={formData.postal_code}
                                            onChange={handleInputChange}
                                        />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                        <textarea
                                            name="message"
                                            className={`form-control ${style.inputField}`}
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                        />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                        <button onClick={handleSubmit} type="submit" className={style.talk_btn}>
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            className={style.cancel_btn}
                                            onClick={toggleModal} // Close modal on cancel
                                        >
                                            Cancel
                                        </button>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                                </div>
                            )}
                        <div className='my-5 container-fluid'>
                            <h3 className='mb-4 my-5'> Related Products</h3>
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
                                    className={`cs_slider pt-5 cs_slider_3 anim_blog ${style ? '' 
                                    : 'style_slider'}`}
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
                                                        sale_rent: product.sale_rent // Correctly pass the slug
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

export default Page;