/**
 * Multiplie ou divise deux nombres
 * @param {number} a le premier nombre de l'opération
 * @param {number} b le second nombre de l'opération
 * @param {boolean} multiplier true s'il faut multiplier, false s'il faut diviser
 */
export function partie1(a, b, multiplier) {
  if (multiplier) {
    return a * b;
  } else {
    return a / b;
  }
}

/**
 * Multiplie ou divise deux nombres
 * @param {number} a le coefficient des x²
 * @param {number} b le coefficient des x
 * @param {number} c le coefficient scalaire
 */
export function partie2(a, b, c) {
  const delta = b ** 2 - 4 * a * c;

  if (delta > 0) {
    return [(-b + delta ** 0.5) / (2 * a), (-b - delta ** 0.5) / (2 * a)];
  } else if (delta === 0) {
    return [-b / (2 * a)];
  } else {
    return [];
  }
}

/**
 * Compte le nombre d'occurence d'un caractère dans une chaine de caractères
 * @param {string} chaine le coefficient des x²
 * @param {char} caractere le caractère à compter
 */
export function partie3(chaine, caractere) {
  let compte = 0;
  for (let i = 0; i < chaine.length; i++) {
    if (chaine[i] === caractere) {
      compte += 1;
    }
  }
  return compte;
}
