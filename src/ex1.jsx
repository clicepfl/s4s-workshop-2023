import { Exercise } from "./template";
import { useState } from "react";
import * as ex1 from "./exercices/ex1";

function Part1() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [operation, setOperation] = useState("multiply");
  const [result, setResult] = useState(0);

  return (
    <div className="exercise-part">
      <h2>Partie 1</h2>
      <p className="instructions">
        Dans cette première partie, le but est de reproduire l'exemple de
        l'addition/soustraction de deux nombres, mais avec une
        multiplication/division. Pour ce faire, complétez la fonction{" "}
        <span className="code">partie1()</span>.
      </p>
      <div className="horizontal-container">
        <input
          className="number-input"
          placeholder="Premier nombre"
          type="number"
          defaultValue="0"
          onChange={(e) => setA(e.target.value)}
        />
        <select onChange={(e) => setOperation(e.target.value)}>
          <option value="multiply">*</option>
          <option value="divide">/</option>
        </select>
        <input
          className="number-input"
          placeholder="Second nombre"
          type="number"
          defaultValue="0"
          onChange={(e) => setB(e.target.value)}
        />
      </div>
      <button
        onClick={() => setResult(ex1.partie1(a, b, operation === "multiply"))}
      >
        Calculer
      </button>
      <p>Résultat: {result}</p>
    </div>
  );
}

function Part2() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-1);
  const [result, setResult] = useState([]);

  return (
    <div className="exercise-part">
      <h2>Partie 2</h2>
      <p className="instructions">
        Ici, le but est de résoudre une équation du second degré dans les
        nombres réels. Pour ce faire, complétez la fonction{" "}
        <span className="code">partie2()</span>.
        <br />
        <br />
        Note: pour renvoyer plusieurs éléments, regroupez les dans un tableau:{" "}
        <span className="code">[a, b]</span>
      </p>
      <div className="horizontal-container">
        <input
          className="number-input"
          placeholder="a"
          type="number"
          defaultValue="1"
          onChange={(e) => setA(e.target.value)}
        />
        x² +
        <input
          className="number-input"
          placeholder="b"
          type="number"
          defaultValue="0"
          onChange={(e) => setB(e.target.value)}
        />
        x +
        <input
          className="number-input"
          placeholder="c"
          type="number"
          defaultValue="-1"
          onChange={(e) => setC(e.target.value)}
        />
        = 0
      </div>
      <button onClick={() => setResult(ex1.partie2(a, b, c))}>Résoudre</button>
      <p>Solutions: {JSON.stringify(result)}</p>
    </div>
  );
}

function Part3() {
  const [string, setString] = useState("abaccaaba");
  const [char, setChar] = useState("a");
  const [result, setResult] = useState(0);

  return (
    <div className="exercise-part">
      <h2>Partie 3</h2>
      <p className="instructions">
        Complétez la fonction <span className="code">partie3()</span> pour
        qu'elle compte le nombre d'occurrence d'un caractère donné dans une
        chaîne de caractères.
      </p>
      <input
        placeholder="abaccaaba"
        defaultValue="abaccaaba"
        onChange={(e) => setString(e.target.value)}
      />
      <br />
      Caractère à compter:{" "}
      <input
        className="character-input"
        placeholder="a"
        defaultValue="a"
        onChange={(e) => setChar(e.target.value)}
      />
      <br />
      <button onClick={() => setResult(ex1.partie3(string, char))}>
        Compter
      </button>
      <p>Nombre: {result}</p>
    </div>
  );
}

export default function Ex1() {
  return (
    <>
      <p className="instructions">
        Cet exercice a pour but de manier les concepts de programmation vus, tel
        que la déclaration et manipulation de variable, les conditions et les
        boucles.
        <br />
        <br />
        Tout cet exercice se déroulera dans le fichier{" "}
        <span className="code">exercices/ex1.js</span>.
      </p>
      <Part1 />
      <Part2 />
      <Part3 />
    </>
  );
}
