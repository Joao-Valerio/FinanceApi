import React from "react";

type InputProps = {
  className?: string;
} & Omit<React.ComponentProps<"input">, "className">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    const base =
      "peer w-full h-11 bg-transparent px-4 py-0 " +
      "text-gray-900 dark:text-gray-100 " +
      "placeholder-transparent " +
      "border border-gray-300 dark:border-gray-700 rounded-md " +
      "transition-all duration-200 " +
      "focus:border-green-600 dark:focus:border-green-400 focus:outline-none focus:ring-0";

    const classes = `${base} ${className || ""}`;

    return <input ref={ref} className={classes} {...rest} />;
  }
);

Input.displayName = "Input";
export default Input;
