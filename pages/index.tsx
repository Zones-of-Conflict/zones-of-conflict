import { Typography, Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../src/components/Navbar";
import Faucet from "../src/components/Faucet";
import { GAMEMASTER_DATA } from "../src/constants/contractData";
import { useProvider, useSigner, useContract } from "wagmi";
import GameMenu from "../src/components/GameMenu";
import { MainContext } from "../src/contexts/MainContext";
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

  const createMatch = async () => {
    try {
      const result = await GAMEMASTER_WRITE?.createMatch();
      if (result) {
        const { pathname } = Router;
        if (pathname == "/") {
          Router.push("/game");
          // next line to push to specific id when we get the id from matchFactory
          // Router.push("/canvas/?matchId=" + _matchId);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const joinMatch = async (_matchId) => {
    //  GAMEMASTER_WRITE?.joinMatch(_matchId);
    try {
      const result = await GAMEMASTER_WRITE?.joinMatch(_matchId);
      if (result) {
        const { pathname } = Router;
        if (pathname == "/") {
          Router.push("/game");
          // next line to push to specific id if it is exist
          // Router.push("/canvas/?matchId=" + _matchId);
        } else {
          alert("Match ID is not exist");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const mainContext = {
    GAMEMASTER_READ,
    GAMEMASTER_WRITE,
    createMatch,
    joinMatch,
  };
  return (
    <MainContext.Provider value={mainContext}>
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
        style={{
          backgroundImage: 'url("/intro.jpg")',
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <Navbar />

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{
            background: "#d3d3d359",
            borderRadius: "10px",
            padding: "20px",
            margin: "40px",
          }}
        >
          <Typography variant="h1" color="#341409" sx={{ m: 4 }}>
            Zones of Conflict
          </Typography>
          {/* <Image
            src={"/tank512.png"}
            alt={"beige tank"}
            width={500}
            height={500}
          /> */}
          <GameMenu />
          <Faucet />
        </Box>
      </Box>
      {/* Main page container End */}
    </MainContext.Provider>
  );
}
