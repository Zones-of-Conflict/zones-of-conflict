import { Typography, Box } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Zones of Conflict</title>
        <meta name="description" content="Built for NEAR Hackathon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main page content */}

      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        bgcolor={"#f5f5f5"}
        minHeight={"100vh"}
        position={"relative"}
      >
        <Navbar />
        <Typography variant="h1">Zones of Conflict</Typography>
        <Image src={"/tank512.png"} alt={"beige tank"} width={500} height={500} />
      </Box>
      {/* End Main page content */}
    </>
  );
}
