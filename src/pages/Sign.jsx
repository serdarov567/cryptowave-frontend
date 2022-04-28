import {
  Box,
  Button,
  Container,
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
import { signUp, verify } from "../utils/network";

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
      header = "Welcome to CryptoWave!";
      sectionName = "Sign up";
      form = <SignUp />;
      break;
    }
  }

  return (
    <Box
      display={"flex"}
      flexDirection={useBreakpointValue({ base: "column", lg: "row" })}
      w={"100vw"}
      h={"100vh"}
      bg={"background.200"}
      px={useBreakpointValue({ base: 7, md: 20 })}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Heading
        m={10}
        marginTop={useBreakpointValue({ base: "-200px", md: "-100px", lg: 0 })}
        textAlign={"center"}
        fontSize={useBreakpointValue({ base: "4xl", md: "7xl" })}
        color={"white"}
      >
        {header}
      </Heading>
      <Container
        marginRight={useBreakpointValue({ base: "50px", md: "20px" })}
        marginLeft={useBreakpointValue({ base: "50px", md: "20px" })}
        py={5}
        px={useBreakpointValue({ base: 5, md: 10 })}
        bg={"white"}
        opacity={0}
        transitionDuration={"500ms"}
        borderRadius={useBreakpointValue({ base: 20, md: 10 })}
        animation={"SlideFadeIn 1s forwards"}
      >
        <VStack spacing={useBreakpointValue({ base: 1, md: 5 })}>
          <Heading fontSize={"3xl"}>{sectionName}</Heading>
          {form}
        </VStack>
      </Container>
    </Box>
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
        <FormLabel>Email</FormLabel>
        <Input
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
        <FormLabel>Username</FormLabel>
        <Input
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
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
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

  const togglePassword = () => {
    setShow(!show);
  };

  return (
    <>
      <FormControl isInvalid={email.length > 0 && !validator.isEmail(email)}>
        <FormLabel>Email</FormLabel>
        <Input
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
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
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
        onClick={() => {
          alert("shio");
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
            setError("Invalid code!");
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
        <FormLabel>Verification code</FormLabel>
        <Input
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
  return (
    <>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="example@email.com" />
      </FormControl>

      <Button
        bg={"accent.200"}
        _focus={{ boxShadow: "none" }}
        _hover={{
          bg: "accent.900",
        }}
        color={"white"}
        onClick={() => {
          alert("shio");
        }}
      >
        {"Send the code"}
      </Button>
    </>
  );
}
