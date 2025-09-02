import { type PropsWithChildren } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

type Props = PropsWithChildren & {
  callback: () => Promise<void>;
  className?: string;
  disabled?: boolean;
  useWindowScroll?: boolean;
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
    useWindowScroll = false,
    direction = "bottom",
    style = {},
    rootMargin = "100px",
  } = props;

  const { sentinelRef, parentRef, containerStyles } = useInfiniteScroll(
    callback,
    direction,
    useWindowScroll,
    disabled,
    rootMargin,
  );

  return (
    <div
      ref={parentRef}
      className={className}
      style={{ ...containerStyles, ...style }}>
      {children}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
};

export default InfiniteScroll;
