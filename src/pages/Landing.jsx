import React, { useState, useRef, useEffect } from "react";
import Main from "../assets/images/main.png";

import Navbar from "../components/Navbar";
import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  Text,
  Container,
  HStack,
  VStack,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { useFade } from "../hooks";
import Coin from "../assets/images/coin.webp";
import Shield from "../assets/vectors/Shield";
import Motto from "../assets/vectors/Motto";
import GradientButton from "../components/GradientButton";

function Landing() {
  const isSignedIn =
    localStorage.getItem("email") !== null &&
    localStorage.getItem("token") !== null;
  return (
    <Box scrollBehavior="smooth" bgColor={"background.900"}>
      <Navbar isSignedIn={isSignedIn} />
      <Container
        display={"flex"}
        maxWidth={"container.xl"}
        justifyContent={"center"}
      >
        <Home />
        <Plans />
        <AboutUs />
      </Container>
    </Box>
  );
}

function Home() {
  return (
    <Container
      display={"flex"}
      maxW={"container.xl"}
      marginX={useBreakpointValue({
        md: "40px",
        lg: "40px",
        xl: "0px",
      })}
      minH={"100vh"}
      flexDir={useBreakpointValue({ base: "column", md: "row" })}
      py={useBreakpointValue({ base: "70px", md: "120px" })}
      overflow="hidden"
      paddingLeft={0}
      justifyContent={useBreakpointValue({
        base: "center",
        md: "space-between",
      })}
    >
      <VStack alignSelf={"center"} spacing={4}>
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
        <Heading
          fontSize={useBreakpointValue({ base: "sm", sm: "2xl", md: "4xl" })}
          fontFamily={"Manrope"}
          color={"#FFF"}
        >
          Manage your transactions with <Motto />
        </Heading>

        <GradientButton
          marginTop={"30px"}
          alignSelf={"start"}
          as={"a"}
          href={"/sign/up"}
        >
          Sign Up
        </GradientButton>
      </VStack>

      <Box alignSelf={"center"}>
        <Image src={Main} />
      </Box>
    </Container>
  );
}

function Plans() {
  return (
    <Flex
      maxW={"container.xl"}
      minH={"100vh"}
      py={useBreakpointValue({ base: 0, md: 20 })}
      alignItems={"center"}
      overflow="hidden"
    ></Flex>
  );
}

function AboutUs() {
  return (
    <Flex
      maxW={"container.xl"}
      minH={"100vh"}
      py={useBreakpointValue({ base: 0, md: 20 })}
      overflow="hidden"
    ></Flex>
  );
}

export default Landing;
