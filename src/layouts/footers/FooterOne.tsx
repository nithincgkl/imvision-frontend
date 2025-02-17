import React, { useState, useEffect, FormEvent } from 'react';
import style from './style.module.css';
import Link from 'next/link';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useTranslations } from 'next-intl';

interface NavItem {
  label: string;
  href: string;
}

const FooterOne: React.FC = () => {
  const t = useTranslations('home.footer');
  const { enqueueSnackbar } = useSnackbar();

  const NAV_ITEMS: NavItem[] = [
    // { label: t('navItems.rentProducts'), href: '/rent-products' },
    // { label: t('navItems.sale'), href: '/sale' },
    { label: t('navItems.about'), href: '/about' },
    { label: t('navItems.contact'), href: '/contact' },
    { label: t('navItems.errorReporting'), href: '/error-reporting' },
    { label: t('navItems.workWithUs'), href: '/work-with-us' },
    { label: t('navItems.rentalConditions'), href: '/rental-conditions' },
    { label: t('navItems.profile'), href: '/profile' },
    { label: t('navItems.signIn'), href: '/login' },
    { label: t('navItems.logout'), href: '/login' }
  ];

  const LEGAL_LINKS: NavItem[] = [
    { label: t('legalLinks.privacyPolicy'), href: '/privacy' },
    { label: t('legalLinks.termsAndConditions'), href: '/terms' },
    { label: t('legalLinks.cookiePolicy'), href: '/cookies' },
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
      newErrors.name = t('validation.nameRequired');
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
      valid = false;
    }

    if (!formData.helpTopic.trim()) {
      newErrors.helpTopic = t('validation.topicRequired');
      valid = false;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = t('validation.companyRequired');
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
        enqueueSnackbar(t('notifications.success'), { variant: 'success' });
      } else {
        enqueueSnackbar(t('notifications.emailError'), { variant: 'error' });
      }

        // Reset form data after successful submission
        setFormData({ name: '', email: '', helpTopic: '', companyName: '' });
      } catch (error) {
        enqueueSnackbar(t('notifications.error'), { variant: 'error' });
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
    setIsLoggedIn(false);
    enqueueSnackbar(t('notifications.logout'), { variant: 'info' });
    window.location.href = '/login';
  };

  return (
    <footer className={style['footer-container']}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <img src="/assets/images/footer-logo.png" alt="Company Logo" className={style.logo} />
          </div>

          <div className="col-md-8 mb-4">
            <h2>{t('getInTouch')}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${style.inputField}`}
                      placeholder={t('formPlaceholders.name')}
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
                      placeholder={t('formPlaceholders.email')}
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
                        {t('formPlaceholders.helpTopic')}
                      </option>
                      <option value="Sale">{t('helpTopics.sale')}</option>
                      <option value="Rent">{t('helpTopics.rent')}</option>
                      <option value="Career">{t('helpTopics.career')}</option>
                      <option value="Other">{t('helpTopics.other')}</option>
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
                      placeholder={t('formPlaceholders.companyName')}
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
                {isSubmitting ? t("submitButton.sending") : t("submitButton.default")}
              </button>
            </form>
          </div>

          <div className="col-12 mb-4">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {NAV_ITEMS.map((item: NavItem) => {
                  if (item.label === t('navItems.profile') && !isLoggedIn) return null;
                  if (item.label === t('navItems.signIn') && isLoggedIn) return null;
                  if (item.label === t('navItems.logout') && !isLoggedIn) return null;
                  return (
                    <li key={item.label} className="list-inline-item mx-3">
                      {item.label === t('navItems.logout') ? (
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
                  <span className='fw-bold mb-1'>{t('disclaimer.title')}</span><br />
                  {t('disclaimer.text')}{' '}
                  <a href="mailto:info@imvision.se" className='fw-bold'>
                  info@imvision.se
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