import React, { useState, useEffect, FormEvent } from 'react';
import style from './style.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useSnackbar } from 'notistack';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Rent products', href: '/rent-products' },
  { label: 'Sale', href: '/sale' },
  { label: 'About IM Vision', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Error reporting', href: '/error-reporting' },
  { label: 'Work With us', href: '/work-with-us' },
  { label: 'Rental conditions', href: '/rental-conditions' },
  { label: 'Profile', href: '/profile' }, // Profile link
  { label: 'Sign In', href: '/login' },  // Sign In link
  { label: 'Logout', href: '/login' } // Logout link
];

const LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms and Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

const FooterOne: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar(); // Notification hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    helpTopic: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    helpTopic: '',
    companyName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  // Check if the user is logged in (can be improved based on your authentication method)
  useEffect(() => {
    const token = localStorage.getItem('token'); // Example: check if an auth token is in localStorage
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    // Clear the error for the field being modified
    setErrors({
      ...errors,
      [e.target.id]: '',
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      helpTopic: '',
      companyName: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!formData.helpTopic.trim()) {
      newErrors.helpTopic = 'Please select a topic.';
      valid = false;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company Name is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true); // Set isSubmitting to true when form is being submitted
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use environment variable for API URL
        const apiToken = process.env.NEXT_PUBLIC_API_TOKEN; // Use environment variable for API Token

        // Make API call to send the form data
        const response = await axios.post(
          `${apiUrl}leads`,
          {
            data: {
              name: formData.name,
              email: formData.email,
              service: formData.helpTopic,
              company: formData.companyName,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${apiToken}`, // Include Bearer token in the request headers
            },
          }
        );

        // Success notification
        enqueueSnackbar('Your message has been sent successfully!', { variant: 'success' });
        console.log('Form submitted:', response.data);
        setFormData({ name: '', email: '', helpTopic: '', companyName: '' }); // Clear the form after submission
      } catch (error) {
        // Error notification
        enqueueSnackbar('There was an error submitting the form. Please try again.', { variant: 'error' });
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false); // Reset isSubmitting to false after submission or error
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setIsLoggedIn(false); // Update the login state
    enqueueSnackbar('You have been logged out.', { variant: 'info' }); // Notify the user
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <footer className={style['footer-container']}>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 mb-4">
            <img src="/assets/images/footer-logo.png" alt="Company Logo" className={style.logo} />
          </div>

          {/* Contact Form Section */}
          <div className="col-md-8 mb-4">
            <h2>Get in touch today</h2>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${style.inputField}`}
                      placeholder="Name*"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <small className={style.errorText}>{errors.name}</small>}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${style.inputField}`}
                      placeholder="Email Address*"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <small className={style.errorText}>{errors.email}</small>}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <select
                      id="helpTopic"
                      className={`form-control ${style.inputField}`}
                      value={formData.helpTopic}
                      onChange={handleChange}
                    >
                      <option value="" className={style.firstFieldColor}>
                        What can we help you with?
                      </option>
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                      <option value="Career">Career</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.helpTopic && <small className={style.errorText}>{errors.helpTopic}</small>}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="text"
                      id="companyName"
                      className={`form-control ${style.inputField}`}
                      placeholder="Company Name*"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                    {errors.companyName && <small className={style.errorText}>{errors.companyName}</small>}
                  </div>
                </div>
              </div>

              <button type="submit" className={`${style.submitButton}`} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Let\'s Talk'}
                {isSubmitting && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d=" M5 12h14m-7-7 7 7 -7" />
                  </svg>
                )}
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="col-12 mb-4">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {NAV_ITEMS.map((item: NavItem) => {
                  // Show Profile and Logout if user is logged in
                  if (item.label === 'Profile' && !isLoggedIn) {
                    return null; 
                  }
                  // Show Sign In if user is not logged in
                  if (item.label === 'Sign In' && isLoggedIn) {
                    return null; 
                  }
                  // Show Logout if user is logged in
                  if (item.label === 'Logout' && !isLoggedIn) {
                    return null; 
                  }
                  return (
                    <li key={item.label} className="list-inline-item mx-3">
                    {item.label === 'Logout' ? (
                      <Link href="#" className={style.navLink} onClick={handleLogout}>
                        {item.label}
                      </Link>
                    ) : (
                      <Link href={item.href} className={style.navLink}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="col-12">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {LEGAL_LINKS.map((item: NavItem) => (
                  <li key={item.label} className="list-inline-item mx-3">
                    <Link href={item.href} className={style.legalLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={style.disclaimer}>
                <p className='my-4 col-xxl-8 col-xl-9 col-md-8 col-11 mx-auto'><span className='fw-bold mb-1'>Disclaimer</span><br/> 
                    The photos and videos displayed on this website are used for representational purposes and remain the property of their respective owners. For any queries, please contact us at <a href="mailto:elliott@imvision.se" className='fw-bold'>elliott@imvision.se</a> 
                </p>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;