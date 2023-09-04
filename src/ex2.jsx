import { useEffect, useRef, useState } from "react";
import { createTurtle } from "./turtle";
import * as ex2 from "./exercices/ex2";

export default function Ex2() {
  const ref = useRef(null);
  const [string, setString] = useState("");
  const [ruleType, setRuleType] = useState("norule");
  const [view, setView] = useState({ x: 50, y: 50 });
  const [turtleSettings, setTurtleSettings] = useState({
    segment: 10,
    angle: Math.PI / 3,
  });
  const [turtle, setTurtle] = useState(null);

  function draw() {
    if (ref.current && turtle) {
      turtle.dessiner(view.x, view.y, view.scale);
    }
  }

  useEffect(() => {
    setTurtle(
      createTurtle(
        ref.current.getContext("2d"),
        turtleSettings.angle,
        turtleSettings.segment
      )
    );
  }, [turtleSettings]);

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
    <div className="horizontal-container">
      <div className="vertical-container canvas-inputs">
        <p>
          Angle (en degrés):
          <input
            type="number"
            className="number-input"
            placeholder="Angle"
            defaultValue={60}
            onChange={(e) =>
              setTurtleSettings({
                ...turtleSettings,
                angle: (Math.PI / 180) * parseFloat(e.target.value),
              })
            }
          />
        </p>
        <p>
          Taille de segment:
          <input
            type="number"
            className="number-input"
            placeholder="Segment length"
            defaultValue={30}
            onChange={(e) =>
              setTurtleSettings({
                ...turtleSettings,
                segment: parseFloat(e.target.value),
              })
            }
          />
        </p>
        <button onClick={draw}>Redessiner</button>
        <button onClick={() => setView({ x: 50, y: 50, scale: 1 })}>
          Réinitialiser la vue
        </button>

        <div className="separator" />
        <select onChange={(e) => setRuleType(e.target.value)}>
          <option value="norule">Chaîne simple</option>
          <option value="singlerule">Règle unique</option>
          <option value="multiplerules">Règles multiples</option>
        </select>
        {ruleType === "norule" ? (
          <NoRules setString={setString} />
        ) : ruleType === "singlerule" ? (
          <SingleRule string={string} setString={setString} />
        ) : (
          <MultipleRules string={string} setString={setString} />
        )}
      </div>

      <canvas
        ref={ref}
        onMouseMove={(e) => {
          if (e.buttons & 1) {
            setView({
              ...view,
              x: view.x + 1.2 * e.movementX,
              y: view.y + 1.2 * e.movementY,
            });
          }
        }}
        width={500}
        height={500}
      />
    </div>
  );
}

function NoRules({ setString }) {
  return (
    <>
      <p>Chaîne à dessiner:</p>
      <textarea
        placeholder="F+F+F"
        onChange={(e) => setString(e.target.value)}
      />
    </>
  );
}

function SingleRule({ string, setString }) {
  const [axiom, setAxiom] = useState("F");
  const [rule, setRule] = useState("F+F--F+F");
  const [iterations, setIterations] = useState(1);

  useEffect(() => {
    let result = axiom;
    for (let i = 0; i < iterations; ++i) {
      result = ex2.appliquerRegle(result, rule);
    }
    setString(result);
  });

  return (
    <>
      <p>Chaîne initiale:</p>
      <input
        value={axiom}
        placeholder="F"
        onChange={(e) => setAxiom(e.target.value)}
      />
      <p>Règle:</p>
      <input
        value={rule}
        placeholder="F+F--F+F"
        onChange={(e) => setRule(e.target.value)}
      />

      <p>
        Itérations:
        <input
          type="number"
          className="number-input"
          value={iterations}
          placeholder="1"
          onChange={(e) => setIterations(parseInt(e.target.value))}
        />
      </p>

      <div className="separator" />
      <p>Résultat:</p>
      <p>{string.length < 100 ? string : "<trop grand>"}</p>
    </>
  );
}

function MultipleRules({ string, setString }) {
  const [axiom, setAxiom] = useState("F");
  const [rules, setRules] = useState([
    ["F", "G-F-G"],
    ["G", "F+G+F"],
  ]);
  const [iterations, setIterations] = useState(1);

  useEffect(() => {
    let result = axiom;

    const r = rules.reduce((acc, val) => ({ ...acc, [val[0]]: val[1] }), {});

    for (let i = 0; i < iterations; ++i) {
      result = ex2.appliquerRegles(result, r);
    }
    setString(result);
  });

  return (
    <>
      <p>Chaîne initiale:</p>
      <input
        value={axiom}
        placeholder="F"
        onChange={(e) => setAxiom(e.target.value)}
      />
      <p>Règles:</p>
      {rules.map((r, i) => (
        <p>
          <input
            className="character-input"
            value={r[0]}
            placeholder="F+F--F+F"
            onChange={(e) =>
              setRules(
                rules.map((c, idx) => (i !== idx ? c : [e.target.value, c[1]]))
              )
            }
          />
          {"->"}
          <input
            style={{ width: "60%" }}
            value={r[1]}
            placeholder="F+F--F+F"
            onChange={(e) => {
              setRules(
                rules.map((c, idx) => (i !== idx ? c : [c[0], e.target.value]))
              );
            }}
          />
        </p>
      ))}
      <button onClick={() => setRules([...rules, ["", ""]])}>+</button>

      <p>
        Itérations:
        <input
          type="number"
          className="number-input"
          value={iterations}
          placeholder="1"
          onChange={(e) => setIterations(parseInt(e.target.value))}
        />
      </p>
      <div className="separator" />
      <p>Résultat:</p>
      <p>{string.length < 100 ? string : "<trop grand>"}</p>
    </>
  );
}
