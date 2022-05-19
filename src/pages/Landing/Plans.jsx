import React, { useEffect, useState, useMemo, memo } from "react";
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
} from "@chakra-ui/react";
import GradientButton from "src/components/GradientButton";
import Plan from "src/components/Plan";
import PopUp from "src/components/PopUp";
import usePlans from "src/pages/Landing/usePlans";
import useWallets from "src/pages/Wallets/useWallets";
import { addPlan, getReferralsOfUser } from "src/utils/network";
import { useNavigate } from "react-router-dom";
import useUserDashboard from "../Dashboard/useUserDashboard";
import { Parallax } from "react-parallax";
import Axe from "src/assets/images/axe.png";
import Eth from "src/assets/images/eth.png";
import Money from "src/assets/images/money.png";

const Plans = ({ isSignedIn, langKeys }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { plans } = usePlans();
  const { wallets } = useWallets();

  const [isReferred, setIsReferred] = useState(false);

  const [calculation, setCalculation] = useState(0);

  const fetchreferrals = async () => {
    try {
      const referralsResult = await getReferralsOfUser(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );

      if (referralsResult !== undefined) {
        setIsReferred(
          referralsResult.data[0].from === localStorage.getItem("username")
        );
      }
    } catch (error) {
      setError("Network error!");
    }
  };

  useEffect(() => {
    fetchreferrals();
  }, []);

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

  const { balance } = useUserDashboard();

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
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      try {
        const result = await addPlan(email, token, purchased);
        if (result.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response.status === 403) {
          setError("You don't have permission!");
        } else if (error.response.status === 406) {
          setError(langKeys["fillTheRequested"]);
        } else {
          setError(langKeys["errorNetwork"]);
        }
      }
    } else {
      setError(langKeys["pleaseAddWallet"]);
    }
  };

  const renderLevelList = useMemo(() => {
    return plans[selectedPlan].levels.map((level) => (
      <option value={level}>{level}$</option>
    ));
  }, [selectedPlan]);

  useEffect(() => {
    let deposit = parseInt(purchased.deposit);
    let percentage = purchased.percentage / 100;
    setCalculation(deposit * percentage + parseInt(purchased.deposit));
  }, [isReferred, purchased]);

  return (
    <Box
      id={"Plans"}
      pos={"relative"}
      maxW={"1440px"}
      w={window.outerWidth}
      h={"fit-content"}
      alignSelf={"center"}
    >
      <Box
        pos={"absolute"}
        w={"full"}
        h={"full"}
        backgroundColor={"#292C35"}
        zIndex={-2}
      />
      <Container
        position={"relative"}
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
          {langKeys["plans"]}
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
            langKeys={langKeys}
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
              base: "40px",
              sm: "30px",
              md: "0px",
            })}
            onClick={() => {
              handlePurchaseButton(0);
            }}
          />
          <Plan
            langKeys={langKeys}
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
              base: "40px",
              sm: "30px",
              md: "0px",
            })}
            onClick={() => {
              handlePurchaseButton(1);
            }}
          />
          <Plan
            langKeys={langKeys}
            title={plans[2].title}
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
          title={langKeys["purchasePlan"]}
          footerComponents={
            <HStack>
              <GradientButton onClick={purchasePlan} loading={loading}>
                {langKeys["purchase"]}
              </GradientButton>
            </HStack>
          }
        >
          <VStack spacing={4}>
            {error.length > 0 && <Text color={"red.500"}>{error}</Text>}
            <FormControl>
              <FormLabel>{langKeys["yourWallets"]}</FormLabel>
              <Select
                color={"white"}
                value={
                  purchased.wallet.title !== "Balance"
                    ? wallets.findIndex(
                        (wallet) => wallet.title === purchased.wallet.title
                      )
                    : "balance"
                }
                onChange={(event) => {
                  setPurchased({
                    ...purchased,
                    wallet:
                      event.target.value !== "balance"
                        ? wallets[event.target.value]
                        : { title: "Balance", type: "USD", address: "Balance" },
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
                  <option disabled={true} value={-1}>
                    {langKeys["pleaseAddWallet"]}
                  </option>
                )}
                <option
                  disabled={balance < purchased.deposit}
                  value={"balance"}
                >
                  {balance >= purchased.deposit
                    ? `${langKeys["balance"]}: ${balance}$`
                    : langKeys["noBalance"]}
                </option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>{langKeys["deposit"]}</FormLabel>
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
              {langKeys["reward"]}: {purchased.deposit}$ +{" "}
              {purchased.percentage}% {langKeys["inside"]}{" "}
              {plans[selectedPlan].days} {langKeys["days"]} = {calculation}$
            </Text>
          </VStack>
        </PopUp>
      </Container>
    </Box>
  );
};

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
        bgImageStyle={{ height: "200px", width: "200px", top: "20vh" }}
        strength={200}
        bgImage={Money}
      >
        <div style={{ height: "100px" }} />
      </Parallax>
      >
    </Flex>
  );
};

export default memo(Plans);
