import React, { useEffect } from "react";
import { Box, Container, Flex, Heading, VStack } from "@chakra-ui/react";
import Navbar from "src/components/Navbar";
import PlanItem from "src/components/PlanItem";
import { useIsSignedIn } from "src/utils/user";
import { useNavigate } from "react-router-dom";

const PlanHistory = () => {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isSignedIn) navigate("/#home", { replace: true });
    }
  }, [loading]);
  return (
    <Box>
      <Navbar></Navbar>
      <Container maxWidth={"container.xl"} paddingTop={"120px"}>
        <Flex flexDir={"column"}>
          <VStack w={"full"} paddingBottom={"100px"} spacing={5}>
            <Heading marginBlock={"20px"}>Plan history</Heading>
            <PlanItem />
            <PlanItem />
            <PlanItem />
            <PlanItem />
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default PlanHistory;
