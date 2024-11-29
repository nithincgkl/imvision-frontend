import React, { FormEvent } from 'react';
import style from "./style.module.css";
import Link from 'next/link';
interface NavItem {
  label: string;
  href: string;
}

interface PhoneOption {
  value: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Rent products', href: '/rent-products' },
  { label: 'Sale', href: '/sale' },
  { label: 'About IM Vision', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Error reporting', href: '/error-reporting' },
  { label: 'Rental conditions', href: '/rental-conditions' },
  { label: '​Work with us', href: '/​work-with-us' },
  { label: 'Sign In', href: '/login' },
];

const LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms and Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' }
];

const PHONE_OPTIONS: PhoneOption[] = [
  { value: 'Options', label: 'Options' },
  { value: 'Options', label: 'Options' },
  { value: 'Options', label: 'Options' },
  { value: 'Options', label: 'Options' }
];

const FooterOne: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <footer className={style['footer-container']}>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 mb-4">
            <img
              src="/assets/images/footer-logo.png"
              alt="Company Logo"
              className={style.logo}
            />
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
                    />
                    {/* <label
                      htmlFor="name"
                      className={style.inputLabel}
                    >
                      Name
                    </label> */}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${style.inputField}`}
                      placeholder="Email Address*"
                    />
                    {/* <label
                      htmlFor="email"
                      className={style.inputLabel}
                    >
                      Email Address*
                    </label> */}
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>


                    <select className={`form-control ${style.inputField}`} >
                      <option value="" className={style.firstFieldColor}>What can we help you with?</option>
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                      <option value="Career">Career</option>
                      <option value="Other">Other</option>
                    </select>

                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="text"
                      id="Company Name"
                      className={`form-control ${style.inputField}`}
                      placeholder="Company Name"
                    />
                    {/* <label
                      htmlFor="Company Name"
                      className={style.inputLabel}
                    >
                      Company Name
                    </label> */}
                  </div>
                </div>
              </div>

              {/* <div className={style.formControl}>
                <textarea
                  id="message"
                  rows={4}
                  className={`form-control ${style.inputField} ${style.textareaField}`}
                  placeholder="Message"
                ></textarea>              
              </div> */}

              <button
                type="submit"
                className={`btn ${style.submitButton}`}
              >
                <span>Lets Talk</span>
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
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="col-12 mb-4">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {NAV_ITEMS.map((item: NavItem) => (
                  <li key={item.label} className="list-inline-item mx-3">
                    <a
                      href={item.href}
                      className={style.navLink}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>




            </nav>
          </div>

          {/* Bottom Logo */}


          {/* Legal Links */}
          <div className="col-12">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {LEGAL_LINKS.map((item: NavItem) => (
                  <li key={item.label} className="list-inline-item mx-3">
                    <a
                      href={item.href}
                      className={style.legalLink}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;