import React, { useMemo, useLayoutEffect, useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Navbar from "src/components/Navbar";
import useWithdraw from "./useWithdraw";
import Tilde from "src/assets/vectors/Tilde";
import TextButton from "src/components/TextButton";
import { useIsSignedIn } from "src/utils/user";
import useUserDashboard from "src/pages/Dashboard/useUserDashboard";
import { useNavigate } from "react-router-dom";
import useWallets from "../Wallets/useWallets";
import GradientButton from "src/components/GradientButton";

const Withdraw = () => {
  const [isSignedIn, checking] = useIsSignedIn();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!checking) {
      if (!isSignedIn) navigate("/#home", { replace: true });
    }
  }, [checking]);

  const { loading, withdraws } = useWithdraw();
  const { wallets, walletsLoading } = useWallets();
  const { balance } = useUserDashboard();

  const initialWithdraw = {
    dateOfRequire: "",
    dateOfTransaction: "",
    email: localStorage.getItem("email"),
    amount: 0,
    wallet: wallets[0],
  };

  const [newWithdraw, setNewWithdraw] = useState(initialWithdraw);

  useEffect(() => {
    if (wallets.length > 0)
      setNewWithdraw({ ...newWithdraw, wallet: wallets[0] });
  }, [wallets]);

  const fontSize = useBreakpointValue({ base: "10px", sm: "12px", md: "18px" });
  const buttonFontSize = useBreakpointValue({
    base: "10px",
    sm: "10px",
    md: "16px",
  });

  const renderWithdraws = useMemo(() => {
    return withdraws.map((withdraw) => {
      return (
        <Box w={"full"} h={"fit-content"} py={"20px"}>
          <Box
            pos={"absolute"}
            w={"full"}
            h={"full"}
            bg={"linear-gradient(110deg, #1D1D1D, 40%, #082542, #1D1D1D)"}
            borderColor={"#5E5E5E"}
            borderWidth={"1px"}
            borderRadius={"15px"}
            zIndex={-1}
          />
          <VStack key={withdraw._id} alignItems={"start"} w={"full"}>
            <Flex
              w={"100%"}
              h={"40px"}
              justifyContent={"space-between"}
              alignItems={"center"}
              borderTopLeftRadius={"15px"}
              borderTopRightRadius={"15px"}
              bgColor={"#FFF"}
              px={"30px"}
            >
              <Tilde fill={"#4F60FF"} fill-opacity={"1.0"} />
              <Text
                fontFamily={"Manrope-Bold"}
                color={"#3C3C3C"}
                fontSize={fontSize}
              >
                {withdraw.dateOfTransaction
                  ? withdraw.dateOfTransaction
                  : "Pending..."}
              </Text>
            </Flex>

            <Flex
              w={"100%"}
              h={"60px"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={"30px"}
            >
              <Text fontSize={fontSize}>Date of require:</Text>
              <Text fontSize={fontSize}>{withdraw.dateOfRequire}</Text>
            </Flex>

            <Flex
              w={"100%"}
              h={"40px"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              px={"30px"}
            >
              <Text marginRight={"30px"} fontSize={fontSize}>
                Amount:
              </Text>
              <Text fontSize={fontSize}>{withdraw.amount}$</Text>
            </Flex>

            <Flex
              w={"100%"}
              h={"40px"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              px={"30px"}
              paddingBottom={"20px"}
            >
              <TextButton
                color={"white"}
                fontSize={buttonFontSize}
                onClick={() => {}}
              >
                Edit
              </TextButton>
            </Flex>
          </VStack>
        </Box>
      );
    });
  }, [withdraws]);

  return (
    <Box>
      <Navbar></Navbar>
      <Container maxWidth={"container.xl"} paddingTop={"120px"}>
        <Flex flexDir={"column"}>
          <HStack pos={"relative"} spacing={6} align={"start"}>
            <FormControl>
              <FormLabel>Your wallets</FormLabel>
              {!walletsLoading && (
                <Select
                  color={"white"}
                  value={
                    wallets.length > 0 && newWithdraw.wallet !== undefined
                      ? wallets.findIndex(
                          (wallet) => wallet.title === newWithdraw.wallet.title
                        )
                      : 0
                  }
                  onChange={(event) => {
                    setNewWithdraw({
                      ...newWithdraw,
                      wallet: wallets[event.target.value],
                    });
                  }}
                >
                  {wallets.length > 0 ? (
                    wallets.map((wallet, index) => (
                      <option value={index}>
                        {wallet.title}: {wallet.type}
                      </option>
                    ))
                  ) : (
                    <option value={-1}>Please add a wallet</option>
                  )}
                </Select>
              )}
            </FormControl>
            <FormControl isInvalid={newWithdraw.amount < 50}>
              <FormLabel>Amount</FormLabel>
              <Input
                type={"number"}
                variant={"primary"}
                height={"50px"}
                placeholder="min. 50$"
                onChange={(event) => {
                  setNewWithdraw({
                    ...newWithdraw,
                    amount: event.target.value,
                  });
                }}
              />
              <FormErrorMessage>
                Amount must be greater than 50$
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <GradientButton
            marginTop={"20px"}
            minW={"100px"}
            alignSelf={"end"}
            disabled={
              newWithdraw.amount < 50 || balance - newWithdraw.amount < 0
            }
            onClick={async () => {

            }}
          >
            Withdraw
          </GradientButton>

          <VStack w={"full"} paddingBottom={"100px"} spacing={5}>
            <Heading marginBlock={"20px"}>Transaction history</Heading>
            <Text>No transactions.</Text>
            {renderWithdraws}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Withdraw;
