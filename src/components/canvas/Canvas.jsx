import s from "./Canvas.module.scss";
import Scene from "../../webgl/Scene";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    Scene.setup(canvasRef.current);
  }, []);
  return <canvas ref={canvasRef} className={s.canvas}></canvas>;
};

export default Canvas;
