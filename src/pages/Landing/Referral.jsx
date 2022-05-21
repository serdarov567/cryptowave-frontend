import React from "react";
import {
  Flex,
  Text,
  Container,
  VStack,
  useBreakpointValue,
  Heading,
  Box,
} from "@chakra-ui/react";
import ReferralIllustration from "src/assets/vectors/referral.svg";
import BackImage from "src/assets/images/spw.png";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import Bitcoin from "src/assets/images/logo_btc.png";
import BNB from "src/assets/images/logo_bnb.png";
import Dash from "src/assets/images/logo_dash.png";
import Tron from "src/assets/images/logo_tron.png";
import Ripple from "src/assets/images/logo_ripple.png";
import Ethereum from "src/assets/images/logo_eth.png";
import LiteCoin from "src/assets/images/logo_ltc.png";
import GradientButton from "src/components/GradientButton";
import { useNavigate } from "react-router-dom";

const Referral = ({ langKeys }) => {
  const navigate = useNavigate();

  SwiperCore.use([Autoplay]);
  return (
    <Box
      id={"Referral"}
      pos={"relative"}
      w={window.outerWidth}
      h={"fit-content"}
      backgroundColor={"#292C35"}
      alignSelf={"center"}
    >
      <Container
        pos={"relative"}
        flexDir={"column"}
        maxW={"container.xl"}
        h={"fit-content"}
        paddingTop={useBreakpointValue({ base: "30px", md: "50px" })}
        paddingBottom={useBreakpointValue({ base: "70px", md: "120px" })}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading
          px={"20px"}
          textAlign={"left"}
          fontFamily={"Manrope-ExtraBold"}
          marginBottom={"50px"}
          color={"#8FC9FF"}
          alignSelf={"center"}
          fontSize={"30px"}
        >
          {langKeys["referralProgram"]}
        </Heading>
        <Flex
          flexDir={useBreakpointValue({ base: "column", md: "row" })}
          px={useBreakpointValue({ base: "10px", md: "20px" })}
          justifyContent={"center"}
        >
          <Flex
            pos={"relative"}
            flex={3}
            justifyContent={"center"}
            alignItems={"center"}
            paddingRight={useBreakpointValue({
              base: "0px",
              sm: "0px",
              md: "0px",
              lg: "100px",
            })}
          >
            <img src={ReferralIllustration} alt={"referralIllustration"} />
          </Flex>
          <Flex
            flex={4}
            flexDir={"column"}
            alignItems={"start"}
            bgColor={"#2f3038"}
            px={{ base: "30px", md: "50px" }}
            py={{ base: "20px", md: "30px" }}
            borderRadius={"30px"}
          >
            <Text
              fontFamily={"Manrope-Bold"}
              fontSize={"20px"}
              color={"#A9A7FF"}
              textAlign={"left"}
            >
              {langKeys["referralHeaderSmall"]}
            </Text>
            <Heading
              fontSize={"32px"}
              w={"full"}
              fontFamily={"Manrope-ExtraBold"}
              marginBlock={"10px"}
            >
              {langKeys["referralHeaderBig"]}
            </Heading>
            <Text fontSize={"16px"} textAlign={"left"}>
              {langKeys["referralContent"]}
            </Text>

            <Flex
              w={"full"}
              flexDir={"row"}
              justifyContent={"space-between"}
              marginTop={"10px"}
            >
              <VStack alignItems={"start"}>
                <Heading
                  fontFamily={"Manrope-Bold"}
                  fontSize={"45px"}
                  color={"#F34040"}
                >
                  5%
                </Heading>
                <Text>{langKeys["directReferral"]}</Text>
              </VStack>

              <VStack alignItems={"start"}>
                <Heading
                  fontFamily={"Manrope-Bold"}
                  fontSize={"45px"}
                  color={"#2EEC7A"}
                >
                  2%
                </Heading>
                <Text>{langKeys["seondLineReferral"]}</Text>
              </VStack>

              <VStack alignItems={"start"}>
                <Heading
                  fontFamily={"Manrope-Bold"}
                  fontSize={"45px"}
                  color={"#6869FF"}
                >
                  1%
                </Heading>
                <Text>{langKeys["thirdLineReferral"]}</Text>
              </VStack>
            </Flex>

            <GradientButton marginTop={"30px"} onClick={()=> {
              navigate('/referral-program')
            }}>Learn more</GradientButton>
          </Flex>
        </Flex>
      </Container>
      <Flex
        pos={"relative"}
        flexDir={"column"}
        w={"100vw"}
        h={"345px"}
        bgImage={`url(${BackImage})`}
        bgPos={"center"}
        paddingTop={"80px"}
      >
        <Container
          maxW={"container.xl"}
          h={"fit-content"}
          justifyContent={"center"}
        >
          <Heading w={"400px"} fontSize={"30px"} fontFamily={"Manrope-Bold"}>
            {langKeys["bannerText"]}
          </Heading>
          <Flex marginTop={"50px"}>
            <Swiper
              spaceBetween={30}
              slidesPerView={
                window.outerWidth < 1440
                  ? Math.floor(window.outerWidth / 300)
                  : 5
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
              <SwiperSlide>
                <img src={Bitcoin} alt={"btc"} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={BNB} alt={"bnb"} />
              </SwiperSlide>

              <SwiperSlide>
                <img src={Dash} alt={"dash"} />
              </SwiperSlide>

              <SwiperSlide>
                <img src={Tron} alt={"tron"} />
              </SwiperSlide>

              <SwiperSlide>
                <img src={Ripple} alt={"ripple"} />
              </SwiperSlide>

              <SwiperSlide>
                <img src={Ethereum} alt={"eth"} />
              </SwiperSlide>

              <SwiperSlide>
                <img src={LiteCoin} alt={"ltc"} />
              </SwiperSlide>
            </Swiper>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default Referral;
