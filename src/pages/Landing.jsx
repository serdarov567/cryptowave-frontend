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
    if (window.scrollY > 100) {
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
      bg={useColorModeValue("background.200", "background.900")}
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

function Tariffs() {
  return (
    <Flex
      maxW={"container.xl"}
      minH={"100vh"}
      py={useBreakpointValue({ base: 0, md: 20 })}
      overflow="hidden"
    >
      <Flex
        flex={1}
        overflow={"hidden"}
        bg={"background.900"}
        borderRadius={20}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
      >
        <Heading
          flex={1}
          alignSelf={"center"}
          fontSize={useBreakpointValue({ base: "3xl", md: "5xl" })}
          color={"white"}
        >
          Tariffs
        </Heading>
        <HStack
          flex={5}
          display={"flex"}
          flexDirection={useBreakpointValue({ base: "column", md: "row" })}
          spacing={10}
          px={10}
        >
          <Box
            flex={1}
            bg={"white"}
            height={"350px"}
            borderRadius={20}
            _hover={{
              boxShadow: "5px 10px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
            transition="500ms"
          />
          <Box
            flex={1}
            bg={"white"}
            height={"350px"}
            borderRadius={20}
            _hover={{
              boxShadow: "5px 10px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
            transition="500ms"
          />
          <Box
            flex={1}
            bg={"white"}
            height={"350px"}
            borderRadius={20}
            _hover={{
              boxShadow: "5px 10px",
              marginBottom: "10px",
              marginRight: "5px",
            }}
            transition="500ms"
          />
        </HStack>
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
