import React from 'react';
import { Flex, Heading, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
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
      flexDir={useBreakpointValue({
        base: "column",
        sm: "row",
        md: "column",
        lg: currentLanguage === "RUS" ? "column" : "row",
      })}
      alignSelf={useBreakpointValue({
        base: "flex-start",
        sm: "center",
        md: "center",
      })}
      alignContent={useBreakpointValue({
        base: "flex-start",
        sm: "space-evenly",
        md: "flex-start",
      })}
      justifyContent={useBreakpointValue({
        base: "center",
        sm: "space-evenly",
        md: "space-evenly",
      })}
    >
      <VStack>
        <Heading {...headerProps}>{langKeys["running"]}</Heading>
        <Text {...bodyProps}>
          <CountUp end={runningDays} duration={2} /> {langKeys["days"]}
        </Text>
      </VStack>

      <VStack>
        <Heading {...headerProps}>{langKeys["investors"]}</Heading>
        <Text {...bodyProps}>
          <CountUp end={users} duration={2} />
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
  );
};

export default Statistics;
