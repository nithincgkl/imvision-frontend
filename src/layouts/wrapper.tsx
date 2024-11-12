'use client';

import { useEffect, useState } from "react";
import { gsap } from 'gsap';
import { ScrollSmoother } from "@/plugins";
import MouseMove from "@/components/common/MouseMove";
import ScrollToTop from "@/components/common/ScrollToTop";

gsap.registerPlugin(ScrollSmoother);

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  let smoother: any = null;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize scroll smoother with appropriate settings
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Kill existing instance if any
    if (smoother) {
      smoother.kill();
    }

    // Only apply smooth scroll on non-mobile devices
    if (!isMobile) {
      smoother = ScrollSmoother.create({
        smooth: 1.35,
        effects: true,
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
        preventDefault: true,
        // Optimizations for better performance
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      // Handle touch events
      document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
          e.preventDefault(); // Prevent zooming
        }
      }, { passive: false });
    }

    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, [isMobile]);

  // Apply mobile-specific styles
  useEffect(() => {
    if (isMobile) {
      // Reset any GSAP transforms that might interfere with native scrolling
      gsap.set('#smooth-wrapper', { clearProps: 'all' });
      gsap.set('#smooth-content', { clearProps: 'all' });
    }
  }, [isMobile]);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {!isMobile && <MouseMove />}
          {children}
          <ScrollToTop />
        </div>
      </div>
    </>
  );
};

export default Wrapper;