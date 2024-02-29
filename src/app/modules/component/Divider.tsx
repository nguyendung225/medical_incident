import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface DividerProps{
  dark?: boolean;
  isVertical?: boolean;
  className?: string;
}

const Divider: React.FC<DividerProps> = (props) => {

  const { isVertical, className, dark } = props
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles({
      width: isVertical ? "1px" : "100%",
      height: isVertical ? "100%" : "1px",
    })
  }, [isVertical]);

  return (
    <div
      className={clsx(
        className,
        dark ? "bg-secondary" : "bg-light-dark",
      )}
      style={styles}
    />
  );
};
export default Divider;