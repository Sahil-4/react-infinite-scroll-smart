import { useEffect, useMemo, useRef } from "react";

const useInfiniteScroll = (
  callback: () => Promise<void>,
  direction: "top" | "bottom" = "bottom",
  useWindowScroll: boolean = false,
  disabled: boolean = false,
  rootMargin: string = "100px",
) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  // default styling for infinite scroll div
  const containerStyles = useMemo<React.CSSProperties>(() => {
    if (direction === "top") {
      // reverse rending
      return { display: "flex", flexDirection: "column-reverse" };
    }
    return {};
  }, [direction]);

  // Intersection Observer part
  useEffect(() => {
    if (disabled) return;
    if (!("IntersectionObserver" in window)) return;
    if (!parentRef.current || !sentinelRef.current) return;

    // creates a new observer
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          const prev = parentRef.current?.scrollHeight || 0;
          await callback();
          const next = parentRef.current?.scrollHeight || 0;
          if (direction === "top") parentRef.current?.scrollBy(0, next - prev);
        }
      },
      {
        root: useWindowScroll ? null : parentRef.current,
        rootMargin,
      },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [callback, disabled, direction, rootMargin, parentRef, sentinelRef]);

  return { sentinelRef, parentRef, containerStyles };
};

export default useInfiniteScroll;
