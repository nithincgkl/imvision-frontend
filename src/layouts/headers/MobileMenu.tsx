'use client'

import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';
import LanguageToggle from '@/components/common/LanguageToggle';
import styles from './style.module.css'
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
  cartItemCount: number; // Added prop to pass the cart count
}

const MobileMenu: React.FC<MobileMenuProps> = ({ active, navTitle, openMobileMenu, cartItemCount }) => {
  const t = useTranslations('navigation');
  const menu_data: MenuItem[] = [
    { id: 1, title: t('events'), link: '/events', has_dropdown: false },
    { id: 2, title: t('expo'), link: '/expo', has_dropdown: false },
    { id: 3, title: t('products'), link: '/products', has_dropdown: false },
    { id: 4, title: t('installation'), link: '/installation', has_dropdown: false },
    { id: 5, title: t('contact'), link: '/contact', has_dropdown: false },
    { id: 6, title: t('support'), link: '/error-reporting', has_dropdown: false },
  ];

  return (
    <ul className="cs_nav_list" style={{ display: active ? 'block' : 'none' }}>
      {menu_data.map((menu) => (
        <li
          key={menu.id}
          className={`${menu.has_dropdown ? 'menu-item-has-children' : ''} ${navTitle === menu.title ? 'active' : ''
            }`}
        >
          <Link href={menu.link}>{menu.title}</Link>
        </li>
      ))}

      {/* Separate Cart Container */}
      <li>
        <Link href="/cart" className={styles.cart_container}>
          🛒 {t('cart')}
          {cartItemCount > 0 && <span className="cart-item-count">[{cartItemCount}]</span>}
        </Link>
      </li>

      {/* Separate LanguageToggle UI */}
      <li className={styles.language_toggle_item}>
        <LanguageToggle />
      </li>
    </ul>
  );
};

export default MobileMenu;