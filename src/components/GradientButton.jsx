import { Box, Button } from "@chakra-ui/react";
import React from "react";

export default function GradientButton(props) {
  const { firstColor, secondColor, angle, isOutlined } = props;
  const gradient = `-webkit-linear-gradient(${angle}, ${firstColor}, ${secondColor})`;
  return (
    <Button
      {...props}
      fontSize={"mdb"}
      fontWeight={500}
      h={"38px"}
      paddingInline={"20px"}
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
