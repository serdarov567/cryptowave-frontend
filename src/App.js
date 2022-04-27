import React, { useState, useRef, useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Box, Flex, useColorModeValue, Image, Text } from "@chakra-ui/react";
import Phone from "./vectors/Phone";
import nigga from "./nigga.png";

function App() {
  return (
    <Box
      height={"100vh"}
      bg={useColorModeValue("background.200", "background.900")}
    >
      <Navbar />
      <Flex position={"absolute"} top={"120px"} align={"center"}>
        <Image boxSize={"450px"} src={nigga} />
        <Text
          fontFamily={"heading"}
          fontSize={"5xl"}
          color={"white"}
          width={"400px"}
        >
          SERIK GARA <br/>iň ynamly satrudnik
        </Text>
      </Flex>

      <Box minH={"200px"} position={"absolute"} right={"100px"} top={"180px"}>
        <Phone width={"500px"} height={"500px"} />
      </Box>
    </Box>
  );
}

export default App;
