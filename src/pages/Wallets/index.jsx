import React, { useLayoutEffect, useMemo, useState } from "react";
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
import { useIsSignedIn } from "src/utils/user";
import Navbar from "src/components/Navbar";
import useWallets from "src/pages/Wallets/useWallets";
import GradientButton from "src/components/GradientButton";
import PopUp from "src/components/PopUp";
import LoadingIndicator from "src/components/LoadingIndicator";
import OutlinedButton from "src/components/OutlinedButton";
import { addWallet, deleteWallets, updateWallet } from "src/utils/network";
import Tilde from "src/assets/vectors/Tilde";
import TextButton from "src/components/TextButton";
import useLanguage from "src/languages/useLanguage";

const Wallets = () => {
  const [isSignedIn, loading] = useIsSignedIn();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets, walletsLoading, refresh } = useWallets();
  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = useLanguage();

  const [error, setError] = useState("");
  const [popUpLoading, setPopUpLoading] = useState(false);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const newWallet = {
    _id: -1,
    title: "",
    type: "BTC",
    address: "",
  };

  const [currentWallet, setCurrentWallet] = useState(newWallet);

  useLayoutEffect(() => {
    if (!loading) {
      if (!isSignedIn) navigate("/#home", { replace: true });
    }
  }, [loading]);

  const fontSize = useBreakpointValue({ base: "12px", sm: "12px", md: "18px" });
  const buttonFontSize = useBreakpointValue({
    base: "10px",
    sm: "10px",
    md: "16px",
  });
  const columns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 3 });

  const renderWallets = useMemo(() => {
    return wallets.map((walletDetail) => (
      <GridItem pos={"relative"} colSpan={1}>
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
        <VStack key={walletDetail._id} alignItems={"start"} w={"full"}>
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
              {walletDetail.title}
            </Text>
          </Flex>

          <Flex
            w={"100%"}
            h={"60px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={"30px"}
          >
            <Text fontSize={fontSize}>{langKeys["typeWallet"]}:</Text>
            <Text fontSize={fontSize}>{walletDetail.type}</Text>
          </Flex>

          <Flex
            w={"100%"}
            h={"40px"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            px={"30px"}
          >
            <Text marginRight={"30px"} fontSize={fontSize}>
              {langKeys["addressWallet"]}:
            </Text>
            <Text fontSize={fontSize}>{walletDetail.address}</Text>
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
              {langKeys["edit"]}
            </TextButton>
          </Flex>
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
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
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
    <Flex
      w={"100%"}
      minH={"100vh"}
      paddingBottom={"50px"}
      flexDir={"column"}
      alignItems={"center"}
    >
      <Navbar
        CurrentFlag={CurrentFlag}
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        langKeys={langKeys}
      >
        <GradientButton
          onClick={() => {
            setCurrentWallet(newWallet);
            onOpen();
          }}
        >
          {langKeys["addWallet"]}
        </GradientButton>
      </Navbar>

      <Container
        display={"flex"}
        h={"full"}
        maxW={"container.xl"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={useBreakpointValue({ base: "90px", md: "140px" })}
      >
        <Heading marginBottom={"50px"}>{langKeys["myWallets"]}</Heading>

        {walletsLoading ? (
          <LoadingIndicator title={langKeys["loading"]} />
        ) : wallets.length > 0 ? (
          <SimpleGrid
            columns={columns}
            columnGap={4}
            rowGap={8}
            justifyContent={"center"}
          >
            {renderWallets}
          </SimpleGrid>
        ) : (
          <Text>{langKeys["noWallets"]}</Text>
        )}
      </Container>

      <PopUp
        isOpen={isOpen}
        onClose={onClose}
        title={langKeys["addWallet"]}
        footerComponents={
          <HStack>
            <GradientButton onClick={saveButtonHandler} loading={popUpLoading}>
              {currentWallet._id !== -1 ? langKeys["save"] : langKeys["add"]}
            </GradientButton>
            {currentWallet._id !== -1 && (
              <OutlinedButton
                color={"red.500"}
                onClick={deleteButtonHandler}
                loading={popUpLoading}
              >
                {langKeys["delete"]}
              </OutlinedButton>
            )}
          </HStack>
        }
      >
        <VStack spacing={4}>
          {error.length > 0 && <Text color={"red.500"}>{error}</Text>}
          <FormControl>
            <FormLabel>{langKeys["supported"]}</FormLabel>
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
              <option value={"BNB"}>BNB</option>
              <option value={"DASH"}>DASH</option>
              <option value={"LTC"}>LTC</option>
              <option value={"TRX"}>TRX</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>{langKeys["titleWallet"]}</FormLabel>
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
            <FormLabel>{langKeys["addressWallet"]}</FormLabel>
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
