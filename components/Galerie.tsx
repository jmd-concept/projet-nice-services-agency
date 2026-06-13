"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { galerieItems, MasonryItem } from "@/lib/constante";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Size {
  width: number;
  height: number;
}

export default function Gallery() {
  return (
    <main
      id="gallerie"
      className="min-h-screen p-8 bg-gray-50 dark:bg-neutral-950"
    >
      <div className="py-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-medium tracking-tight text-neutral-900 dark:text-white">
          Découvrez nos réalisations en image
        </h2>
      </div>

      <Masonry
        items={galerieItems}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.97}
        blurToFocus={true}
        colorShiftOnHover={true}
      />
    </main>
  );
}

// --- Hooks Personnalisés ---

const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number,
): number => {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getValue = () => {
      const index = queries.findIndex((q) => window.matchMedia(q).matches);
      return index !== -1 ? values[index] : defaultValue;
    };

    setValue(getValue());

    const handler = () => setValue(getValue());
    const mediaQueries = queries.map((q) => window.matchMedia(q));

    mediaQueries.forEach((mq) => mq.addEventListener("change", handler));
    return () =>
      mediaQueries.forEach((mq) => mq.removeEventListener("change", handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, Size] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return;
      requestAnimationFrame(() => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

// --- Composant Principal Masonry ---

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const router = useRouter();
  const queries = useMemo(
    () => [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [],
  );
  const values = useMemo(() => [5, 4, 3, 2], []);

  const columns = useMedia(queries, values, 1);
  const [containerRef, { width }] = useMeasure();
  const hasMounted = useRef<boolean>(false);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    return Math.max(...grid.map((item) => item.y + item.h));
  }, [grid]);

  const getInitialPosition = (
    item: GridItem,
    containerWidth: number,
    containerHeight: number,
  ) => {
    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions: ("top" | "bottom" | "left" | "right")[] = [
        "top",
        "bottom",
        "left",
        "right",
      ];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 };
      case "bottom":
        return { x: item.x, y: containerHeight + 200 };
      case "left":
        return { x: -200, y: item.y };
      case "right":
        return { x: containerWidth + 200, y: item.y };
      case "center":
        return {
          x: containerWidth / 2 - item.w / 2,
          y: containerHeight / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useLayoutEffect(() => {
    if (grid.length === 0 || !width) return;

    const ctx = gsap.context(() => {
      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        const animationProps = {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
        };

        if (!hasMounted.current) {
          const initialPos = getInitialPosition(item, width, containerHeight);

          gsap.fromTo(
            selector,
            {
              opacity: 0,
              x: initialPos.x,
              y: initialPos.y,
              width: item.w,
              height: item.h,
              ...(blurToFocus && { filter: "blur(12px)" }),
            },
            {
              opacity: 1,
              ...animationProps,
              ...(blurToFocus && { filter: "blur(0px)" }),
              duration: 0.8,
              ease: "power3.out",
              delay: index * stagger,
            },
          );
        } else {
          gsap.to(selector, {
            ...animationProps,
            duration: duration,
            ease: ease,
            overwrite: "auto",
          });
        }
      });
      hasMounted.current = true;
    }, containerRef);

    return () => ctx.revert();
  }, [grid, width, containerHeight, stagger, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector(".masonry-img-inner");
    const overlay = e.currentTarget.querySelector(".color-overlay");

    if (scaleOnHover && img) {
      gsap.to(img, { scale: hoverScale, duration: 0.4, ease: "power2.out" });
    }
    if (colorShiftOnHover && overlay) {
      gsap.to(overlay, { opacity: 0.4, duration: 0.3 });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector(".masonry-img-inner");
    const overlay = e.currentTarget.querySelector(".color-overlay");

    if (scaleOnHover && img) {
      gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
    }
    if (colorShiftOnHover && overlay) {
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto"
      style={{ height: containerHeight }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          // MODIFIÉ : Utilisation de router.push pour ouvrir en SPA Next.js sans recharger
          onClick={() => router.push(item.url)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-0 left-0 overflow-hidden cursor-pointer p-2 origin-center"
          style={{ width: item.w, height: item.h }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm bg-gray-200 dark:bg-neutral-900 border border-black/5 dark:border-white/5">
            <div className="masonry-img-inner relative w-full h-full">
              <Image
                src={item.img}
                alt={`Gallery item ${item.id}`}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
                className="object-cover"
                priority={Number(item.id) <= 4}
              />
            </div>

            {colorShiftOnHover && (
              <div
                className="color-overlay absolute inset-0 pointer-events-none opacity-0 transition-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(0,0,0,0.4))",
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
