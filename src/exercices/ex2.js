export function dessinerChaine(turtle, string) {
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    switch (char) {
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
  let result = "";

  for (let i = 0; i < chaine.length; i++) {
    if (chaine[i] === "F") {
      result += regle;
    } else {
      result += chaine[i];
    }
  }

  return result;
}

export function appliquerRegles(chaine, regles) {
  let result = "";

  for (let i = 0; i < chaine.length; i++) {
    if (regles[chaine[i]] !== undefined) {
      result += regles[chaine[i]];
    } else {
      result += chaine[i];
    }
  }

  return result;
}
