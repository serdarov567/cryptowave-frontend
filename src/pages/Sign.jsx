import {
  Box,
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
import Logo from "src/assets/vectors/Logo";
import GradientButton from "src/components/GradientButton";
import SecuredBadge from "src/components/SecuredBadge";
import TextButton from "src/components/TextButton";
import { colors } from "src/theme";
import { forgot, signIn, signUp, verify } from "src/utils/network";
import { useIsSignedIn } from "src/utils/user";
import Axe from "src/assets/images/axe.png";
import Eth from "src/assets/images/eth.png";
import Money from "src/assets/images/money.png";

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

  const { type } = useParams();

  let header, sectionName, form;

  switch (type) {
    case "in": {
      header = "Welcome back!";
      sectionName = "Sign in";
      form = <SignIn />;
      break;
    }
    case "forgot": {
      header = "Password recovery";
      sectionName = "We will send a verification code to your email";
      form = <Forgot />;
      break;
    }
    case "verify": {
      header = "Verification";
      sectionName = "Enter the verification code";
      form = <Verify />;
      break;
    }
    default: {
      header = "Welcome to CryptoWave";
      sectionName = "Sign up";
      form = <SignUp />;
      break;
    }
  }

  const marginBetweenElements = useBreakpointValue({ base: "10px", md: "0px" });

  return (
    <Flex
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
      <Logo
        marginTop={marginBetweenElements}
        marginBottom={marginBetweenElements}
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <Flex
        position={"relative"}
        flexDir={"column"}
        maxW={useBreakpointValue({ base: 0, sm: 0, md: "container.xl" })}
        minW={useBreakpointValue({ base: "100%", sm: "70%", md: 0 })}
      >
        <SecuredBadge
          alignSelf={"center"}
          marginTop={useBreakpointValue({ base: "10px", md: "20px" })}
          marginBottom={useBreakpointValue({ base: "10px", md: "10px" })}
        />

        <Heading
          fontSize={useBreakpointValue({
            base: "32px",
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
      </Flex>
    </Flex>
  );
}

function SignUp(props) {
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
          Password
        </FormLabel>
        <InputGroup>
          <Input
            variant={"primary"}
            height={inputHeight}
            placeholder="Password"
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
            Already have an account? then{" "}
            <TextButton
              accentColor={"#6B68FF"}
              href={"/sign/in"}
              fontSize={useBreakpointValue({ base: "12px", md: "14px" })}
            >
              Sign in!
            </TextButton>
          </Text>
          <Text fontSize={useBreakpointValue({ base: "12px", md: "14px" })}>
            By clicking the sign up button you agree with our{" "}
            <TextButton
              href={"/termsandconditions"}
              fontSize={useBreakpointValue({ base: "12px", md: "14px" })}
            >
              Terms and conditions, Privacy policy
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
          Sign up
        </GradientButton>
      </Flex>
    </>
  );
}

function SignIn(props) {
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
          Password
        </FormLabel>
        <InputGroup>
          <Input
            variant={"primary"}
            height={inputHeight}
            placeholder="Password"
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
          Forgot password
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
            Don't have an account? then{" "}
            <TextButton
              href={"/sign/up"}
              accentColor={"#6B68FF"}
              fontSize={useBreakpointValue({ base: "12px", md: "16px" })}
            >
              Sign up!
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
          Sign in
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
    <Flex display={"flex"}>
      <Box
        position={"absolute"}
        top={"10vh"}
        left={"-20vw"}
        h={useBreakpointValue({ base: "300px", md: "170vh" })}
        w={useBreakpointValue({ base: "250px", md: "170vh" })}
        bgGradient={"radial-gradient(#6A68FF, 5%, transparent, transparent)"}
        opacity={0.3}
        zIndex={-4}
      />
      <Box
        position={"absolute"}
        top={"0px"}
        right={"0px"}
        h={useBreakpointValue({ base: "300px", md: "100vh" })}
        w={useBreakpointValue({ base: "250px", md: "50vw" })}
        bgGradient={"radial-gradient(#EAFF68, 5%, transparent, transparent)"}
        opacity={0.3}
        zIndex={-4}
      />
      <img
        src={Axe}
        alt={"axe"}
        style={{
          position: "absolute",
          height: "250px",
          transform: "scaleX(-1)",
          left: "-200px",
        }}
      />
      <img
        src={Eth}
        alt={"eth"}
        style={{
          position: "absolute",
          height: "200px",
          transform: "scaleX(-1)",
          bottom: "-100px",
          left: "-100px",
        }}
      />
      <img
        src={Money}
        alt={"money"}
        style={{
          position: "absolute",
          height: "300px",
          bottom: "160px",
          right: "-200px",
        }}
      />
      >
    </Flex>
  );
};
