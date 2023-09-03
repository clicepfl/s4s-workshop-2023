import { useEffect, useRef, useState } from "react";
import { createTurtle } from "./turtle";

export default function Ex2() {
  const ref = useRef(null);
  const [string, setString] = useState("");
  const [turtle, setTurtle] = useState(null);
  const [view, setView] = useState({ x: 20, y: 20, scale: 3 });

  function draw() {
    if (ref.current && turtle) {
      turtle.dessiner(view.x, view.y, view.scale);
    }
  }

  useEffect(() => {
    const turtle = createTurtle(
      ref.current.getContext("2d"),
      (Math.PI * 2) / 3,
      10
    );
    setTurtle(turtle);
  }, []);

  useEffect(() => {
    if (turtle) {
      turtle.commencer();
      turtle.avancer();
      turtle.tournerDroite();
      turtle.avancer();
      turtle.tournerDroite();
      turtle.avancer();

      draw();
    }
  }, [turtle]);

  useEffect(() => {
    draw();
  }, [view]);

  return (
    <div>
      <canvas
        ref={ref}
        onMouseMove={(e) => {
          if (e.buttons & (1 === 1)) {
            setView({
              ...view,
              x: (view.x += e.movementX),
              y: (view.y += e.movementY),
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
    </div>
  );
}
