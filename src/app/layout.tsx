// app/layout.tsx
import "@/styles/index.scss";
import GoogleTagManager from "@/components/common/GoogleTag";
import { Providers } from "@/components/common/Providers";
import Script from "next/script";
import { AuthSync } from "@/components/common/AuthSync";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        {/* Google Tag Manager script in head */}
        {GTM_ID && (
          <Script
            id="gtm-script-head"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
        <link rel="icon" href="/assets/img/favicon.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;900&family=Kanit:wght@400;500;600;700&display=swap"
        />
        <title>IM VISION</title>
      </head>
      <body className="dark">
        {/* Google Tag Manager noscript right after body open */}
        {GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
            }}
          />
        )}
        <Providers>
        <AuthSync />
          {children}
        </Providers>
      </body>
    </html>
  );
}