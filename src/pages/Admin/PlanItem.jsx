import React from "react";
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
import OutlinedButton from "src/components/OutlinedButton";
import { colors, styles } from "src/theme";
import DollarSign from "src/assets/vectors/DollarSign";
import { useCountdown } from "src/pages/Dashboard/useUserDashboard";
import dateToString from "src/utils/dateToString";

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

  const widthOfContainer = useBreakpointValue({
    base: "300px",
    sm: "350px",
    md: "full",
  });

  const timerFontSize = useBreakpointValue({
    base: "14px",
    sm: "18px",
    md: "14px",
    lg: "18px",
  });

  const { days, hours, minutes } = useCountdown(props.dateOfExpiration);

  return (
    <Box
      key={props.uniqueKey}
      bgColor={"#000"}
      minH={"150px"}
      w={widthOfContainer}
      borderRadius={"5px"}
      transition={"100ms all"}
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
              <Text
                key={props.uniqueKey}
                fontSize={textFontSize}
                color={"#d4d4d4"}
              >
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
                <Text
                  key={props.uniqueKey}
                  fontSize={titleFontSize}
                  fontFamily={"Manrope-Bold"}
                >
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
            md: "space-between",
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
            md: "50px",
          })}
          paddingRight={useBreakpointValue({
            base: "0px",
            sm: "50px",
            md: "50px",
          })}
          paddingY={useBreakpointValue({ base: "20px", sm: "20px", md: "0px" })}
          borderRadius={"5px"}
          bgColor={"background.700"}
        >
          {props.status === "Active" && (
            <VStack key={props.uniqueKey}>
              <Heading key={props.uniqueKey} fontSize={timerFontSize}>
                Time left
              </Heading>
              <Heading key={props.uniqueKey} fontSize={timerFontSize}>
                {days > 0 && days > 9 ? days : `0${days}`}d:
                {hours > 0 && hours > 9 ? hours : `0${hours}`}h:
                {minutes > 0 && minutes > 9 ? minutes : `0${minutes}`}m
              </Heading>
            </VStack>
          )}
          {props.children}
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
