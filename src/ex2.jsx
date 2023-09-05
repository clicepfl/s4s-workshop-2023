import { useEffect, useRef, useState } from "react";
import { createTurtle } from "./turtle";
import * as ex2 from "./exercices/ex2";

export default function Ex2() {
  const ref = useRef(null);
  const [string, setString] = useState("");
  const [ruleType, setRuleType] = useState("norule");
  const [view, setView] = useState({ x: 50, y: 50 });
  const [turtleSettings, setTurtleSettings] = useState({
    segment: 15,
    angle: 60,
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
        (Math.PI / 180) * turtleSettings.angle,
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
    <div>
      <div className="horizontal-container">
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
        <div className="vertical-container canvas-inputs">
          <p>
            Angle (en degrés):
            <input
              type="number"
              className="number-input"
              placeholder="Angle"
              value={turtleSettings.angle}
              onChange={(e) =>
                setTurtleSettings({
                  ...turtleSettings,
                  angle: parseFloat(e.target.value),
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
              value={turtleSettings.segment}
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
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p>
          Dans cet exercice, vous allez petit-à-petit compléter le code pour
          générer et dessiner des L-Systems. L'état de chaque étape pourra être
          visualisé. Sélectionner simplement le type de chaîne à dessiner dans
          le menu déroulant, puis remplissez les champs nécessaires.
          <br />
          <br />
          Vous pouvez également modifier les paramètres tels que l'angle de
          rotation et la taille d'un segment.
        </p>
        <h2>Partie 1</h2>
        <p>
          Vous allez commencer par complétez la fonction{" "}
          <span className="code">dessinerChaine()</span>, qui prends en
          paramètre une chaine de caractères, ainsi qu'un objet{" "}
          <span className="code">turtle</span> permettant de dessiner. Pour
          rappel, les différentes opérations sont:
          <ul>
            <li>
              <span className="code">"+"</span>: Tourner dans le sens
              trigonométrique
            </li>
            <li>
              <span className="code">"-"</span>: Tourner dans le sens
              anti-trigonométrique
            </li>
            <li>
              <span className="code">"["</span>: Commencer une nouvelle branche
              (soit enregistrer la position actuelle pour y revenir plus tard)
            </li>
            <li>
              <span className="code">"]"</span>: Terminer la branche (revenir à
              la position du début de la branche)
            </li>
            <li>
              Par simplicité, vous pouvez considérer que tout les autres
              caractères signifie dessiner une ligne droite
            </li>
          </ul>
          Note: Vous pouvez vous référer au bas de la page pour avoir la
          description des fonctions associées à l'objet{" "}
          <span className="code">turtle</span>
        </p>
        <h2>Partie 2</h2>
        <p>
          Complétez la fonction <span className="code">appliquerRegle()</span>,
          pour qu'elle remplace toutes les occurrence du caractère{" "}
          <span className="code">"F"</span> dans la chaine donnée par la règle.
          <br />
          <br />
          Indice: Vous pouvez créer une nouvelle chaine et y ajouter les
          éléments pertinents.
        </p>
        <h2>Partie 3</h2>
        <p>
          Pour cette dernière partie, vous allez implémenter la fonction{" "}
          <span className="code">appliquerRegles()</span> pour pouvoir avoir
          plusieurs règles, liées à des caractères différents. La variables{" "}
          <span className="code">regles</span> est un dictionnaire, dont les
          paires clé-valeur sont les caractères à remplacer et leur règle.
          <br />
          <br />
          Indice: Pour savoir si un dictionnaire contient une clé, vous pouvez
          simplement utiliser <span className="code">if(dictonnaire[cle])</span>
          . Si le dictionnaire contient cette clé, il renverra la valeur
          associée, qui sera alors interprétée comme{" "}
          <span className="code">true</span>. Sinon, il renverra{" "}
          <span className="code">undefined</span>, équivalent à{" "}
          <span className="code">false</span>.
        </p>
        <h2>
          Objet <span className="code">turtle</span>
        </h2>
        L'objet <span className="code">turtle</span> contient les fonctions
        suivantes, qui peuvent être appelées avec la notation{" "}
        <span className="code">turtle.fonction()</span>.
        <ul>
          <li>
            <span className="code">avancer()</span>: Avance de la longueur d'un
            segment et dessine une ligne sur son chemin
          </li>
          <li>
            <span className="code">tournerGauche()</span>: Tourne sur elle-même
            de l'angle de rotation vers la gauche.
          </li>
          <li>
            <span className="code">tournerDroite()</span>: Tourne sur elle-même
            de l'angle de rotation vers la droite.
          </li>
          <li>
            <span className="code">sauvegarderPosition()</span>: Enregistre la
            position et orientation de la tortue.
          </li>
          <li>
            <span className="code">chargerPosition</span>: Charge la dernière
            position enregistrée de la tortue.
          </li>
        </ul>
        Note: Les fonctions <span className="code">sauvegarderPosition()</span>{" "}
        et <span className="code">chargerPosition</span> utilise une "pile" (ou
        "stack"). Lorsque <span className="code">sauvegarderPosition()</span>{" "}
        est appelée, elle place l'état actuelle de la tortue sur le haut de la
        pile. La fonction <span className="code">chargerPosition</span> récupère l'état tout en haut de la pile, et le retire. La pile est
        une structure de données "dernier entré, premier sorti" (LIFO, "last in
        first out" en anglais).
      </div>
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
