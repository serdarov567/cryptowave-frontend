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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Navbar from "src/components/Navbar";
import useWithdraw from "./useWithdraw";
import { useIsSignedIn } from "src/utils/user";
import useUserDashboard from "src/pages/Dashboard/useUserDashboard";
import { useNavigate } from "react-router-dom";
import useWallets from "../Wallets/useWallets";
import GradientButton from "src/components/GradientButton";
import LoadingIndicator from "src/components/LoadingIndicator";
import { requestWithdraw } from "src/utils/network";
import useLanguage from "src/languages/useLanguage";
import dateToString from "src/utils/dateToString";

const Withdraw = () => {
  const [isSignedIn, checking] = useIsSignedIn();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!checking) {
      if (!isSignedIn) navigate("/#home", { replace: true });
    }
  }, [checking]);

  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = useLanguage();

  const { loading, withdraws, refresh } = useWithdraw();
  const { wallets, walletsLoading } = useWallets();
  const { balance } = useUserDashboard();
  const [buttonLoading, setButtonLoading] = useState(false);

  const initialWithdraw = {
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

  const toast = useToast();

  const sendWithdrawRequest = async () => {
    let errorMessage = "";
    if (
      newWithdraw.email.length > 0 &&
      newWithdraw.amount >= 50 &&
      newWithdraw.wallet !== undefined
    ) {
      setButtonLoading(true);
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        const result = await requestWithdraw(email, token, newWithdraw);

        if (result.status === 200) {
          toast({
            title: "Requested!",
            status: "success",
            position: "top-left",
            size: "sm",
            duration: 1000,
            isClosable: true,
          });
          refresh();
        }
      } catch (error) {
        if (error.response.status === 403) {
          errorMessage = "You don't have permission!";
        } else if (error.response.status === 406) {
          errorMessage = "Fill the requested fields!";
        } else {
          errorMessage = "Network error!";
        }
      }
    } else {
      errorMessage = "Please, fill the required fields!";
    }
    if (errorMessage.length > 0)
      toast({
        title: errorMessage,
        status: "error",
        position: "top-left",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });
    setButtonLoading(false);
  };

  const renderWithdraws = useMemo(() => {
    return withdraws.map((withdraw) => {
      const requireDate = dateToString(withdraw.dateOfRequire);
      const transDate = dateToString(withdraw.dateOfTransaction);
      return (
        <Tr>
          <Td borderColor={"background.200"}>
            {requireDate.dateStr} {requireDate.hourStr}{" "}
          </Td>
          <Td borderColor={"background.200"}>
            {withdraw.dateOfTransaction
              ? `${transDate.dateStr} ${transDate.hourStr}`
              : "Pending..."}
          </Td>
          <Td borderColor={"background.200"}>{withdraw.amount}$</Td>
          <Td borderColor={"background.200"}>
            {withdraw.wallet.type}: {withdraw.wallet.address}
          </Td>
          <Td borderColor={"background.200"}>{withdraw.status}</Td>
        </Tr>
      );
    });
  }, [withdraws]);

  return (
    <Box>
      <Navbar
        CurrentFlag={CurrentFlag}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      />
      <Container maxWidth={"container.xl"} paddingTop={"120px"}>
        <Flex flexDir={"column"}>
          <HStack pos={"relative"} spacing={6} align={"start"}>
            <FormControl>
              <FormLabel>{langKeys["yourWallets"]}</FormLabel>
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
                    <option value={-1}>{langKeys["pleaseAddWallet"]}</option>
                  )}
                </Select>
              )}
            </FormControl>
            <FormControl
              isInvalid={
                newWithdraw.amount.length > 0 && newWithdraw.amount < 50
              }
            >
              <FormLabel>{langKeys["amount"]}</FormLabel>
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
                {langKeys["amountMustBeGreater"]}
              </FormErrorMessage>
            </FormControl>
          </HStack>

          <GradientButton
            loading={buttonLoading}
            marginTop={"20px"}
            minW={"100px"}
            alignSelf={"end"}
            disabled={
              newWithdraw.amount < 50 || balance - newWithdraw.amount < 0
            }
            onClick={sendWithdrawRequest}
          >
            {langKeys["withdraw"]}
          </GradientButton>

          <VStack w={"full"} paddingBottom={"100px"} spacing={5}>
            <Heading marginBlock={"20px"}>
              {langKeys["transactionHistory"]}
            </Heading>
            {loading ? (
              <LoadingIndicator title={"Loading wallets..."} />
            ) : withdraws.length > 0 ? (
              <TableContainer>
                <Table fontSize={fontSize} color={"#FFF"} variant="simple">
                  <Thead>
                    <Tr>
                      <Th borderColor={"background.200"} fontSize={fontSize}>
                        {langKeys["dateOfRequire"]}
                      </Th>
                      <Th borderColor={"background.200"} fontSize={fontSize}>
                        {langKeys["dateOfTransaction"]}
                      </Th>
                      <Th borderColor={"background.200"} fontSize={fontSize}>
                        {langKeys["amount"]}
                      </Th>
                      <Th borderColor={"background.200"} fontSize={fontSize}>
                        {langKeys["wallet"]}
                      </Th>
                      <Th borderColor={"background.200"} fontSize={fontSize}>
                        {langKeys["status"]}
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>{renderWithdraws}</Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text>{langKeys["noTransactions"]}</Text>
            )}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Withdraw;
