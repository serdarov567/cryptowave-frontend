import React, { useEffect, useState, useMemo, memo } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import btc from "react-crypto-icons/lib/assets/btc.svg";
import eth from "react-crypto-icons/lib/assets/eth.svg";
import ltc from "react-crypto-icons/lib/assets/ltc.svg";
import xrp from "react-crypto-icons/lib/assets/xrp.svg";
import ada from "react-crypto-icons/lib/assets/ada.svg";
import dot from "react-crypto-icons/lib/assets/dot.svg";
import sushi from "react-crypto-icons/lib/assets/sushi.svg";
import etc from "react-crypto-icons/lib/assets/etc.svg";
import trx from "react-crypto-icons/lib/assets/trx.svg";
import bnb from "react-crypto-icons/lib/assets/bnb.svg";
import bch from "react-crypto-icons/lib/assets/bch.svg";
import avax from "react-crypto-icons/lib/assets/avax.svg";
import dash from "react-crypto-icons/lib/assets/dash.svg";
import cro from "react-crypto-icons/lib/assets/cro.svg";
import doge from "react-crypto-icons/lib/assets/doge.svg";

const initial = [
  { name: "BTC", id: "bitcoin", price: "", icon: btc },
  { name: "ETH", id: "ethereum", price: "", icon: eth },
  { name: "LTC", id: "binance-peg-litecoin", price: "", icon: ltc },
  { name: "XRP", id: "heco-peg-xrp", price: "", icon: xrp },
  { name: "ADA", id: "binance-peg-cardano", price: "", icon: ada },
  { name: "DOT", id: "polkadot", price: "", icon: dot },
  { name: "SUSHI", id: "sushi", price: "", icon: sushi },
  { name: "ETC", id: "ethereum-classic", price: "", icon: etc },
  { name: "TRX", id: "tron", price: "", icon: trx },
  { name: "BNB", id: "heco-peg-bnb", price: "", icon: bnb },
  { name: "BCH", id: "binance-peg-bitcoin-cash", price: "", icon: bch },
  { name: "AVAX", id: "binance-peg-avalanche", price: "", icon: avax },
  { name: "DASH", id: "dash", price: "", icon: dash },
  { name: "CRO", id: "crypto-com-chain", price: "", icon: cro },
  { name: "DOGE", id: "binance-peg-dogecoin", price: "", icon: doge },
];

const Coins = () => {
  const [cryptos, setCryptos] = useState(initial);

  const [loading, setLoading] = useState(false);

  const [update, setUpdate] = useState(false);

  const getPrices = async () => {
    setLoading(true);
    try {
      const prices = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinance-peg-litecoin%2Checo-peg-xrp%2Cbinance-peg-cardano%2Cpolkadot%2Csushi%2Cethereum-classic%2Ctron%2Checo-peg-bnb%2Cbinance-peg-bitcoin-cash%2Cbinance-peg-avalanche%2Cdash%2Ccrypto-com-chain%2Cbinance-peg-dogecoin&vs_currencies=usd`
      );

      let fetchedCryptos = [];

      if (prices.data !== undefined) {
        initial.forEach((coin, index) => {
          fetchedCryptos[index] = { ...coin, price: prices.data[coin.id].usd };
        });
        setCryptos(fetchedCryptos);
      }
    } catch (error) {
      console.log("coinsApiError");
    }
    setLoading(false);
  };

  useEffect(() => {
    getPrices();

    const refreshInterval = setInterval(() => {
      setUpdate(!update);
    }, 60000); // one minute

    return () => {
      clearInterval(refreshInterval);
    };
  }, [update]);

  const coinTextFontSize = useBreakpointValue({
    base: "15px",
    sm: "16px",
    md: "20px",
  });

  const renderCryptos = useMemo(() => {
    return cryptos.map((crypto) => (
      <SwiperSlide>
        <Flex flexDir={"row"} justifyContent={"center"}>
          <img src={crypto.icon} alt={"icon"} width={"25px"} />
          <Text
            marginLeft={"10px"}
            fontSize={coinTextFontSize}
            userSelect={"none"}
            cursor={"pointer"}
            fontFamily={"Manrope-ExtraBold"}
          >
            {crypto.name}: {crypto.price}$
          </Text>
        </Flex>
      </SwiperSlide>
    ));
  }, [cryptos]);

  SwiperCore.use([Autoplay]);

  return (
    <Box bgColor={"#2f3038"}>
      <Container
        style={{ paddingBlock: "20px", width: "100vw", overflow: "auto" }}
        maxWidth={"1440px"}
      >
        <Swiper
          spaceBetween={10}
          slidesPerView={
            window.outerWidth < 1440 ? Math.floor(window.outerWidth / 300) : 5
          }
          centeredSlides={true}
          autoplay={{
            delay: 100,
            disableOnInteraction: false,
          }}
          speed={4000}
          loop={true}
          freeMode={true}
        >
          {renderCryptos}
        </Swiper>
      </Container>
    </Box>
  );
};

export default memo(Coins);
