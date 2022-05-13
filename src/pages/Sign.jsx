import {
  Box,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import Eye from "src/assets/vectors/Eye";
import GradientButton from "src/components/GradientButton";
import SecuredBadge from "src/components/SecuredBadge";
import TextButton from "src/components/TextButton";
import { colors } from "src/theme";
import { forgot, signIn, signUp, verify } from "src/utils/network";
import { useIsSignedIn } from "src/utils/user";
import Axe from "src/assets/images/axe.png";
import Eth from "src/assets/images/eth.png";
import Money from "src/assets/images/money.png";
import Navbar from "src/components/Navbar";
import useLanguage from "src/languages/useLanguage";

const passwordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

export default function Sign() {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isSignedIn) navigate("/#home", { replace: true });
    }
  }, [loading]);

  const { langKeys, currentLanguage, setLanguage } = useLanguage();

  const { type } = useParams();

  let header, sectionName, form;

  switch (type) {
    case "in": {
      header = langKeys["welcomeBack"];
      sectionName = langKeys["signIn"];
      form = <SignIn langKeys={langKeys} />;
      break;
    }
    case "forgot": {
      header = langKeys["passwordRecovery"];
      sectionName = langKeys["weWillSend"];
      form = <Forgot langKeys={langKeys} />;
      break;
    }
    case "verify": {
      header = "Verification";
      sectionName = "Enter the verification code";
      form = <Verify langKeys={langKeys} />;
      break;
    }
    default: {
      header = langKeys["welcome"];
      sectionName = langKeys["signUp"];
      form = <SignUp langKeys={langKeys} />;
      break;
    }
  }

  const marginBetweenElements = useBreakpointValue({ base: "10px", md: "0px" });

  return (
    <Box
      pos={"relative"}
      flexDirection={"column"}
      minH={"100vh"}
      w={"100vw"}
      overflow={"hidden"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
      paddingTop={"10px"}
      paddingBottom={"30px"}
      px={useBreakpointValue({ base: "0px", md: "20px" })}
    >
      <Navbar
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      />
      <Container
        position={"relative"}
        flexDir={"column"}
        mt={"100px"}
        align={"center"}
        maxW={useBreakpointValue({ base: 0, sm: 0, md: "container.xl" })}
        minW={useBreakpointValue({ base: "100%", sm: "70%", md: 0 })}
      >
        <SecuredBadge
          w={"fit-content"}
          alignSelf={"center"}
          marginTop={useBreakpointValue({ base: "10px", md: "20px" })}
          marginBottom={useBreakpointValue({ base: "10px", md: "10px" })}
        />

        <Heading
          fontSize={useBreakpointValue({
            base: "30px",
            md: "40px",
          })}
          px={"50px"}
          textAlign={"center"}
          color={"white"}
          marginTop={marginBetweenElements}
          marginBottom={marginBetweenElements}
        >
          {header}
        </Heading>
        <BackgroundItems />
        <Flex
          position={"relative"}
          minW={useBreakpointValue({ base: "90%", md: "600px" })}
          h={"fit-content"}
          py={useBreakpointValue({ base: "25px", md: "40px" })}
          animation={"SlideFadeIn 1s forwards"}
          justifyContent={"center"}
        >
          <Flex
            style={{
              border: "3px solid transparent",
            }}
            pos={"absolute"}
            marginTop={useBreakpointValue({ base: "-15px", md: "-40px" })}
            minW={useBreakpointValue({ base: "90%", md: "600px" })}
            h={"full"}
            opacity={0.7}
            borderRadius={useBreakpointValue({ base: "15px", md: "12px" })}
            background={`linear-gradient(${colors.background[50]}, ${colors.background[50]}) padding-box, linear-gradient(100deg, #404040, transparent) border-box`}
            zIndex={-1}
            backdropFilter={"auto"}
            backdropBlur={"2px"}
          />
          <Flex
            style={{
              border: "3px solid transparent",
              backdropFilter: "blur(3px)",
            }}
            pos={"absolute"}
            minW={useBreakpointValue({ base: "90%", md: "600px" })}
            marginTop={useBreakpointValue({ base: "-15px", md: "-40px" })}
            h={"full"}
            borderRadius={useBreakpointValue({ base: "15px", md: "12px" })}
            background="none"
            zIndex={-1}
          />
          <VStack
            pos={"relative"}
            w={useBreakpointValue({ base: "75%", md: "500px" })}
            spacing={useBreakpointValue({ base: 3, md: 5 })}
          >
            <Heading
              fontFamily={"Manrope"}
              fontWeight={500}
              fontSize={useBreakpointValue({ base: "24px", md: "32px" })}
              color={"white"}
            >
              {sectionName}
            </Heading>
            {form}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

function SignUp(props) {
  const { langKeys } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fontSize = useBreakpointValue({ base: "16px", md: "18px" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const inputHeight = useBreakpointValue({ base: "42px", md: "50px" });

  const togglePassword = () => {
    setShow(!show);
  };

  const handleSignUp = async (email, username, password) => {
    if (
      validator.isEmail(email) &&
      username.length >= 4 &&
      validator.isStrongPassword(password, passwordOptions)
    ) {
      setIsLoading(true);
      setError("");
      try {
        const result = await signUp(email, username, password);
        if (result.data !== "exists") {
          setError("");
          localStorage.setItem("email", email);
          navigate("/sign/verify");
        } else if (result.data === "exists") {
          setError("User already exists!");
        }
        setIsLoading(false);
      } catch (err) {
        if (err.response.status === 406) {
          setError("Not acceptable inputs!");
        } else if (err.response.status === 500) {
          setError("Server error!");
        } else {
          setError("Network error!");
        }
        setIsLoading(false);
        console.error(err);
      }
    } else {
      setError("Fill the fields as required!");
    }
  };

  return (
    <>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={email.length > 0 && !validator.isEmail(email)}>
        <FormLabel variant={"primary"} fontSize={fontSize}>
          Email
        </FormLabel>
        <Input
          variant={"primary"}
          height={inputHeight}
          placeholder="example@email.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <FormErrorMessage>Not a valid email.</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={username.length < 4 && username.length > 0 && true}
      >
        <FormLabel variant={"primary"} fontSize={fontSize}>
          Username
        </FormLabel>
        <Input
          variant={"primary"}
          height={inputHeight}
          placeholder="John"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <FormErrorMessage>
          Username must be longer than 4 letters.
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={
          password.length > 0 &&
          !validator.isStrongPassword(password, passwordOptions)
        }
      >
        <FormLabel variant={"primary"} fontSize={fontSize}>
          {langKeys["password"]}
        </FormLabel>
        <InputGroup>
          <Input
            variant={"primary"}
            height={inputHeight}
            placeholder={langKeys["password"]}
            type={show ? "text" : "password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <InputRightElement
            width={useBreakpointValue({ base: "3.5em", md: "4.5em" })}
            height={inputHeight}
            alignItems={"center"}
          >
            <Eye
              onClick={togglePassword}
              eyeClosed={!show}
              size={useBreakpointValue({ base: "18", md: "24" })}
            />
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          Password at least must include 1 symbol, 1 uppercase letter, 1
          numeral, 1 lowercase letter and must be longer that 8 characters.
        </FormErrorMessage>
      </FormControl>
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={flexDirection}
      >
        <VStack alignItems={"start"}>
          <Text fontSize={useBreakpointValue({ base: "12px", md: "14px" })}>
            {langKeys["signInText"]}{" "}
            <TextButton
              accentColor={"#6B68FF"}
              href={"/sign/in"}
              fontSize={useBreakpointValue({ base: "12px", md: "14px" })}
            >
              {langKeys["signIn"]}
            </TextButton>
          </Text>
          <Text fontSize={useBreakpointValue({ base: "12px", md: "14px" })}>
            {langKeys["clickTerms"]}{" "}
            <TextButton
              href={"/termsandconditions"}
              fontSize={useBreakpointValue({ base: "12px", md: "14px" })}
            >
              {langKeys["terms"]}
            </TextButton>
          </Text>
        </VStack>

        <GradientButton
          isLoading={isLoading}
          onClick={() => handleSignUp(email, username, password)}
          fontSize={fontSize}
          height={inputHeight}
          marginTop={useBreakpointValue({ base: "10px", md: "0" })}
        >
          {langKeys['signUp']}
        </GradientButton>
      </Flex>
    </>
  );
}

function SignIn(props) {
  const { langKeys } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fontSize = useBreakpointValue({ base: "16px", md: "18px" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const inputHeight = useBreakpointValue({ base: "42px", md: "50px" });

  const togglePassword = () => {
    setShow(!show);
  };

  const handleSignIn = async (email, password) => {
    if (
      validator.isEmail(email) &&
      validator.isStrongPassword(password, passwordOptions)
    ) {
      setIsLoading(true);
      setError("");
      try {
        const result = await signIn(email, password);

        if (result.data !== "non-verified") {
          setError("");
          localStorage.setItem("email", email);
          localStorage.setItem("token", result.data);
          navigate("/#home", { replace: true });
        } else if (result.data === "non-verified") {
          setError("");
          localStorage.setItem("email", email);
          navigate("/sign/verify");
        }
        setIsLoading(false);
      } catch (err) {
        if (err.response !== undefined) {
          if (err.response.status === 403) {
            setError("Email or password is wrong!");
          } else if (err.response.status === 404) {
            setError("User does not exist!");
          } else if (err.response.status === 406) {
            setError("Not acceptable inputs!");
          } else if (err.response.status === 500) {
            setError("Server error!");
          } else {
            setError("Network error!");
          }
        }

        setIsLoading(false);
        console.error(err);
      }
    } else {
      setError("Fill the fields as required!");
    }
  };

  return (
    <>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={email.length > 0 && !validator.isEmail(email)}>
        <FormLabel variant={"primary"} fontSize={fontSize}>
          Email
        </FormLabel>
        <Input
          variant={"primary"}
          height={inputHeight}
          placeholder="example@email.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <FormErrorMessage>Not a valid email.</FormErrorMessage>
      </FormControl>
      <FormControl
        textAlign={"left"}
        isInvalid={
          password.length > 0 &&
          !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        }
      >
        <FormLabel variant={"primary"} fontSize={fontSize}>
          {langKeys["password"]}
        </FormLabel>
        <InputGroup>
          <Input
            variant={"primary"}
            height={inputHeight}
            placeholder={langKeys["password"]}
            type={show ? "text" : "password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <InputRightElement
            width={useBreakpointValue({ base: "3.5em", md: "4.5em" })}
            height={inputHeight}
            alignItems={"center"}
          >
            <Eye
              onClick={togglePassword}
              eyeClosed={!show}
              size={useBreakpointValue({ base: "18", md: "24" })}
            />
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>Not a valid password</FormErrorMessage>

        <TextButton href={"/sign/forgot"} fontSize={fontSize}>
          {langKeys["forgot"]}
        </TextButton>
      </FormControl>
      <Flex
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={flexDirection}
      >
        <VStack>
          <Text fontSize={useBreakpointValue({ base: "12px", md: "16px" })}>
            {langKeys["accountText"]}{" "}
            <TextButton
              href={"/sign/up"}
              accentColor={"#6B68FF"}
              fontSize={useBreakpointValue({ base: "12px", md: "16px" })}
            >
              {langKeys["signUp"]}
            </TextButton>
          </Text>
        </VStack>

        <GradientButton
          isLoading={isLoading}
          onClick={() => {
            handleSignIn(email, password);
          }}
          fontSize={fontSize}
          height={inputHeight}
          marginTop={useBreakpointValue({ base: "10px", md: "0" })}
        >
          {langKeys["signIn"]}
        </GradientButton>
      </Flex>
    </>
  );
}

function Verify(props) {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  if (email === null) {
    navigate(-1);
  }

  const fontSize = useBreakpointValue({ base: "16px", md: "18px" });
  const inputHeight = useBreakpointValue({ base: "42px", md: "50px" });

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (code) => {
    if (code.length === 4) {
      setIsLoading(true);
      setError("");
      try {
        const result = await verify(email, code);
        if (result.data !== undefined && result.data !== null) {
          setError("");
          localStorage.setItem("token", result.data);
          navigate("/#home", { replace: true });
        }
        setIsLoading(false);
      } catch (err) {
        if (err.response.status === 403) {
          setError("Invalid code! We sent a new code to your email!");
        } else if (err.response.status === 404) {
          setError("Account has not been registered!");
          localStorage.removeItem("email");
        } else if (err.response.status === 406) {
          setError("Not acceptable!");
        } else if (err.response.status === 408) {
          setError("Too many attempts, please try again after a while!");
        } else if (err.response.status === 500) {
          setError("Server error!");
        } else {
          setError("Network error!");
        }
        setIsLoading(false);
      }
    } else {
      setError("Please, write the code!");
    }
  };

  return (
    <Flex flexDirection={"column"} w={"full"}>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={code.length > 0 && code.length < 4}>
        <FormLabel variant={"primary"} fontSize={fontSize}>
          Verification code
        </FormLabel>
        <Input
          variant={"primary"}
          height={inputHeight}
          placeholder="1919"
          onChange={(event) => {
            setCode(event.target.value);
          }}
        />
        <FormErrorMessage>Code must be 4 digits</FormErrorMessage>
      </FormControl>

      <GradientButton
        isLoading={isLoading}
        height={inputHeight}
        onClick={() => {
          handleVerify(code);
        }}
        fontSize={fontSize}
        marginTop={"20px"}
      >
        Verify
      </GradientButton>
    </Flex>
  );
}

function Forgot(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (localStorage.getItem("email") !== null) {
    navigate(-1);
  }

  const fontSize = useBreakpointValue({ base: "16px", md: "18px" });
  const inputHeight = useBreakpointValue({ base: "42px", md: "50px" });

  const handleForgot = async (email) => {
    if (validator.isEmail(email)) {
      setIsLoading(true);
      setError("");
      try {
        const result = await forgot(email);
        if (result.status === 200) {
          setError("");
          localStorage.setItem("email", email);
          navigate("/sign/verify");
        }
        setIsLoading(false);
      } catch (error) {
        if (error.response.status === 404) {
          setError("User does not exist!");
        } else if (error.response.status === 406) {
          setError("Not acceptable inputs!");
        } else if (error.response.status === 500) {
          setError("Server error!");
        } else {
          setError("Network error!");
        }
        setIsLoading(false);
        console.error(error);
      }
    } else {
      setError("Fill the fields as required!");
    }
  };

  return (
    <Flex flexDirection={"column"} w={"full"}>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={email.length > 0 && !validator.isEmail(email)}>
        <FormLabel variant={"primary"} fontSize={fontSize}>
          Email
        </FormLabel>
        <Input
          variant={"primary"}
          height={inputHeight}
          placeholder="example@email.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <FormErrorMessage>Not a valid email.</FormErrorMessage>
      </FormControl>
      <GradientButton
        isLoading={isLoading}
        onClick={() => {
          handleForgot(email);
        }}
        height={inputHeight}
        marginTop={"20px"}
      >
        Send the code
      </GradientButton>
    </Flex>
  );
}

const BackgroundItems = () => {
  return (
    <Container pos={"relative"} w={"container.xl"} display={"flex"}>
      <Box
        position={"absolute"}
        top={useBreakpointValue({ base: "-20vh", md: "-50vh" })}
        left={useBreakpointValue({ base: "15vw", md: "-10vw" })}
        h={useBreakpointValue({ base: "500px", md: "170vh" })}
        w={useBreakpointValue({ base: "500px", md: "170vh" })}
        bgGradient={"radial-gradient(#6A68FF, 5%, transparent, transparent)"}
        opacity={0.3}
        zIndex={-4}
      />
      <Box
        position={"absolute"}
        top={useBreakpointValue({ base: "0vh", md: "-5vh" })}
        right={useBreakpointValue({ base: "20vw", md: "10vw" })}
        h={useBreakpointValue({ base: "600px", md: "100vh" })}
        w={useBreakpointValue({ base: "600px", md: "100vh" })}
        bgGradient={"radial-gradient(#EAFF68, 5%, transparent, transparent)"}
        opacity={0.3}
        zIndex={-4}
      />
      <img
        src={Axe}
        alt={"axe"}
        style={{
          position: "absolute",
          height: useBreakpointValue({ base: "150px", md: "250px" }),
          transform: "scaleX(-1)",
          left: useBreakpointValue({ base: "-80px", md: "-200px" }),
        }}
      />
      <img
        src={Eth}
        alt={"eth"}
        style={{
          position: "absolute",
          height: useBreakpointValue({ base: "100px", md: "150px" }),
          transform: "scaleX(-1)",
          bottom: useBreakpointValue({ base: "-400px", md: "-500px" }),
          left: useBreakpointValue({ base: "-30px", md: "-100px" }),
          zIndex: useBreakpointValue({ base: -1, md: 10 }),
        }}
      />
      <img
        src={Money}
        alt={"money"}
        style={{
          position: "absolute",
          height: useBreakpointValue({ base: "150px", md: "200px" }),
          left: useBreakpointValue({ base: "350px", md: "500px" }),
          top: useBreakpointValue({ base: "80px", md: "100px" }),
        }}
      />
      >
    </Container>
  );
};
