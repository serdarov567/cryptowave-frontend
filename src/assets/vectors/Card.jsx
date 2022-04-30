import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardIcon(props) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_24_74)">
        <path
          d="M17.5 3.83333H2.50001C1.57954 3.83333 0.833344 4.57952 0.833344 5.5V15.5C0.833344 16.4205 1.57954 17.1667 2.50001 17.1667H17.5C18.4205 17.1667 19.1667 16.4205 19.1667 15.5V5.5C19.1667 4.57952 18.4205 3.83333 17.5 3.83333Z"
          stroke="#F3F3F3"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.833344 8.83333H19.1667"
          stroke="#F3F3F3"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_24_74">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
