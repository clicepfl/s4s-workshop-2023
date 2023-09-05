export function dessinerChaine(turtle, chaine) {
  for (let i = 0; i < chaine.length; i++) {
    switch (chaine[i]) {
      case "+":
        turtle.tournerGauche();
        break;
      case "-":
        turtle.tournerDroite();
        break;
      case "[":
        turtle.sauvegarderPosition();
        break;
      case "]":
        turtle.chargerPosition();
        break;
      default:
        turtle.avancer();
        break;
    }
  }
}

export function appliquerRegle(chaine, regle) {
  let resultat = "";

  for (let i = 0; i < chaine.length; i++) {
    if (chaine[i] === "F") {
      resultat += regle;
    } else {
      resultat += chaine[i];
    }
  }

  return resultat;
}

export function appliquerRegles(chaine, regles) {
  let resultat = "";

  for (let i = 0; i < chaine.length; i++) {
    if (regles[chaine[i]] !== undefined) {
      resultat += regles[chaine[i]];
    } else {
      resultat += chaine[i];
    }
  }

  return resultat;
}
