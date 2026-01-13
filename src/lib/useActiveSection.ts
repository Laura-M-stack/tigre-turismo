import { useEffect, useState } from "react";

type Options = {
  sectionIds: string[];
  /** px desde arriba para compensar header sticky */
  topOffset?: number;
};

export function useActiveSection({ sectionIds, topOffset = 96 }: Options) {
  const [activeId, setActiveId] = useState<string>("top");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Tomamos el que esté intersectando con mayor ratio (más visible)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        // Empuja el “área activa” debajo del header sticky
        rootMargin: `-${topOffset}px 0px -55% 0px`,
        threshold: [0.1, 0.25, 0.4, 0.6],
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, topOffset]);

  return activeId;
}
