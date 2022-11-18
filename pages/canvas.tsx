import { Box, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
// import CanvasImp from "../src/components/CanvasImp";

import Navbar from "../src/components/Navbar";
import CardPlayer from "../src/components/CardPlayer";
import { formatUnits } from "ethers/lib/utils";
import { MainContext } from "../src/contexts/MainContext";
import { GAMEMASTER_DATA } from "../src/constants/contractData";
import { useContract, useProvider } from "wagmi";
import ukraine from "../src/assets/ukraine.jpg";
// use effect to get player info
// when new player join call the same function
// add the player 2 to array of player
// will we have a name for each player or only his address

// 2
// function to getthe related unit for the player

// 3. qestion
// for the unit type will be different image for each type and for each player or only one image for each type

const players = [
  {
    id: 1,
    radius: 40,
    src: "/player.png",
    rank: "Sergeant",
    units: [
      {
        unitId: 1,
        unitType: "tank1",
        unitPositionX: 200,
        unitPositionY: 300,
        src: "/tank1.png",
      },
      {
        unitId: 2,
        unitType: "tank2",
        unitPositionX: 100,
        unitPositionY: 300,
        src: "/tank1.png",
      },
      {
        unitId: 3,
        unitType: "tank3",
        unitPositionX: 300,
        unitPositionY: 300,
        src: "/tank1.png",
      },
    ],
  },
  {
    id: 2,
    radius: 40,
    src: "player1.png",
    rank: "Sergeant",
    units: [
      {
        unitId: 1,
        unitType: "tank1",
        unitPositionX: 200,
        unitPositionY: 300,
        src: "/tank2.png",
      },
      {
        unitId: 2,
        unitType: "tank2",
        unitPositionX: 100,
        unitPositionY: 300,
        src: "/tank2.png",
      },
      {
        unitId: 3,
        unitType: "tank3",
        unitPositionX: 300,
        unitPositionY: 300,
        src: "/tank2.png",
      },
    ],
  },
];
// another var to save only the units
// check how to construct units
// radius 1 rect equals to grid step '60'
const units = [
  {
    unitId: 1,
    unitType: "tank1",
    unitPositionX: 240,
    unitPositionY: 240,
    src: "/tank1.png",
    radius: 60,
  },
  {
    unitId: 2,
    unitType: "tank2",
    unitPositionX: 30,
    unitPositionY: 170,
    src: "/tank1.png",
    radius: 120,
  },
  {
    unitId: 3,
    unitType: "tank3",
    unitPositionX: 300,
    unitPositionY: 300,
    src: "/tank1.png",
    radius: 180,
  },
  {
    unitId: 4,
    unitType: "tank3",
    unitPositionX: 600,
    unitPositionY: 300,
    src: "/tank2.png",
    radius: 240,
  },
];

// grid of the canvas
const drawGrid = (ctx, xLength, xStep, yLength, yStep) => {
  for (var x = 0.5; x <= xLength; x += xStep) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, xLength);
  }
  for (var y = 0.5; y <= yLength; y += yStep) {
    ctx.moveTo(0, y);
    ctx.lineTo(yLength, y);
  }
  ctx.strokeStyle = "grey";
  ctx.stroke();
};

// draw the unit in the middle of the grid rect
const placeAtGrid = (unit) => {
  if (isUnitInGrid(unit)) {
    let xGrid = Math.floor(unit.unitPositionX / 60);
    let yGrid = Math.floor(unit.unitPositionY / 60);
    if (xGrid > 9) xGrid = 9;
    if (yGrid > 9) yGrid = 9;
    unit.unitPositionX = xGrid * 60;
    unit.unitPositionY = yGrid * 60;
  }
};

// calcaulte the interval of the unit in the grid
const calculateInterval = (counter, minimumCounter = 0, range = 60) => {
  if (counter < minimumCounter) {
    counter = Math.abs(counter);
  }
  const start = Math.floor(counter / range) * range + 1;
  const end = start + range - 1;
  const interval = `${Math.max(start, minimumCounter)}-${end}`;
  return interval;
};

