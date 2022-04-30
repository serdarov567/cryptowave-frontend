import { HStack, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Shield from "../assets/vectors/Shield";

export default function SecuredBadge() {
  return (
    <HStack
      backgroundColor={"background.500"}
      px={"10px"}
      py={"5px"}
      borderRadius={"5px"}
      alignSelf={"start"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Shield />
      <Text
        fontSize={useBreakpointValue({ base: "xx-small", md: "sm" })}
        color={"#89FFB1"}
        opacity={0.5}
      >
        Secured
      </Text>
    </HStack>
  );
}
