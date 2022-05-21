import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";

function Clock(props) {
  const size = useBreakpointValue({ base: "40px", md: "50px" });
  return (
    <svg
      className="Icon"
      style={{ transform: `scale(${props.hover ? 1.1 : 1.0})` }}
      width={props.size ? props.size : size}
      height={props.size ? props.size : size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={props.onMouseEnter}
      onMouseOut={props.onMouseOut}
    >
      <path
        d="M25 45.8333C36.5059 45.8333 45.8333 36.5059 45.8333 25C45.8333 13.4941 36.5059 4.16667 25 4.16667C13.494 4.16667 4.16663 13.4941 4.16663 25C4.16663 36.5059 13.494 45.8333 25 45.8333Z"
        stroke={props.color ? props.color : "#B2B2B2"}
        strokeWidth={props.strokeWidth ? props.strokeWidth : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 12.5V25L33.3333 29.1667"
        stroke={props.color ? props.color : "#B2B2B2"}
        strokeWidth={props.strokeWidth ? props.strokeWidth : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Clock;
