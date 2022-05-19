import React from "react";
import {
  Flex,
  Text,
  Container,
  VStack,
  useBreakpointValue,
  Heading,
  Box,
  HStack,
} from "@chakra-ui/react";
import ReferralIllustration from "src/assets/vectors/referral.svg";
import ReferralIllustration2 from "src/assets/images/referral2.png";
import Checkbox from "src/assets/vectors/Checkbox.svg";

const Referral = ({ langKeys }) => {
  return (
    <Box
      id={"Referral"}
      pos={"relative"}
      maxW={"1440px"}
      w={window.outerWidth}
      h={"fit-content"}
      backgroundColor={"#292C35"}
      borderTopLeftRadius={"50px"}
      borderTopRightRadius={"50px"}
      alignSelf={"center"}
    >
      <Container
        pos={"relative"}
        flexDir={"column"}
        maxW={"container.xl"}
        h={"fit-content"}
        paddingTop={useBreakpointValue({ base: "30px", md: "50px" })}
        paddingBottom={useBreakpointValue({ base: "50px", md: "70px" })}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          textAlign={"center"}
          fontFamily={"Manrope-ExtraBold"}
          marginBottom={"70px"}
          alignSelf={"center"}
        >
          {langKeys["referralProgram"]}
        </Heading>
        <Flex
          flexDir={useBreakpointValue({ base: "column", md: "row" })}
          px={useBreakpointValue({ base: "20px", md: "30px" })}
          marginBottom={useBreakpointValue({ base: "30px", md: "100px" })}
          justifyContent={"center"}
        >
          <Flex
            pos={"relative"}
            flex={3}
            justifyContent={"center"}
            alignItems={"center"}
            paddingRight={useBreakpointValue({
              base: "0px",
              sm: "0px",
              md: "0px",
              lg: "100px",
            })}
          >
            <img src={ReferralIllustration} alt={"referralIllustration"} />
          </Flex>
          <VStack
            flex={4}
            alignItems={"start"}
            spacing={4}
            bgColor={"#2f3038"}
            p={"50px"}
            borderRadius={"30px"}
          >
            <Heading
              fontSize={"20px"}
              w={"full"}
              fontFamily={"Manrope-ExtraBold"}
              color={"#A9A7FF"}
            >
              {langKeys["referralHeader"]}
            </Heading>
            <Text fontSize={"16px"} color={"#aeaeae"} textAlign={"left"}>
              {langKeys["referralProgramContent"]}
            </Text>
          </VStack>
        </Flex>

        <Heading
          textAlign={"center"}
          fontFamily={"Manrope-ExtraBold"}
          marginTop={useBreakpointValue({ base: "80px", md: "140px" })}
          marginBottom={useBreakpointValue({ base: "40px", md: "70px" })}
          alignSelf={"center"}
        >
          {langKeys["keyFeatures"]}
        </Heading>
        <Flex
          flexDir={useBreakpointValue({ base: "column", md: "row" })}
          px={useBreakpointValue({ base: "20px", md: "30px" })}
          marginBottom={useBreakpointValue({ base: "15px", md: "50px" })}
          justifyContent={"center"}
        >
          <Flex
            pos={"relative"}
            flex={4}
            justifyContent={"center"}
            alignItems={"center"}
            paddingRight={useBreakpointValue({
              base: "0px",
              sm: "0px",
              md: "0px",
              lg: "100px",
            })}
          >
            <img src={ReferralIllustration2} alt={"referralIllustration2"} />
          </Flex>
          <Flex
            flex={3}
            alignItems={"center"}
            spacing={4}
            marginTop={useBreakpointValue({ base: "20px", md: "0px" })}
          >
            <VStack spacing={5} align={"start"}>
              <HStack spacing={3}>
                <img src={Checkbox} alt={"icon"} />
                <Text
                  fontSize={"20px"}
                  fontFamily={"Manrope-Bold"}
                  textAlign={"left"}
                >
                  {langKeys["feature1"]}
                </Text>
              </HStack>
              <HStack spacing={3}>
                <img src={Checkbox} alt={"icon"} />
                <Text
                  fontSize={"20px"}
                  fontFamily={"Manrope-Bold"}
                  textAlign={"left"}
                >
                  {langKeys["feature2"]}
                </Text>
              </HStack>
              <HStack spacing={3}>
                <img src={Checkbox} alt={"icon"} />
                <Text
                  fontSize={"20px"}
                  fontFamily={"Manrope-Bold"}
                  textAlign={"left"}
                >
                  {langKeys["feature3"]}
                </Text>
              </HStack>
            </VStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Referral;
