import React from "react";
import Main from "src/assets/images/main.png";
import Navbar from "src/components/Navbar";
import {
  Box,
  Flex,
  Image,
  Text,
  Container,
  VStack,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import Tilde from "src/assets/vectors/Tilde";
import GradientButton from "src/components/GradientButton";
import { colors } from "src/theme";
import SecuredBadge from "src/components/SecuredBadge";
import { isSignedIn } from "src/utils/user";
import DashboardIcon from "src/assets/vectors/Card";
import OutlinedButton from "src/components/OutlinedButton";
import LogIn from "src/assets/vectors/LogIn";

function Landing() {
  return (
    <Box scrollBehavior="smooth" bgColor={"background.900"}>
      <Navbar>
        <SecondaryActionButton />
        <PrimaryActionButton />
      </Navbar>
      <Container
        display={"flex"}
        flexDir={"column"}
        overflowX={"hidden"}
        maxWidth={"container.xl"}
        paddingX={"0px"}
        justifyContent={"center"}
      >
        <Home />
        <Plans />
        <AboutUs />
      </Container>
    </Box>
  );
}

function Home() {
  return (
    <Container
      display={"flex"}
      flexDir={"column"}
      maxW={"container.xl"}
      minH={"100vh"}
      justifyContent="flex-start"
      marginTop={useBreakpointValue({ base: "70px", md: "110px" })}
      paddingX={0}
    >
      <Flex
        flexDir={useBreakpointValue({ base: "column", md: "row" })}
        paddingTop={useBreakpointValue({ base: "30px", md: "70px" })}
        overflow="hidden"
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
        <VStack
          alignSelf={"center"}
          spacing={4}
          px={useBreakpointValue({ base: "25px", md: "0px" })}
        >
          <SecuredBadge />
          <Heading
            maxW={useBreakpointValue({ base: "sm", sm: "2xl", md: "500px" })}
            fontSize={useBreakpointValue({
              base: "2xl",
              sm: "4xl",
              md: "45px",
            })}
            fontFamily={"Manrope"}
            color={"#FFF"}
          >
            Manage your transactions with{" "}
            <span
              style={{
                fontSize: useBreakpointValue({
                  base: "28px",
                  sm: "40px",
                  md: "45px",
                }),
                fontFamily: "Manrope-ExtraBold",
                fontWeight: 700,
                background: `linear-gradient(110deg, ${colors.violet[100]}, ${colors.blue[400]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cryptolkun
            </span>
          </Heading>

          <GradientButton
            alignSelf={"start"}
            leftIcon={isSignedIn && <DashboardIcon />}
            as={"a"}
            href={isSignedIn ? "/dashboard" : "/sign/up"}
          >
            {isSignedIn ? "Dashboard" : "Sign Up"}
          </GradientButton>
        </VStack>

        <Box
          display={"flex"}
          flexDir={"row"}
          alignSelf={"center"}
          minW={useBreakpointValue({ base: "50px", sm: "80px", md: "400px" })}
          maxW={useBreakpointValue({ base: "200px", sm: "350px", md: "500px" })}
        >
          <Image src={Main} />
        </Box>
      </Flex>

      <ScrollDown />
    </Container>
  );
}

function Plans() {
  return (
    <Container
      display={"flex"}
      flexDir={"column"}
      maxW={window.innerWidth}
      minH={"100vh"}
      marginTop={useBreakpointValue({ base: "100px", md: "250px" })}
      paddingX={0}
    >
      <Heading
        marginLeft={`${(window.outerHeight - window.innerHeight) / 5}px`}
        bgColor={"blackAlpha.100"}
        alignSelf={"center"}
        fontSize={useBreakpointValue({ base: "sm", sm: "2xl", md: "4xl" })}
        fontFamily={"Manrope"}
        color={"#FFF"}
      >
        PLANS
      </Heading>
    </Container>
  );
}

function AboutUs() {
  return (
    <Flex
      maxW={"container.xl"}
      minH={"100vh"}
      py={useBreakpointValue({ base: 0, md: 20 })}
      overflow="hidden"
    ></Flex>
  );
}

function PrimaryActionButton() {
  return (
    <GradientButton
      leftIcon={isSignedIn && <DashboardIcon />}
      as={"a"}
      href={isSignedIn ? "/dashboard" : "/sign/up"}
      display={{ base: "none", md: "flex" }}
    >
      {isSignedIn ? "Dashboard" : "Sign Up"}
    </GradientButton>
  );
}

function SecondaryActionButton() {
  const buttonFontSize = useBreakpointValue({ base: "sm", md: "mdb" });
  const buttonIcon = useBreakpointValue({ md: <LogIn /> });
  return (
    <OutlinedButton
      leftIcon={!isSignedIn && buttonIcon}
      as={"a"}
      fontWeight={500}
      fontFamily={"Manrope"}
      backgroundColor={"background.600"}
      py={"5px"}
      color={"white"}
      angle={isSignedIn ? "0deg" : "110deg"}
      firstColor={isSignedIn ? colors.background[200] : colors.violet[500]}
      secondColor={isSignedIn ? colors.background[900] : colors.blue[500]}
      href={!isSignedIn && "/sign/in"}
      alignSelf={"start"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isSignedIn ? (
        <Text
          fontSize={buttonFontSize}
          fontFamily={"Manrope"}
          fontWeight={200}
          bgGradient={"-webkit-linear-gradient(110deg, violet.200, #fff)"}
          bgClip={"text"}
          fill={"transparent"}
        >
          begzada
        </Text>
      ) : (
        "Sign In"
      )}
    </OutlinedButton>
  );
}

function ScrollDown() {
  return (
    <VStack
      position={"absolute"}
      top={"90vh"}
      width={"fit-content"}
      height={"50px"}
      display={"flex"}
      flexDirection={"column"}
      alignSelf={"center"}
      marginLeft={`${(window.outerHeight - window.innerHeight) / 4}px`}
    >
      <Text
        cursor={"pointer"}
        onClick={() => {
          let top = window.outerHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }}
        color={"#505070"}
      >
        Scroll down
      </Text>
      <Box style={{ animation: "updown 1.5s infinite forwards" }}>
        <Tilde />
      </Box>
    </VStack>
  );
}

export default Landing;
