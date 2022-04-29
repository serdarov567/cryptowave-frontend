import { extendTheme } from "@chakra-ui/react";

const buttonStyles = {
  variants: {
    outline: {
      ring: 0,
      boxShadow: "0 0 6px 0 rgba(157, 96, 212, 0.5)",
      border: "solid 1px transparent",
      backgroundGradient: "-webkit-linear-gradient(101deg, #78e4ff, #ff48fa)",
      backgroundOrigin: "border-box",
      backgroundClip: " content-box, border-box",
      boxShadow: "2px 1000px 1px #1D1D1D inset",
    },
  },
};

const fontSizes = {
  md: "15px",
  mdb: "16px",
};

const colors = {
  transparent: "transparent",
  background: {
    100: "#336699",
    200: "#2c2c2c",
    500: "#282828",
    600: "#242424",
    800: "#212128",
    900: "#1D1D1D",
  },
  accent: {
    100: "#66a1ff",
    200: "#106BFF",
    900: "#005CED",
  },
  blue: {
    200: "#8FC9FF",
    500: "#0D8BFF",
    900: "#0A6FCC",
  },
  violet: {
    200: "#A9A7FF",
    500: "#6B68FF",
    900: "#5653CC",
  },
};

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "black",
      },
    }),
  },
  fonts: {
    body: "Manrope",
  },
  fontSizes,
  colors: { ...colors },
  components: {
    Button: { ...buttonStyles },
  },
});

export { theme, colors };
