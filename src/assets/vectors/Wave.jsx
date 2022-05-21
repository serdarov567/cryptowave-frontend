import React from "react";

const Wave = ({ style, width }) => {
  return (
    <svg
      style={style}
      width={`${width}`}
      height="160"
      viewBox={`0 0 ${window.outerWidth + window.outerWidth * 0.1} 166`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 166L41.58 146.235C84.42 126.471 167.58 86.9413 252 83.6472C336.42 80.3531 419.58 113.294 504 129.765C588.42 146.235 671.58 146.235 756 136.353C840.42 126.471 923.58 106.706 1008 80.3531C1092.42 54.0002 1175.58 21.0591 1260 7.88266C1344.42 -5.29378 1427.58 1.29444 1470.42 4.58855L1512 7.88266V166H1470.42C1427.58 166 1344.42 166 1260 166C1175.58 166 1092.42 166 1008 166C923.58 166 840.42 166 756 166C671.58 166 588.42 166 504 166C419.58 166 336.42 166 252 166C167.58 166 84.42 166 41.58 166H0Z"
        fill="#1D1D1E"
      />
    </svg>
  );
};

export default Wave;
