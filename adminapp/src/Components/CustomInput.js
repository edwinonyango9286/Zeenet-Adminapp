import React from "react";

const CustomInput = React.memo((props) => {
  const {
    type,
    label,
    i_id,
    i_class,
    name,
    val,
    onChng,
    onBlr,
    max,
    min,
    step,
  } = props;
  return (
    <>
      <div className="form-floating mt-2">
        <input
          type={type}
          className={`form-control border rounded-md shadow-none ${i_class}`}
          id={i_id}
          max={max}
          min={min}
          step={step}
          placeholder={label}
          name={name}
          value={val}
          onChange={onChng}
          onBlur={onBlr}
        />
        <label htmlFor={label}>{label}</label>
      </div>
    </>
  );
});
export default CustomInput;
