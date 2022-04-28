import React, { useState, useRef, useEffect } from "react";

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

function Landing() {
  const [isVisible, setShow, fadeProps] = useFade(false);
  const onScroll = () => {
    if (window.scrollY > 20) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, true);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
    };
  }, []);
  return (
    <Box
      scrollBehavior="smooth"
      bgGradient={"radial(background.100, background.900)"}
    >
      <Navbar {...fadeProps} />
      <Container
        maxWidth={"container.xl"}
        px={useBreakpointValue({ base: 10, md: 20 })}
      >
        <Home />
        <Tariffs />
        <AboutUs />
      </Container>
    </Box>
  );
}

function Home() {
  return (
    <Flex
      maxW={"container.xl"}
      minH={"100vh"}
      py={useBreakpointValue({ base: "50px", md: "100px" })}
      overflow="hidden"
      paddingTop={useBreakpointValue({ base: "-40px", md: "-60px" })}
    >
      <Flex
        flex={1}
        overflow={"hidden"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={useBreakpointValue({ base: "column", md: "row" })}
      >
        <VStack
          align={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          m={10}
          opacity={0}
          animation={"SlideFadeIn 1s 2s forwards"}
        >
          <Heading
            fontSize={useBreakpointValue({ base: "4xl", md: "7xl" })}
            color={"white"}
          >
            Motto
          </Heading>
          <Text
            fontFamily={"sans-serif"}
            fontSize={useBreakpointValue({ base: "md", md: "2xl" })}
            color={"white"}
          >
            lorem ipsum dolor sit
          </Text>
        </VStack>
        <Box overflow={"hidden"}>
          <Image
            height={"auto"}
            maxH={useBreakpointValue({ base: "300px", md: "500px" })}
            width={"auto"}
            p={useBreakpointValue({ base: 0, md: 10 })}
            animation={"rotate 2s forwards"}
            src={Coin}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

function Tariffs() {
  return (
    <Flex
      maxW={"container.xl"}
      minH={"100vh"}
      py={useBreakpointValue({ base: 0, md: 20 })}
      alignItems={"center"}
      overflow="hidden"
    >
      <Flex
        width={"full"}
        overflow={"hidden"}
        bg={"background.900"}
        borderRadius={20}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        py={"20px"}
        marginTop={"60px"}
      >
        <Heading
          fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}
          color={"white"}
        >
          Tariffs
        </Heading>
        <Flex
          flex={1}
          width={"full"}
          minH={"450px"}
          display={"flex"}
          alignItems={useBreakpointValue({ base: "", md: "center" })}
          flexDirection={useBreakpointValue({
            base: "column",
            sm: "column",
            md: "row",
          })}
          px={10}
        >
          <Box
            flex={1}
            bg={"white"}
            height={"350px"}
            margin={"10px"}
            borderRadius={20}
            _hover={{
              boxShadow: "5px 10px",
            }}
            transition="100ms"
          />
          <Box
            flex={1}
            bg={"white"}
            height={"350px"}
            margin={"10px"}
            borderRadius={20}
            _hover={{
              boxShadow: "5px 10px",
            }}
            transition="100ms"
          />
          <Box
            flex={1}
            bg={"white"}
            height={"350px"}
            borderRadius={20}
            margin={"10px"}
            _hover={{
              boxShadow: "5px 10px",
            }}
            transition="100ms"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

function AboutUs() {
  return (
    <Flex
      maxW={"container.xl"}
      minH={"100vh"}
      py={useBreakpointValue({ base: 0, md: 20 })}
      overflow="hidden"
    >
      <Flex
        spacing={4}
        flex={1}
        overflow={"hidden"}
        flexDirection={useBreakpointValue({ base: "column", md: "row" })}
      >
        <VStack
          flex={1}
          align={"left"}
          alignItems={"center"}
          justifyContent={"center"}
          animation={"SlideFadeIn 1s forwards"}
        >
          <Heading
            fontSize={useBreakpointValue({ base: "4xl", md: "7xl" })}
            color={"white"}
          >
            Motto
          </Heading>
          <Text
            fontFamily={"sans-serif"}
            fontSize={useBreakpointValue({ base: "md", md: "2xl" })}
            color={"white"}
          >
            lorem ipsum dolor sit
          </Text>
        </VStack>
        <Box flex={1} alignSelf={"center"} overflow={"hidden"}>
          <Image
            height={"auto"}
            maxH={useBreakpointValue({ base: "300px", md: "500px" })}
            width={"auto"}
            p={useBreakpointValue({ base: 0, md: 10 })}
            animation={"rotate 2s forwards"}
            src={Coin}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Landing;
