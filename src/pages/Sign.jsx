import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Sign() {
  const { type } = useParams();
  return (
    <Box
      display={"flex"}
      flexDirection={useBreakpointValue({ base: "column", lg: "row" })}
      w={"100vw"}
      h={"100vh"}
      bg={"background.200"}
      px={20}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Heading
        m={10}
        marginTop={useBreakpointValue({ base: -70, md: 0 })}
        textAlign={"center"}
        fontSize={useBreakpointValue({ base: "4xl", md: "7xl" })}
        color={"white"}
      >
        {type === "in" ? "Welcome back!" : "Welcome to CryptoWave!"}
      </Heading>
      <Container
        marginRight={useBreakpointValue({ base: "50px", md: "20px" })}
        marginLeft={useBreakpointValue({ base: "50px", md: "20px" })}
        py={5}
        px={useBreakpointValue({ base: 5, md: 10 })}
        bg={"white"}
        opacity={0}
        transitionDuration={"500ms"}
        borderRadius={useBreakpointValue({ base: 20, md: 10 })}
        animation={"SlideFadeIn 1s forwards"}
      >
        <SignInUp type={type} />
      </Container>
    </Box>
  );
}

function SignInUp(props) {
  return (
    <VStack spacing={useBreakpointValue({ base: 1, md: 5 })}>
      <Heading>Sign {props.type}</Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="example@email.com" />
      </FormControl>
      {props.type === "up" && (
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder="John" />
        </FormControl>
      )}
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input placeholder="Password" />
        <FormErrorMessage >SS</FormErrorMessage>
      </FormControl>
      <a
        fontSize={"sm"}
        textAlign={"left"}
        w={"full"}
        href={props.type !== "up" ? "/sign/up" : "/sign/in"}
        cursor={"pointer"}
      >
        {props.type !== "up"
          ? "Don't have an account? then Sign Up"
          : "Already have an account? then Sign in"}
      </a>
      <Button
        bg={"accent.200"}
        _focus={{ boxShadow: "none" }}
        _hover={{
          bg: "accent.900",
        }}
        color={"white"}
        onClick={() => {
          alert("shio");
        }}
      >
        {props.type !== "up" ? "Sign in" : "Sign up"}
      </Button>
    </VStack>
  );
}

function Verify() {
  return <Container></Container>;
}

function Forgot() {
  return <Container></Container>;
}
