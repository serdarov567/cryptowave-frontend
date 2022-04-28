import React, { useState, useRef, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { findDOMNode } from "react-dom";
import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  Text,
  Container,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Phone from "./vectors/Phone";
import nigga from "./nigga.png";
import { useFade } from "./hooks";

function App() {
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
      <Container maxWidth={"container.xl"} px={20}>
        <Flex maxW={"container.xl"} minH={"100vh"} py={20}>
          <HStack spacing={4} flex={1}>
            <VStack flex={1} align={"left"} alignItems={"flex-start"}>
              <Text fontFamily={"heading"} fontSize={"8xl"} color={"white"}>
                Motto
              </Text>
              <Text fontFamily={"sans-serif"} ontSize={"md"} color={"white"}>
                lorem ipsum dolor sit
              </Text>
            </VStack>
            <Image
              flex={1}
              src="https://cdn-icons-png.flaticon.com/512/1213/1213973.png"
            />
          </HStack>
        </Flex>

        <Flex maxW={"container.xl"} minH={"100vh"} py={20}>
          <HStack spacing={4} flex={1}>
            <VStack flex={1} align={"left"} alignItems={"flex-start"}>
              <Text fontFamily={"heading"} fontSize={"8xl"} color={"white"}>
                Motto
              </Text>
              <Text fontFamily={"sans-serif"} ontSize={"md"} color={"white"}>
                lorem ipsum dolor sit
              </Text>
            </VStack>
            <Image
              flex={1}
              src="https://cdn-icons-png.flaticon.com/512/1213/1213973.png"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default App;
