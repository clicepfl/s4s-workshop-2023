import "./App.css";
import { useState } from "react";
import { Exercise } from "./template";

function Home({ setExercise }) {
  return (
    <div>
      <div className="link" onClick={() => setExercise(1)}>
        Exercise 1
      </div>

      <div className="link" onClick={() => setExercise(2)}>
        Exercise 2
      </div>
    </div>
  );
}

function App() {
  const [exercise, setExercise] = useState(null);

  return (
    <div className="App">
      <div className="test"></div>
      {exercise ? (
        <Exercise
          number={exercise}
          goNextExercise={() => setExercise(exercise + 1)}
          goHome={() => setExercise(null)}
        />
      ) : (
        <Home setExercise={setExercise} />
      )}
    </div>
  );
}

export default App;
