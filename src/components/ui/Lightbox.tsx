import { useEffect, useMemo, useRef } from "react";

import AppImage from "./AppImage";

type Item = { src: string; alt?: string };

type Props = {
  items: Item[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function clampIndex(i: number, len: number) {
  if (!len) return 0;
  return ((i % len) + len) % len;
}

export default function Lightbox({ items, index, onClose, onPrev, onNext }: Props) {
  const len = items.length;
  const safeIndex = clampIndex(index, len);
  const current = items[safeIndex];

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const prevSrc = useMemo(() => {
    if (!len) return null;
    const i = (safeIndex - 1 + len) % len;
    return items[i]?.src ?? null;
  }, [items, safeIndex, len]);

  const nextSrc = useMemo(() => {
    if (!len) return null;
    const i = (safeIndex + 1) % len;
    return items[i]?.src ?? null;
  }, [items, safeIndex, len]);

  // lock scroll + teclado + focus trap básico
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // Compensa scrollbar para que no “salte” el layout
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();

      // mini focus trap
      if (e.key === "Tab") {
        const root = panelRef.current;
        if (!root) return;

        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // focus inicial
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [onClose, onPrev, onNext]);

  // Preload next/prev
  useEffect(() => {
    if (prevSrc) {
      const img = new Image();
      img.src = prevSrc;
    }
    if (nextSrc) {
      const img = new Image();
      img.src = nextSrc;
    }
  }, [prevSrc, nextSrc]);

  // Swipe simple
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let moved = false;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      startX = t.clientX;
      startY = t.clientY;
      moved = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      // detecta intención horizontal
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        moved = true;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t) return;

      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      // si fue swipe horizontal claro
      if (moved && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) onPrev();
        else onNext();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onPrev, onNext]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imágenes"
      onMouseDown={onClose}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black select-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <AppImage
          src={current.src}
          alt={current.alt ?? "Imagen"}
          className="max-h-[78vh] w-full object-contain"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-xl bg-white/90 px-3 py-2 text-md font-medium text-slate-900 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Cerrar"
        >
          Cerrar ✕
        </button>

        {len > 1 ? (
          <>
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl bg-white/90 px-3 py-2 text-md font-medium text-slate-900 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Anterior"
            >
              ←
            </button>

            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-white/90 px-3 py-2 text-md font-medium text-slate-900 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Siguiente"
            >
              →
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-xl bg-white/90 px-3 py-1 text-md font-medium text-slate-900">
              {safeIndex + 1} / {len}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
