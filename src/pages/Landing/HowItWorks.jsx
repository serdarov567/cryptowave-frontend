import React, { memo } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import hiw1 from "src/assets/images/hiw1.png";
import hiw2 from "src/assets/images/hiw2.png";
import hiw3 from "src/assets/images/hiw3.png";

const HowItWorks = ({ langKeys }) => {
  return (
    <Container
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
        bottom={"0vh"}
        right={"-15vw"}
        h={useBreakpointValue({ base: "300px", md: "100vh" })}
        w={useBreakpointValue({ base: "250px", md: "50vw" })}
        bgGradient={"radial-gradient(#EAFF68, 20%, transparent, transparent)"}
        opacity={0.2}
        zIndex={-1}
      />
      <Flex flexDir={"column"}>
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
    </Container>
  );
};

const Card = ({ title, content, image }) => {
  return (
    <Flex
      position={"relative"}
      flexDir={"column"}
      w={useBreakpointValue({ base: "80%", sm: "29%", md: "30%" })}
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
