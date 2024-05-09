import { FC, PropsWithChildren } from "react";

import classNames from "classnames";

type Text = {
  size?: "sm" | "lg" | "base";
  variant?: "gray" | "white" | "dark";
  as?: "p" | "span";
  className?: string;
};

const sizes = {
  sm: "font-medium text-sm leading-normal",
  base: "font-medium text-base leading-normal",
  lg: "font-semibold text-lg md:text-2xl leading-relaxed",
};

const variants = {
  gray: "text-gray-600",
  white: "text-white",
  dark: "text-gray-900",
};

const Text: FC<PropsWithChildren<Text>> = ({
  size = "base",
  variant = "dark",
  as = "p",
  className,
  children,
}) => {
  const Tag = as;
  return (
    <Tag className={classNames(sizes[size], variants[variant], className)}>
      {children}
    </Tag>
  );
};

export default Text;
