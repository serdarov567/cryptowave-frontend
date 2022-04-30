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
  useBreakpoint,
} from "@chakra-ui/react";
import { useFade } from "../hooks";
import Coin from "../assets/images/coin.webp";
import Shield from "../assets/vectors/Shield";
import Tilde from "../assets/vectors/Tilde";
import GradientButton from "../components/GradientButton";
import { colors } from "../theme";
import SecuredBadge from "../components/SecuredBadge";

function Landing() {
  const isSignedIn =
    localStorage.getItem("email") !== null &&
    localStorage.getItem("token") !== null;
  return (
    <Box scrollBehavior="smooth" bgColor={"background.900"}>
      <Navbar isSignedIn={isSignedIn} />
      <Container
        display={"flex"}
        flexDir={"column"}
        overflowX={"hidden"}
        maxWidth={"container.xl"}
        paddingX={"0px"}
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
      flexDir={"column"}
      maxW={"container.xl"}
      minH={"100vh"}
      justifyContent="center"
      paddingX={0}
    >
      <Flex
        flexDir={useBreakpointValue({ base: "column", md: "row" })}
        py={useBreakpointValue({ base: "70px", md: "120px" })}
        overflow="hidden"
        justifyContent={useBreakpointValue({
          base: "center",
          md: "space-between",
        })}
        marginX={useBreakpointValue({
          base: "15px",
          md: "55px",
          lg: "55px",
          xl: "25px",
          "2xl": "25px",
        })}
      >
        <VStack
          alignSelf={"center"}
          spacing={4}
          px={useBreakpointValue({ base: "10px", md: "0px" })}
        >
          <SecuredBadge />
          <Heading
            fontSize={useBreakpointValue({ base: "sm", sm: "2xl", md: "4xl" })}
            fontFamily={"Manrope"}
            color={"#FFF"}
          >
            Manage your transactions with{" "}
            <span
              style={{
                fontSize: useBreakpointValue({
                  base: "18px",
                  sm: "32px",
                  md: "42px",
                }),
                fontFamily: "Manrope-ExtraBold",
                fontWeight: 900,
                background: `linear-gradient(110deg, ${colors.violet[100]}, ${colors.blue[400]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cryptolkun
            </span>
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

        <Box
          alignSelf={"center"}
          minW={useBreakpointValue({ base: "50px", sm: "80px", md: "400px" })}
          maxW={useBreakpointValue({ base: "200px", sm: "350px", md: "500px" })}
        >
          <Image src={Main} />
        </Box>
      </Flex>

      <VStack
        width={"fit-content"}
        height={"50px"}
        display={"flex"}
        flexDirection={"column"}
        alignSelf={"center"}
        marginLeft={`${(window.outerHeight - window.innerHeight) / 5}px`}
      >
        <Text
          cursor={"pointer"}
          onClick={() => {
            let top = window.outerHeight * 1;
            window.scrollTo({ top, behavior: "smooth" });
          }}
          color={"#505070"}
        >
          Scroll down
        </Text>
        <Box style={{ animation: "updown 1.5s infinite forwards" }}>
          <Tilde />
        </Box>
      </VStack>
    </Container>
  );
}

function Plans() {
  return (
    <Container
      display={"flex"}
      flexDir={"column"}
      maxW={window.innerWidth}
      minH={"100vh"}
      marginTop={useBreakpointValue({ base: "100px", md: "250px" })}
      paddingX={0}
    >
      <Heading
        marginLeft={`${(window.outerHeight - window.innerHeight) / 5}px`}
        bgColor={"blackAlpha.100"}
        alignSelf={"center"}
        fontSize={useBreakpointValue({ base: "sm", sm: "2xl", md: "4xl" })}
        fontFamily={"Manrope"}
        color={"#FFF"}
      >
        PLANS
      </Heading>
    </Container>
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
