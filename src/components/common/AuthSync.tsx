"use client";

import { useEffect } from 'react';

export function AuthSync() {
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Set or refresh the cookie
      document.cookie = `auth-token=${token}; path=/; max-age=2592000; SameSite=Strict`;
    } else {
      // Clear the cookie if no token in localStorage
      document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);
  
  return null; // This component doesn't render anything
}