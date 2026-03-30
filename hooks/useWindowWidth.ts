"use client";

import { useSyncExternalStore } from "react";

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getWidthSnapshot = () => window.innerWidth;
const getWidthServerSnapshot = () => 0;

/**
 * Hook to get current window width
 * Returns 0 during SSR, actual width on client
 */
export function useWindowWidth(): number {
  return useSyncExternalStore(
    subscribeResize,
    getWidthSnapshot,
    getWidthServerSnapshot,
  );
}

/**
 * Hook to check if viewport is desktop size
 * @param breakpoint - Width in pixels (default: 769)
 */
export function useIsDesktop(breakpoint: number = 769): boolean {
  const width = useWindowWidth();
  return width >= breakpoint;
}

/**
 * Hook to check if viewport is mobile size
 * @param breakpoint - Width in pixels (default: 769)
 */
export function useIsMobile(breakpoint: number = 769): boolean {
  const width = useWindowWidth();
  return width > 0 && width < breakpoint; // width > 0 to handle SSR
}
