/* =========================================================================
   MAILLON 3 — JAVASCRIPT : l'interface
   Les données arrivent du maillon Java, dans donnees.js :
     PILOTES = [{nom, ecurie, points, victoires}, ...]
     ECURIES = [{nom, points, victoires}, ...]
   Complétez les trois fonctions, puis ouvrez index.html dans le navigateur.
   ========================================================================= */

const { createElement } = require("react");

// 1. trierParPoints(liste) : renvoie une NOUVELLE liste triée par points
//    DÉCROISSANTS. La liste reçue ne doit pas être modifiée.
//    À points égaux, celui qui a le plus de victoires passe devant.
function trierParPoints(liste) {
  // À COMPLÉTER
  // Pour ne pas modigier la liste originale, on la copie avec [...liste]
  return [...liste].sort((a, b) => {
    // On compare les points de manière décroissant
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // On départage avec les victoire si les points sont égaux
    return b.victoires - a.victoires;
  });
}

// 2. remplirTableau(idCorps, liste) : remplit le <tbody> dont l'id est fourni.
//    Une ligne <tr> par entrée, avec dans l'ordre les cellules <td> :
//      rang (1, 2, 3...) | nom | écurie (chaîne vide si absente) | points | victoires
//    Chaque <tr> porte l'attribut data-nom. Un nouvel appel REMPLACE le contenu.
function remplirTableau(idCorps, liste) {
  // À COMPLÉTER
  const tbody = document.getElementById(idCorps);
  tbody.innerHTML = ""; // On remplace le contenu existant lors d'un nouvel appel.

  liste.forEach((element, index) => {
    const tr = document.createElement("tr");

    // On ajoute l'attribut data-nom sur le <tr>.
    tr.dataset.nom = element.nom;

    const rang = index + 1;
    const ecurie = element.ecurie || ""; // chaine vide si l'écurie null.

    const valeurs = [rang, element.nom, ecurie, element.points, element.victoires];

    // On crée un <td> pour chaque valeur.
    valeurs.forEach(valeur => {
      const td = document.createElement("td");
      td.textContent = valeur;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  const li = [];
}

// 3. marquerPodium(idCorps) : ajoute la classe CSS "podium" aux TROIS PREMIÈRES
//    lignes du tableau, et la retire de toutes les autres.
function marquerPodium(idCorps) {
  // À COMPLÉTER
  const podium = document.querySelectorAll(`#${idCorps} tr`);

  podium.forEach((tr, index) => {
    // On utilise 'toggle' pour pouvoir ajouter la classe "podium" au trois première lignes et la retirer au autres.
    tr.classList.toggle("podium", index < 3);
  });
}

/* --- FOURNI — NE PAS MODIFIER : affichage de la saison ------------------- */
function afficherSaison() {
  if (typeof PILOTES === "undefined") {
    return;
  }
  remplirTableau("corps-pilotes", trierParPoints(PILOTES));
  marquerPodium("corps-pilotes");
  remplirTableau("corps-ecuries", trierParPoints(ECURIES));
  marquerPodium("corps-ecuries");
}
