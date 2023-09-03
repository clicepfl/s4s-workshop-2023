import Ex1 from "./ex1";
import Ex2 from "./ex2";

export function Exercise({ number, goNextExercise, goHome }) {
  return (
    <section>
      <h1>Exercise {number}</h1>
      <div>{number === 1 ? <Ex1 /> : number === 2 ? <Ex2 /> : <></>}</div>
      <div className="link" onClick={goNextExercise}>
        Next exercise
      </div>
      <div className="link" onClick={goHome}>
        Home
      </div>
    </section>
  );
}
