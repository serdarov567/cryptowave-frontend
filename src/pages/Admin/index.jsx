import React, { useState, useEffect, useMemo } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBreakpointValue,
  VStack,
  Heading,
  Select,
  HStack,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import Eye from "src/assets/vectors/Eye";
import GradientButton from "src/components/GradientButton";
import {
  checkAdmin,
  getAllUsers,
  signAdmin,
  updatePlan,
} from "src/utils/network";
import { useNavigate } from "react-router-dom";
import PlanItem from "src/pages/Admin/PlanItem";

const styles = {
  tab: {
    marginInline: "5px",
    fontSize: "20px",
    fontFamily: "Manrope-Bold",
    color: "#FFF",
    bgColor: "background.200",
    _focus: {},
    _selected: {
      bgColor: "background.100",
      borderBottomColor: "blue.900",
      borderBottomWidth: "2px",
    },
  },
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem("admin-token");
    const checkAdminToken = async () => {
      try {
        const result = await checkAdmin(adminToken);
        if (result.status === 200) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdminToken();
  }, []);

  return (
    !loading &&
    (isAdmin ? (
      <Tabs isFitted variant="enclosed">
        <TabList borderWidth={"0px"} mb="1em">
          <Tab {...styles.tab}>Users</Tab>
          <Tab {...styles.tab}>Plans</Tab>
          <Tab {...styles.tab}>Support</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Users />
          </TabPanel>
          <TabPanel>
            <Plans />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    ) : (
      <SignIn />
    ))
  );
};

const SignIn = (props) => {
  const [username, setUsername] = useState("");
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
    setIsLoading(true);
    setError("");
    try {
      const result = await signAdmin(email, password);

      if (result.status === 200) {
        setError("");
        localStorage.setItem("admin-token", result.data);
        window.location.reload();
      }
      setIsLoading(false);
    } catch (err) {
      if (err.response !== undefined) {
        if (err.response.status === 403) {
          setError("Username or password is wrong!");
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
  };

  return (
    <Flex w={"full"} h={"100vh"} justifyContent={"center"}>
      <VStack
        w={"400px"}
        alignSelf={"center"}
        bgColor={"background.200"}
        p={"30px"}
        borderRadius={"10px"}
      >
        <Heading>Sign in</Heading>
        {error.length > 0 && <Text color={"red"}>{error}</Text>}
        <FormControl>
          <FormLabel variant={"primary"} fontSize={fontSize}>
            Username
          </FormLabel>
          <Input
            variant={"primary"}
            height={inputHeight}
            placeholder="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <FormErrorMessage>Not a valid email.</FormErrorMessage>
        </FormControl>
        <FormControl>
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
        </FormControl>
        <Flex
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={flexDirection}
        >
          <GradientButton
            alignSelf={"center"}
            isLoading={isLoading}
            onClick={() => {
              handleSignIn(username, password);
            }}
            fontSize={fontSize}
            height={inputHeight}
            marginTop={useBreakpointValue({ base: "10px", md: "10px" })}
          >
            Sign in
          </GradientButton>
        </Flex>
      </VStack>
    </Flex>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    const fetchData = async () => {
      const result = await getAllUsers(token);
      if (result.data !== null && result.data !== undefined) {
        setUsers(result.data);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setUpdate(!update);
    }, 5 * MINUTE);

    return () => {
      clearInterval(interval);
    };
  }, [update]);

  return (
    <VStack w={"full"} h={"full"}>
      {users.map((user) => {
        return <Text>{user.email}</Text>;
      })}
    </VStack>
  );
};

const Plans = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("Pending...");

  useEffect(() => {
    const token = localStorage.getItem("admin-token");

    const fetchData = async () => {
      const result = await getAllUsers(token);
      if (result.data !== null && result.data !== undefined) {
        setUsers(result.data);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setUpdate(!update);
    }, MINUTE);

    return () => {
      clearInterval(interval);
    };
  }, [update, selectedStatus]);

  const textFontSize = useBreakpointValue({ base: "12px", md: "14px" });

  const renderPlans = useMemo(() => {
    const filtered = users.map((user) => {
      if (user.plans !== undefined)
        return user.plans.map((plan) => {
          if (plan.status === selectedStatus) {
            return (
              <PlanItem
                uniqueKey={plan._id}
                title={plan.title}
                number={plan.number}
                dateOfPurchase={plan.dateOfPurchase}
                dateOfExpiration={plan.dateOfExpiration}
                deposit={plan.deposit}
                percentage={plan.percentage}
                status={plan.status}
              >
                <VStack alignItems={"start"}>
                  <Text fontSize={textFontSize}>From: {user.email}</Text>
                  <Text fontSize={textFontSize}>
                    {plan.wallet.type}:
                  </Text>
                  <Text fontSize={textFontSize}>
                    {plan.wallet.address}
                  </Text>
                </VStack>

                {plan.status !== "Completed" && plan.status !== "Canceled" ? (
                  <Select
                    maxW={"150px"}
                    value={plan.status}
                    onChange={async (event) => {
                      try {
                        const newPlan = {
                          ...plan,
                          status: event.target.value,
                        };
                        const result = await updatePlan(
                          user.email,
                          localStorage.getItem("admin-token"),
                          newPlan
                        );
                        if (result.status === 200) {
                          alert("Updated");
                          setUpdate(!update);
                        }
                      } catch (error) {
                        alert("Network error!");
                      }
                    }}
                  >
                    <option value={"Canceled"}>Canceled</option>
                    <option value={"Pending..."}>Pending...</option>
                    <option value={"Active"}>Active</option>
                  </Select>
                ) : (
                  <Heading>
                    {plan.status !== "Canceled"
                      ? plan.reward + "$"
                      : "Canceled"}
                  </Heading>
                )}
              </PlanItem>
            );
          }
        });
    });
    return filtered;
  }, [users]);

  return (
    <VStack position={"relative"} w={"full"} h={"full"} px={"30px"}>
      <HStack spacing={8} textAlign={"start"} w={"full"}>
        <Heading marginBlock={"20px"}>Plans</Heading>

        <Text>Filter by status:</Text>
        <RadioGroup
          value={selectedStatus}
          onChange={(value) => {
            setSelectedStatus(value);
          }}
        >
          <Stack
            color={"#FFF"}
            fontFamily={"Manrope"}
            direction="row"
            spacing={4}
          >
            <Radio value="Canceled">Canceled</Radio>
            <Radio value="Pending...">Pending</Radio>
            <Radio value="Active">Active</Radio>
            <Radio value="Completed">Completed</Radio>
          </Stack>
        </RadioGroup>
      </HStack>
      {renderPlans}
    </VStack>
  );
};

export default Admin;
