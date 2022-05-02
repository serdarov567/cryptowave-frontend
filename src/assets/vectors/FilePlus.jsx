import React from "react";
import { useBreakpointValue } from "@chakra-ui/react";

function FilePlus() {
  const size = useBreakpointValue({base: '40px', md: '60px'});
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35 5H15C13.6739 5 12.4021 5.52678 11.4645 6.46447C10.5268 7.40215 10 8.67392 10 10V50C10 51.3261 10.5268 52.5979 11.4645 53.5355C12.4021 54.4732 13.6739 55 15 55H45C46.3261 55 47.5979 54.4732 48.5355 53.5355C49.4732 52.5979 50 51.3261 50 50V20L35 5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M35 5V20H42.5H50"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30 45V30"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.5 37.5H37.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default FilePlus;
