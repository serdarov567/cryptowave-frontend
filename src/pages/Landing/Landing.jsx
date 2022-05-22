import React, { useEffect } from "react";
import Navbar from "src/components/Navbar";
import {
  Box,
  Flex,
  Text,
  Container,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import GradientButton from "src/components/GradientButton";
import { colors } from "src/theme";
import { useIsSignedIn } from "src/utils/user";
import DashboardIcon from "src/assets/vectors/DashboardIcon";
import OutlinedButton from "src/components/OutlinedButton";
import LogIn from "src/assets/vectors/LogIn";
import { scrollHandler } from "src/utils/scrollHandler";
import TextButton from "src/components/TextButton";
import useLanguage from "src/languages/useLanguage";
import Wave from "src/assets/vectors/Wave";
import Coins from "src/components/Coins";
import Home from "./Home";
import Plans from "./Plans";
import Referral from "./Referral";
import AboutUs from "./AboutUs";
import Contacts from "./Contacts";
import HowItWorks from "./HowItWorks";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [isSignedIn, loading] = useIsSignedIn();
  const navbarHeight = useBreakpointValue({ base: 60, md: 90 });

  const navigate = useNavigate();

  useEffect(() => {
    scrollHandler(global.location.hash.slice(1), navbarHeight);
  }, []);

  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = useLanguage();

  return (
    <Box scrollBehavior="smooth">
      <Navbar
        CurrentFlag={CurrentFlag}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      >
        {!isSignedIn && (
          <SecondaryActionButton
            isSignedIn={isSignedIn}
            loading={loading}
            langKeys={langKeys}
          />
        )}

        <PrimaryActionButton
          isSignedIn={isSignedIn}
          loading={loading}
          langKeys={langKeys}
        />
      </Navbar>
      <Container
        pos={"relative"}
        display={"flex"}
        flexDir={"column"}
        overflowX={"hidden"}
        overflowY={"hidden"}
        maxWidth={"100vw"}
        paddingX={"0px"}
        justifyContent={"center"}
      >
        <Home
          isSignedIn={isSignedIn}
          loading={loading}
          langKeys={langKeys}
          currentLanguage={currentLanguage}
        />
        <Wave
          width={"110vw"}
          style={{
            position: "absolute",
            left: useBreakpointValue({ base: "0", "2xl": "50vw" }),
            top: `calc(100vh - ${useBreakpointValue({
              base: "120px",
              sm: "155px",
            })})`,
            zIndex: -1,
            transform: `scaleX(${useBreakpointValue({
              base: "-1",
              sm: "1",
              lg: "1",
              xl: "1",
              "2xl": "2",
            })}) scaleY(${useBreakpointValue({
              base: "0.5",
              sm: "1",
            })})`,
          }}
        />
        <HowItWorks langKeys={langKeys} />
        <AboutUs langKeys={langKeys} />
        <Coins langKeys={langKeys} />
        <Plans isSignedIn={isSignedIn} langKeys={langKeys} />
        <Referral langKeys={langKeys} />
        {/*place for supported wallets*/}
        <Contacts isSignedIn={isSignedIn} langKeys={langKeys} />{" "}
        <GradientButton
          display={{ base: "none", md: "flex" }}
          pos={"fixed"}
          bottom={"30px"}
          fontFamily={'Manrope-ExtraBold'}
          right={"30px"}
          zIndex={100000}
          onClick={() => {
            navigate("/faq");
          }}
        >
          <Icon name={"QuestionOutlineIcon"} marginRight={"10px"} />
          FAQ
        </GradientButton>
      </Container>
      <Flex
        pos={"absolute"}
        w={"full"}
        h={"70px"}
        left={0}
        bottom={0}
        float={"inline-end"}
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
    </Box>
  );
};

const PrimaryActionButton = ({ isSignedIn, loading, langKeys }) => {
  const buttonFontSize = useBreakpointValue({
    base: "x-small",
    sm: "sm",
    md: "14px",
    lg: "16px",
  });
  return (
    <GradientButton
      fontSize={buttonFontSize}
      leftIcon={isSignedIn && <DashboardIcon />}
      as={"a"}
      href={isSignedIn ? "/dashboard" : "/sign/up"}
      display={{ base: "none", md: "flex" }}
      isLoading={loading}
    >
      {isSignedIn ? langKeys["dashboard"] : langKeys["signUp"]}
    </GradientButton>
  );
};

const SecondaryActionButton = ({ isSignedIn, loading, langKeys }) => {
  const buttonFontSize = useBreakpointValue({
    base: "x-small",
    sm: "sm",
    md: "14px",
    lg: "16px",
  });
  const buttonIcon = useBreakpointValue({ md: <LogIn /> });
  const email = localStorage.getItem("email");
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
      isLoading={loading}
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
          {email}
        </Text>
      ) : (
        langKeys["signIn"]
      )}
    </OutlinedButton>
  );
};

export default Landing;
