import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
  Tooltip,
  CloseButton,
} from "@chakra-ui/react";
import Timeline from "src/assets/vectors/Timeline";
import { colors, styles } from "src/theme";
import { useCountdown } from "src/pages/Dashboard/useUserDashboard";
import dateToString from "src/utils/dateToString";
import Clock from "src/assets/vectors/Clock";

const SUPPORTED_WALLETS = {
  BTC: "bc1q2t2dncstcv4stp9pezfygdjhz045tq8vdferjz",
  ETH: "0xA94563d641EB4735aB0c9dd17BcCaBc02F03eDC0",
  USDTTRC20: "TFQdTZhcrVgFzxVXBXnqPhGuCr3ibXujJh",
  BNB: "0xA94563d641EB4735aB0c9dd17BcCaBc02F03eDC0",
  DASH: "XpVPSsn4m9XgKTaFp5UC4CwwpiVfQZyphA",
  LTC: "ltc1qphdmtx3cqsk2jljzqz430xsrfx49emcn4yprrm",
  TRX: "TFQdTZhcrVgFzxVXBXnqPhGuCr3ibXujJh",
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function PlanItem(props) {
  const { langKeys } = props;
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

  const addressTextSize = useBreakpointValue({ base: "12px", md: "16px" });

  const mobileMargin = useBreakpointValue({ base: "20px", sm: "0px" });

  let { days, hours, minutes } = useCountdown(props.dateOfExpiration);

  const isThreeDaysPass =
    new Date(props.dateOfExpiration).getTime() - (props.period - 3) * DAY <
    Date.now();

  return (
    <Box
      key={props.uniqueKey}
      pos={"relative"}
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
                  : langKeys["approval"]}
              </Text>
            </HStack>
            <HStack spacing={4}>
              <VStack spacing={0}>
                <Text
                  fontSize={textFontSize}
                  color={"#d4d4d4"}
                  alignSelf={"start"}
                >
                  {langKeys["purchased"]}
                </Text>
                <Text fontSize={titleFontSize} fontFamily={"Manrope-Bold"}>
                  {dateToString(props.dateOfPurchase).dateStr}
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
                  {langKeys["finishes"]}
                </Text>
                <Text fontSize={titleFontSize} fontFamily={"Manrope-Bold"}>
                  {dateToString(props.dateOfExpiration).dateStr.length > 0
                    ? dateToString(props.dateOfExpiration).dateStr
                    : langKeys["pending"]}
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
              title={langKeys["deposit"]}
              titleFontSize={titleFontSize}
              bodyFontSize={headerFontSize}
            >
              {props.deposit}
              <span style={styles.sign}>$</span>
            </Detail>
            <Detail
              title={langKeys["percentage"]}
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
              {props.status !== "Canceled" && (
                <Detail
                  title={langKeys["earned"]}
                  key={props.uniqueKey + "1"}
                  titleFontSize={earnedTitleFontSize}
                  bodyFontSize={headerFontSize}
                  flexDir={earnedFlexDir}
                  bodyMarginTop={earnedBodyMarginTop}
                >
                  <span style={styles.blueText}>
                    {minutes > 0
                      ? props.status === "Completed"
                        ? props.reward + "$"
                        : props.earned + "$"
                      : props.reward + "$"}
                  </span>
                </Detail>
              )}
              <Box
                border={"2px solid transparent"}
                borderRadius={"5px"}
                background={`linear-gradient(110deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7)) padding-box, linear-gradient(110deg, ${colors.blue["500"]}, ${colors.violet["500"]}) border-box`}
                boxShadow={"7px 6px 20px 0px #6B68FF50"}
                px={"20px"}
                py={"10px"}
                marginTop={mobileMargin}
              >
                {minutes > 0 &&
                props.status !== "Completed" &&
                props.status !== "Canceled" ? (
                  <HStack>
                    <Clock size={"25px"} color={"white"} strokeWidth={4} />
                    <Heading
                      maxW={"200px"}
                      key={props.uniqueKey + "2"}
                      fontSize={titleFontSize}
                      textAlign={"center"}
                    >
                      {days > 0 && days > 9 ? days : `0${days}`}d:
                      {hours > 0 && hours > 9 ? hours : `0${hours}`}h
                      {days <= 0 &&
                        (minutes > 0 && minutes > 9
                          ? `:${minutes}m`
                          : `:0${minutes}m`)}
                    </Heading>
                  </HStack>
                ) : (
                  <Heading fontSize={titleFontSize}>{props.status}</Heading>
                )}
              </Box>
            </>
          ) : (
            <>
              {props.walletType !== "USD" ? (
                <Text
                  key={props.uniqueKey + "3"}
                  paddingX={"50px"}
                  color={"gray.400"}
                  fontSize={addressTextSize}
                >
                  {langKeys["pendingText"][0]} {props.deposit}${" "}
                  {langKeys["pendingText"][1]} {props.walletType}{" "}
                  {langKeys["pendingText"][2] + " "}
                  <Tooltip label="Copy to clipboard!">
                    <Text
                      cursor={"pointer"}
                      fontSize={addressTextSize}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          SUPPORTED_WALLETS[props.walletType]
                        );
                      }}
                      _hover={{
                        color: "blue.500",
                      }}
                    >
                      {SUPPORTED_WALLETS[props.walletType]}
                    </Text>
                  </Tooltip>
                  {" " + langKeys["pendingText"][3]}
                </Text>
              ) : (
                <Text
                  key={props.uniqueKey + "4"}
                  paddingX={"50px"}
                  color={"gray.400"}
                  fontSize={addressTextSize}
                >
                  Please, wait until we approve your payment.
                </Text>
              )}
            </>
          )}
        </Flex>
      </Flex>

      {/* <Tooltip
        label={langKeys['cancelLimit']}
        isDisabled={isThreeDaysPass}
        fontSize={useBreakpointValue({ base: "10px", md: "14px" })}
        w={"200px"}
      >
        <span style={{ position: "absolute", right: "40px", top: "10px" }}>
          <CloseButton
            pos={"absolute"}
            width={"30px"}
            height={"30px"}
            bgColor={"gray.500"}
            _hover={{
              color: "white",
              bgColor: "transparent",
            }}
            _focus={{}}
            disabled={!isThreeDaysPass}
          />
        </span>
      </Tooltip> */}
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

export default PlanItem;
