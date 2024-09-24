import React, { useState } from "react";
import s from "./Picker.module.scss";
import Scene from "../../webgl/Scene";

const Picker = () => {
  const defaultActiveIndex = 5;
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const pickVisualiser = (index) => {
    Scene.changeVisualiser(index);
    setActiveIndex(index);
  };

  return (
    <div className={s.picker}>
      <div
        onClick={() => pickVisualiser(0)}
        className={activeIndex === 0 ? s.active : ""}
      >
        Torus
      </div>
      <div
        onClick={() => pickVisualiser(1)}
        className={activeIndex === 1 ? s.active : ""}
      >
        Line
      </div>
      <div
        onClick={() => pickVisualiser(2)}
        className={activeIndex === 2 ? s.active : ""}
      >
        Logo IUT
      </div>
      <div
        onClick={() => pickVisualiser(3)}
        className={activeIndex === 3 ? s.active : ""}
      >
        Sphere
      </div>
      <div
        onClick={() => pickVisualiser(4)}
        className={activeIndex === 4 ? s.active : ""}
      >
        Board
      </div>
      <div
        onClick={() => pickVisualiser(5)}
        className={activeIndex === 5 ? s.active : ""}
      >
        Cover
      </div>
    </div>
  );
};

export default Picker;
