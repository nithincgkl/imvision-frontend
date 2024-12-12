'use client';

import "@/styles/index.scss";
import { SnackbarProvider } from "notistack";

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
        <SnackbarProvider
          maxSnack={3} // Maximum number of snackbars to show at once
          autoHideDuration={3000} // Auto-hide after 3 seconds
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right', // Position of the snackbar
          }}
        >
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
