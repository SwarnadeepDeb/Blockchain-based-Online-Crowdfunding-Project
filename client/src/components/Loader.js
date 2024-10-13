import React from "react";
import "./Loader.css";

function Loader({ message }) {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="spinner"></div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
}

export default Loader;
