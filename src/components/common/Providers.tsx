// src/components/Providers.tsx
'use client';

import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
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
  );
}