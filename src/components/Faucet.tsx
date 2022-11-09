import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Faucet() {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      {/** Maximized Component */}
      <Box
        sx={{ borderRadius: 2 }}
        display={hidden ? "none" : "flex"}
        flexDirection={"column"}
        alignItems="center"
        gap={4}
        p={5}
        pt={2}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        position={"relative"}
      >
        <Box textAlign="center">
          <Typography variant="h6">Aurora Faucet</Typography>
        </Box>

        <Button variant="contained" href="https://aurora.dev/faucet" target="_blank" rel="noopener">
          Aurora ETH Faucet
        </Button>

        {/** Hide button */}
        <Box display={"flex"} position={"absolute"} right={"0px"} top={"0px"}>
          <Button onClick={() => setHidden(!hidden)}>
            <RemoveIcon />
          </Button>
        </Box>
        {/** End Hide button */}
      </Box>
      {/** End Maximized Component */}

      {/** Minimized Component */}
      <Box
        sx={{ borderRadius: 2 }}
        display={hidden ? "flex" : "none"}
        flexDirection={"column"}
        alignItems="center"
        p={2}
        pl={5}
        pr={5}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.1)"}
        position={"relative"}
      >
        <Typography variant="h6">Aurora Faucet</Typography>
        {/** Hide button */}
        <Box
          display={"flex"}
          position={"absolute"}
          right={"0px"}
          top={"0px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button onClick={() => setHidden(!hidden)}>
            <AddIcon />
          </Button>
        </Box>
        {/** End Hide button */}
      </Box>

      {/** End Minimized Component*/}
    </>
  );
}
