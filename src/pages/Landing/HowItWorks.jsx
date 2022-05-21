import React, { memo } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import hiw1 from "src/assets/images/hiw1.png";
import hiw2 from "src/assets/images/hiw2.png";
import hiw3 from "src/assets/images/hiw3.png";
import Features1 from "src/assets/vectors/Features1";
import Features2 from "src/assets/vectors/Features2";
import Features3 from "src/assets/vectors/Features3";

const HowItWorks = ({ langKeys }) => {
  const image = {
    width: useBreakpointValue({ base: "250", md: "250" }),
  };

  const featureContainer = {
    flexDir: useBreakpointValue({ base: "column", md: "row" }),
    alignItems: "center",
    alignSelf: "center",
    marginTop: useBreakpointValue({ base: "50px", md: "50px" }),
  };

  const featureContent = {
    w: useBreakpointValue({ base: "90vw", md: "700px" }),
    h: "100%",
    bgGradient: "linear-gradient(90deg, #2D2D2D, #1D1D1D)",
    borderRadius: "20px",
    px: useBreakpointValue({ base: "30px", md: "50px" }),
    paddingTop: useBreakpointValue({ base: "20px", md: "30px" }),
    paddingBottom: "50px",
    zIndex: 2,
  };

  const headerTextStyle = {
    alignSelf: "flex-start",
    fontSize: useBreakpointValue({
      base: "20px",
      sm: "16px",
      md: "20px",
      lg: "22px",
    }),
  };

  const contentTextStyle = {
    color: "#AAAAAA",
    marginTop: useBreakpointValue({
      base: "14px",
      sm: "10px",
      md: "10px",
      lg: "15px",
    }),
    fontSize: useBreakpointValue({
      base: "18px",
      sm: "14px",
      md: "16px",
      lg: "18px",
    }),
  };

  return (
    <Container
      id={"HowItWorks"}
      pos={"relative"}
      display={"flex"}
      flexDir={"column"}
      maxW={"container.xl"}
      h={"fit-content"}
      py={"80px"}
      justifyContent="center"
      paddingX={0}
    >
      <Box
        position={"absolute"}
        top={"-10vh"}
        left={"-15vw"}
        h={useBreakpointValue({ base: "300px", md: "100vh" })}
        w={useBreakpointValue({ base: "250px", md: "50vw" })}
        bgGradient={"radial-gradient(#6A68FF, 20%, transparent, transparent)"}
        opacity={0.2}
        zIndex={-1}
      />
      <Box
        position={"absolute"}
        top={"0vh"}
        right={"-15vw"}
        h={useBreakpointValue({ base: "300px", md: "100vh" })}
        w={useBreakpointValue({ base: "250px", md: "50vw" })}
        bgGradient={"radial-gradient(#EAFF68, 20%, transparent, transparent)"}
        opacity={0.2}
        zIndex={-1}
      />
      <Flex
        flexDir={"column"}
        marginBottom={useBreakpointValue({ base: "50px", md: "90px" })}
      >
        <Heading
          fontFamily={"Manrope-ExtraBold"}
          marginBottom={"40px"}
          alignSelf={"center"}
        >
          {langKeys["howIt"]}{" "}
          <span style={{ color: "#0D8BFF" }}>{langKeys["works"]}</span>
        </Heading>
        <Flex
          flexDir={useBreakpointValue({ base: "column", sm: "row", md: "row" })}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Card
            title={langKeys["step1Header"]}
            content={langKeys["step1Content"]}
            image={hiw1}
          />
          <Card
            title={langKeys["step2Header"]}
            content={langKeys["step2Content"]}
            image={hiw2}
          />
          <Card
            title={langKeys["step3Header"]}
            content={langKeys["step3Content"]}
            image={hiw3}
          />
        </Flex>
      </Flex>

      <Flex
        px={useBreakpointValue({ base: "0px", md: "50px" })}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          fontFamily={"Manrope-ExtraBold"}
          alignSelf={"center"}
          px={"30px"}
          fontSize={useBreakpointValue({ base: "28px" })}
          textAlign={"center"}
        >
          {langKeys["features"]}
        </Heading>

        <Flex key={"feat1Root"} {...featureContainer}>
          <Features1
            style={{
              ...image,
              transform: useBreakpointValue({ base: "rotate(90deg)", md: "" }),
            }}
            iconStyle={{
              transform: useBreakpointValue({
                base: "rotate(-90deg) translateX(-180px)",
                md: "rotate(0deg)",
              }),
            }}
          />
          <Box {...featureContent}>
            <Heading {...headerTextStyle}>{langKeys["featuresCancel"]}</Heading>
            <Text {...contentTextStyle}>{langKeys["featuresCancelText"]}</Text>
          </Box>
        </Flex>

        <Flex
          key={"feat2Root"}
          {...featureContainer}
          flexDir={{ base: "column-reverse", md: "row" }}
        >
          <Box
            {...featureContent}
            bgGradient={"linear-gradient(90deg, #1D1D1D, #2D2D2D)"}
          >
            <Heading {...headerTextStyle}>
              {langKeys["featuresReInvest"]}
            </Heading>
            <Text {...contentTextStyle}>
              {langKeys["featuresReInvestText"]}
            </Text>
          </Box>
          <Features2
            style={{
              ...image,
              transform: useBreakpointValue({ base: "rotate(-90deg)", md: "" }),
              marginBottom: useBreakpointValue({ base: "30px", md: "" }),
            }}
            iconStyle={{
              transform: useBreakpointValue({
                base: "rotate(-90deg) translateY(125px) translateX(-155px)",
                md: "",
              }),
            }}
          />
        </Flex>

        <Flex {...featureContainer}>
          <Features3
            style={{
              ...image,
              transform: useBreakpointValue({ base: "rotate(90deg)", md: "" }),
            }}
            iconStyle={{
              transform: useBreakpointValue({
                base: "rotate(-90deg) translateY(30px) translateX(-150px)",
                md: "",
              }),
            }}
          />
          <Box {...featureContent}>
            <Heading {...headerTextStyle}>
              {langKeys["featuresReferral"]}
            </Heading>
            <Text {...contentTextStyle}>
              {langKeys["featuresReferralText"]}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

const Card = ({ title, content, image }) => {
  return (
    <Flex
      position={"relative"}
      flexDir={"column"}
      w={useBreakpointValue({ base: "90%", sm: "29%", md: "30%" })}
      borderWidth={1}
      borderColor={"#767676"}
      borderRadius={"30px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"10px"}
      marginBottom={useBreakpointValue({ base: "30px" })}
    >
      <Box
        position={"absolute"}
        left={0}
        top={0}
        w={"full"}
        h={"full"}
        borderRadius={"30px"}
        opacity={0.2}
        bgGradient={"linear-gradient(#434343, #888888)"}
        zIndex={-1}
      />
      <Box
        position={"absolute"}
        left={0}
        top={0}
        w={"full"}
        h={"full"}
        borderRadius={"30px"}
        bg={"none"}
        backdropFilter={"auto"}
        backdropBlur={"20px"}
        zIndex={-1}
      />

      <Heading
        alignSelf={"flex-start"}
        marginTop={useBreakpointValue({
          base: "20px",
          sm: "10px",
          md: "15px",
          lg: "20px",
        })}
        marginInline={useBreakpointValue({
          base: "20px",
          sm: "10px",
          md: "15px",
          lg: "20px",
        })}
        fontSize={useBreakpointValue({
          base: "18px",
          sm: "14px",
          md: "18px",
          lg: "20px",
        })}
      >
        {title}
      </Heading>

      <Text
        color={"#AAAAAA"}
        marginTop={useBreakpointValue({
          base: "10px",
          sm: "5px",
          md: "5px",
          lg: "10px",
        })}
        marginInline={useBreakpointValue({
          base: "20px",
          sm: "10px",
          md: "15px",
          lg: "20px",
        })}
        fontSize={useBreakpointValue({
          base: "14px",
          sm: "12px",
          md: "14px",
          lg: "16px",
        })}
      >
        {content}
      </Text>

      <img
        style={{
          alignSelf: "center",
          width: "100%",
          marginTop: useBreakpointValue({
            base: "30px",
            sm: "15px",
            md: "15px",
            lg: "30px",
          }),
        }}
        src={image}
        alt={"hiw"}
      />
    </Flex>
  );
};

export default memo(HowItWorks);
