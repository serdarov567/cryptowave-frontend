import React from "react";
import { Box, Container, Flex, Heading, VStack } from "@chakra-ui/react";
import Navbar from "src/components/Navbar";

const Withdraw = () => {

  

  return (
    <Box>
      <Navbar></Navbar>
      <Container maxWidth={"container.xl"} paddingTop={"120px"}>
        <Flex flexDir={"column"}>
          <
          <VStack w={"full"} paddingBottom={"100px"} spacing={5}>
            <Heading marginBlock={"20px"}>Transaction history</Heading>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Withdraw;
