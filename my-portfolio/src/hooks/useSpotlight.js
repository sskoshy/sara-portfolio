// src/hooks/useSpotlight.js
import { useCallback } from "react";

export default function useSpotlight() {
  const onMove = useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", x + "%");
    el.style.setProperty("--my", y + "%");
  }, []);

  const onLeave = useCallback((e) => {
    const el = e.currentTarget;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  }, []);

  return { onMove, onLeave };
}
