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
        userSelect: "none",
        alignSelf: props.alignSelf,
        backgroundColor: props.bgColor,
        paddingInline: props.paddingX,
        paddingBlock: props.paddingY,
        borderRadius: props.borderRadius,
        fontFamily: props.fontFamily,
      }}
      href={props.href}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
}
