import React, { memo } from "react";
import {
  Box,
  Flex,
  Text,
  Container,
  VStack,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import Logo from "src/assets/images/logo.png";
import Secured from "src/assets/vectors/Secured";
import Stable from "src/assets/vectors/Stable";
import Trusted from "src/assets/vectors/Trusted";
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

const AboutUs = ({ langKeys }) => {
  SwiperCore.use([Autoplay]);
  return (
    <Box
      id={"About"}
      w={"full"}
      minH={"100vh"}
      paddingBottom={useBreakpointValue({ base: "30px", md: "100px" })}
    >
      <Container
        pos={"relative"}
        flexDir={"column"}
        maxW={"container.xl"}
        h={"auto"}
        paddingTop={useBreakpointValue({ base: "50px", md: "100px" })}
        paddingBottom={useBreakpointValue({ base: "30px", md: "100px" })}
        alignItems={"center"}
      >
        <Flex
          flexDir={useBreakpointValue({ base: "column", md: "row" })}
          px={useBreakpointValue({ base: "20px", md: "30px" })}
        >
          <VStack flex={1} alignItems={"start"} spacing={4}>
            <Heading fontFamily={"Manrope-ExtraBold"}>
              {langKeys["aboutUs"]}
            </Heading>
            <Text color={"#aeaeae"} textAlign={"left"}>
              {langKeys["aboutText"]}
            </Text>
          </VStack>
          <Flex
            pos={"relative"}
            flex={1}
            justifyContent={useBreakpointValue({
              base: "center",
              md: "flex-end",
            })}
            paddingRight={useBreakpointValue({
              base: "0px",
              sm: "0px",
              md: "0px",
              lg: "100px",
            })}
          >
            <Box
              alignSelf={"center"}
              pos={"relative"}
              h={"320px"}
              transform={`scale(${useBreakpointValue({
                base: 0.6,
                sm: 0.6,
                md: 0.8,
                lg: 1,
              })})`}
            >
              <img src={Logo} alt={"logo"} style={{ zIndex: -2 }} />
              <Secured
                pos={"absolute"}
                left={-60}
                top={-40}
                width={100}
                height={100}
              />
              <Stable
                pos={"absolute"}
                right={50}
                bottom={150}
                width={100}
                height={100}
              />
              <Trusted
                pos={"absolute"}
                left={-60}
                bottom={70}
                width={136}
                height={136}
              />
            </Box>
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
        <Container maxW={"container.xl"} h={"fit-content"}>
          <Heading w={"400px"} fontSize={"30px"} fontFamily={"Manrope-Bold"}>
            We work with following Crypto Payments
          </Heading>
        </Container>
        <Flex marginTop={"50px"}>
          <Swiper
            spaceBetween={30}
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
      </Flex>
    </Box>
  );
};

export default memo(AboutUs);
