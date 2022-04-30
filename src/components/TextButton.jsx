import React, { useState } from "react";

export default function TextButton(props) {
  const [hover, setHover] = useState(false);
  return (
    <a
      style={{
        fontSize: "15px",
        color: hover ? "#FFF" : "#959595",
        transition: "200ms all",
        cursor: "pointer",
      }}
      href={props.href}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {props.children}
    </a>
  );
}
