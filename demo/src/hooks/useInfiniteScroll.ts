import { useEffect, useMemo, useRef } from "react";

const useInfiniteScroll = (
  callback: () => Promise<void>,
  direction: "top" | "bottom",
  disabled: boolean,
  rootMargin: string
) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  // reverse rending based on direction
  const chatStyles = useMemo<React.CSSProperties>(() => {
    return direction === "top" ? { display: "flex", flexDirection: "column-reverse" } : {};
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
        root: parentRef.current,
        rootMargin,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [callback, disabled, direction, rootMargin]);

  // Initial load
  useEffect(() => {
    callback();
  }, []);

  return { sentinelRef, parentRef, chatStyles };
};

export default useInfiniteScroll;
