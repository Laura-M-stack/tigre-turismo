import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Al cambiar de página vuelve arriba; si la URL trae #ancla, baja hasta esa sección. */
export function useScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname, hash]);
}
