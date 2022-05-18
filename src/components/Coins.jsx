import React, { useEffect, useState, useMemo } from "react";
import { Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

const initial = [
  { name: "BTC", id: "bitcoin", price: "" },
  { name: "ETH", id: "ethereum", price: "" },
  { name: "LTC", id: "binance-peg-litecoin", price: "" },
  { name: "XRP", id: "heco-peg-xrp", price: "" },
  { name: "ADA", id: "binance-peg-cardano", price: "" },
  { name: "DOT", id: "polkadot", price: "" },
  { name: "SUSHI", id: "sushi", price: "" },
  { name: "ETC", id: "ethereum-classic", price: "" },
  { name: "TRX", id: "tron", price: "" },
  { name: "BNB", id: "heco-peg-bnb", price: "" },
  { name: "BCH", id: "binance-peg-bitcoin-cash", price: "" },
  { name: "AVAX", id: "binance-peg-avalanche", price: "" },
  { name: "DASH", id: "dash", price: "" },
  { name: "CRO", id: "crypto-com-chain", price: "" },
  { name: "DOGE", id: "binance-peg-dogecoin", price: "" },
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

  const renderCryptos = useMemo(() => {
    return cryptos.map((crypto) => (
      <SwiperSlide>
        <Text
          userSelect={'none'}
          cursor={"pointer"}
          fontFamily={"Manrope-ExtraBold"}
        >
          {crypto.name}: {crypto.price}$
        </Text>
      </SwiperSlide>
    ));
  }, [cryptos]);

  SwiperCore.use([Autoplay]);

  return (
    <Container
      style={{ height: "50px", width: "100vw", overflow: "auto" }}
      maxWidth={"container.xl"}
    >
      <Swiper
        spaceBetween={5}
        slidesPerView={5}
        centeredSlides={true}
        autoplay={{
          delay: 100,
          disableOnInteraction: false,
        }}
        speed={4000}
        loop={true}
        freeMode={true}
        _freeModeNoMomentumRelease={false}
      >
        {renderCryptos}
      </Swiper>
    </Container>
  );
};

export default Coins;
