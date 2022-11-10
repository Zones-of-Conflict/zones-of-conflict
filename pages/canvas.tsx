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
  return <CanvasImp onClick={showCoords} coordinates={coordinates} />;
};

export default Canvas;
