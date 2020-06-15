import React from "react";

export const Spinner = () => (
  <div className="offset-md-6">
    <div
      className="spinner-grow text-primary"
      role="status"
      style={{width: "3rem", height: "3rem"}}
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
