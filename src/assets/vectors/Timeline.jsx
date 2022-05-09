import React from "react";

const Timeline = (props) => {
  return (
    <svg
      width={props.width}
      style={{ paddingInline: "5px" }}
      height="7"
      viewBox="0 0 56 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.333333 3.5C0.333333 4.97276 1.52724 6.16667 3 6.16667C4.47276 6.16667 5.66667 4.97276 5.66667 3.5C5.66667 2.02724 4.47276 0.833333 3 0.833333C1.52724 0.833333 0.333333 2.02724 0.333333 3.5ZM51 4L56 6.38675V0.613249L51 3V4ZM3 4H51.5V3H3V4Z"
        fill="#0D8BFF"
      />
    </svg>
  );
};

export default Timeline;
