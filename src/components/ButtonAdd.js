import React from "react";

const ButtonAdd = ({ onClick, title, variant, icon, ...props }) => {
  return (
    <React.Fragment>
      <div className={`btn btn-${variant}`} onClick={onClick} {...props}>
        {title}
        <span className="px-2">
          <i className={`fa fa-${icon}`} aria-hidden="true" />
        </span>
      </div>
    </React.Fragment>
  );
};

ButtonAdd.defaultProps = {
  variant: "dark",
};

export default ButtonAdd;
