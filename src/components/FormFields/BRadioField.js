import React from "react";

const BRadioField = ({ title, name, data, checked, ...others }) => {
  return (
    <div className="mb-3">
      <div>
        <label>{title}</label>
      </div>
      {data?.map((item, index) => {
        return (
          <div className="form-check mx-3 d-inline-block" key={item.id}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              // name={"gender"}
              value={item.label}
              id={item.label}
              // checked={checked === item.name}
              {...others}
            />
            <label className="form-check-label d-inline" htmlFor={item.label}>
              {item.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

BRadioField.defaultProps = {
  title: "Gender",
  type: "radio",
  name: "gender",
};
export default BRadioField;
