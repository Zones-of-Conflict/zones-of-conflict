import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CanvasImp from "../src/components/CanvasImp";

import Navbar from "../src/components/Navbar";
import CardPlayer from "../src/components/CardPlayer";
// use effect to get player info
// when new player join call the same function
// add the player 2 to array of player
// will we have a name for each player or only his address

// 2
// function to getthe related unit for the player
const Canvas = () => {
  const [coordinates, setCoordinates] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const players = [
    {
      id: 1,
      radius: 40,
      src: "/tankred.png",
      rank: "Sergeant",
      units: [
        {
          unitId: 1,
          unitType: "tank1",
          unitPositionX: 200,
          unitPositionY: 300,
          src: "/tankred.png",
        },
        {
          unitId: 2,
          unitType: "tank2",
          unitPositionX: 100,
          unitPositionY: 300,
          src: "/tankred.png",
        },
        {
          unitId: 1,
          unitType: "tank3",
          unitPositionX: 300,
          unitPositionY: 300,
          src: "/tankred.png",
        },
      ],
    },
    {
      id: 2,
      radius: 40,
      src: "tankblue.png",
      rank: "Sergeant",
      units: [
        {
          unitId: 1,
          unitType: "tank1",
          unitPositionX: 200,
          unitPositionY: 300,
          src: "/tankblue.png",
        },
        {
          unitId: 2,
          unitType: "tank2",
          unitPositionX: 100,
          unitPositionY: 300,
          src: "/tankblue.png",
        },
        {
          unitId: 1,
          unitType: "tank3",
          unitPositionX: 300,
          unitPositionY: 300,
          src: "/tankblue.png",
        },
      ],
    },
  ];

  useEffect(() => {
    console.log("width: " + window.innerWidth);
    console.log("height: " + window.innerHeight);
  }, []);

  const handleCanvasClick = (event) => {
    const currentCoord = {
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    };
    setCoordinates(currentCoord);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgcolor={"grey.100"}
      minHeight={"100vh"}
      gap={5}
    >
      <Navbar />

      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={4}
      >
        <Typography variant="h1">Battle Map</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <CardPlayer
              id={players[0].id}
              src={players[0].src}
              rank={players[0].rank}
              units={players[0].units}
            />
          </Box>
          <CanvasImp onClick={handleCanvasClick} coordinates={coordinates} />
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <CardPlayer
              id={players[1].id}
              src={players[1].src}
              rank={players[1].rank}
              units={players[1].units}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Canvas;
