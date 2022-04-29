import { Box, Button, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

export default function OutlinedButton(props) {
  const { firstColor, secondColor, angle, isOutlined } = props;
  const gradient = `-webkit-linear-gradient(${angle}, ${firstColor}, ${secondColor})`;
  return (
    <Box
      height={"fit-content"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundImage: gradient,
        borderRadius: 6,
      }}
    >
      <Button
        {...props}
        fontSize={useBreakpointValue({ base: "sm", md: "mdb" })}
        backgroundColor={"background.800"}
        style={{ transform: "scaleX(0.99) scaleY(0.95)" }}
        _hover={{
          backgroundColor: "background.900",
        }}
      />
    </Box>
  );
}
