import React, { useRef, useEffect, useState } from "react";

const CanvasImp = (props) => {
  const canvasRef = useRef(null);
  let { coordinates } = props;
  console.log(coordinates);
  // const [selectedGrid, useSelectedGrid]=
  // const units = [
  //   {
  //     unitId: 1,
  //     unitType: "tank1",
  //     unitPositionX: 200,
  //     unitPositionY: 300,
  //     src: "/tankblue.png",
  //   },
  //   {
  //     unitId: 2,
  //     unitType: "tank2",
  //     unitPositionX: 100,
  //     unitPositionY: 300,
  //     src: "/tankblue.png",
  //   },
  //   {
  //     unitId: 3,
  //     unitType: "tank3",
  //     unitPositionX: 300,
  //     unitPositionY: 300,
  //     src: "/tankblue.png",
  //   },
  // ];
  // console.log(units);

  // const [selectedGrid, useSelectedGrid] = useState(null);
  // const [selectedUnit, useSelectedUnit] = useState(null);
  // const [selectedUnitPosition, useSelectedUnitPosition] = useState(null);
  // const [selectedUnitType, useSelectedUnitType] = useState(null);
  // const [selectedUnitId, useSelectedUnitId] = useState(null);
  // const [selectedUnitSrc, useSelectedUnitSrc] = useState(null);
  // const [selectedUnitRank, useSelectedUnitRank] = useState(null);
  // const [selectedUnitPlayerId, useSelectedUnitPlayerId] = useState(null);
  // const [selectedUnitPlayerRadius, useSelectedUnitPlayerRadius] = useState(null);
  // const [selectedUnitPlayerSrc, useSelectedUnitPlayerSrc] = useState(null);

  // function to draw the grid
  const drawGrid1 = (ctx, width, height) => {
    // draw the grid
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += 50) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  };
  // function to listen to the mouse click
  const onMouseClick = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // console.log("x: " + x + " y: " + y);
    // console.log("x: " + Math.floor(x / 50) + " y: " + Math.floor(y / 50));
    // console.log("x: " + Math.floor(x / 50) * 50 + " y: " + Math.floor(y / 50) * 50);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50)
  };

  // function to draw the units
  const drawUnits = (ctx, units) => {
    // draw the units
    units.forEach((unit) => {
      const img = new Image();
      img.src = unit.src;
      img.onload = () => {
        ctx.drawImage(img, unit.unitPositionX, unit.unitPositionY, 50, 50);
      };
    });
  };
  // function to listen to mouse move event
  const onMouseMove = (e) => {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    // console.log("x: " + x + " y: " + y);
    // console.log("x: " + Math.floor(x / 50) + " y: " + Math.floor(y / 50));
    // console.log("x: " + Math.floor(x / 50) * 50 + " y: " + Math.floor(y / 50) * 50);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50) * 50 + 25);
    // console.log("x: " + Math.floor(x / 50) * 50 + 25 + " y: " + Math.floor(y / 50)
  };
  function moveUnit(e, ctx, unit, end) {
    // draw the line
    ctx.beginPath();
    ctx.moveTo(unit.x, unit.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();
  }
  // function to draw the selected grid
  const drawSelectedGrid = (ctx, x, y) => {
    // draw the selected grid
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, 50, 50);
  };
  // function to draw the selected unit
  const drawSelectedUnit = (ctx, x, y, src) => {
    // draw the selected unit
    const img = new Image();
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, x, y, 50, 50);
    };
  };
  // function to liseen to mouse down event
  const onMouseDown = (e) => {};
  const draw = (ctx, frameCount) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.fillStyle = "#000000";
    // ctx.beginPath();
    // ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    // ctx.fill();
  };

  function getBaseContext(canvas) {
    const context = canvas.getContext("2d");

    return context;
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

  // draw rect with color
  const drawRect = (ctx, leftX, topY, width, height, drawColor) => {
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX, topY, width, height);
    ctx.stroke();
  };

  // draw image
  const drawImage = (ctx, src, px, py) => {
    let image = new Image();
    image.src = src;

    ctx.drawImage(image, 0, 0, ctx.width, ctx.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    //const context = canvas.getContext("2d");
    const context = getBaseContext(canvas);
    // change width and height to our boundries
    canvas.width = "600";
    canvas.height = "600";
    const image1 = new Image();
    const image = new Image();
    let frameCount = 0;
    let animationFrameId;

    context.clearRect(0, 0, canvas.width, canvas.height);

    //draw clicked corrdinate
    // draw(context, coordinates);
    // drawRect(context, coordinates.x - 250, coordinates.y - 87, 40, 40, "red");
    // context.fillText("here", coordinates.x - 250, coordinates.y - 87);

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      // draw our canvas
      context.lineWidth = 2;
      context.strokeStyle = "#000000";

      context.strokeRect(0, 0, canvas.width, canvas.height);
      drawGrid(context, 600, 60, 600, 60);
      drawRect(context, 100, 100, 50, 50, "red");

      image.src = "/tankred.png";
      context.drawImage(image, 0, 0);
      image1.src = "/tankblue.png";
      context.drawImage(image1, 240, 240);
      // context.drawImage(image1, 240, 240);
      // if we want to use a function
      // image.onclick(() => {
      //   console.log("clicked");
      //   return "3";
      // });
      // drawImage(context, "/tankred.png", 240, 240);

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [coordinates, draw]);

  return <canvas ref={canvasRef} {...props} />;
};

export default CanvasImp;
