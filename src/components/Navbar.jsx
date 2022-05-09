import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Logo from "../assets/vectors/Logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useFade, useHeight } from "src/hooks";
import { scrollHandler } from "src/utils/scrollHandler";

const Navbar = (props) => {
  const { isOpen, onToggle } = useDisclosure();

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

  return (
    <Box position={"fixed"} left={0} width={"100vw"} zIndex={100}>
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
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            {/* <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontSize={useBreakpointValue({ md: "3xl", base: "md" })}
            fontWeight={"bold"}
            color={useColorModeValue("white", "white")}
          >
            CryptoWave
          </Text> */}
            <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
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
                aria-label={"Toggle Navigation"}
              />
            </Flex>

            <Flex
              flex={1}
              justifyContent={useBreakpointValue({
                base: "flex-end",
                md: "flex-start",
              })}
              w={useBreakpointValue({ base: "50px", md: "50px" })}
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
              display={{ base: "none", md: "flex" }}
              ml={10}
              justifyContent={"flex-end"}
            >
              <DesktopNav />
            </Flex>
          </Flex>

          <Flex
            flex={1}
            flexDir={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              {props.children}
            </Stack>
          </Flex>
        </Container>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue(
    "-webkit-linear-gradient(110deg, blue.200, violet.200)",
    "-webkit-linear-gradient(110deg, blue.200, violet.200)"
  );
  const linkHoverColor = useColorModeValue("gray.400", "white");
  //const popoverContentBgColor = useColorModeValue("white", "white");

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack direction={"row"} spacing={"50px"} align="center">
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
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                href={navItem.href ?? "#"}
                fontSize={"md"}
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
                {navItem.label}
              </Link>
            </PopoverTrigger>
            {/* 
            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )} */}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

// const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
//   return (
//     <Link
//       href={href}
//       role={"group"}
//       display={"block"}
//       p={2}
//       rounded={"md"}
//       _hover={{ bg: useColorModeValue("accent.200", "accent.900") }}
//     >
//       <Stack direction={"row"} align={"center"}>
//         <Box>
//           <Text
//             transition={"all .3s ease"}
//             color={"black"}
//             _groupHover={{ color: "white" }}
//             fontWeight={500}
//           >
//             {label}
//           </Text>
//           <Text
//             color={"black"}
//             _groupHover={{ color: "white" }}
//             fontSize={"sm"}
//           >
//             {subLabel}
//           </Text>
//         </Box>
//         <Flex
//           transition={"all .3s ease"}
//           transform={"translateX(-10px)"}
//           opacity={0}
//           _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//           justify={"flex-end"}
//           align={"center"}
//           flex={1}
//         >
//           <Icon color={"white"} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   );
// };

const MobileNav = () => {
  const navigate = useNavigate();
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem, index) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          onClick={() => {
            navigate("/" + navItem.href, {
              replace: global.location.pathname === "/",
            });
            scrollHandler(navItem.href.slice(1), 60);
          }}
        />
      ))}
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
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
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
          borderColor={useColorModeValue("gray.200", "gray.700")}
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
    label: "Plans",
    href: "#plans",
  },
  {
    label: "About us",
    href: "#aboutus",
  },
];

export default Navbar;
