import {
  Box,
  Button,
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

export default function GradientButton(props) {
  return (
    <Button
      {...props}
      fontSize={useBreakpointValue({ base: "14px", md: "mdb" })}
      fontWeight={500}
      h={useBreakpointValue({ base: "33px", md: "38px" })}
      paddingInline={useBreakpointValue({base: "15px", md: "20px"})}
      fontFamily={"Manrope"}
      color={"white"}
      bgGradient={"-webkit-linear-gradient(110deg, blue.500, violet.500)"}
      _focus={{
        boxShadow: "none",
        bgGradient: "-webkit-linear-gradient(110deg, blue.200, violet.200)",
      }}
      _hover={{
        bgGradient: "-webkit-linear-gradient(110deg, blue.900, violet.900)",
      }}
      transition="0.3s all"
      boxShadow={"7px 6px 20px 0px #6B68FF50"}
      backgroundColor={"background.800"}
      style={{ transform: "scaleX(0.99) scaleY(0.95)" }}
    />
  );
}
