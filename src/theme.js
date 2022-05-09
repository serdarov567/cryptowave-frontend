import { extendTheme } from "@chakra-ui/react";

const buttonStyles = {
  variants: {
    primary: {
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

const inputStyles = {
  defaultProps: {
    variant: "primary",
  },
  variants: {
    primary: {
      field: {
        height: "50px",
        backgroundColor: "transparent",
        fontFamily: "Manrope",
        fontSize: "15px",
        color: "#FFF",
        borderWidth: "1px",
        borderColor: "#939393",
        _focus: {
          borderColor: "#A9A7FF",
        },
        _placeholder: {
          color: "#939393",
        },
      },
    },
  },
};

const formLabelStyles = {
  defaultProps: {
    variant: "primary",
  },
  variants: {
    primary: {
      backgroundColor: "transparent",
      fontFamily: "Manrope",
      fontSize: "15px",
      color: "#FFF",
    },
  },
};

const selectStyles = {
  defaultProps: {
    variant: "primary",
  },
  variants: {
    primary: {
      field: {
        height: "50px",
        backgroundColor: "transparent",
        fontFamily: "Manrope",
        fontSize: "15px",
        color: "#FFF",
        borderWidth: "1px",
        borderColor: "#939393",
        _focus: {
          borderColor: "#A9A7FF",
        },
        _placeholder: {
          color: "#fff",
        },
      },
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
    50: "#171717",
    100: "#5f5f5f",
    200: "#2c2c2c",
    500: "#282828",
    600: "#242424",
    700: "#0F0F0F",
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
    400: "#639BFF",
    450: "#0F89FF",
    500: "#0D8BFF",
    800: "#0f2133",
    900: "#0A6FCC",
  },
  violet: {
    100: "#A7C6FF",
    200: "#A9A7FF",
    500: "#6B68FF",
    800: "#1d1c33",
    900: "#5653CC",
  },
  black: "#1d1d1d",
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
    FormLabel: {
      variants: {
        primary: {
          fontFamily: "Manrope",
          fontSize: "20px",
          color: "#B8B8B8",
        },
      },
    },
    Input: {
      ...inputStyles,
    },
    Select: {
      ...selectStyles,
    },
    FormLabel: {
      ...formLabelStyles,
    },
    Heading: {
      defaultProps: {
        variant: "primary",
      },
      variants: {
        primary: {
          fontFamily: "Manrope",
          color: "#FFF",
        },
      },
    },
    Text: {
      defaultProps: {
        variant: "primary",
      },
      variants: {
        primary: {
          color: "#FFF",
        },
      },
    },
  },
});

const styles = {
  sign: {
    color: "#71707F",
    fontFamily: "Manrope-Bold",
  },
  blueText: {
    color: "#0D88FF",
    fontFamily: "Manrope-Bold",
  },
};

export { theme, colors, styles };
