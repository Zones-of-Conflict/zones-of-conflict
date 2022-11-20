import { Box, Typography, Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
// import CanvasImp from "../src/components/CanvasImp";

import Navbar from "../src/components/Navbar";
import CardPlayer from "../src/components/CardPlayer";
import { formatUnits } from "ethers/lib/utils";
import { MainContext } from "../src/contexts/MainContext";
import { GAMEMASTER_DATA } from "../src/constants/contractData";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import Donetsk from "../public/Donetsk.png";
import { match } from "assert";
import { Signer } from "ethers";

const Canvas = () => {
  // no defination for setCoordinates found
  const [coordinates, setCoordinates] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });
  // later use the player id to get the units
  const canvasRef = useRef(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const { address } = useAccount();
  //contract instance for reading data
  const provider = useProvider();
  const { data: signer } = useSigner();
  const GAMEMASTER_READ = useContract({
    address: GAMEMASTER_DATA.testnetAddress,
    abi: GAMEMASTER_DATA.abi,
    signerOrProvider: provider,
  });
  const GAMEMASTER_WRITE = useContract({
    address: GAMEMASTER_DATA.testnetAddress,
    abi: GAMEMASTER_DATA.abi,
    signerOrProvider: signer,
  });

  const [player, setPlayer] = useState() as any;
  const [matchUnits, setMatchUnits] = useState() as any;
  const [normalized, setNormalized] = useState(false);
  const [match, setMatch] = useState() as any;

  // function setCoordinates({}) {}
  // const setPlayer=() => { };

  //getMatch
  useEffect(() => {
    const getPlayer = async () => {
      const playerFetch = await GAMEMASTER_READ?.addressToPlayer(address);
      setPlayer(playerFetch);
    };
    GAMEMASTER_READ && address && getPlayer();

    const getMatch = async () => {
      const matchFetch = await GAMEMASTER_READ?.matchIdToMatch(player.matchId);
      setMatch(matchFetch);
    };
    GAMEMASTER_READ && player && getMatch();

    const getUnits = async () => {
      const units = await GAMEMASTER_READ?.getMatchUnits(player?.matchId);
      const normalizedUnits = units.map((unit) => {
        return {
          id: Number(unit.id),
          owner: unit.owner,
          unitType: unit.unitType == 0 ? "Infantry" : unit.unitType == 1 ? "Tank" : "Drone",
          action:
            unit.action == 0
              ? "Idle"
              : unit.action == 1
              ? "Moving"
              : unit.action == 2
              ? "Battling"
              : "Dead",
          hp: Number(unit.hp),
          attack: Number(unit.attack),
          armor: Number(unit.armor),
          currentX: Number(unit.currentX),
          currentY: Number(unit.currentY),
          targetX: Number(unit.targetX),
          targetY: Number(unit.targetY),
          matchId: Number(unit.matchId),
          enemyId: Number(unit.enemyId),
          //src: match?.playerA.owner === address.toLowerCase() ? "/tank1.png" : "/tank2.png",
          src: "/tank1.png",
        };
      });
      setMatchUnits(normalizedUnits);
      setNormalized(true);
    };
    player && normalized == false && getUnits();
  }, [GAMEMASTER_READ, player]);

  const players = [
    {
      id: 1,
      radius: 40,
      src: "/player.png",
      rank: "Sergeant",
      units: [
        {
          unitId: 1,
          unitType: "Infantry",
          src: "/tank1.png",
        },
        {
          unitId: 2,
          unitType: "Tank",
          src: "/tank1.png",
        },
        {
          unitId: 3,
          unitType: "Drone",
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
          unitType: "Infantry",
          src: "/tank2.png",
        },
        {
          unitId: 2,
          unitType: "Tank",
          src: "/tank2.png",
        },
        {
          unitId: 3,
          unitType: "Drone",
          src: "/tank2.png",
        },
      ],
    },
  ];

  async function setTarget(_unitId, _targetX, _targetY) {
    console.log("unitId", _unitId);
    // await GAMEMASTER_WRITE?.setUnitTarget(

    //   _unitId.toString(),
    //   Math.floor(_targetX / 60).toString(),
    //   Math.floor(_targetY / 60).toString()
    // );
  }

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
    let xGrid = Math.floor(unit.currentX * 60);
    let yGrid = Math.floor(unit.currentY * 60);
    // if (xGrid > 9) xGrid = 9;
    // if (yGrid > 9) yGrid = 9;
    // unit.currentX = unit.currentX * 60;
    // unit.currentY = unit.currentY * 60;
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
    let b = calculateInterval(unit.currentX * 60);
    let d = calculateInterval(unit.currentY * 60);
    const intersect = a.includes(b) && c.includes(d);
    return a == b && c == d;
  };

  // function to draw the units
  const drawUnits = (ctx, matchUnits) => {
    // draw the units
    matchUnits?.forEach((unit) => {
      placeAtGrid(unit); // place the unit in the middle of the grid
      const img = new Image();
      img.src = unit.src;
      img.onload = () => {
        ctx.drawImage(img, unit.currentX * 60, unit.currentY * 60, 60, 60);
      };
    });
  };

  // draw circle
  const drawCircle = (ctx, unit, radius, drawColor) => {
    ctx.beginPath();
    let x = unit.currentX * 60 + 30;
    let y = unit.currentY * 60 + 30;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#003300";
    ctx.closePath();
  };
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
      drawUnits(ctx, matchUnits);
    };
    render();

    if (selectedItem) {
      drawCircle(ctx, selectedItem, 30, "green");
      let x = selectedItem.currentX + 30;
      let y = selectedItem.currentY + 30;
      ctx.moveTo(x, y);

      ctx.closePath();
      ctx.stroke();
      //draw crosshair
      ctx.beginPath();
      ctx.moveTo(end.x, end.y - 15);
      ctx.lineTo(end.x, end.y + 15);
      ctx.moveTo(end.x - 15, end.y);
      ctx.lineTo(end.x + 15, end.y);
      ctx.fillStyle = "#ffffff";
      if (!isIntersectPoint({ x: end.x, y: end.y }, selectedItem)) {
        ctx.fillText("Set target", end.x + 10, end.y - 10);
        ctx.strokeStyle = "red";
        ctx.closePath();
        ctx.stroke();
      }

      ctx.fillText(
        "HP:" + selectedItem.hp,
        selectedItem.currentX * 60 + 50,
        selectedItem.currentY * 60 + 15
      );
      ctx.fillText(
        "Attack:" + selectedItem.attack,
        selectedItem.currentX * 60 + 50,
        selectedItem.currentY * 60 + 35
      );
      ctx.fillText(
        "Action:" + selectedItem.action,
        selectedItem.currentX * 60 + 50,
        selectedItem.currentY * 60 + 55
      );
      setTarget(selectedItem.unitId, end.x, end.y);
      setIsDrawing(false);
    }
  }, [isDrawing, start, end, selectedItem, matchUnits]);
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
    const currentCoord = {
      x: event.nativeEvent.offsetX, // event.clientX, //- event.target.offsetLeft,
      y: event.nativeEvent.offsetY, //event.clientY, // - event.target.offsetTop,
    };
    setCoordinates(currentCoord);
    matchUnits.forEach((unit) => {
      if (isIntersectPoint(currentCoord, unit)) {
        // alert("click on unit: " + unit.unitId);

        //if selectedItem.id == unit.id => set selectedItem = null
        console.log("Selecteditem ID", selectedItem?.id);
        console.log("Unit ID", unit.id);
        if (selectedItem && selectedItem.id == unit.id) {
          setSelectedItem(null);
        } else {
          if (!selectedItem) {
            setSelectedItem(unit);
            console.log("click on unit: ", unit);
          }
        }
      }
    });
  };
  function mousedown(e, ctx) {
    setIsDrawing(true);
    setStart({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setEnd({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  }

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
    <Box display={"flex"} flexDirection={"column"} bgcolor={"grey.100"} minHeight={"100vh"} gap={5}>
      <Navbar />

      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={4}>
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
            onMouseDown={mousedown as any}
            onMouseMove={mousemove}
            onMouseUp={mouseup}
            onClick={handleCanvasClick}
            width="600"
            height="600"
            style={{
              border: "1px solid #ccc",
              backgroundImage: `url(${Donetsk.src})`,
              width: "100%",
              height: "100%",
              backgroundPosition: "top left",
              backgroundRepeat: "no-repeat",
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
