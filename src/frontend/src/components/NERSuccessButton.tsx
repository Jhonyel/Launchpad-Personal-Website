import { Button, styled } from "@mui/material";

const NERSuccessButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
})) as typeof Button;

export default NERSuccessButton;
