import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";

const DollarSign = () => {
  return (
    <svg
      width={useBreakpointValue({base: '18', sm: '20', md: '24'})}
      height={useBreakpointValue({base: '19', sm: '21', md: '25'})}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_141_112)">
        <path
          d="M12 1.5V23.5"
          stroke="#FCFDFE"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 5.5H9.5C8.57174 5.5 7.6815 5.86875 7.02513 6.52513C6.36875 7.1815 6 8.07174 6 9C6 9.92826 6.36875 10.8185 7.02513 11.4749C7.6815 12.1313 8.57174 12.5 9.5 12.5H14.5C15.4283 12.5 16.3185 12.8687 16.9749 13.5251C17.6313 14.1815 18 15.0717 18 16C18 16.9283 17.6313 17.8185 16.9749 18.4749C16.3185 19.1313 15.4283 19.5 14.5 19.5H6"
          stroke="#FCFDFE"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_141_112">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DollarSign;
