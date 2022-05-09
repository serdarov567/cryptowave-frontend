import React, { useState } from "react";

export default function TextButton(props) {
  const [hover, setHover] = useState(false);
  return (
    <a
      style={{
        fontSize: props.fontSize ? props.fontSize : "20px",
        color: hover
          ? "#FFF"
          : props.accentColor
          ? props.accentColor
          : "#959595",
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
