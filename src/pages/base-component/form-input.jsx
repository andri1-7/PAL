import { forwardRef } from "react";

const FormInput = forwardRef((props, ref) => {
  const {
    id,
    onChange,
    onKeyUp,
    onBlur,
    onFocus,
    className = "",
    iconLeft = "",
    iconRight = "",
    placeholder = "",
    label = "",
    type = "text",
    error = false,
    errorText = "",
    required = false,
    disabled = false,
    value = "",
    ...rest
  } = props;

  // const inputRef = useRef()

  return (
    <div>
      <div>
        {label && (
          <label htmlFor={id} className="ml-1 text-sm text-[#333333]">
            {label} {required && <span className="text-red">*</span>}
          </label>
        )}

        <div className="relative">
          {iconLeft && (
            <div className="absolute left-2 flex h-full w-10 items-center justify-center">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            onKeyUp={onKeyUp}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            className={`${iconLeft ? "pl-11" : "pl-3"} ${
              label != "" && "mt-2"
            } ${iconRight && "pr-11"} ${className} ${
              disabled && "cursor-not-allowed bg-gray-cool-50"
            } ${"block w-full rounded-md border-[1px] placeholder-gray-cool-400"} ${
              error
                ? "border-semantic-negative-400 focus:border-semantic-negative-400 focus:ring-4 focus:ring-semantic-negative-200 "
                : "border-gray-cool-300 focus:border-blue-primary-500 focus:ring-4 focus:ring-[#BCDBFB]"
            }`}
            id={id}
            placeholder={placeholder}
            {...rest}
          />
          {iconRight && (
            <div className="absolute right-2.5 bottom-[0.5px] flex h-full w-10 items-center justify-center">
              {iconRight}
            </div>
          )}
        </div>
      </div>
      {errorText && (
        <p className="mt-1 ml-1 text-[14px] leading-[24px] text-semantic-negative-500">
          {errorText}
        </p>
      )}
    </div>
  );
});

export default FormInput;

//example
{
  /* <FormInput
onChange={(e) => console.log(e.target.value)}
className="mt-2"
placeholder="placeholder"
label="labelnya ini"
/> */
}
