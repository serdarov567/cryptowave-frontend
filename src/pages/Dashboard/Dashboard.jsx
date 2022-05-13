import React, { useEffect, useState, useMemo } from "react";
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
import { useNavigate } from "react-router-dom";
import LogIn from "src/assets/vectors/LogIn";
import BoardButton from "src/components/BoardButton";
import Navbar from "src/components/Navbar";
import OutlinedButton from "src/components/OutlinedButton";
import { colors } from "src/theme";
import { signOut, useIsSignedIn } from "src/utils/user";
import GradientButton from "src/components/GradientButton";
import AlertPopUp from "src/components/AlertPopUp";
import PlanItem from "src/components/PlanItem";
import useUserDashboard from "src/pages/Dashboard/useUserDashboard";
import useLanguage from "src/languages/useLanguage";

function Dashboard() {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  const { currentLanguage, setLanguage, langKeys } = useLanguage();

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const onToggleAlert = () => setIsOpenAlert(!isOpenAlert);

  const {
    plans,
    networkError,
    networkLoading,
    refresh,
    balance,
    earnings,
    refreshEarnings,
  } = useUserDashboard();

  const detailsFontSize = useBreakpointValue({
    base: "16px",
    sm: "28px",
    md: "35px",
    lg: "30px",
  });

  useEffect(() => {
    if (!loading) {
      if (!isSignedIn) navigate("/#home", { replace: true });
    }
  }, [loading]);

  const renderUserPlans = useMemo(() => {
    return plans
      .filter(
        (plan) => plan.status !== "Canceled" && plan.status !== "Completed"
      )
      .map((plan, index) => {
        return (
          <PlanItem
            langKeys={langKeys}
            uniqueKey={plan._id}
            title={plan.title}
            number={plan.number}
            dateOfPurchase={plan.dateOfPurchase}
            dateOfExpiration={plan.dateOfExpiration}
            deposit={plan.deposit}
            percentage={plan.percentage}
            earned={earnings[index]}
            reward={plan.reward}
            walletType={plan.wallet.type}
            status={plan.status}
          />
        );
      });
  }, [plans, earnings]);

  return (
    <Box>
      <Navbar
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      >
        <UserEmail />
        <SignOutButton onClick={onToggleAlert} langKeys={langKeys} />
      </Navbar>
      <Container maxWidth={"container.xl"} paddingTop={"120px"}>
        <Flex flexDir={"column"}>
          <Flex
            flexDir={useBreakpointValue({
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
            })}
            width={"full"}
          >
            <HStack
              flex={1}
              justifyContent={useBreakpointValue({
                base: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
              })}
              spacing={useBreakpointValue({
                base: "10px",
                sm: "20px",
                md: "30px",
              })}
              px={useBreakpointValue({
                sm: "10px",
                md: "40px",
                lg: "40px",
                xl: "0px",
              })}
            >
              <BoardButton
                uniqueKey={"addPlan"}
                isColorful={true}
                icon={"filePlus"}
                text={langKeys["addPlan"]}
                onClick={() => {
                  navigate("/#plans");
                }}
              />
              <BoardButton
                uniqueKey={"history"}
                isColorful={false}
                icon={"clock"}
                text={langKeys["planHistory"]}
                onClick={() => {
                  navigate("/dashboard/planhistory");
                }}
              />
              <BoardButton
                uniqueKey={"wallets"}
                isColorful={false}
                icon={"wallet"}
                text={langKeys["myWallets"]}
                onClick={() => {
                  navigate("/wallets");
                }}
              />
            </HStack>
            <Flex
              flexDir={"row"}
              display={"flex"}
              flex={1}
              w={"full"}
              justifyContent={"space-evenly"}
              px={useBreakpointValue({
                base: "0px",
                sm: "40px",
                md: "40px",
                lg: "0px",
              })}
              paddingRight={useBreakpointValue({
                base: "0px",
                sm: "0px",
                md: "0px",
                lg: "20px",
              })}
              alignSelf={"center"}
              marginTop={useBreakpointValue({
                base: "30px",
                sm: "40px",
                md: "40px",
                lg: "0px",
              })}
            >
              <VStack>
                <Heading fontSize={detailsFontSize}>
                  {langKeys["earning"]}
                </Heading>
                <HStack display={"flex"} alignItems={"center"}>
                  <Heading
                    fontSize={detailsFontSize}
                    fontFamily={"Manrope-ExtraBold"}
                    color={"blue.450"}
                  >
                    {earnings !== undefined
                      ? earnings.length > 0
                        ? earnings.reduce((a, b) => a + b)
                        : 0
                      : 0}
                  </Heading>
                  <OutlinedButton
                    fontSize={detailsFontSize}
                    fontWeight={700}
                    fontFamily={"Manrope"}
                    backgroundColor={"background.600"}
                    px={"5px"}
                    py={"5px"}
                    color={"#999"}
                    angle={"150deg"}
                    firstColor={colors.background[200]}
                    secondColor={colors.background[900]}
                  >
                    $
                  </OutlinedButton>
                </HStack>
              </VStack>

              <VStack spacing={"10px"}>
                <Heading fontSize={detailsFontSize}>
                  {langKeys["balance"]}
                </Heading>
                <Heading
                  fontSize={detailsFontSize}
                  fontFamily={"Manrope-ExtraBold"}
                  color={"blue.450"}
                >
                  {balance}$
                </Heading>
                <OutlinedButton
                  color={"#FFF"}
                  angle={"150deg"}
                  firstColor={colors.background[200]}
                  secondColor={colors.background[900]}
                  onClick={() => {
                    navigate("/dashboard/withdraw");
                  }}
                >
                  {langKeys["withdraw"]}
                </OutlinedButton>
              </VStack>
            </Flex>
          </Flex>
          <VStack
            w={"full"}
            marginTop={"40px"}
            paddingBottom={"100px"}
            spacing={5}
            paddingX={useBreakpointValue({
              base: "",
              sm: "50px",
              md: "30px",
              lg: "10px",
            })}
          >
            <Heading
              alignSelf={"flex-start"}
              paddingLeft={"20px"}
              marginBlock={"20px"}
            >
              {langKeys["activePlans"]}
            </Heading>
            {renderUserPlans}
          </VStack>
        </Flex>
      </Container>

      <AlertPopUp
        isOpen={isOpenAlert}
        title={langKeys["areYouSure"]}
        footerComponents={
          <HStack>
            <GradientButton
              onClick={() => {
                signOut();
                navigate("/#home", { replace: true });
              }}
            >
              {langKeys["signOut"]}
            </GradientButton>
            <OutlinedButton color={"#FFF"} onClick={onToggleAlert}>
              {langKeys["cancel"]}
            </OutlinedButton>
          </HStack>
        }
      >
        <Text>{langKeys["doYouReallySignOut"]}</Text>
      </AlertPopUp>
    </Box>
  );
}

