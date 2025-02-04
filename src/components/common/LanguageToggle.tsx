"use client";

import { useLocale } from "next-intl";
import style from "./style.module.css";

const LanguageToggle = () => {
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "sv" : "en";
  
    // Set the NEXT_LOCALE cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year expiration
  
    // Refresh the page by reloading it
    window.location.reload();
  };
  

  return (
    <button onClick={toggleLocale} className={style.lang_button}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 14L10.5 6.5L14 14M8 12H13M2 3.74733C3.32693 3.58221 4.66283 3.49961 6 3.5M6 3.5C6.74667 3.5 7.48867 3.52533 8.22267 3.576M6 3.5V2M8.22267 3.576C7.45067 7.10533 5.12667 10.0533 2 11.668M8.22267 3.576C8.82 3.61667 9.41267 3.674 10 3.74733M6.94067 9.41067C5.84731 8.29908 4.98076 6.98533 4.38933 5.54267"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={style.lang_text}>
        {locale === "en" ? "Swedish" : "English"}
      </span>
    </button>
  );
};

export default LanguageToggle;
