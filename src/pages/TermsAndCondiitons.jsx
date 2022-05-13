import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "src/components/Navbar";
import useLanguage from "src/languages/useLanguage";

const TermsAndConditions = () => {
  const { currentLanguage, setLanguage, langKeys } = useLanguage();
  return (
    <Box pos={"relative"} width={"100vw"} h={"100vh"}>
      <Navbar
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      />
      <Container maxW={"container.xl"}>
        <Flex
          flexDir={"column"}
          paddingY={useBreakpointValue({ base: "100px", md: "150px" })}
        >
          <Heading marginBottom={"20px"}>
            {langKeys["termsAndConditionsHeader"]}
          </Heading>
          <Text
            fontFamily={"Manrope-Bold"}
            paddingX={useBreakpointValue({ base: "20px", md: "100px" })}
            textAlign={"justify"}
            whiteSpace={"break-spaces"}
            bgColor={"background.200"}
            paddingY={"50px"}
            borderRadius={"10px"}
            marginBottom={"50px"}
          >
            {langKeys["termsAndConditions"]}
          </Text>
          <Heading marginBlock={"20px"}>
            {langKeys["privacyPolicyHeader"]}
          </Heading>
          <Text
            fontFamily={"Manrope-Bold"}
            paddingX={useBreakpointValue({ base: "20px", md: "100px" })}
            textAlign={"justify"}
            whiteSpace={"break-spaces"}
            bgColor={"background.200"}
            paddingY={"50px"}
            borderRadius={"10px"}
            marginBottom={"50px"}
          >
            {langKeys["privacyPolicy"]}
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
