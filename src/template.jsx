import Ex1 from "./ex1";
import Ex2 from "./ex2";

export function Exercise({ number, goNextExercise, goHome }) {
  return (
    <section>
      <h1>Exercice {number}</h1>
      <div>{number === 1 ? <Ex1 /> : number === 2 ? <Ex2 /> : <></>}</div>
      {number < 2 ? (
        <div className="link" onClick={goNextExercise}>
          Prochain exercice
        </div>
      ) : (
        <></>
      )}
      <div className="link" onClick={goHome}>
        Accueil
      </div>
    </section>
  );
}
