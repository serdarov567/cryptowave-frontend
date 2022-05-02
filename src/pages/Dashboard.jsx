import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Clock from "src/assets/vectors/Clock";
import FilePlus from "src/assets/vectors/FilePlus";
import BoardButton from "src/components/BoardButton";
import Navbar from "src/components/Navbar";
import OutlinedButton from "src/components/OutlinedButton";
import { colors } from "src/theme";

function Dashboard() {
  return (
    <Box backgroundColor={"background.900"} height={"100vh"}>
      <Navbar />
      <Container maxWidth={"container.xl"} paddingTop={"120px"}>
        <VStack>
          <Flex
            flexDir={useBreakpointValue({ base: "column", sm: "row" })}
            width={"full"}
          >
            <HStack
              flex={1}
              justifyContent={useBreakpointValue({
                base: "center",
                sm: "flex-start",
              })}
              spacing={"30px"}
              px={useBreakpointValue({
                sm: "10px",
                md: "40px",
                lg: "40px",
                xl: "0px",
              })}
            >
              <BoardButton
                isColorful={true}
                icon={<FilePlus />}
                text="Add new plan"
              />
              <BoardButton
                isColorful={false}
                icon={<Clock />}
                text="Plan history"
              />
            </HStack>
            <Flex
              flexDir={"column"}
              display={"flex"}
              flex={1}
              justifyContent={"flex-start"}
              alignSelf={"center"}
              marginTop={useBreakpointValue({base: '30px', sm: 0})}
            >
              <Heading>Total earning</Heading>
              <HStack display={"flex"} alignItems={"center"} height={"70px"}>
                <Heading fontFamily={"Manrope-ExtraBold"} color={"blue.450"}>
                  270
                </Heading>
                <OutlinedButton
                  fontSize={"30px"}
                  fontWeight={700}
                  fontFamily={"Manrope"}
                  backgroundColor={"background.600"}
                  px={"5px"}
                  py={"25px"}
                  color={"#999"}
                  angle={"150deg"}
                  firstColor={colors.background[200]}
                  secondColor={colors.background[900]}
                >
                  $
                </OutlinedButton>
              </HStack>
            </Flex>
          </Flex>
          <VStack></VStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default Dashboard;
