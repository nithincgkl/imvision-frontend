'use client';

import "@/styles/index.scss";
import { SnackbarProvider } from "notistack";
import { CartProvider } from '@/context/cart-context'; // Adjust the import path as needed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/favicon.svg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;900&family=Kanit:wght@400;500;600;700&display=swap"
        />
        <title>IM VISION</title>
      </head>

      <body className="dark">
        <CartProvider>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            {children}
          </SnackbarProvider>
        </CartProvider>
      </body>
    </html>
  );
}