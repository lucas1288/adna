"use client";

import { useEffect } from "react";

interface BackgroundSetterProps {
  image: string;
}

const BackgroundSetter = ({ image }: BackgroundSetterProps) => {
  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false;
    root.style.setProperty("--page-bg-opacity", "0");

    const preload = new Image();
    preload.src = image;
    preload.onload = () => {
      if (cancelled) {
        return;
      }

      root.style.setProperty("--page-bg", `url("${image}")`);
      requestAnimationFrame(() => {
        root.style.setProperty("--page-bg-opacity", "1");
      });
    };

    return () => {
      cancelled = true;
    };
  }, [image]);

  return null;
};

export default BackgroundSetter;
