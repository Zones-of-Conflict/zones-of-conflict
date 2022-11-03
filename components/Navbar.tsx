import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <Box display={"flex"} justifyContent="right" alignItems="center" m={2} mr={5}>
      <ConnectButton />
    </Box>
  );
}
