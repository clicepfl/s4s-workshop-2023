export function dessinerChaine(turtle, string) {
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    switch (char) {
      case "F":
        turtle.avancer();
        break;
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
        console.error(`Caractère invalide: ${char}`);
        break;
    }
  }
}
