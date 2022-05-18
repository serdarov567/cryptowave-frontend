import React from "react";
import { Container, Flex } from "@chakra-ui/react";

const Cryptos = [
  {name: "BTC", id: ""},
  {name: "ETH", id: ""},
  {name: "LTC", id: "binance-peg-litecoin"},
  {name: "XRP", id: ""},
  {name: "ADA", id: "binance-peg-cardano"},
  {name: "DOT", id: ""},
  {name: "SUSHI", id: ""},
  {name: "ETC", id: ""},
  {name: "TRX", id: ""},
  {name: "BNB", id: ""},
  {name: "BCH", id: "binance-peg-bitcoin-cash"},
  {name: "AVAX", id: "binance-peg-avalanche"},
  {name: "DASH", id: ""},
  {name: "CRO", id: ""},
  {name: "DOGE", id: "binance-peg-dogecoin"},
]

const Coins = () => {
  
  return (
    <Container>
      <Flex flexDir={"row"} w={"full"} h={"50px"}>
        {}
      </Flex>
    </Container>
  );
};


export default Coins;
