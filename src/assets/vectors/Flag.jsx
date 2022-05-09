import React from "react";

const Flag = (props) => {
  const { color, gradient } = props;
  return (
    <svg
      key={props.uniqueKey}
      width="106"
      height="75"
      viewBox="0 0 106 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 5C0 2.23858 2.23858 0 5 0H101C103.761 0 106 2.23858 106 5V47.7727C106 49.7374 104.849 51.52 103.059 52.3291L56.0209 73.5867C54.7341 74.1683 53.2614 74.1786 51.9666 73.6151L3.00482 52.3077C1.1801 51.5136 0 49.713 0 47.723V5Z"
        fill={`url(#${props.uniqueKey})`}
      />
      <defs>
        <linearGradient
          id={props.uniqueKey}
          x1="53"
          y1="0"
          x2="53"
          y2="74.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={gradient} />
          <stop offset="1" stop-color={color} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Flag;
