import React, { useRef, useEffect, useState } from "react";
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
import Tilde from "src/assets/vectors/Tilde";
import GradientButton from "src/components/GradientButton";
import { colors } from "src/theme";
import SecuredBadge from "src/components/SecuredBadge";
import DashboardIcon from "src/assets/vectors/DashboardIcon";
import OutlinedButton from "src/components/OutlinedButton";
import Card from "src/assets/vectors/Card";
import HALO from "vanta/dist/vanta.cells.min.js";
import * as THREE from "three";
import { scrollHandler } from "src/utils/scrollHandler";
import Statistics from "./Statistics";

const Home = ({ isSignedIn, loading, langKeys, currentLanguage }) => {
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
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 2.0,
          scaleMobile: 5.0,
          color1: "#1d1d1d",
          color2: "#3f3db6",
          size: 2,
          speed: 1.3,
        })
      );

    return () => {
      if (haloEffect) haloEffect.destroy();
    };
  }, [haloEffect]);

  return (
    <>
      <Flex
        id={"Home"}
        ref={haloBoxRef}
        position={"absolute"}
        left={0}
        top={0}
        minH={"100vh"}
        w={"100%"}
        overflowX={"hidden"}
        zIndex={-1}
      />
      <Container
        pos={"relative"}
        display={"flex"}
        flexDir={"column"}
        maxW={"container.xl"}
        minH={"800px"}
        h={"100vh"}
        justifyContent="center"
        paddingX={0}
        paddingTop={useBreakpointValue({ base: "100px", md: "-80px" })}
      >
        <Flex
          pos={"relative"}
          minH={"50vh"}
          paddingBottom={useBreakpointValue({ base: "150px", md: "40px" })}
          flexDir={useBreakpointValue({ base: "column", md: "row" })}
          overflow="hidden"
          alignContent={"center"}
          justifyContent={useBreakpointValue({
            base: "center",
            md: "space-between",
          })}
          marginX={useBreakpointValue({
            base: "15px",
            md: "55px",
            lg: "55px",
            xl: "25px",
            "2xl": "25px",
          })}
        >
          <Flex
            flex={5}
            flexDir={"column"}
            alignSelf={"center"}
            px={useBreakpointValue({ base: "25px", md: "0px" })}
            zIndex={1}
          >
            <SecuredBadge />
            <Heading
              maxW={useBreakpointValue({
                base: "sm",
                sm: "2xl",
                md: "500px",
                lg: "8000px",
              })}
              marginTop={"20px"}
              marginBottom={"40px"}
              fontSize={useBreakpointValue({
                base: "2xl",
                sm: "4xl",
                md: "45px",
                lg: "60px",
              })}
              fontFamily={"Manrope"}
              color={"#FFF"}
            >
              {langKeys["motto"]}{" "}
              <span
                style={{
                  fontSize: useBreakpointValue({
                    base: "3xl",
                    sm: "4xl",
                    md: "45px",
                    lg: "60px",
                  }),
                  fontFamily: "Manrope-ExtraBold",
                  fontWeight: 700,
                  background: `linear-gradient(110deg, ${colors.violet[100]}, ${colors.blue[400]})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Cryptowave
              </span>
            </Heading>

            <HStack
              alignSelf={"start"}
              spacing={useBreakpointValue({ base: 2, md: 7 })}
            >
              <GradientButton
                leftIcon={isSignedIn && <DashboardIcon />}
                as={"a"}
                href={isSignedIn ? "/dashboard" : "/sign/up"}
                isLoading={loading}
              >
                {isSignedIn ? langKeys["dashboard"] : langKeys["signUp"]}
              </GradientButton>
              {isSignedIn && <WalletButton langKeys={langKeys} />}
            </HStack>
          </Flex>

          <Statistics langKeys={langKeys} currentLanguage={currentLanguage} />
        </Flex>

        <ScrollDown langKeys={langKeys} />
      </Container>
    </>
  );
};

const WalletButton = ({ langKeys }) => {
  const buttonFontSize = useBreakpointValue({ base: "sm", md: "mdb" });
  return (
    <OutlinedButton
      leftIcon={<Card />}
      as={"a"}
      fontSize={buttonFontSize}
      fontWeight={500}
      fontFamily={"Manrope"}
      backgroundColor={"background.600"}
      py={"5px"}
      color={"white"}
      angle={"110deg"}
      firstColor={colors.violet[500]}
      secondColor={colors.blue[500]}
      bgFirst={colors.violet[800]}
      bgSecond={colors.blue[800]}
      href={"/wallets"}
      alignSelf={"start"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {langKeys["myWallets"]}
    </OutlinedButton>
  );
};

const ScrollDown = ({ langKeys }) => {
  const navbarHeight = useBreakpointValue({ base: 60, md: 90 });

  return (
    <VStack
      position={"absolute"}
      top={"90vh"}
      width={"fit-content"}
      height={"50px"}
      display={"flex"}
      flexDirection={"column"}
      alignSelf={"center"}
      zIndex={1}
    >
      <Text
        cursor={"pointer"}
        onClick={() => {
          scrollHandler("plans", navbarHeight);
        }}
        color={"#505070"}
      >
        {langKeys["scroll"]}
      </Text>
      <Box style={{ animation: "updown 1.5s infinite forwards" }}>
        <Tilde />
      </Box>
    </VStack>
  );
};

export default Home;
