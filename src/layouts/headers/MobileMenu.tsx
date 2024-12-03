'use client'

import Link from 'next/link';
import React, { useState } from 'react';

interface MenuItem {
  id: number;
  title: string;
  link: string;
  has_dropdown: boolean;
  sub_menu?: { id: number; title: string; link: string }[];
}

const menu_data: MenuItem[] = [
  { id: 1, title: "Events", link: '/events', has_dropdown: false },
  { id: 2, title: "Expo", link: '/expo', has_dropdown: false },
  { id: 3, title: "Products", link: '/products', has_dropdown: false }, // Unique key
  { id: 4, title: "Installation", link: '/installation', has_dropdown: false },
  { id: 5, title: "Contact", link: "/contact", has_dropdown: false },
  { id: 6, title: "Support", link: "/support", has_dropdown: false },
  { id: 7, title: "🛒 Cart", link: "/Cart", has_dropdown: false },
];

interface MobileMenuProps {
  active: boolean;
  navTitle: string;
  openMobileMenu: (title: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ active, navTitle, openMobileMenu }) => {
  return (
    <ul className="cs_nav_list" style={{ display: active ? "block" : "none" }}>
      {menu_data.map((menu) => (
        <li key={menu.id} className={`${menu.has_dropdown ? "menu-item-has-children" : ""} ${navTitle === menu.title ? "active" : ""}`}>
          <Link href={menu.link}>{menu.title}</Link>
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