import { FC, useId, InputHTMLAttributes } from "react";
import classNames from "classnames";

type Input = InputHTMLAttributes<HTMLInputElement> & {
  rounded?: "none" | "sm" | "md" | "lg";
};

const styles = {
  base: "border-gray-800 flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent",
  state: {
    normal: "placeholder-gray-400 border-gray-300 border-1 focus:ring-blue-800",
    disabled: "cursor-not-allowed bg-gray-100 shadow-inner text-gray-400",
  },
  rounded: {
    none: null,
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
  },
};

const Input: FC<Input> = ({
  type = "text",
  required = false,
  disabled = false,
  className = "",
  rounded = "lg",
  ...rest
}) => {
  const id = useId();

  return (
    <div className={classNames("relative", className)}>
      <input
        id={id}
        type={type}
        className={classNames([
          styles.base,
          rounded && styles.rounded[rounded],
          disabled && styles.state.disabled,
        ])}
        disabled={disabled}
        required={required}
        {...rest}
      />
    </div>
  );
};

export default Input;
