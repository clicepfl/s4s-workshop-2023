import { useEffect, useRef, useState } from "react";
import { createTurtle } from "./turtle";
import * as ex2 from "./exercices/ex2";

export default function Ex2() {
  const ref = useRef(null);
  const [string, setString] = useState("");
  const [turtle, setTurtle] = useState(null);
  const [view, setView] = useState({ x: 20, y: 20, scale: 1 });

  function draw() {
    if (ref.current && turtle) {
      turtle.dessiner(view.x, view.y, view.scale);
    }
  }

  useEffect(() => {
    const turtle = createTurtle(ref.current.getContext("2d"), Math.PI / 3, 30);
    setTurtle(turtle);
  }, []);

  useEffect(() => {
    if (turtle) {
      turtle.commencer();
      ex2.dessinerChaine(turtle, string);

      draw();
    }
  }, [turtle, string]);

  useEffect(() => {
    draw();
  }, [view]);

  return (
    <div>
      <canvas
        ref={ref}
        onMouseMove={(e) => {
          if (e.buttons & 1) {
            setView({
              ...view,
              x: (view.x += e.movementX / 2),
              y: (view.y += e.movementY / 2),
            });
          }
        }}
        onWheel={(e) => {
          const newScale = view.scale + e.deltaY / 300;
          setView({ ...view, scale: newScale < 0.1 ? 0.1 : newScale });
        }}
      ></canvas>
      <br />
      <button onClick={draw}>Redraw</button>
      <input onChange={(e) => setString(e.target.value)}></input>
    </div>
  );
}