function UserEmail() {
  const buttonFontSize = useBreakpointValue({
    base: "x-small",
    sm: "sm",
    md: "mdb",
  });
  const email = localStorage.getItem("email");
  return (
    <OutlinedButton
      display={useBreakpointValue({ base: "none", md: "flex" })}
      fontWeight={500}
      fontFamily={"Manrope"}
      backgroundColor={"background.600"}
      py={"5px"}
      color={"white"}
      angle={"0deg"}
      firstColor={colors.background[200]}
      secondColor={colors.background[900]}
      alignSelf={"start"}
      justifyContent={"center"}
      alignItems={"center"}
    >
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
    </OutlinedButton>
  );
}

const SignOutButton = (props) => {
  const { langKeys } = props;
  const buttonIcon = useBreakpointValue({ md: <LogIn /> });
  return (
    <OutlinedButton
      leftIcon={buttonIcon}
      fontWeight={500}
      fontFamily={"Manrope"}
      backgroundColor={"background.600"}
      py={"5px"}
      color={"white"}
      angle={"110deg"}
      firstColor={colors.violet[500]}
      secondColor={colors.blue[500]}
      alignSelf={"start"}
      justifyContent={"center"}
      alignItems={"center"}
      {...props}
    >
      {langKeys["signOut"]}
    </OutlinedButton>
  );
};

export default Dashboard;