// check if 2 points have intersection or not
// when mouse clicked on the canvas to determin the selected unit

const isIntersectPoint = (point, unit) => {
  let a = calculateInterval(point.x);
  let c = calculateInterval(point.y);
  let b = calculateInterval(unit.unitPositionX);
  let d = calculateInterval(unit.unitPositionY);
  const intersect = a.includes(b) && c.includes(d);
  return a == b && c == d;
};

// draw rect with color
// const drawRect = (ctx, leftX, topY, width, height, drawColor) => {
//   ctx.fillStyle = drawColor;
//   ctx.fillRect(leftX, topY, width, height);
//   ctx.stroke();
// };
// function to draw the units
const drawUnits = (ctx, units) => {
  // draw the units
  units.forEach((unit) => {
    placeAtGrid(unit); // place the unit in the middle of the grid
    const img = new Image();
    img.src = unit.src;
    img.onload = () => {
      ctx.drawImage(img, unit.unitPositionX, unit.unitPositionY, 60, 60);
    };
  });
};

// function to draw the selected unit
const drawSelectedUnit = (ctx, unit) => {
  const img = new Image();
  img.src = unit.src;
  img.onload = () => {
    ctx.drawImage(img, unit.unitPositionX, unit.unitPositionY, 60, 60);
  };
};

// function to check if the unit is in the grid or not
const isUnitInGrid = (unit) => {
  return (
    unit.unitPositionX >= 0 &&
    unit.unitPositionX <= 600 &&
    unit.unitPositionY >= 0 &&
    unit.unitPositionY <= 600
  );
};

// function to check if the unit is allowed to move to the new position or not
const isUnitAllowedToMoveToNewPosition = (unit, newPosition) => {
  let allowed = true;
  let distance = Math.sqrt(
    Math.pow(newPosition.x - unit.unitPositionX, 2) +
      Math.pow(newPosition.y - unit.unitPositionY, 2)
  );
  if (distance > unit.radius) {
    allowed = false;
  }
  return allowed;
};

// draw circle
const drawCircle = (ctx, unit, radius, drawColor) => {
  console.log("unit", unit.unitPositionX);
  ctx.beginPath();
  ctx.setLineDash([]);
  let x = unit.unitPositionX + 30;
  let y = unit.unitPositionY + 30;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#003300";
  ctx.stroke();
  ctx.closePath();
};

