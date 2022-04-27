import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    transparent: "transparent",
    background: {
      200: "#154C7C",
      900: "#154C7C",
    },
    accent: {
      200: "#106BFF",
      900: "#005CED",
    },
  },
});

export { theme };
