import { Button, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { colors } from "../theme";

export default function OutlinedButton(props) {
  const { firstColor, secondColor, angle } = props;
  const gradient = `-webkit-linear-gradient(${angle}, ${firstColor}, ${secondColor})`;
  return (
    <Button
      fontSize={useBreakpointValue({ base: "14px", md: "mdb" })}
      fontWeight={500}
      h={useBreakpointValue({ base: "33px", md: "38px" })}
      paddingInline={useBreakpointValue({ base: "15px", md: "20px" })}
      background={`linear-gradient(${colors.background[800]}, ${colors.background[900]}) padding-box, ${gradient} border-box`}
      style={{
        borderRadius: "5px",
        border: "1px solid transparent",
      }}
      _hover={{
        background: `linear-gradient(${colors.background[900]}, ${colors.background[900]}) padding-box, ${gradient} border-box`,
      }}
      _focus={{}}
      {...props}
    />
  );
}
