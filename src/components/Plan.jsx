import React from "react";
import { Box, Button, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import Timeline from "src/assets/vectors/Timeline";
import { styles } from "src/theme";

const Plan = (props) => {
  const detailFontSize = useBreakpointValue({
    base: "18px",
    sm: "20px",
    md: "14px",
    lg: "22px",
    xl: "24px",
  });

  const timelineWidth = useBreakpointValue({
    base: "20px",
    sm: "30px",
    md: "20px",
    lg: "40px",
    xl: "50px",
  });

  return (
    <Box
      key={props.title}
      width={useBreakpointValue({
        base: "80vw",
        sm: "320px",
        md: "220px",
        lg: "300px",
        xl: "390px",
      })}
      paddingTop={"20px"}
      paddingBottom={"30px"}
      borderRadius={"10px"}
      bgGradient={`linear-gradient(120deg, ${props.thirdColor}, ${props.secondColor}, 90%, ${props.accentColor})`}
      borderColor={props.borderColor}
      borderWidth={"1px"}
      marginBottom={props.marginBottom}
      marginTop={props.marginTop}
      boxShadow={`${props.shadowLeft}px 10px 0px 0px ${props.shadowColor}`}
    >
      <Flex
        flexDir={"column"}
        paddingX={useBreakpointValue({
          base: "30px",
          sm: "30px",
          md: "20px",
          lg: "30px",
        })}
      >
        <Flex
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginBottom={"10px"}
        >
          <Text
            zIndex={1}
            fontSize={useBreakpointValue({ base: "20px", md: "18px" })}
            marginBottom={"10px"}
            fontFamily={"Manrope-Bold"}
          >
            {props.title}
          </Text>

          <Text
            fontSize={useBreakpointValue({
              base: "12px",
              md: "12px",
              lg: "14px",
            })}
            marginBottom={"4px"}
          >
            Period: {props.days} days
          </Text>
        </Flex>

        <Detail title={"Deposit"}>
          <Flex
            flex={1}
            flexDir={"row"}
            alignItems={"baseline"}
            justifyContent={"space-between"}
          >
            <Flex flexDir={"column"}>
              <Text fontSize={detailFontSize}>
                {props.minDeposit}
                <span style={styles.sign}>$</span>
              </Text>
              <Text fontSize={"14px"} marginTop={"-10px"} color={"#474747"}>
                min
              </Text>
            </Flex>

            <Box
              h={useBreakpointValue({
                base: "10px",
                sm: "13px",
                md: "10px",
                lg: "13px",
                xl: "13px",
              })}
              alignItems={"center"}
            >
              <Timeline width={timelineWidth} />
            </Box>

            <Flex flexDir={"column"}>
              <Text fontSize={detailFontSize}>
                {props.maxDeposit}
                <span style={styles.sign}>$</span>
              </Text>
              <Text fontSize={"14px"} marginTop={"-10px"} color={"#474747"}>
                max
              </Text>
            </Flex>
          </Flex>
        </Detail>

        <Seperator />

        <Detail title={"Percentage"} justifyContent={"flex-start"}>
          <Flex flex={1}>
            <Text fontSize={detailFontSize}>
              {props.minPercentage}-{props.maxPercentage}
              <span style={styles.sign}>%</span>
            </Text>
          </Flex>
        </Detail>

        <Seperator />

        <Detail title={"Earn"}>
          <Flex
            flex={1}
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={detailFontSize}>
              <span style={styles.blueText}>{props.minEarn}</span>$
            </Text>

            <Timeline width={timelineWidth} />

            <Text fontSize={detailFontSize}>
              <span style={styles.blueText}>{props.maxEarn}</span>$
            </Text>
          </Flex>
        </Detail>

        <Button
          variant={"outline"}
          fontFamily={"Manrope"}
          py={"5px"}
          bgColor={"transparent"}
          color={"white"}
          angle={"110deg"}
          alignSelf={"start"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"30px"}
          _hover={{
            color: "#acacac",
            borderColor: "#acacac",
          }}
          _focus={{}}
          w={"full"}
          h={useBreakpointValue({
            base: "40px",
            sm: "40px",
            md: "40px",
            lg: "50px",
          })}
          onClick={props.onClick}
        >
          Purchase
        </Button>
      </Flex>
    </Box>
  );
};

const Detail = (props) => {
  const fontSize = useBreakpointValue({
    base: "16px",
    sm: "16px",
    md: "12px",
    lg: "18px",
    xl: "20px",
  });
  return (
    <Flex
      alignItems={"baseline"}
      justifyContent={
        props.justifyContent ? props.justifyContent : "space-between"
      }
    >
      <Text flex={1} fontSize={fontSize} color={"#71707F"}>
        {props.title}
      </Text>
      {props.children}
    </Flex>
  );
};

const Seperator = () => {
  return (
    <Box
      width={"full"}
      h={"1px"}
      bgColor={"#D3D2FF"}
      opacity={0.4}
      marginBlock={useBreakpointValue({
        base: "10px",
        sm: "10px",
        md: "20px",
        lg: "20px",
      })}
    />
  );
};

export default Plan;
