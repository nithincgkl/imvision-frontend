// HeaderOne.tsx
'use client';
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import UseSticky from "@/hooks/UseSticky";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/img/logo.svg";
import Logo_white from "@/assets/img/Logo_white.png";
import { useCart } from '@/context/cart-context'; // Import the useCart hook

const HeaderOne: React.FC = () => {
  const { sticky } = UseSticky();
  const [active, setActive] = useState(false);
  const [navTitle, setNavTitle] = useState("");
  const { cartItems } = useCart(); // Access cart items from context
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleActive = () => setActive(!active);
  const openMobileMenu = (menu: string) => {
    setNavTitle(navTitle === menu ? "" : menu);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.count, 0); // Calculate the total count of items in the cart

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".cs_sticky_header");
      if (!header || !(header instanceof HTMLElement)) {
        console.error("Sticky header element not found");
        return;
      }
      const headerHeight = header.offsetHeight + 30;
      const windowTop = window.pageYOffset || document.documentElement.scrollTop;
      if (windowTop >= headerHeight) {
        header.classList.add("cs_gescout_sticky");
      } else {
        header.classList.remove("cs_gescout_sticky");
        header.classList.remove("cs_gescout_show");
      }
      if (header.classList.contains("cs_gescout_sticky")) {
        if (windowTop < lastScrollTop) {
          header.classList.add("cs_gescout_show");
        } else {
          header.classList.remove("cs_gescout_show");
        }
      }
      setLastScrollTop(windowTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      <header className={`cs_site_header cs_style1 cs_sticky_header cs_site_header_full_width ${sticky ? 'cs_gescout_sticky' : ''}`}>
        <div className="cs_main_header">
          <div className="container">
            <div className="cs_main_header_in">
              <div className="cs_main_header_left">
                <Link className="cs_site_branding logo-dark" href="/">
                  <Image src={logo} alt="Logo" />
                </Link>
                <Link className="cs_site_branding logo-white" href="/">
                  <Image src={Logo_white} alt="Logo" />
                </Link>
              </div>
              <div className="cs_main_header_right">
                <div className="cs_nav cs_medium">
                  <MobileMenu active={active} navTitle={navTitle} openMobileMenu={openMobileMenu} cartItemCount={cartItemCount} />
                  <span
                    className={`cs_munu_toggle ${active ? "cs_toggle_active" : ""}`}
                    onClick={handleActive}
                  >
                    <span></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderOne;