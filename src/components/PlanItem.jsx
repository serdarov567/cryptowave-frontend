import React, {useEffect} from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Timeline from "src/assets/vectors/Timeline";
import OutlinedButton from "./OutlinedButton";
import { colors, styles } from "src/theme";
import DollarSign from "src/assets/vectors/DollarSign";
import { useCountdown } from "src/pages/Dashboard/useUserDashboard";
import dateToString from "src/utils/dateToString";

const SUPPORTED_WALLETS = {
  BTC: "1CwE5wYeZEHNoLLf7Cv8fvVTtGEC7Ckx3d",
  ETH: "0x2a011810c6bd88cd8736dbfdfae5a8e1a98f97a9",
  USDTTRC20: "TVZL1ADycCrhL2RfqJXx4AjSbu8Uhnff2z",
};

function PlanItem(props) {
  const headerFontSize = useBreakpointValue({
    base: "22px",
    sm: "18px",
    md: "18px",
    lg: "25px",
  });

  const titleFontSize = useBreakpointValue({
    base: "20px",
    sm: "20px",
    md: "16px",
    lg: "23px",
  });

  const textFontSize = useBreakpointValue({
    base: "10px",
    sm: "10px",
    md: "10px",
    lg: "12px",
  });

  const earnedTitleFontSize = useBreakpointValue({
    base: "23px",
    sm: "22px",
    md: "16px",
    lg: "23px",
  });
  const earnedFlexDir = useBreakpointValue({ base: "row", sm: "column" });
  const earnedBodyMarginTop = useBreakpointValue({ base: "0px" });

  useEffect
  let { days, hours, minutes } = useCountdown(props.dateOfExpiration);

  return (
    <Box
      key={props.uniqueKey}
      bgColor={"#000"}
      minH={"150px"}
      w={useBreakpointValue({ base: "300px", sm: "350px", md: "full" })}
      borderRadius={"5px"}
    >
      <Flex
        flexDir={useBreakpointValue({
          base: "column",
          sm: "column",
          md: "row",
        })}
        justifyContent={"space-between"}
        paddingTop={useBreakpointValue({ base: "10px", sm: "10px", md: "0px" })}
      >
        <Flex
          flex={3}
          flexDir={useBreakpointValue({
            base: "column",
            sm: "column",
            md: "row",
          })}
          w={"full"}
          justifyContent={"space-between"}
          paddingX={"25px"}
          paddingRight={useBreakpointValue({
            base: "65px",
            sm: "65px",
            md: "0px",
          })}
        >
          <VStack
            flex={1}
            spacing={4}
            alignSelf={useBreakpointValue({
              base: "start",
              sm: "start",
              md: "center",
            })}
            marginTop={useBreakpointValue({
              base: "20px",
              sm: "25px",
              md: "0px",
            })}
          >
            <HStack spacing={4} alignSelf={"start"}>
              <Heading fontFamily={"Manrope-Bold"} fontSize={headerFontSize}>
                {props.title}
              </Heading>
              <Text fontSize={textFontSize} color={"#d4d4d4"}>
                {props.number !== -1
                  ? `#${props.number}`
                  : "Pending approval..."}
              </Text>
            </HStack>
            <HStack spacing={4}>
              <VStack spacing={0}>
                <Text
                  fontSize={textFontSize}
                  color={"#d4d4d4"}
                  alignSelf={"start"}
                >
                  Purchased on
                </Text>
                <Text fontSize={titleFontSize} fontFamily={"Manrope-Bold"}>
                  {dateToString(props.dateOfPurchase)}
                </Text>
              </VStack>
              <Timeline
                width={useBreakpointValue({
                  base: "20px",
                  sm: "35px",
                  md: "45px",
                  lg: "50px",
                  xl: "50px",
                })}
              />
              <VStack spacing={0}>
                <Text
                  fontSize={textFontSize}
                  color={"#d4d4d4"}
                  alignSelf={"start"}
                >
                  Finishes on
                </Text>
                <Text fontSize={titleFontSize} fontFamily={"Manrope-Bold"}>
                  {dateToString(props.dateOfExpiration).length > 0
                    ? dateToString(props.dateOfExpiration)
                    : "pending..."}
                </Text>
              </VStack>
            </HStack>
          </VStack>

          <Flex
            flex={2}
            flexDir={"row"}
            justifyContent={useBreakpointValue({
              base: "space-between",
              sm: "space-between",
              md: "space-evenly",
            })}
            h={"150px"}
            w={"full"}
            marginTop={useBreakpointValue({
              base: "20px",
              sm: "25px",
              md: "0px",
            })}
          >
            <Detail
              title="Deposit"
              titleFontSize={titleFontSize}
              bodyFontSize={headerFontSize}
            >
              {props.deposit}
              <span style={styles.sign}>$</span>
            </Detail>
            <Detail
              title="Percentage"
              titleFontSize={titleFontSize}
              bodyFontSize={headerFontSize}
            >
              {props.percentage}
              <span style={styles.sign}>%</span>
            </Detail>
          </Flex>
        </Flex>
        <Flex
          flex={2}
          flexDir={useBreakpointValue({ base: "column", sm: "row", md: "row" })}
          justifyContent={useBreakpointValue({
            base: "center",
            sm: "space-between",
            md: "space-evenly",
          })}
          alignItems={"center"}
          h={"150px"}
          marginTop={useBreakpointValue({
            base: "20px",
            sm: "25px",
            md: "0px",
          })}
          paddingLeft={useBreakpointValue({
            base: "0px",
            sm: "25px",
            md: "0px",
          })}
          paddingRight={useBreakpointValue({
            base: "0px",
            sm: "50px",
            md: "0px",
          })}
          paddingY={useBreakpointValue({ base: "20px", sm: "20px", md: "0px" })}
          borderRadius={"5px"}
          bgColor={"background.700"}
        >
          {props.status !== "Pending..." ? (
            <>
              <Detail
                title={`Earned`}
                titleFontSize={earnedTitleFontSize}
                bodyFontSize={headerFontSize}
                flexDir={earnedFlexDir}
                bodyMarginTop={earnedBodyMarginTop}
              >
                <span style={styles.blueText}>
                  {minutes > 0 ? props.earned : props.reward}
                </span>
                $
              </Detail>
              {minutes > 0 || props.status !== "Completed" ? (
                <Heading fontSize={titleFontSize}>
                  Time left: {days > 0 && days > 9 ? days : `0${days}`}d:
                  {hours > 0 && hours > 9 ? hours : `0${hours}`}h:
                  {minutes > 0 && minutes > 9 ? minutes : `0${minutes}`}m
                </Heading>
              ) : (
                <Heading fontSize={titleFontSize}>{props.status}</Heading>
              )}
            </>
          ) : (
            <>
              <Text paddingX={"50px"} color={"gray.400"}>
                Send {props.deposit}$ to {props.walletType} address{" "}
                {SUPPORTED_WALLETS[props.walletType]} in order to activate your
                plan. Then wait until we approve your payment.
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

const Detail = (props) => {
  return (
    <Flex
      flexDir={props.flexDir ? props.flexDir : "column"}
      alignSelf={"center"}
      alignItems={"center"}
      w={useBreakpointValue({
        base: "full",
        sm: "fit-center",
        md: "fit-center",
      })}
      justifyContent={useBreakpointValue({
        base: "space-around",
        sm: "center",
        md: "center",
      })}
    >
      <Heading alignSelf={"start"} fontSize={props.titleFontSize}>
        {props.title}
      </Heading>
      <Heading
        alignSelf={"start"}
        fontSize={props.flexDir ? "25px" : props.titleFontSize}
        fontFamily={"Manrope-Bold"}
        marginTop={props.bodyMarginTop ? props.bodyMarginTop : "8px"}
      >
        {props.children}
      </Heading>
    </Flex>
  );
};

const ActionButton = (props) => {
  return (
    <OutlinedButton
      leftIcon={<DollarSign />}
      fontWeight={500}
      fontFamily={"Manrope"}
      fontSize={props.fontSize}
      w={useBreakpointValue({ base: "80%", sm: "fit-content" })}
      h={useBreakpointValue({
        base: "40px",
        sm: "30px",
        md: "40px",
        lg: "50px",
      })}
      color={"white"}
      angle={"110deg"}
      firstColor={colors.violet[500]}
      secondColor={colors.blue[500]}
      bgFirst={colors.violet[800]}
      bgSecond={colors.blue[800]}
      alignSelf={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={useBreakpointValue({ base: "20px", sm: "0px" })}
      marginBottom={useBreakpointValue({ base: "10px", sm: "0px" })}
      {...props}
    >
      Withdraw
    </OutlinedButton>
  );
};

export default PlanItem;
