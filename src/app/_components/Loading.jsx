import React from "react";

const Loading = () => {
  return (
    <div style={overlayStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const spinnerStyle = {
  width: "50px",
  height: "50px",
  border: "6px solid #ccc",
  borderTop: "6px solid #1e90ff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

export default Loading;
