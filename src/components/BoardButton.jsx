import React from "react";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { colors } from "src/theme";

function BoardButton(props) {
  let configs;

  const width = useBreakpointValue({ base: "80px", sm: "100px", md: "150px" });
  const height = useBreakpointValue({
    base: "100px",
    sm: "150px",
    md: "200px",
  });

  if (props.isColorful) {
    configs = {
      background: `linear-gradient(${colors.background[900]}, ${colors.background[900]}) padding-box, linear-gradient(110deg, ${colors.blue[500]}, ${colors.violet[500]}) border-box`,
      border: "2px solid transparent",
      boxShadow: "7px 6px 20px 0px #6B68FF50",
    };
  } else {
    configs = {
      backgroundColor: "transparent",
      border: `1px solid ${colors.violet[200]}25`,
    };
  }

  return (
    <Box
      width={width}
      height={height}
      borderRadius={"5px"}
      cursor={"pointer"}
      {...configs}
    >
      {props.isColorful && (
        <Box
          position={"absolute"}
          width={width}
          height={height}
          borderRadius={"5px"}
          background={`linear-gradient(110deg, ${colors.blue[500]}, ${colors.violet[500]})`}
          opacity={0.15}
        />
      )}
      <Flex flexDir={"column"} height={height}>
        <Flex flex={1} justifyContent={"center"} alignItems={"flex-end"}>
          {props.icon}
        </Flex>
        <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
          <Text
            fontFamily={"Manrope"}
            fontWeight={500}
            fontSize={useBreakpointValue({ base: "10px", md: "16px" })}
            color={"white"}
          >
            {props.text}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default BoardButton;
