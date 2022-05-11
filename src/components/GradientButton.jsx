import React from "react";
import { Button, useBreakpointValue } from "@chakra-ui/react";
import { colors } from "src/theme";

export default function GradientButton(props) {
  return (
    <Button
      fontSize={useBreakpointValue({ base: "small", md: "mdb" })}
      fontWeight={500}
      minH={"40px"}
      h={useBreakpointValue({ base: "33px", md: "38px" })}
      paddingInline={useBreakpointValue({ base: "15px", md: "20px" })}
      fontFamily={"Manrope"}
      color={"white"}
      bgGradient={"-webkit-linear-gradient(110deg, blue.500, violet.500)"}
      _focus={{
        boxShadow: "none",
        bgGradient: "linear-gradient(110deg, blue.200, violet.200)",
      }}
      _hover={{
        bgGradient: `linear-gradient(110deg, ${colors.blue[900]}, ${colors.violet[900]}) padding-box`,
      }}
      boxShadow={"7px 6px 20px 0px #6B68FF50"}
      {...props}
    />
  );
}
