import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Heading,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import validator from "validator";
import GradientButton from "src/components/GradientButton";
import { colors } from "src/theme";
import { getReviews, sendFeedback, sendToSupport } from "src/utils/network";
import AtSymbol from "src/assets/images/atSymbol.png";
import Telegram from "src/assets/vectors/Telegram";

const Contacts = ({ isSignedIn, langKeys }) => {
  const email = localStorage.getItem("email");
  const [sender, setSender] = useState(email !== null ? email : "");
  const [feedback, setFeedback] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getReviews();

      const newReviews = result.data.filter((review) => review.isVisible);

      setReviews(newReviews.reverse());
    };

    fetchData();
  }, []);

  const handleSendSupport = async () => {
    try {
      if (validator.isEmail(sender) && content.length > 10) {
        setLoading(true);
        setError("");
        const result = await sendToSupport(sender, content);

        if (result.status === 200) {
          setMessage("Sent successfully!");
        }
      }
    } catch (err) {
      if (err.response.status === 406) {
        setError("Not acceptable inputs!");
      } else if (err.response.status === 500) {
        setError("Server error!");
      } else {
        setError("Network error!");
      }
      setLoading(false);
      console.error(err);
    }
  };

  const toast = useToast();

  const handleSendFeedback = async () => {
    try {
      if (feedback.length > 0) {
        const result = await sendFeedback(
          localStorage.getItem("token"),
          localStorage.getItem("email"),
          localStorage.getItem("username"),
          feedback
        );

        if (result.status === 200) {
          setFeedback("");
          toast({
            title: "Sent!",
            status: "success",
            position: "top-left",
            size: "sm",
            duration: 1000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Please write something!",
          status: "error",
          position: "top-left",
          size: "sm",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response !== undefined) {
        toast({
          title: "Network error!",
          status: "error",
          position: "top-left",
          size: "sm",
          duration: 1000,
          isClosable: true,
        });
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [message]);

  const renderReviews = () => {
    return reviews.map((review) => (
      <Box
        py={"10px"}
        px={"20px"}
        borderRadius={"10px"}
        bgGradient={"linear-gradient(110deg, #282828, #242435)"}
        w={"95%"}
        h={"fit-content"}
        bgColor={"#000"}
        marginBlock={"10px"}
      >
        <Text>{review.username}</Text>
        <Text>{review.content}</Text>
      </Box>
    ));
  };

  return (
    <Flex
      id={"Contact"}
      maxW={useBreakpointValue({ md: "container.xl" })}
      w={useBreakpointValue({ base: "80%" })}
      alignSelf={"center"}
      h={"fit-content"}
      flexDir={useBreakpointValue({ base: "column", md: "row" })}
      justifyContent={"center"}
      paddingBottom={useBreakpointValue({ base: "140px", md: "150px" })}
      marginTop={useBreakpointValue({ base: "50px", md: "100px" })}
    >
      <Box
        pos={"relative"}
        h={"fit-content"}
        minW={useBreakpointValue({ base: "100%", md: "50%" })}
        marginBottom={useBreakpointValue({ base: "40px" })}
        marginRight={useBreakpointValue({
          base: "0px",
          md: "40px",
          lg: "60px",
        })}
        justifyContent={"center"}
        style={{
          border: "3px solid transparent",
        }}
        background={`linear-gradient(${colors.background[900]}, ${colors.background[900]}) padding-box, linear-gradient(110deg, #404040, ${colors.background[900]}) border-box`}
        borderRadius={"10px"}
        px={useBreakpointValue({
          base: "20px",
          sm: "30px",
          md: "30px",
          lg: "50px",
        })}
        paddingTop={useBreakpointValue({ base: "20px", md: "30px" })}
      >
        <VStack spacing={4}>
          <Flex w={"full"} justify={"space-between"}>
            <Heading
              alignSelf={"flex-start"}
              fontSize={useBreakpointValue({ base: "24px", md: "30px" })}
            >
              {langKeys["contactUs"]}
            </Heading>
            <a
              href={"https://t.me/cryptowaveclub"}
              target={"_blank"}
              rel="noreferrer"
            >
              <Telegram />
            </a>
          </Flex>
          {error.length > 0 && <Text color={"red"}>{error}</Text>}
          <FormControl
            isInvalid={sender.length > 0 && !validator.isEmail(sender)}
          >
            <FormLabel
              variant={"primary"}
              fontSize={useBreakpointValue({ base: "12px", md: "18px" })}
            >
              {langKeys["mail"]}
            </FormLabel>
            <Input
              value={sender}
              variant={"primary"}
              height={"50px"}
              placeholder="example@email.com"
              onChange={(event) => {
                setSender(event.target.value);
              }}
            />
            <FormErrorMessage>{langKeys["incorrectMail"]}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={content.length > 0 && content.length < 10}>
            <FormLabel
              variant={"primary"}
              fontSize={useBreakpointValue({ base: "12px", md: "18px" })}
            >
              {langKeys["message"]}
            </FormLabel>
            <Textarea
              value={content}
              resize={"none"}
              maxLength={300}
              height={useBreakpointValue({ base: "150px", md: "250px" })}
              placeholder={langKeys["write"]}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
            <FormErrorMessage>
              {langKeys["messageRequirements"]}
            </FormErrorMessage>
          </FormControl>

          <Flex w={"full"} flexDir={"row"} justifyContent={"space-between"}>
            <img
              style={{
                width: useBreakpointValue({ base: "80px", md: "150px" }),
              }}
              src={AtSymbol}
              alt={"at"}
            />
            <GradientButton
              alignSelf={"center"}
              onClick={handleSendSupport}
              loading={loading}
            >
              {langKeys["send"]}
            </GradientButton>
          </Flex>

          {message.length > 0 && <Text color={"green"}>{message}</Text>}
        </VStack>
      </Box>

      <Flex
        color={"#FFF"}
        pos={"relative"}
        minW={useBreakpointValue({ base: "80%", md: "50%" })}
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexDir={"column"}
      >
        <Heading marginBottom={"20px"}>{langKeys["feedbacks"]}</Heading>
        <Box
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#fff",
              borderRadius: "24px",
            },
          }}
          h={useBreakpointValue({ base: "300px", md: "430px" })}
          w={"100%"}
          alignItems={"center"}
        >
          {reviews.length > 0 ? renderReviews() : "No Reviews available"}
        </Box>
        {isSignedIn && (
          <Box marginTop={"20px"} w={"full"}>
            <FormControl>
              <HStack>
                <Input
                  value={feedback}
                  variant={"primary"}
                  height={"50px"}
                  placeholder="Leave us a feedback"
                  onChange={(event) => {
                    setFeedback(event.target.value);
                  }}
                />
                <GradientButton
                  alignSelf={"center"}
                  onClick={handleSendFeedback}
                  loading={loading}
                >
                  {langKeys["send"]}
                </GradientButton>
              </HStack>
            </FormControl>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Contacts;
