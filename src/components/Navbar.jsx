import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  PopoverContent,
  ButtonGroup,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Logo from "../assets/vectors/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useFade, useHeight } from "src/hooks";
import { scrollHandler } from "src/utils/scrollHandler";
import EngFlag from "src/assets/vectors/EngFlag";
import DeuFlag from "src/assets/vectors/DeuFlag";
import RusFlag from "src/assets/vectors/RusFlag";
import EspFlag from "src/assets/vectors/EspFlag";

const Navbar = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  const { CurrentFlag, currentLanguage, setLanguage, langKeys } = props;

  const countries = [
    { icon: EngFlag, label: "ENG" },
    { icon: RusFlag, label: "RUS" },
    { icon: EspFlag, label: "ESP" },
    { icon: DeuFlag, label: "DEU" },
  ];

  const navigate = useNavigate();

  const [isVisible, setShow, fadeProps] = useFade(false);

  const [isGrow, setGrow, growProps] = useHeight(false);

  const navbarHeight = useBreakpointValue({ base: 60, md: 90 });

  useEffect(() => {
    const fadeBar = () => {
      if (window.scrollY > 50) {
        setShow(true);
        setGrow(false);
      } else {
        setShow(false);
        setGrow(true);
      }
    };

    window.addEventListener("scroll", fadeBar);

    return () => [window.removeEventListener("scroll", fadeBar)];
  }, []);

  const fontSize = useBreakpointValue({ base: "10px", md: "12px", lg: "md" });

  return (
    <Box position={"fixed"} top={0} left={0} width={"100vw"} zIndex={100}>
      <Flex
        color={useColorModeValue("white", "white")}
        h={useBreakpointValue({ base: "60px", md: "120px" })}
        {...growProps}
        py={{ base: 3 }}
        px={{ base: 2, md: 10 }}
        align={"center"}
      >
        <Flex
          position={"absolute"}
          left={0}
          w={"100vw"}
          h={"100%"}
          bgColor={"background.900"}
          {...fadeProps}
          zIndex={-1}
        />
        <Container maxW={"container.xl"} display={"flex"} flexDir={"row"}>
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center", md: "space-between" }}
          >
            {/* <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontSize={useBreakpointValue({ md: "3xl", base: "md" })}
            fontWeight={"bold"}
            color={useColorModeValue("white", "white")}
          >
            CryptoWave
          </Text> */}
            <Flex ml={{ base: -4 }} display={{ base: "flex", md: "none" }}>
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                _hover={{}}
                _focus={{}}
                aria-label={"Toggle Navigation"}
              />
            </Flex>

            <Flex
              flex={1}
              justifyContent={useBreakpointValue({
                base: "flex-end",
                md: "flex-start",
              })}
              minW={useBreakpointValue({ base: "0px", md: "50px" })}
              maxW={useBreakpointValue({ base: "120px", md: "500px" })}
            >
              <Logo
                onClick={() => {
                  navigate("/#home", {
                    replace: global.location.pathname === "/",
                  });
                  scrollHandler("home", navbarHeight);
                }}
              />
            </Flex>

            <Flex
              flex={6}
              display={{ base: "none", md: "flex" }}
              ml={5}
              justifyContent={"center"}
            >
              <DesktopNav langKeys={langKeys} />
            </Flex>

            <Stack
              flexDir={"row"}
              flex={{ base: 1, md: 2 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={4}
            >
              <Popover trigger={"hover"} placement={"bottom"}>
                <PopoverTrigger>
                  <ButtonGroup spacing={0}>
                    <Link
                      paddingLeft={2}
                      fontSize={fontSize}
                      fontFamily={"Manrope"}
                      fontWeight={500}
                      alignSelf={"center"}
                      bgGradient={
                        "-webkit-linear-gradient(110deg, blue.200, violet.200)"
                      }
                      bgClip={"text"}
                      fill={"transparent"}
                      _hover={{
                        textDecoration: "none",
                        color: "gray.400",
                      }}
                      _focus={{}}
                    >
                      {CurrentFlag}
                    </Link>
                    <ChevronDownIcon alignSelf={"center"} />
                  </ButtonGroup>
                </PopoverTrigger>

                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={"background.200"}
                  p={4}
                  w={"fit-content"}
                  rounded={"xl"}
                >
                  <Stack w={"fit-content"}>
                    {countries.map((lang) => (
                      <DesktopSubNav
                        key={lang.label}
                        LangIcon={lang.icon}
                        onClick={() => {
                          setLanguage(lang.label);
                        }}
                      />
                    ))}
                  </Stack>
                </PopoverContent>
              </Popover>
              {props.children}
            </Stack>
          </Flex>
        </Container>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav langKeys={langKeys} />
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({ langKeys }) => {
  const linkColor = useColorModeValue(
    "-webkit-linear-gradient(110deg, blue.200, violet.200)",
    "-webkit-linear-gradient(110deg, blue.200, violet.200)"
  );
  const linkHoverColor = useColorModeValue("gray.400", "white");

  const location = useLocation();
  const navigate = useNavigate();

  const fontSize = useBreakpointValue({ md: "12px", lg: "md" });

  return (
    <Flex
      flex={1}
      flexDir={"row"}
      justifyContent="space-evenly"
      alignItems={"center"}
    >
      {NAV_ITEMS.map((navItem, index) => (
        <Box
          key={navItem.label}
          onClick={() => {
            navigate("/" + navItem.href, {
              replace: global.location.pathname === "/",
            });
            scrollHandler(navItem.href.slice(1), 90);
          }}
        >
          <Link
            href={navItem.href ?? "#"}
            fontSize={fontSize}
            fontFamily={"Manrope"}
            fontWeight={500}
            bgGradient={linkColor}
            bgClip={"text"}
            fill={"transparent"}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            _focus={{}}
            onClick={() => {
              if (location.pathname !== "/") {
                navigate("/");
              }
            }}
          >
            {langKeys[navItem.label]}
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

const DesktopSubNav = ({ LangIcon, href, subLabel, onClick }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={1}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("accent.200", "accent.900") }}
      onClick={onClick}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          {<LangIcon size={"20px"} />}
          {/* <Text
            transition={"all .3s ease"}
            color={"white"}
            _groupHover={{ color: "white" }}
            fontWeight={500}
          >
            {label}
          </Text> */}
        </Box>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ langKeys }) => {
  const navigate = useNavigate();
  return (
    <Stack
      bg={useColorModeValue("background.200", "background.200")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem, index) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          label={langKeys[navItem.label]}
          onClick={() => {
            navigate("/" + navItem.href, {
              replace: global.location.pathname === "/",
            });
            scrollHandler(navItem.href.slice(1), 60);
          }}
        />
      ))}
      <MobileNavItem
        key={"Faq1"}
        label={langKeys["faq"]}
        onClick={() => {
          navigate("/faq");
        }}
      />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, onClick }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        onClick={onClick}
      >
        <Text fontWeight={500} color={useColorModeValue("#FFF", "#FFF")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("#FFF", "#FFF")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  // {
  //   label: "Home",
  //   href: "#home",
  //   // children: [
  //   //   {
  //   //     label: "Explore Design Work",
  //   //     subLabel: "Trending Design to inspire you",
  //   //     href: "#home",
  //   //   },
  //   //   {
  //   //     label: "New & Noteworthy",
  //   //     subLabel: "Up-and-coming Designers",
  //   //     href: "#",
  //   //   },
  //   // ],
  // },
  {
    label: "home",
    href: "#home",
  },
  {
    label: "howItWorks",
    href: "#howItWorks",
  },
  {
    label: "aboutUs",
    href: "#aboutus",
  },
  {
    label: "plans",
    href: "#plans",
  },
  {
    label: "referralProgram",
    href: "#referral",
  },
  {
    label: "contactUs",
    href: "#contact",
  },
];

export default Navbar;
