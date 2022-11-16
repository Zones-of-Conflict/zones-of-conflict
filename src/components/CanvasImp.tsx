import React, { useRef, useEffect, useState } from "react";

const CanvasImp = (props) => {
  const canvasRef = useRef(null);
  let { coordinates } = props;
  console.log(coordinates);
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
    draw(context, coordinates);
    drawRect(context, coordinates.x - 250, coordinates.y - 87, 40, 40, "red");
    context.fillText("here", coordinates.x - 250, coordinates.y - 87);

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
      context.drawImage(image1, 240, 240);
      // if we want to use a function
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
