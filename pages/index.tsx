import { Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Faucet from "../components/Faucet";
import { GAMEMASTER_DATA } from "../constants/contractData";
import { useProvider, useSigner, useContract } from "wagmi";

import Router from "next/router";

export default function Home() {
  //get provider and signer using wagmi hooks
  const provider = useProvider();
  const { data: signer } = useSigner();

  //contract instance for reading data
  const GAMEMASTER_READ = useContract({
    address: GAMEMASTER_DATA.testnetAddress,
    abi: GAMEMASTER_DATA.abi,
    signerOrProvider: provider,
  });

  //contract instance for writing data
  const GAMEMASTER_WRITE = useContract({
    address: GAMEMASTER_DATA.testnetAddress,
    abi: GAMEMASTER_DATA.abi,
    signerOrProvider: signer,
  });

  const startMatch = async () => {
    try {
      const result = await GAMEMASTER_WRITE?.matchFactory();
      console.log(result.hash);
      if (result) {
        console.log("hey");
        const { pathname } = Router;
        if (pathname == "/") {
          Router.push("/canvas");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Zones of Conflict</title>
        <meta name="description" content="Built for NEAR Hackathon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main page container */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        bgcolor={"grey.100"}
        minHeight={"100vh"}
        gap={5}
      >
        {/* Navbar Container */}
        <Box bgcolor={"grey.100"} alignItems={"right"}>
          <Navbar />
        </Box>
        {/* Navbar Container End */}

        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography variant="h1">Zones of Conflict</Typography>
          <Image
            src={"/tank512.png"}
            alt={"beige tank"}
            width={500}
            height={500}
          />
          <Faucet />

          <Button onClick={() => startMatch()} variant={"contained"}>
            Start a Match
          </Button>
        </Box>
      </Box>
      {/* Main page container End */}
    </>
  );
}
