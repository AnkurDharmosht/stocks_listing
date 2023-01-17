import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { styled } from '@mui/material/styles';

export const custom_theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});


export const ThemeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  backgroundColor: "#000000",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
  borderRadius: 8,
  '&:hover': {
    backgroundColor: "#1877f2",
  },
}));

export const OrangeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  backgroundColor: "#D35400",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
  borderRadius: 8,
  '&:hover': {
    backgroundColor: "#1877f2",
  },
}));