import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import CanvasImp from "../src/components/CanvasImp";
// import { useCanvas } from "../hooks/useCanvas";
const Canvas = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const showCoords = (event) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    var x = event.clientX - 100;
    var y = event.clientY - 100;
    var coords = "X coordinates: " + x + ", Y coordinates: " + y;
    console.log(coords);
    /// canvasRef.fillText("here", x, y);
    setCoordinates(currentCoord);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>Player A</Typography>
        <Typography>unit 1</Typography>
        <Typography>unit 2</Typography>
        <Typography>unit 3</Typography>
      </Box>
      <CanvasImp onClick={showCoords} coordinates={coordinates} />;
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>Player B</Typography>
        <Typography>unit 1</Typography>
        <Typography>unit 2</Typography>
        <Typography>unit 3</Typography>
      </Box>
    </Box>
  );
};

export default Canvas;
