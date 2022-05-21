import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import HALO from "vanta/dist/vanta.cells.min.js";
import * as THREE from "three";
import Navbar from "src/components/Navbar";
import useLanguage from "src/languages/useLanguage";

const general = [
  { question: "questionOne", answer: "oneText" },
  { question: "questionTwo", answer: "twoText" },
  { question: "questionThree", answer: "threeText" },
  { question: "questionFour", answer: "fourText" },
];

const investment = [
  { question: "questionFive", answer: "fiveText" },
  { question: "questionSix", answer: "sixText" },
  { question: "questionSeven", answer: "sevenText" },
  { question: "questionEight", answer: "eightText" },
];

const withdrawal = [
  { question: "questionNine", answer: "nineText" },
  { question: "questionTen", answer: "tenText" },
  { question: "questionEleven", answer: "elevenText" },
];

const accountAndSecurity = [
  { question: "questionTwelve", answer: "twelveText" },
  { question: "questionThirteen", answer: "thirteenText" },
  { question: "questionFourteen", answer: "fourteenText" },
];

const questions = [
  { faqs: general, header: "generalText" },
  { faqs: investment, header: "investmentText" },
  { faqs: withdrawal, header: "withdrawalText" },
  { faqs: accountAndSecurity, header: "accountSecurityText" },
];

const FAQ = () => {
  const [haloEffect, setHaloEffect] = useState(0);
  const haloBoxRef = useRef(null);

  useEffect(() => {
    if (!haloEffect)
      setHaloEffect(
        HALO({
          el: haloBoxRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 100.0,
          minWidth: 200.0,
          scale: 2.0,
          scaleMobile: 5.0,
          color1: "#1d1d1d",
          color2: "#025167",
          size: 2,
          speed: 1.3,
        })
      );

    return () => {
      if (haloEffect) haloEffect.destroy();
    };
  }, [haloEffect]);

  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = useLanguage();

  const renderFaq = (header, faqs) => {
    return (
      <Box marginBottom={{ base: "30px", md: "70px" }}>
        <Heading marginBlock={"20px"}>{langKeys[header]}</Heading>
        {faqs.map((faq, index) => (
          <AccordionItem
            borderTopRadius={index === 0 && "20px"}
            borderBottomRadius={index === faqs.length - 1 && "20px"}
            border={"none"}
          >
            <Heading fontFamily={"Manrope-Bold"}>
              <AccordionButton
                _focus={{}}
                px={"20px"}
                py={"20px"}
                border={"none"}
                borderTopRadius={index === 0 && "20px"}
                borderBottomRadius={index === faqs.length - 1 && "20px"}
                borderBottom={index !== faqs.length - 1 && "1px"}
                borderBottomColor={"#444"}
                bgColor={"background.200"}
                _hover={{
                  backgroundColor: "#3A3D46",
                }}
              >
                <Box fontSize={"18px"} flex="1" textAlign="left">
                  {langKeys[faq.question]}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel
              pb={4}
              fontFamily={"Manrope"}
              color={"#FFFF"}
              marginBlock={"20px"}
              whiteSpace={"pre-wrap"}
            >
              {langKeys[faq.answer]}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Box>
    );
  };

  const renderQuestions = useMemo(() => {
    return questions.map((question) => {
      return renderFaq(question.header, question.faqs);
    });
  }, [langKeys]);

  return (
    <>
      <Flex
        ref={haloBoxRef}
        position={"absolute"}
        left={0}
        top={0}
        minH={"350px"}
        w={"100%"}
        overflowX={"hidden"}
        overflowY={"clip"}
        zIndex={-1}
      />
      <Flex
        position={"absolute"}
        left={0}
        top={0}
        minH={"350px"}
        w={"100%"}
        overflowX={"hidden"}
        overflowY={"clip"}
        zIndex={1}
        backdropFilter={"auto"}
        backdropBlur={"10px"}
      />
      <Navbar
        CurrentFlag={CurrentFlag}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      />
      <Container
        pos={"relative"}
        display={"flex"}
        flexDir={"column"}
        maxW={"container.xl"}
        minH={"800px"}
        h={"100vh"}
        paddingTop={"200px"}
      >
        <Heading
          fontFamily={"Manrope-Bold"}
          fontSize={"50px"}
          marginBottom={"10px"}
          zIndex={10}
        >
          F.A.Q
        </Heading>
        <Heading zIndex={10} fontFamily={"Manrope"} fontSize={"20px"}>
          {langKeys["frequentlyAskedQuestions"]}
        </Heading>

        <Accordion
          defaultIndex={[0]}
          allowMultiple
          marginTop={"120px"}
          paddingBottom={"100px"}
        >
          {renderQuestions}
        </Accordion>
      </Container>
    </>
  );
};

export default FAQ;
