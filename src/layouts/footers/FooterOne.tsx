import React, { useState, useEffect, FormEvent } from 'react';
import style from './style.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';
import Error from '../../components/common/Error';
// import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js App Router

interface NavItem {
  label: string;
  href: string;
}
interface Props {
  data:any
}

const FooterOne: React.FC<Props> = ({data}) => {
  const t = useTranslations('home.footer');
  const { enqueueSnackbar } = useSnackbar();
  // const router = useRouter();

  if (!data || data.icon.length === 0 || data.content === null) {
    return <Error />;
  }
  const content = data.content;
  const icon = data.icon;
  const NAV_ITEMS: NavItem[] = [
    // { label: t('navItems.rentProducts'), href: '/rent-products' },
    // { label: t('navItems.sale'), href: '/sale' },
    { label: content.navItems.about, href: '/about' },
    { label: content.navItems.contact, href: '/contact' },
    { label: content.navItems.errorReporting, href: '/error-reporting' },
    { label: content.navItems.workWithUs, href: '/work-with-us' },
    { label: content.navItems.rentalConditions, href: '/rental-conditions' },
    { label: content.navItems.profile, href: '/profile' },
    { label: content.navItems.signIn, href: '/login' },
    { label: content.navItems.logout, href: '/login' }
  ];

  const LEGAL_LINKS: NavItem[] = [
    { label: content.legalLinks.privacyPolicy, href: '/privacy' },
    { label: content.legalLinks.termsAndConditions, href: '/terms' },
    { label: content.legalLinks.cookiePolicy, href: '/cookies' },
  ];

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

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
      newErrors.name = content.validation.nameRequired;
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = content.validation.emailRequired;
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = content.validation.emailInvalid;
      valid = false;
    }

    if (!formData.helpTopic.trim()) {
      newErrors.helpTopic = content.validation.topicRequired;
      valid = false;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = content.validation.companyRequired;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

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
              Authorization: `Bearer ${apiToken}`,
            },
          }
        );
      // If form submission is successful, send the email
      const emailData = {
        name: formData.name,
        email: formData.email,
        service: formData.helpTopic,
        company: formData.companyName,
      };

      // Send the email using the send-email API route
      const emailResponse = await fetch('/api/footer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (emailResponse.ok) {
        enqueueSnackbar(content.notifications.success, { variant: 'success' });
      } else {
        enqueueSnackbar(content.notifications.error, { variant: 'error' });
      }

        // Reset form data after successful submission
        setFormData({ name: '', email: '', helpTopic: '', companyName: '' });
      } catch (error) {
        enqueueSnackbar(content.notifications.error, { variant: 'error' });
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    localStorage.removeItem('cartItems');
    
    // Remove the auth cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    
    setIsLoggedIn(false);
    enqueueSnackbar(content.notifications.logout, { variant: 'info' });
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <footer className={style['footer-container']}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <img src="/assets/images/footer-logo.png" alt="Company Logo" className={style.logo} />
          </div>

          <div className="col-md-8 mb-4">
            <h2>{content.heading}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${style.inputField}`}
                      placeholder={content.formPlaceholders.name}
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
                      placeholder={content.formPlaceholders.email}
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
                        {content.formPlaceholders.helpTopic}
                      </option>
                      <option value="Sale">{content.helpTopics.sale}</option>
                      <option value="Rent">{content.helpTopics.rent}</option>
                      <option value="Career">{content.helpTopics.career}</option>
                      <option value="Other">{content.helpTopics.other}</option>
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
                      placeholder={content.formPlaceholders.companyName}
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                    {errors.companyName && <small className={style.errorText}>{errors.companyName}</small>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={style.submitButton}
                disabled={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
              >
                {isSubmitting ? content.submitButton.sending : content.submitButton.default}
              </button>
            </form>
          </div>

          <div className="col-12 mb-4">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {NAV_ITEMS.map((item: NavItem) => {
                  if (item.label === content.navItems.profile && !isLoggedIn) return null;
                  if (item.label === content.navItems.signIn && isLoggedIn) return null;
                  if (item.label === content.navItems.logout && !isLoggedIn) return null;
                  return (
                    <li key={item.label} className="list-inline-item mx-3">
                      {item.label === content.navItems.logout ? (
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
                <p className='my-4 col-xxl-8 col-xl-9 col-md-8 col-11 mx-auto'>
                  <span className='fw-bold mb-1'>{content.disclaimer.title}</span><br />
                  {content.disclaimer.text}{' '}
                  <a href={`mailto:${content.disclaimer.email}`} className='fw-bold'>
                  {content.disclaimer.email}
                  </a>
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