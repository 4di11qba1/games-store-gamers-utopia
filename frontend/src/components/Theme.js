import { createTheme, ThemeProvider } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
      text: "#000000",
    },
    background: {
      default: "#d6d6d6",
      paper: "#ffffff",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#d6d6d6",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&:active": {
            backgroundColor: "#d6d6d6",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
      text: "#ffffff",
    },
    background: {
      default: "#28262D",
      paper: "#201C2D",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#050505",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

export const MyThemeProvider = ({ children, darkMode }) => {
  const theme = darkMode ? darkTheme : lightTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
