const sizes = {
  sm: "px-2 py-2 rounded-md",
  lg: "px-3 py-2 rounded-lg",
};

const colors = {
  primary: "bg-blue-primary-500 text-white",
  secondary: "border bg-blue-secondary-500 text-white",
  destructive: "bg-semantic-negative-500 text-white",
  sematicNotice: "bg-semantic-notice-500 text-white",
  white: "bg-white text-black border-gray-cool-300 border-[0.5px]",
  warning: "bg-amber-500 text-white",
  disabled: "bg-[#C9E1EC] text-white",
};

export default function Button({
  color,
  size,
  children,
  onClick,
  className,
  disabled,
}) {
  let colorClasses = colors[color];
  let sizeClasses = sizes[size];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full text-base font-semibold ${
        disabled
          ? "cursor-not-allowed border bg-blue-secondary-200 text-white"
          : `${colorClasses}`
      } ${sizeClasses} ${className}}`}
    >
      {children}
    </button>
  );
}

//example
{
  /* <Button
  size="lg"
  color="primary"
  onClick={() => console.log('on click')}
  >
  button
</Button> */
}
