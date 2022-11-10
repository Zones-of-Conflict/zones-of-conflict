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
  // grid of the canvas
  const drawGrid = (ctx, xLength, xStep, yLength, yStep) => {
    for (var x = 0; x <= xLength; x += xStep) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, xLength);
    }
    for (var y = 0; y <= yLength; y += yStep) {
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
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // change width and height to our boundries
    canvas.width = "1200";
    canvas.height = "600";

    let frameCount = 0;
    let animationFrameId;
    context.clearRect(0, 0, canvas.width, canvas.height);

    //draw clicked corrdinate
    draw(context, coordinates);
    context.fillText("here", coordinates.x, coordinates.y);

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      // draw our canvas
      context.lineWidth = 2;
      context.strokeStyle = "#000000";

      context.strokeRect(0, 0, canvas.width, canvas.height);
      drawGrid(context, 1200, 100, 1200, 100);
      drawRect(context, 100, 100, 50, 50, "red");
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
