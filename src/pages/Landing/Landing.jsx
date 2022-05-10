import React, { useRef, useEffect, useState, useMemo } from "react";
import Navbar from "src/components/Navbar";
import {
  Box,
  Flex,
  Text,
  Container,
  VStack,
  useBreakpointValue,
  Heading,
  HStack,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  toast,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import Tilde from "src/assets/vectors/Tilde";
import GradientButton from "src/components/GradientButton";
import { colors } from "src/theme";
import SecuredBadge from "src/components/SecuredBadge";
import { getCredits, useIsSignedIn } from "src/utils/user";
import DashboardIcon from "src/assets/vectors/DashboardIcon";
import OutlinedButton from "src/components/OutlinedButton";
import LogIn from "src/assets/vectors/LogIn";
import Card from "src/assets/vectors/Card";
import HALO from "vanta/dist/vanta.cells.min.js";
import * as THREE from "three";
import Plan from "src/components/Plan";
import PopUp from "src/components/PopUp";
import { scrollHandler } from "src/utils/scrollHandler";
import usePlans from "src/pages/Landing/usePlans";
import useWallets from "src/pages/Wallets/useWallets";
import { addPlan } from "src/utils/network";
import { useNavigate } from "react-router-dom";
import Axe from "src/assets/images/axe.png";
import Eth from "src/assets/images/eth.png";
import Money from "src/assets/images/money.png";
import Logo from "src/assets/images/logo.png";
import Secured from "src/assets/vectors/Secured";
import { Parallax } from "react-parallax";
import Stable from "src/assets/vectors/Stable";
import Trusted from "src/assets/vectors/Trusted";
import TextButton from "src/components/TextButton";

function Landing() {
  const navbarHeight = useBreakpointValue({ base: 60, md: 90 });
  scrollHandler(global.location.hash.slice(1), navbarHeight);

  return (
    <Box scrollBehavior="smooth">
      <Navbar>
        <SecondaryActionButton />
        <PrimaryActionButton />
      </Navbar>
      <Container
        pos={"relative"}
        display={"flex"}
        flexDir={"column"}
        overflowX={"hidden"}
        maxWidth={"100vw"}
        paddingX={"0px"}
        justifyContent={"center"}
      >
        <Home />
        <Plans />
        <AboutUs />
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
          Terms and conditions, Privacy policy
        </TextButton>
      </Flex>
    </Box>
  );
}

function Home() {
  const [isSignedIn, loading] = useIsSignedIn();

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
        h={"100vh"}
        w={"100%"}
        overflowX={"hidden"}
        zIndex={-1}
      />
      <Container
        display={"flex"}
        flexDir={"column"}
        maxW={"container.xl"}
        h={"100vh"}
        justifyContent="center"
        paddingX={0}
        paddingTop={useBreakpointValue({ base: "100px", md: "0px" })}
      >
        <Flex
          flexDir={useBreakpointValue({ base: "column", md: "row" })}
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
          <Flex
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
              Make the cash flow with{" "}
              <span
                style={{
                  fontSize: useBreakpointValue({
                    base: "2xl",
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
                {isSignedIn ? "Dashboard" : "Sign Up"}
              </GradientButton>
              {isSignedIn && <WalletButton />}
            </HStack>
          </Flex>

          <Box
            display={"flex"}
            flexDir={"row"}
            alignSelf={"center"}
            minW={useBreakpointValue({ base: "50px", sm: "80px", md: "400px" })}
            maxW={useBreakpointValue({
              base: "200px",
              sm: "350px",
              md: "500px",
            })}
            height={"400px"}
          />
        </Flex>

        <ScrollDown />
      </Container>
    </>
  );
}

function Plans() {
  const [isSignedIn] = useIsSignedIn();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { plans } = usePlans();
  const { wallets } = useWallets();

  const [selectedPlan, setSelectedPlan] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [purchased, setPurchased] = useState({
    number: -1,
    title: "",
    dateOfExpiration: "",
    dateOfPurchase: "",
    deposit: 0,
    reward: 0,
    percentage: 0,
    status: "Pending...",
    wallet: wallets.length > 0 ? wallets[0] : -1,
    period: 0,
  });

  const handlePurchaseButton = (index) => {
    if (isSignedIn) {
      setError("");
      setSelectedPlan(index);
      setPurchased({
        ...purchased,
        title: plans[index].title,
        dateOfPurchase: Date.now(),
        deposit: plans[index].levels[0],
        percentage: plans[index].percentage[0],
        reward: plans[index].reward[0],
        wallet: wallets.length > 0 ? wallets[0] : -1,
        period: plans[index].days,
      });
      onOpen();
    } else {
      navigate("/sign/up");
    }
  };

  const purchasePlan = async () => {
    if (purchased.wallet !== -1) {
      setError("");
      setLoading(true);
      const { email, token } = getCredits();
      try {
        const result = await addPlan(email, token, purchased);
        if (result.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response.status === 403) {
          setError("You don't have permission!");
        } else if (error.response.status === 406) {
          setError("Please, fill the required fields!");
        } else {
          setError("Network error!");
        }
      }
    } else {
      setError("Please add a wallet!");
    }
  };

  const renderLevelList = useMemo(() => {
    return plans[selectedPlan].levels.map((level) => (
      <option value={level}>{level}$</option>
    ));
  }, [selectedPlan]);

  return (
    <Container
      position={"relative"}
      id={"Plans"}
      display={"flex"}
      flexDir={"column"}
      maxW={"container.xl"}
      h={"fit-content"}
      paddingBottom={"200px"}
      paddingTop={"5vh"}
    >
      <Parallaxes />
      <Heading
        alignSelf={"start"}
        fontSize={useBreakpointValue({ base: "xl", sm: "2xl", md: "4xl" })}
        fontFamily={"Manrope"}
        color={"#FFF"}
        marginBottom={useBreakpointValue({ base: "20px", md: "40px" })}
        paddingLeft={"20px"}
      >
        PLANS
      </Heading>

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

      <Flex
        w={"full"}
        flexDir={useBreakpointValue({ base: "column", md: "row" })}
        justifyContent={useBreakpointValue({
          base: "center",
          sm: "space-around",
          md: "space-around",
          lg: "space-around",
          xl: "space-around",
        })}
        alignItems={useBreakpointValue({
          base: "center",
          sm: "center",
          md: "flex-start",
          lg: "flex-start",
          xl: "flex-start",
        })}
      >
        <Plan
          title={plans[0].title}
          accentColor={"#1D1D1D"}
          secondColor={"#062518"}
          thirdColor={"#1D1D1D"}
          borderColor={"#1F553E"}
          shadowLeft={-10}
          shadowColor={"#1B4433"}
          days={plans[0].days}
          minDeposit={plans[0].levels[0]}
          maxDeposit={plans[0].levels[plans[0].levels.length - 1]}
          minPercentage={plans[0].percentage[0]}
          maxPercentage={plans[0].percentage[plans[0].percentage.length - 1]}
          minEarn={plans[0].reward[0]}
          maxEarn={plans[0].reward[plans[0].reward.length - 1]}
          marginTop={useBreakpointValue({
            base: "0px",
            sm: "0px",
            md: "0px",
          })}
          marginBottom={useBreakpointValue({
            base: "20px",
            sm: "30px",
            md: "0px",
          })}
          onClick={() => {
            handlePurchaseButton(0);
          }}
        />
        <Plan
          title={plans[1].title}
          accentColor={"#1D1D1D"}
          secondColor={"#1A0524"}
          thirdColor={"#1D1D1D"}
          borderColor={"#5B2F71"}
          shadowLeft={0}
          shadowColor={"#48225C"}
          days={plans[1].days}
          minDeposit={plans[1].levels[0]}
          maxDeposit={plans[1].levels[plans[1].levels.length - 1]}
          minPercentage={plans[1].percentage[0]}
          maxPercentage={plans[1].percentage[plans[1].percentage.length - 1]}
          minEarn={plans[1].reward[0]}
          maxEarn={plans[1].reward[plans[1].reward.length - 1]}
          marginTop={useBreakpointValue({
            base: "0px",
            sm: "0px",
            md: "40px",
          })}
          marginBottom={useBreakpointValue({
            base: "20px",
            sm: "30px",
            md: "0px",
          })}
          onClick={() => {
            handlePurchaseButton(1);
          }}
        />
        <Plan
          title={"Tsunami"}
          accentColor={"#1D1D1D"}
          secondColor={"#251E06"}
          thirdColor={"#1D1D1D"}
          borderColor={"#64521B"}
          shadowLeft={10}
          shadowColor={"#534718"}
          days={plans[2].days}
          minDeposit={plans[2].levels[0]}
          maxDeposit={plans[2].levels[plans[2].levels.length - 1]}
          minPercentage={plans[2].percentage[0]}
          maxPercentage={plans[2].percentage[plans[2].percentage.length - 1]}
          minEarn={plans[2].reward[0]}
          maxEarn={plans[2].reward[plans[2].reward.length - 1]}
          marginTop={useBreakpointValue({
            base: "0px",
            sm: "0px",
            md: "80px",
          })}
          onClick={() => {
            handlePurchaseButton(2);
          }}
        />
      </Flex>

      <PopUp
        isOpen={isOpen}
        onClose={onClose}
        title={"Purchase a plan"}
        footerComponents={
          <HStack>
            <GradientButton onClick={purchasePlan} loading={loading}>
              Purchase
            </GradientButton>
          </HStack>
        }
      >
        <VStack spacing={4}>
          {error.length > 0 && <Text color={"red.500"}>{error}</Text>}
          <FormControl>
            <FormLabel>Your wallets</FormLabel>
            <Select
              color={"white"}
              value={wallets.findIndex(
                (wallet) => wallet.title === purchased.wallet.title
              )}
              onChange={(event) => {
                setPurchased({
                  ...purchased,
                  wallet: wallets[event.target.value],
                });
              }}
            >
              {wallets.length > 0 ? (
                wallets.map((wallet, index) => (
                  <option value={index}>
                    {wallet.title}: {wallet.type}
                  </option>
                ))
              ) : (
                <option value={-1}>Please add a wallet</option>
              )}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Your deposit</FormLabel>
            <Select
              color={"white"}
              value={purchased.deposit}
              onChange={(event) => {
                let index = plans[selectedPlan].levels.findIndex(
                  (level) => level === parseInt(event.target.value)
                );
                setPurchased({
                  ...purchased,
                  deposit: event.target.value,
                  percentage: plans[selectedPlan].percentage[index],
                  reward: plans[selectedPlan].reward[index],
                });
              }}
            >
              {renderLevelList}
            </Select>
          </FormControl>
          <Text>
            Reward: {purchased.deposit}$ + {purchased.percentage}% in{" "}
            {plans[selectedPlan].days} days = {purchased.reward}$
          </Text>
        </VStack>
      </PopUp>
    </Container>
  );
}

function AboutUs() {
  return (
    <Container
      pos={"relative"}
      flexDir={"column"}
      id={"About"}
      maxW={"container.xl"}
      h={"auto"}
      minH={"100vh"}
      paddingTop={useBreakpointValue({ base: "50px", md: "100px" })}
      paddingBottom={useBreakpointValue({ base: "100px", md: "200px" })}
      alignItems={"center"}
    >
      <Flex
        flexDir={useBreakpointValue({ base: "column", md: "row" })}
        px={useBreakpointValue({ base: "20px", md: "30px" })}
        marginBottom={useBreakpointValue({ base: "50px", md: "100px" })}
      >
        <VStack flex={1} alignItems={"start"} spacing={4}>
          <Heading fontFamily={"Manrope-ExtraBold"}>About us</Heading>
          <Text color={"#aeaeae"} textAlign={"justify"}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            amet sint. Velit officia consequat duis enim velit mollit.
            Exercitation veniam consequat sunt nostrud amet.
          </Text>
        </VStack>
        <Flex
          pos={"relative"}
          flex={1}
          justifyContent={"flex-end"}
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
      {/* <Contacts /> */}
    </Container>
  );
}

const Contacts = () => {
  return (
    <Flex
      w={"100%"}
      pos={"relative"}
      flexDir={useBreakpointValue({ base: "column", md: "row" })}
      px={useBreakpointValue({ base: "20px", md: "30px" })}
    >
      <Box
        style={{
          border: "3px solid transparent",
        }}
        background={`linear-gradient(${colors.background[900]}, ${colors.background[900]}) padding-box, linear-gradient(110deg, #404040, ${colors.background[900]}) border-box`}
        borderRadius={"10px"}
        px={useBreakpointValue({ base: "20px", md: "50px" })}
        py={useBreakpointValue({ base: "20px", md: "50px" })}
        textAlign={"start"}
      >
        <VStack spacing={8}>
          <Heading fontSize={"30px"}>Contact Us</Heading>
          <FormControl>
            <FormLabel
              variant={"primary"}
              fontSize={useBreakpointValue({ base: "12px", md: "18px" })}
            >
              Email
            </FormLabel>
            <Input
              variant={"primary"}
              height={"50px"}
              placeholder="example@email.com"
              onChange={(event) => {}}
            />
            <FormErrorMessage>Not a valid email.</FormErrorMessage>
          </FormControl>
        </VStack>
      </Box>
    </Flex>
  );
};

function PrimaryActionButton() {
  const [isSignedIn, loading] = useIsSignedIn();
  return (
    <GradientButton
      leftIcon={isSignedIn && <DashboardIcon />}
      as={"a"}
      href={isSignedIn ? "/dashboard" : "/sign/up"}
      display={{ base: "none", md: "flex" }}
      isLoading={loading}
    >
      {isSignedIn ? "Dashboard" : "Sign Up"}
    </GradientButton>
  );
}

function SecondaryActionButton() {
  const [isSignedIn, loading] = useIsSignedIn();
  const buttonFontSize = useBreakpointValue({
    base: "x-small",
    sm: "sm",
    md: "mdb",
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
        "Sign In"
      )}
    </OutlinedButton>
  );
}

function WalletButton() {
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
      My wallets
    </OutlinedButton>
  );
}

function ScrollDown() {
  return (
    <VStack
      position={"absolute"}
      top={"85vh"}
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

const Parallaxes = () => {
  const zIndex = useBreakpointValue({ base: -1, sm: 10, md: 10 });

  return (
    <Flex h={"full"}>
      <Parallax
        style={{
          position: "absolute",
          left: "-120px",
          top: 0,
          width: "250px",
          height: "100vh",
          zIndex,
        }}
        bgImageStyle={{ height: "250px", width: "300px", top: "380px" }}
        strength={200}
        bgImage={Axe}
      >
        <div style={{ height: "200px" }} />
      </Parallax>
      <Parallax
        style={{
          position: "absolute",
          right: "-5vw",
          bottom: 0,
          width: "200px",
          height: "100vh",
          zIndex,
        }}
        bgImageStyle={{
          height: "200px",
          width: "500px",
          bottom: useBreakpointValue({
            base: "10vh",
            md: "15vh",
          }),
        }}
        strength={100}
        bgImage={Eth}
      >
        <div style={{ height: "200px" }} />
      </Parallax>
      <Parallax
        style={{
          position: "absolute",
          right: "-100px",
          top: 0,
          width: "200px",
          height: "100vh",
          zIndex: -1,
        }}
        bgImageStyle={{ height: "200px", width: "200px", top: "10vh" }}
        strength={300}
        bgImage={Money}
      >
        <div style={{ height: "100px" }} />
      </Parallax>
      >
    </Flex>
  );
};

export default Landing;
