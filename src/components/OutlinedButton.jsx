import { Box, Button, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { colors } from "../theme";

export default function OutlinedButton(props) {
  const { firstColor, secondColor, angle, isOutlined } = props;
  const gradient = `-webkit-linear-gradient(${angle}, ${firstColor}, ${secondColor})`;
  return (
    <Button
      {...props}
      fontSize={useBreakpointValue({ base: "sm", md: "mdb" })}
      background={`linear-gradient(${colors.background[800]}, ${colors.background[900]}) padding-box, ${gradient} border-box`}
      style={{
        borderRadius: "50em",
        border: "1px solid transparent",
      }}
      _hover={{
        background: `linear-gradient(${colors.background[900]}, ${colors.background[900]}) padding-box, ${gradient} border-box`,
      }}
      _focus={{}}
    />
  );
}