const Canvas = () => {
  const [player, setPlayer] = useState(players[0]);
  const [coordinates, setCoordinates] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });
  // later use the player id to get the units
  const [isMoving, setIsMoving] = useState(false);
  const canvasRef = useRef(null);
  const [testUnit, setTestUnit] = useState();
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  //contract instance for reading data
  const provider = useProvider();
  const GAMEMASTER_READ = useContract({
    address: GAMEMASTER_DATA.testnetAddress,
    abi: GAMEMASTER_DATA.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    async function fetchTestunit() {
      const unit = await GAMEMASTER_READ.testUnit();
      setTestUnit(unit);
    }
    GAMEMASTER_READ && fetchTestunit();
  }, [GAMEMASTER_READ]);

  useEffect(() => {
    console.log("testUnit", testUnit);
    //  console.log("normnalized TargetX", Number(testUnit.targetX));
  }, [testUnit]);
  // useEffect(() => {
  //   console.log("width: " + window.innerWidth);
  //   console.log("height: " + window.innerHeight);
  // }, []);
  // draw effect – each time isDrawing,
  // start or end change, automatically
  // redraw everything
  useEffect(() => {
    // clear canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = "600";
    canvas.height = "600";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Our draw came here
    const render = () => {
      // draw grid
      drawGrid(ctx, 600, 60, 600, 60);
      //  drawRect(ctx, 100, 100, 50, 50, "red");
      drawUnits(ctx, units);
    };
    render();
    // draw the line
    ctx.beginPath();
    ctx.setLineDash([5, 15]);

    if (selectedItem) {
      drawCircle(ctx, selectedItem, 30, "red");
      let x = selectedItem.unitPositionX + 30;
      let y = selectedItem.unitPositionY + 30;
      ctx.moveTo(x, y);
      ctx.lineTo(end.x, end.y);
      let isAllowed = isUnitAllowedToMoveToNewPosition(selectedItem, end);
      console.log("isAllowed", isAllowed);
      if (isAllowed) {
        ctx.strokeStyle = "green";
        ctx.closePath();
        ctx.stroke();
        moveUnitToNewPosition(ctx, selectedItem, end);
        setIsDrawing(false);
      } else {
        ctx.strokeStyle = "red";
        ctx.closePath();
        ctx.stroke();
      }
    }
  }, [isDrawing, start, end, selectedItem]);
  function mousemove(e) {
    if (!isDrawing) return;
    setEnd({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  }
  function mouseup(e) {
    setIsDrawing(false);
  }
  const handleCanvasClick = (event) => {
    console.log("canvas clicked");
    const currentCoord = {
      x: event.nativeEvent.offsetX, // event.clientX, //- event.target.offsetLeft,
      y: event.nativeEvent.offsetY, //event.clientY, // - event.target.offsetTop,
    };
    setCoordinates(currentCoord);
    units.forEach((unit) => {
      console.log("x", unit.unitPositionX);
      console.log("y", event.target.offsetLeft);
      if (isIntersectPoint(currentCoord, unit)) {
        // alert("click on unit: " + unit.unitId);
        console.log("click on unit: " + unit.unitId);

        setSelectedItem(unit);
        // TOASK: why is this not working? setSelected take time to fill the state
        // I want to draw the circle only when the unit is selected
        // drawCircle(ctx, unit, unit.radius, "red");

        // draw the line
        setStart({
          x: unit.unitPositionX + 30,
          y: unit.unitPositionY + 30,
        });
        //  drawCircle(canvasRef.current.getContext("2d"), selectedItem, 30, "red");
      }
    });
  };
  function mousedown(e, ctx) {
    setIsDrawing(true);
    setStart({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    console.log("start", start);
    setEnd({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    console.log("end", end);
  }
  // function to move the unit to the new position
  const moveUnitToNewPosition = (ctx, unit, newPosition) => {
    unit.unitPositionX = newPosition.x;
    unit.unitPositionY = newPosition.y;
    placeAtGrid(unit);
    drawSelectedUnit(ctx, unit);
  };
  // play sound
  const playSound = () => {
    let audio = new Audio("/start.mp3");
    if (isPlayingSound == false) {
      console.log("play sound");
      audio.play();
      setIsPlayingSound(true);
    } else {
      audio.pause();
      console.log("stop sound");
      setIsPlayingSound(false);
    }
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
        <Button variant="contained" color="primary" onClick={playSound}>
          {" "}
          Play | Pause{" "}
        </Button>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
            <CardPlayer
              id={players[0].id}
              src={players[0].src}
              rank={players[0].rank}
              units={players[0].units}
            />
          </Box>
          {/* <CanvasImp
            onClick={handleCanvasClick}
            coordinates={coordinates}
            onMouseDown={mousedown}
          /> */}
          <canvas
            ref={canvasRef}
            onMouseDown={mousedown}
            onMouseMove={mousemove}
            onMouseUp={mouseup}
            onClick={handleCanvasClick}
            width="600"
            height="600"
            style={{
              border: "1px solid #ccc",
              backgroundImage: `url(${ukraine.src})`,
              width: "100%",
              height: "100%",
              backgroundPosition: "top left",
              backgroundRepeat: " no-repeat",
              backgroundSize: "100% 100%",
            }}
          />
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
