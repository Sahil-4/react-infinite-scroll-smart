import { type PropsWithChildren } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll.ts";

type Props = PropsWithChildren & {
  callback: () => Promise<void>;
  className?: string;
  disabled?: boolean;
  direction?: "bottom" | "top";
  style?: React.CSSProperties;
  rootMargin?: string;
};

const InfiniteScroll = (props: Props) => {
  const {
    callback,
    children,
    className,
    disabled = false,
    direction = "bottom",
    style,
    rootMargin = "100px",
  } = props;

  const { sentinelRef, parentRef, chatStyles } = useInfiniteScroll(
    callback,
    direction,
    disabled,
    rootMargin
  );

  return (
    <div ref={parentRef} className={className} style={{ overflow: "auto", ...style }}>
      {direction === "top" && <div ref={sentinelRef} style={{ height: 1 }} />}
      <div style={{ ...chatStyles }}>{children}</div>
      {direction === "bottom" && <div ref={sentinelRef} style={{ height: 1 }} />}
    </div>
  );
};

export default InfiniteScroll;
