import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    transparent: "transparent",
    background: {
      100: "#336699",
      200: "#154C7C",
      500: "#11436e",
      900: "#0e3558",
    },
    accent: {
      100: "#66a1ff",
      200: "#106BFF",
      900: "#005CED",
    },
  },
});

export { theme };
