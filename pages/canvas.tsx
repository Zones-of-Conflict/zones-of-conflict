import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import CanvasImp from "../src/components/CanvasImp";

import Navbar from "../src/components/Navbar";

const Canvas = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    console.log("width: " + window.innerWidth);
    console.log("height: " + window.innerHeight);
  }, []);

  const handleCanvasClick = (event) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    console.log(event.clientX);
    console.log(event.clientY);

    var x = event.clientX - event.target.offsetLeft;
    var y = event.clientY - event.target.offsetTop;
    var coords = "X coordinates: " + x + ", Y coordinates: " + y;
    console.log(coords);
    setCoordinates([currentCoord]);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} bgcolor={"grey.100"} minHeight={"100vh"} gap={5}>
      <Navbar />

      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={4}>
        <Typography variant="h1">Battle Map</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <Card
              sx={{
                width: 250,
                boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                backgroundColor: "#fafafa",
              }}
            >
              <CardMedia sx={{ height: 200 }} image={"/tankred.png"} />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography color="primary" variant="h5">
                  Player A
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  unit 1
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  unit 2
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  unit 3
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <CanvasImp onClick={handleCanvasClick} coordinates={coordinates} />
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <Card
              sx={{
                width: 250,
                boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
                backgroundColor: "#fafafa",
              }}
            >
              <CardMedia sx={{ height: 200 }} image={"/tankred.png"} />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography color="primary" variant="h5">
                  Player B
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  unit 1
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  unit 2
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  unit 3
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Canvas;
