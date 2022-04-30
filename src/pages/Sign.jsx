import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";
import Eye from "../assets/vectors/Eye";
import Logo from "../assets/vectors/Logo";
import Navbar from "../components/Navbar";
import { colors } from "../theme";
import { forgot, signIn, signUp, verify } from "../utils/network";

const passwordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

export default function Sign() {
  const existingEmail = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (existingEmail !== null && token !== null) {
    navigate("/#home", { replace: true });
  }

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
      header = "Welcome!";
      sectionName = "Sign up";
      form = <SignUp />;
      break;
    }
  }

  return (
    <>
      <Flex
        justifyContent={"center"}
        w={"100vw"}
        h={useBreakpointValue({ base: "60px", md: "110px" })}
        bg={"background.900"}
      >
        <Logo
          onClick={() => {
            navigate("/", { replace: true });
          }}
        />
      </Flex>
      <VStack
        display={"flex"}
        w={"100vw"}
        h={"100vh"}
        marginTop={useBreakpointValue({ base: "-60px", md: "-110px" })}
        bg={"background.900"}
        px={useBreakpointValue({ base: 7, md: 20 })}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          fontSize={useBreakpointValue({
            base: "36px",
            md: "45px",
          })}
          m={10}
          textAlign={"center"}
          color={"white"}
        >
          {header}
        </Heading>
        <Container
          minW={useBreakpointValue({ base: "100px", md: "300px" })}
          py={"30px"}
          px={useBreakpointValue({ base: "10px", md: "60px" })}
          background={`linear-gradient(${colors.background[50]}, ${colors.background[50]}) padding-box, linear-gradient(100deg, #404040, transparent) border-box`}
          style={{
            border: "3px solid transparent",
          }}
          opacity={0}
          transitionDuration={"500ms"}
          borderRadius={useBreakpointValue({ base: "15px", md: "12px" })}
          animation={"SlideFadeIn 1s forwards"}
        >
          <VStack spacing={useBreakpointValue({ base: 1, md: 5 })}>
            <Heading
              fontFamily={"Manrope"}
              fontWeight={500}
              fontSize={"30px"}
              color={"white"}
            >
              {sectionName}
            </Heading>
            {form}
          </VStack>
        </Container>
      </VStack>
    </>
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

  const togglePassword = () => {
    setShow(!show);
  };

  const handleSignUp = (email, username, password) => {
    if (
      validator.isEmail(email) &&
      username.length >= 4 &&
      validator.isStrongPassword(password, passwordOptions)
    ) {
      setIsLoading(true);
      setError("");
      signUp(email, username, password)
        .then((result) => {
          if (result.status === 200 && result.data !== "exists") {
            setError("");
            localStorage.setItem("email", email);
            navigate("/sign/verify");
          } else if (result.data === "exists") {
            setError("User already exists!");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 406) {
            setError("Not acceptable inputs!");
          } else if (err.response.status === 500) {
            setError("Server error!");
          } else {
            setError("Network error!");
          }
          setIsLoading(false);
          console.error(err);
        });
    } else {
      setError("Fill the fields as required!");
    }
  };

  return (
    <>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={email.length > 0 && !validator.isEmail(email)}>
        <FormLabel variant={"primary"}>Email</FormLabel>
        <Input
          variant={"primary"}
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
        <FormLabel variant={"primary"}>Username</FormLabel>
        <Input
          variant={"primary"}
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
        <FormLabel variant={"primary"}>Password</FormLabel>
        <InputGroup>
          <Input
            variant={"primary"}
            placeholder="Password"
            type={show ? "text" : "password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Eye onClick={togglePassword} eyeClosed={!show} />
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          Password at least must include 1 symbol, 1 uppercase letter, 1
          numeral, 1 lowercase letter and must be longer that 8 characters.
        </FormErrorMessage>
      </FormControl>
      <a
        fontSize={"sm"}
        textAlign={"left"}
        w={"full"}
        href={"/sign/in"}
        cursor={"pointer"}
      >
        Already have an account? then Sign in!
      </a>
      <Button
        bg={"accent.200"}
        _focus={{ boxShadow: "none" }}
        _hover={{
          bg: "accent.900",
        }}
        color={"white"}
        isLoading={isLoading}
        onClick={() => handleSignUp(email, username, password)}
      >
        Sign up
      </Button>
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

  const togglePassword = () => {
    setShow(!show);
  };

  const handleSignIn = (email, password) => {
    if (
      validator.isEmail(email) &&
      validator.isStrongPassword(password, passwordOptions)
    ) {
      setIsLoading(true);
      setError("");
      signIn(email, password)
        .then((result) => {
          if (result.status === 200 && result.data !== "non-verified") {
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
        })
        .catch((err) => {
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
          setIsLoading(false);
          console.error(err);
        });
    } else {
      setError("Fill the fields as required!");
    }
  };

  return (
    <>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={email.length > 0 && !validator.isEmail(email)}>
        <FormLabel variant={"primary"}>Email</FormLabel>
        <Input
          variant={"primary"}
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
        <FormLabel variant={"primary"}>Password</FormLabel>
        <InputGroup>
          <Input
            variant={"primary"}
            placeholder="Password"
            type={show ? "text" : "password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={togglePassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>Not a valid password</FormErrorMessage>

        <a
          fontSize={"sm"}
          textAlign={"left"}
          w={"full"}
          href={"/sign/forgot"}
          cursor={"pointer"}
        >
          Forgot password
        </a>
      </FormControl>
      <a
        fontSize={"sm"}
        textAlign={"left"}
        w={"full"}
        href={"/sign/up"}
        cursor={"pointer"}
      >
        Don't have an account? then Sign Up
      </a>
      <Button
        bg={"accent.200"}
        _focus={{ boxShadow: "none" }}
        _hover={{
          bg: "accent.900",
        }}
        color={"white"}
        isLoading={isLoading}
        onClick={() => {
          handleSignIn(email, password);
        }}
      >
        Sign in
      </Button>
    </>
  );
}

function Verify(props) {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (email === null || token !== null) {
      navigate("/#home", { replace: true });
    }
  }, []);

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (code) => {
    if (code.length === 4) {
      setIsLoading(true);
      setError("");
      verify(email, code)
        .then((result) => {
          if (result.data !== undefined && result.data !== null) {
            setError("");
            localStorage.setItem("token", result.data);
            navigate(-1);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            setError("Invalid code! We sent a new code to your email!");
          } else if (err.response.status === 404) {
            setError("Account has not been registered!");
            navigate(-1);
            localStorage.setItem("email", null);
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
        });
    } else {
      setError("Please, write the code!");
    }
  };

  return (
    <>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={code.length > 0 && code.length < 4}>
        <FormLabel variant={"primary"}>Verification code</FormLabel>
        <Input
          variant={"primary"}
          placeholder="1234"
          onChange={(event) => {
            setCode(event.target.value);
          }}
        />
        <FormErrorMessage>Code must be 4 digits</FormErrorMessage>
      </FormControl>

      <Button
        bg={"accent.200"}
        _focus={{ boxShadow: "none" }}
        _hover={{
          bg: "accent.900",
        }}
        color={"white"}
        isLoading={isLoading}
        onClick={() => {
          handleVerify(code);
        }}
      >
        Verify
      </Button>
    </>
  );
}

function Forgot(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = () => {
    setShow(!show);
  };

  const handleForgot = (email) => {
    if (validator.isEmail(email)) {
      setIsLoading(true);
      setError("");
      forgot(email)
        .then((result) => {
          if (result.status === 200) {
            setError("");
            localStorage.setItem("email", email);
            navigate("/sign/verify");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("User does not exist!");
          } else if (err.response.status === 406) {
            setError("Not acceptable inputs!");
          } else if (err.response.status === 500) {
            setError("Server error!");
          } else {
            setError("Network error!");
          }
          setIsLoading(false);
          console.error(err);
        });
    } else {
      setError("Fill the fields as required!");
    }
  };

  return (
    <>
      {error.length > 0 && <Text color={"red"}>{error}</Text>}
      <FormControl isInvalid={email.length > 0 && !validator.isEmail(email)}>
        <FormLabel variant={"primary"}>Email</FormLabel>
        <Input
          variant={"primary"}
          placeholder="example@email.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <FormErrorMessage>Not a valid email.</FormErrorMessage>
      </FormControl>
      <Button
        bg={"accent.200"}
        _focus={{ boxShadow: "none" }}
        _hover={{
          bg: "accent.900",
        }}
        color={"white"}
        onClick={() => {
          handleForgot(email);
        }}
      >
        Send the code
      </Button>
    </>
  );
}
