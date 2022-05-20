import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  useToast,
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
import TextButton from "src/components/TextButton";
import LoadingIndicator from "src/components/LoadingIndicator";

function Dashboard() {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = useLanguage();

  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const onToggleAlert = () => setIsOpenAlert(!isOpenAlert);

  const toast = useToast();

  const {
    plans,
    networkError,
    networkLoading,
    refresh,
    balance,
    earnings,
    refreshEarnings,
    referrals,
    setReferralsRead,
  } = useUserDashboard();

  const [totalBonus, setTotalBonus] = useState(0);

  useEffect(() => {
    if (referrals !== undefined) {
      referrals.forEach((referal) => {
        if (!referal.isRead) {
          toast({
            title: langKeys["referralProgram"],
            description: `${langKeys["referralToastMessage"][0]} ${referal.amount}$ ${langKeys["referralToastMessage"][1]} ${referal.from}${langKeys["referralToastMessage"][2]}`,
            status: "success",
            position: "top-left",
            size: "lg",
            duration: null,
            isClosable: true,
          });
        }
      });
      setReferralsRead(referrals);

      let total = 0;

      for (const referal of referrals) {
        total += referal.amount;
      }

      setTotalBonus(total);
    }
  }, [referrals]);

  const detailsFontSize = useBreakpointValue({
    base: "16px",
    sm: "28px",
    md: "35px",
    lg: "30px",
  });

  const textFontSize = useBreakpointValue({
    base: "x-small",
    sm: "sm",
    md: "14px",
    lg: "16px",
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
            period={plan.period}
          />
        );
      });
  }, [plans, earnings]);

  return (
    <Box>
      <Navbar
        CurrentFlag={CurrentFlag}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      >
        <Text
          maxW={useBreakpointValue({ base: "50px", md: "100px" })}
          fontSize={textFontSize}
          fontFamily={"Manrope"}
          fontWeight={200}
          bgGradient={"-webkit-linear-gradient(110deg, violet.200, #fff)"}
          bgClip={"text"}
          fill={"transparent"}
          alignSelf={"center"}
          overflowWrap={"anywhere"}
          textOverflow={"ellipsis"}
        >
          {localStorage.getItem("username")}
        </Text>
        <SignOutButton onClick={onToggleAlert} langKeys={langKeys} />
      </Navbar>
      <Container
        maxWidth={"container.xl"}
        paddingTop={useBreakpointValue({ base: "80px", md: "120px" })}
      >
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
            <VStack spacing={6}>
              <Flex
                w={useBreakpointValue({ base: "full", md: "full" })}
                px={"40px"}
                flexDir={useBreakpointValue({ base: "column", md: "row" })}
                justify={useBreakpointValue({
                  base: "flex-start",
                  md: "space-around",
                })}
              >
                <VStack spacing={0} align={"start"} marginBottom={"20px"}>
                  <Text
                    fontSize={useBreakpointValue({ base: "10px", md: "14px" })}
                    color={"#666666"}
                  >
                    Username
                  </Text>
                  <Heading
                    fontSize={useBreakpointValue({ base: "14px", md: "16px" })}
                  >
                    {localStorage.getItem("username")}
                  </Heading>
                </VStack>
                <VStack spacing={0} align={"start"} marginBottom={"20px"}>
                  <Text
                    fontSize={useBreakpointValue({ base: "10px", md: "14px" })}
                    color={"#666666"}
                  >
                    Email
                  </Text>
                  <Heading
                    color={"#A4ADFF"}
                    fontSize={useBreakpointValue({ base: "14px", md: "16px" })}
                  >
                    {localStorage.getItem("email")}
                  </Heading>
                </VStack>
                <TextButton
                  alignSelf={useBreakpointValue({
                    base: "start",
                    md: "center",
                  })}
                  fontSize={useBreakpointValue({ base: "12px", md: "14px" })}
                  bgColor={"#343434"}
                  paddingX={"10px"}
                  paddingY={"3px"}
                  borderRadius={"4px"}
                  onClick={() => {
                    let link =
                      "https://cryptowaveclub.com/sign/up/#" +
                      localStorage.getItem("username");

                    if (navigator.clipboard !== undefined) {
                      navigator.clipboard.writeText(link);
                    }
                    toast({
                      title: "Copied!",
                      status: "info",
                      position: "top-left",
                      size: "sm",
                      duration: 1000,
                      isClosable: true,
                    });
                  }}
                >
                  Referral link
                </TextButton>
              </Flex>
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
            </VStack>

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
                    {networkLoading ? (
                      <LoadingIndicator size={"25px"} />
                    ) : earnings !== undefined ? (
                      earnings.length > 0 ? (
                        earnings.reduce((a, b) => a + b) + "$"
                      ) : (
                        0 + "$"
                      )
                    ) : (
                      0 + "$"
                    )}
                  </Heading>
                  {/* <OutlinedButton
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
                  </OutlinedButton> */}
                </HStack>
                <Heading
                  fontSize={detailsFontSize}
                  fontFamily={"Manrope-ExtraBold"}
                  color={"green.500"}
                >
                  {langKeys["referralBonus"]} +{totalBonus}$
                </Heading>
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
                  {networkLoading ? (
                    <LoadingIndicator size={"25px"} />
                  ) : (
                    balance + "$"
                  )}
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
            {networkLoading ? (
              <LoadingIndicator title={langKeys["loading"]} />
            ) : plans.length > 0 ? (
              renderUserPlans
            ) : (
              <Text>{langKeys["noPlans"]}</Text>
            )}
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
