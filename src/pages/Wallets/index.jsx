import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getCredits, useIsSignedIn } from "src/utils/user";
import Navbar from "src/components/Navbar";
import useWallets from "src/pages/Wallets/useWallets";
import GradientButton from "src/components/GradientButton";
import PopUp from "src/components/PopUp";
import LoadingIndicator from "src/components/LoadingIndicator";
import OutlinedButton from "src/components/OutlinedButton";
import { addWallet, deleteWallets, updateWallet } from "src/utils/network";

const Wallets = () => {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets, walletsLoading, refresh } = useWallets();

  const [error, setError] = useState("");
  const [popUpLoading, setPopUpLoading] = useState(false);

  const newWallet = {
    _id: -1,
    title: "",
    type: "Binance",
    address: "",
  };

  const [currentWallet, setCurrentWallet] = useState(newWallet);

  useEffect(() => {
    if (!loading) {
      if (!isSignedIn) navigate("/#home", { replace: true });
    }
  }, [loading]);

  const fontSize = useBreakpointValue({ base: "10px", sm: "12px", md: "18px" });
  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3, xl: 4 });

  const renderWallets = useMemo(() => {
    return wallets.map((walletDetail) => (
      <GridItem pos={"relative"} colSpan={1}>
        <Box
          pos={"absolute"}
          w={"full"}
          h={"full"}
          bg={"none"}
          borderRadius={"10px"}
          zIndex={-1}
          backdropFilter={"blur(2px) invert(20%)"}
        />
        <VStack
          key={walletDetail._id}
          alignItems={"start"}
          paddingY={"20px"}
          paddingLeft={'30px'}
          paddingRight={"60px"}
          w={'340px'}
        >
          <Text fontSize={fontSize}>Title: {walletDetail.title}</Text>
          <Text fontSize={fontSize}>Type: {walletDetail.type}</Text>
          <Text fontSize={fontSize}>Address: {walletDetail.address}</Text>
          <OutlinedButton
            color={"white"}
            alignSelf={'end'}
            marginRight={'200px'}
            fontSize={fontSize}
            onClick={() => {
              setCurrentWallet({
                _id: walletDetail._id,
                title: walletDetail.title,
                type: walletDetail.type,
                address: walletDetail.address,
              });
              onOpen();
            }}
          >
            Edit
          </OutlinedButton>
        </VStack>
      </GridItem>
    ));
  }, [wallets]);

  const saveButtonHandler = async () => {
    setPopUpLoading(true);
    setError("");
    if (
      currentWallet.address.length > 0 &&
      currentWallet.title.length > 0 &&
      currentWallet.type.length > 0
    ) {
      try {
        const { email, token } = getCredits();
        let result;
        if (currentWallet._id === -1) {
          result = await addWallet(email, token, currentWallet);
        } else {
          result = await updateWallet(email, token, currentWallet);
        }
        if (result.data !== "exists") {
          refresh();
          onClose();
        } else {
          setError("This title already exists!");
        }
      } catch (error) {
        if (error.response.status === 403) {
          setError("You don't have permission!");
        } else if (error.response.status === 406) {
          setError("Please, fill the required fields!");
        } else {
          setError("Network error!");
        }
      }
    } else {
      setError("Please, fill the required fields!");
    }
    setPopUpLoading(false);
  };

  const deleteButtonHandler = async () => {
    setPopUpLoading(true);
    setError("");
    if (currentWallet._id.length !== -1) {
      try {
        const { email, token } = getCredits();
        const result = await deleteWallets(email, token, [currentWallet._id]);
        if (result.status === 200) {
          refresh();
          onClose();
        }
      } catch (error) {
        if (error.response.status === 403) {
          setError("You don't have permission!");
        } else if (error.response.status === 406) {
          setError("Please, fill the required fields!");
        } else {
          setError("Network error!");
        }
      }
    } else {
      setError("Please, fill the required fields!");
    }
    setPopUpLoading(false);
  };

  return (
    <Flex w={"100%"} h={"100%"} flexDir={"column"} alignItems={"center"}>
      <Navbar>
        <GradientButton
          onClick={() => {
            setCurrentWallet(newWallet);
            onOpen();
          }}
        >
          Add Wallet
        </GradientButton>
      </Navbar>

      <Container
        display={"flex"}
        h={"full"}
        maxW={"container.xl"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"140px"}
      >
        <Heading marginBottom={"50px"}>My Wallets</Heading>

        {walletsLoading ? (
          <LoadingIndicator title={"Loading wallets..."} />
        ) : wallets.length > 0 ? (
          <SimpleGrid columns={columns} columnGap={"20px"} rowGap={4} justifyContent={'center'}>
            {renderWallets}
          </SimpleGrid>
        ) : (
          <Text>You don't have a wallet</Text>
        )}
      </Container>

      <PopUp
        isOpen={isOpen}
        onClose={onClose}
        title={"Add wallet"}
        footerComponents={
          <HStack>
            <GradientButton onClick={saveButtonHandler} loading={popUpLoading}>
              {currentWallet._id !== -1 ? "Save" : "Add"}
            </GradientButton>
            {currentWallet._id !== -1 && (
              <OutlinedButton
                color={"red.500"}
                onClick={deleteButtonHandler}
                loading={popUpLoading}
              >
                Delete
              </OutlinedButton>
            )}
          </HStack>
        }
      >
        <VStack spacing={4}>
          {error.length > 0 && <Text color={"red.500"}>{error}</Text>}
          <FormControl>
            <FormLabel>Supported wallets</FormLabel>
            <Select
              color={"white"}
              value={currentWallet.type}
              onChange={(event) => {
                setCurrentWallet({
                  ...currentWallet,
                  type: event.target.value,
                });
              }}
            >
              <option value={"BTC"}>BTC</option>
              <option value={"ETH"}>ETH</option>
              <option value={"USDTTRC20"}>USDT TRC20</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              value={currentWallet.title}
              onChange={(event) => {
                setCurrentWallet({
                  ...currentWallet,
                  title: event.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="Address"
              value={currentWallet.address}
              onChange={(event) => {
                setCurrentWallet({
                  ...currentWallet,
                  address: event.target.value,
                });
              }}
            />
          </FormControl>
        </VStack>
      </PopUp>
    </Flex>
  );
};

export default Wallets;
