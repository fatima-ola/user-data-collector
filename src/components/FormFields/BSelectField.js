import React, { Fragment } from "react";

const BSelectField = ({ data, name, onChange, ...rest }) => {
  return (
    <div className="mb-3">
      <select
        className="form-select form-select-sm"
        name={name}
        onChange={onChange}
        {...rest}
      >
        <option value="">State of Origin</option>
        {data?.map((item) => (
          <Fragment key={item.id}>
            <option value={item.label}>{item.label}</option>
          </Fragment>
        ))}
      </select>
    </div>
  );
};

BSelectField.defaultProps = {
  data: [],
};

export default BSelectField;
