'use client'

import Link from 'next/link';
import React from 'react';

interface MenuItem {
  id: number;
  title: string;
  link: string;
  has_dropdown: boolean;
  sub_menu?: { id: number; title: string; link: string }[];
}

interface MobileMenuProps {
  active: boolean;
  navTitle: string;
  openMobileMenu: (title: string) => void;
  cartItemCount: number;  // Added prop to pass the cart count
}

const menu_data: MenuItem[] = [
  { id: 1, title: "Events", link: '/events', has_dropdown: false },
  { id: 2, title: "Expo", link: '/expo', has_dropdown: false },
  { id: 3, title: "Products", link: '/products', has_dropdown: false },
  { id: 4, title: "Installation", link: '/installation', has_dropdown: false },
  { id: 5, title: "Contact", link: "/contact", has_dropdown: false },
  { id: 6, title: "Support", link: "/error-reporting", has_dropdown: false },
  { id: 7, title: "🛒 Cart", link: "/cart", has_dropdown: false },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ active, navTitle, openMobileMenu, cartItemCount }) => {
  return (
    <ul className="cs_nav_list" style={{ display: active ? "block" : "none" }}>
      {menu_data.map((menu) => (
        <li key={menu.id} className={`${menu.has_dropdown ? "menu-item-has-children" : ""} ${navTitle === menu.title ? "active" : ""}`}>
          <Link href={menu.link}>
            {menu.title} 
            {menu.title === "🛒 Cart" && cartItemCount > 0 && (
              <span className="cart-item-count">[{cartItemCount}]</span>
            )}
          </Link>
          {menu.has_dropdown && (
            <>
              <ul className="cs_mega_wrapper" style={{ display: navTitle === menu.title ? "block" : "none" }}>
                {menu.sub_menu?.map((subMenu) => (
                  <li key={subMenu.id}>
                    <Link href={subMenu.link}>{subMenu.title}</Link>
                  </li>
                ))}
              </ul>
              <span onClick={() => openMobileMenu(menu.title)} className={`cs_munu_dropdown_toggle ${navTitle === menu.title ? "active" : ""}`}></span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MobileMenu;
