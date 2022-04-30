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
import Tilde from "../assets/vectors/Tilde";
import GradientButton from "../components/GradientButton";
import { colors } from "../theme";

const scrollBarWidth = window.outerWidth - window.innerWidth;

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
        maxWidth={"100vw"}
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
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(
    window.scrollbars.visible
  );

  useEffect(() => {
    const resizeHandler = () => {
      setTimeout(() => {
        if (window.scrollbars.visible) {
          if (!isScrollbarVisible) {
            setIsScrollbarVisible(!isScrollbarVisible);
          }
        } else {
          if (isScrollbarVisible) {
            setIsScrollbarVisible(!isScrollbarVisible);
          }
        }
      }, 500);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

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
          md: "40px",
          lg: "40px",
          xl: "40px",
          "2xl": "25px",
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
            Manage your transactions with{" "}
            <span
              style={{
                fontSize: '15px'
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

        <Box alignSelf={"center"}>
          <Image src={Main} />
        </Box>
      </Flex>

      <VStack
        width={"80vw"}
        height={"50px"}
        display={"flex"}
        flexDirection={"column"}
        alignSelf={"center"}
        marginLeft={isScrollbarVisible ? `${scrollBarWidth}px` : "0px"}
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
