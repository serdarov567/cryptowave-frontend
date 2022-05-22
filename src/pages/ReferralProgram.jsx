import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import HALO from "vanta/dist/vanta.cells.min.js";
import * as THREE from "three";
import Navbar from "src/components/Navbar";
import useLanguage from "src/languages/useLanguage";
import ReferralIllustration from "src/assets/vectors/referral.svg";
import Checkbox from "src/assets/vectors/CheckboxChecked.svg";
import CoinsBgImage from "src/assets/images/referrals_program.png";
import Laptop from "src/assets/images/laptop.png";
import GradientButton from "src/components/GradientButton";
import { useNavigate } from "react-router-dom";
import { useIsSignedIn } from "src/utils/user";
import TextButton from "src/components/TextButton";

const ReferralProgram = () => {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  const [haloEffect, setHaloEffect] = useState(0);
  const haloBoxRef = useRef(null);

  useEffect(() => {
    if (!haloEffect)
      setHaloEffect(
        HALO({
          el: haloBoxRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 100.0,
          minWidth: 200.0,
          scale: 2.0,
          scaleMobile: 5.0,
          color1: "#1d1d1d",
          color2: "#E527E4",
          size: 2,
          speed: 1.3,
        })
      );

    return () => {
      if (haloEffect) haloEffect.destroy();
    };
  }, [haloEffect]);

  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = useLanguage();

  return (
    <>
      <Flex
        ref={haloBoxRef}
        position={"absolute"}
        left={0}
        top={0}
        minH={"300px"}
        w={"100%"}
        overflowX={"hidden"}
        overflowY={"clip"}
        zIndex={-1}
      />
      <Flex
        position={"absolute"}
        left={0}
        top={0}
        minH={"300px"}
        w={"100%"}
        overflowX={"hidden"}
        overflowY={"clip"}
        zIndex={1}
        backdropFilter={"auto"}
        backdropBlur={"10px"}
      />

      <Navbar
        CurrentFlag={CurrentFlag}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      />
      <Container
        pos={"relative"}
        display={"flex"}
        flexDir={"column"}
        maxW={"container.xl"}
        minH={"800px"}
        h={"fit-content"}
        paddingTop={{ base: "180px", md: "200px" }}
      >
        <Heading
          fontFamily={"Manrope-Bold"}
          fontSize={{ base: "38px", md: "50px" }}
          marginBottom={"10px"}
          zIndex={10}
        >
          {langKeys["referralProgram"]}
        </Heading>

        <Flex
          w={"full"}
          pos={"relative"}
          flexDir={"column"}
          px={useBreakpointValue({ base: "20px", md: 0 })}
          marginTop={{ base: "80px", md: "120px" }}
          paddingBottom={"100px"}
          alignSelf={"center"}
          alignItems={"space-between"}
          justifyContent={"space-between"}
        >
          <Flex flexDir={{ base: "column", md: "row" }} paddingBottom={"100px"}>
            <Flex flex={1} flexDir={"column"} paddingRight={"30px"}>
              <Heading fontFamily={"Manrope-Bold"} fontSize={"32px"}>
                {langKeys["referralCommission"]}
              </Heading>
              <Text marginTop={"10px"} marginBottom={"40px"} maxW={"500px"}>
                {langKeys["referralContentMain"]}
              </Text>

              <VStack spacing={5} align={"start"} px={"20px"}>
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

            <Flex
              flex={2}
              justifyContent={"center"}
              marginTop={useBreakpointValue({ base: "40px", md: 0 })}
            >
              <img src={ReferralIllustration} alt={"referralIllustration"} />
            </Flex>
          </Flex>

          <Flex
            flexDir={{ base: "column", md: "row" }}
            pos={"relative"}
            maxW={"1440px"}
            minH={"370px"}
            marginInline={{ base: "-40px", md: "0px" }}
            bgImage={CoinsBgImage}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            borderRadius={"30px"}
            px={{ base: "40px", md: "80px" }}
            py={{ base: "40px", md: "0px" }}
            marginBottom={"100px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex flex={1} flexDir={"column"} marginRight={"50px"}>
              <Text
                fontFamily={"Manrope-Bold"}
                fontSize={"14px"}
                color={"#A9A7FF"}
              >
                {langKeys["referralHeaderSmall"]}
              </Text>
              <Heading
                fontSize={{ base: "28px", md: "32px" }}
                w={"full"}
                fontFamily={"Manrope-ExtraBold"}
                marginBlock={"10px"}
              >
                {langKeys["referralHeaderBig"]}
              </Heading>
              <Text fontSize={"16px"} textAlign={"left"}>
                {langKeys["referralContent"]}
              </Text>
            </Flex>

            <Flex flex={1}>
              <Flex
                w={"full"}
                flexDir={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
                marginTop={"10px"}
              >
                <VStack alignItems={"start"}>
                  <Heading
                    fontFamily={"Manrope-Bold"}
                    fontSize={{ base: "50px", md: "80px" }}
                  >
                    5%
                  </Heading>
                  <Text fontFamily={"Manrope-Bold"}>
                    {langKeys["directReferral"]}
                  </Text>
                </VStack>

                <VStack alignItems={"start"}>
                  <Heading
                    fontFamily={"Manrope-Bold"}
                    fontSize={{ base: "40px", md: "70px" }}
                  >
                    2%
                  </Heading>
                  <Text fontFamily={"Manrope-Bold"}>
                    {langKeys["seondLineReferral"]}
                  </Text>
                </VStack>

                <VStack alignItems={"start"}>
                  <Heading
                    fontFamily={"Manrope-Bold"}
                    fontSize={{ base: "30px", md: "60px" }}
                  >
                    1%
                  </Heading>
                  <Text fontFamily={"Manrope-Bold"}>
                    {langKeys["thirdLineReferral"]}
                  </Text>
                </VStack>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDir={{ base: "column", md: "row" }}>
            <Flex flex={3} marginRight={{ base: 0, md: "80px" }}>
              <img src={Laptop} alt={"laptop"} />
            </Flex>

            <Flex
              flex={4}
              flexDir={"column"}
              marginRight={"50px"}
              marginTop={useBreakpointValue({ base: "40px", md: 0 })}
            >
              <Text
                fontFamily={"Manrope-Bold"}
                fontSize={"14px"}
                color={"#A9A7FF"}
              >
                {langKeys["referralHeaderBigTwo"]}
              </Text>
              <Heading
                fontSize={{ base: "28px", md: "32px" }}
                w={"full"}
                fontFamily={"Manrope-ExtraBold"}
                marginTop={"10px"}
                marginBottom={"20px"}
              >
                {langKeys["referralHeaderSmallTwo"]}
              </Heading>
              <Text fontSize={"16px"} textAlign={"left"}>
                {langKeys["referralContentTwo"]}
              </Text>

              <GradientButton
                marginTop={"30px"}
                w={"fit-content"}
                onClick={() => {
                  if (isSignedIn) {
                    navigate("/dashboard");
                  } else {
                    navigate("/sign/up");
                  }
                }}
                loading={loading}
              >
                {isSignedIn
                  ? langKeys["dashboard"]
                  : langKeys["referralRegister"]}
              </GradientButton>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Flex
        pos={"relative"}
        w={"full"}
        h={"70px"}
        bgColor={"background.500"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextButton
          href={"/termsandconditions"}
          fontSize={useBreakpointValue({ base: "12px", md: "14px" })}
        >
          {langKeys["terms"]}
        </TextButton>
      </Flex>
    </>
  );
};

export default ReferralProgram;
