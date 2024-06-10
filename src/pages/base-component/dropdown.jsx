import Select from "react-select";
import { forwardRef } from "react";

const SelectComponent = forwardRef((props, ref) => {
  const {
    data,
    value,
    onChange,
    onBlur,
    placeholder,
    disable = false,
    errorText,
    noOptionsMessage,
  } = props;

  return (
    <div className="flex flex-col">
      <Select
        ref={ref}
        styles={{
          control: (base, state) => ({
            ...base,
            "*": {
              boxShadow: "none !important",
            },
            ...(state.isDisabled && {
              backgroundColor: "#F9FAFB",
              cursor: "not-allowed",
              pointerEvents: "auto",
              // This line disable the blue border
              boxShadow: state.isFocused ? 0 : 0,
              "&:hover": {
                // border: state.isFocused ? 0 : 0,
              },
            }),
          }),
        }}
        isDisabled={disable}
        options={data}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
      />
      {errorText && (
        <p className="mt-1 ml-1 text-[14px] leading-[24px] text-semantic-negative-500">
          {errorText}
        </p>
      )}
    </div>
  );
});

export default SelectComponent;
