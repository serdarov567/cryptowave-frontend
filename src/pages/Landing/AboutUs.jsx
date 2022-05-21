import React, { memo } from "react";
import {
  Box,
  Flex,
  Text,
  Container,
  VStack,
  useBreakpointValue,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Logo from "src/assets/images/logo.png";
import Secured from "src/assets/vectors/Secured";
import Stable from "src/assets/vectors/Stable";
import Trusted from "src/assets/vectors/Trusted";
import ReferralIllustration2 from "src/assets/images/referral2.png";
import Checkbox from "src/assets/vectors/Checkbox.svg";

const AboutUs = ({ langKeys }) => {
  return (
    <Box
      id={"About"}
      w={"full"}
      minH={"100vh"}
      backgroundColor={"#292C35"}
      borderTopLeftRadius={"50px"}
      borderTopRightRadius={"50px"}
      paddingBottom={useBreakpointValue({ base: "30px", md: "100px" })}
    >
      <Container
        pos={"relative"}
        flexDir={"column"}
        maxW={"container.xl"}
        h={"auto"}
        paddingTop={useBreakpointValue({ base: "50px", md: "100px" })}
        paddingBottom={useBreakpointValue({ base: "30px", md: "100px" })}
        alignItems={"center"}
      >
        <Flex
          flexDir={useBreakpointValue({ base: "column", md: "row" })}
          px={useBreakpointValue({ base: "20px", md: "30px" })}
        >
          <Flex flexDir={"column"} flex={1} alignItems={"start"}>
            <Text
              fontFamily={"Manrope-Bold"}
              fontSize={"14px"}
              color={"#E1F1FF"}
              textAlign={"left"}
            >
              {langKeys["welcome"]}
            </Text>
            <Heading
              fontSize={"55px"}
              color={"#8FC9FF"}
              fontFamily={"Manrope-ExtraBold"}
            >
              {langKeys["aboutUs"]}
            </Heading>
            <Text marginTop={"20px"} textAlign={"left"}>
              {langKeys["aboutText"]}
            </Text>
          </Flex>
          <Flex
            pos={"relative"}
            flex={1}
            justifyContent={useBreakpointValue({
              base: "center",
              md: "flex-end",
            })}
            paddingRight={useBreakpointValue({
              base: "0px",
              sm: "0px",
              md: "0px",
              lg: "100px",
            })}
          >
            <Box
              alignSelf={"center"}
              pos={"relative"}
              h={"320px"}
              transform={`scale(${useBreakpointValue({
                base: 0.6,
                sm: 0.6,
                md: 0.8,
                lg: 1,
              })})`}
            >
              <img src={Logo} alt={"logo"} style={{ zIndex: -2 }} />
              <Secured
                pos={"absolute"}
                left={-60}
                top={-40}
                width={100}
                height={100}
              />
              <Stable
                pos={"absolute"}
                right={50}
                bottom={150}
                width={100}
                height={100}
              />
              <Trusted
                pos={"absolute"}
                left={-60}
                bottom={70}
                width={136}
                height={136}
              />
            </Box>
          </Flex>
        </Flex>

        <Heading
          px={"20px"}
          textAlign={"left"}
          color={"#8FC9FF"}
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

export default memo(AboutUs);
