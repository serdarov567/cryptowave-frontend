import React from "react";
import {
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import useStatistics from "src/pages/Landing/useStatistics";
import CountUp from "react-countup";

const Statistics = ({ langKeys, currentLanguage }) => {
  const { users, capitalization, runningDays } = useStatistics();

  const headerFontSize = useBreakpointValue({
    base: "20px",
    md: "30px",
    lg: "28px",
  });
  const headerProps = {
    fontSize: headerFontSize,
    textAlign: "center",
    fontFamily: "Manrope-ExtraBold",
    marginTop: useBreakpointValue({
      base: "20px",
      sm: "0px",
      md: "20px",
      lg: currentLanguage === "RUS" ? "20px" : "0px",
    }),
    marginBottom: "0px",
  };

  const bodyFontSize = useBreakpointValue({ base: "14px", md: "20px" });

  const bodyProps = {
    fontSize: bodyFontSize,
    fontFamily: "Manrope-Bold",
  };

  return (
    <Flex
      flex={6}
      w={"full"}
      marginBlock={"20px"}
      flexDir={"row"}
      alignSelf={useBreakpointValue({
        base: "flex-start",
        sm: "center",
        md: "center",
      })}
      alignContent={"center"}
      justifyContent={"space-evenly"}
    >
      <Flex flexDir={"column"} justify={"space-between"}>
        <VStack marginBottom={"20px"}>
          <Heading {...headerProps}>{langKeys["online"]}</Heading>
          <Text {...bodyProps}>
            <CountUp end={runningDays} duration={2} /> {langKeys["days"]}
          </Text>
        </VStack>

        <VStack>
          <Heading {...headerProps}>{langKeys["capital"]}</Heading>
          <Text {...bodyProps} color={"green.500"}>
            <CountUp
              end={capitalization}
              duration={3}
              formattingFn={(number) => {
                return number.toLocaleString();
              }}
            />
            $
          </Text>
        </VStack>
      </Flex>

      <Flex flexDir={"column"} justify={"space-between"}>
        <VStack marginBottom={"20px"}>
          <Heading {...headerProps}>{langKeys["investors"]}</Heading>
          <Text {...bodyProps}>
            <CountUp end={users} duration={2} />
          </Text>
        </VStack>

        <VStack>
          <Heading {...headerProps}>{langKeys["paidToUsers"]}</Heading>
          <Text {...bodyProps} color={"green.500"}>
            <CountUp
              end={capitalization / 2.39351241}
              duration={2}
              formattingFn={(number) => {
                return number.toLocaleString();
              }}
            />
            $
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Statistics;
