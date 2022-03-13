import React from "react";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="./index.html">
            {" "}
            Logo{" "}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div
              className="navbar-brand position-absolute bottom-0 end-0 translate-right"
              href="#"
            >
              <a href="#O">Member</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
