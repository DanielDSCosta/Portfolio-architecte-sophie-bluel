const gallery = document.querySelector(".gallery");
let works = [];

/* Function pour aller chercher les fichiers dans l'API */
async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  works = data;
  createGallery(works);
}
fetchWorks();

/* Function pour créer la gallerie */
function createGallery(objet) {
  let galleries = "";
  for (let work of objet) {
    galleries += `
      <figure>
          <img src="${work.imageUrl}">
          <figcaption>${work.title}</figcaption>
      </figure>`;
  }
  gallery.innerHTML = galleries;
}

/* Function pour créer les boutons */
function createButtonFilters() {
  document.querySelector(".filtres").innerHTML = `
  <button class="buttonTous">Tous</button>
  <button class="buttonObjets">Objets</button>
  <button class="buttonAppartements">Appartements</button>
  <button class="buttonHotelRestaurants">Hôtels & restaurants</button>`;
}

/* Initialisation de la variable CATEGORIES */
const CATEGORIES = {
  reset: 0,
  objects: 1,
  flat: 2,
  hostel: 3,
};

/* Gestion du changement de categories */
const handleFilterWorks = (categoryId = CATEGORIES.objects) => {
  if (categoryId === CATEGORIES.reset) return works;

  return works.filter((event) => {
    return event.category.id === categoryId;
  });
};

/* Gestion du Filled au click de la categorie */
const toggleActiveButtonStyles = (element) => {
  Array.from(document.querySelector(".filtres").children).forEach(
    (filterElement) => {
      if (filterElement === element) {
        return filterElement.classList.add("btnFilled");
      }

      filterElement.classList.remove("btnFilled");
    }
  );
};

/* Lancement des functions */
fetchWorks(works);
createGallery(works);
createButtonFilters();

/* Evenement on click celon les boutons */
document.querySelector(".buttonTous").addEventListener("click", () => {
  const workFiltered = handleFilterWorks(CATEGORIES.reset);

  createGallery(workFiltered);
  toggleActiveButtonStyles(document.querySelector(".buttonTous"));
});

document.querySelector(".buttonObjets").addEventListener("click", () => {
  const workFiltered = handleFilterWorks(CATEGORIES.objects);

  createGallery(workFiltered);
  toggleActiveButtonStyles(document.querySelector(".buttonObjets"));
});

document.querySelector(".buttonAppartements").addEventListener("click", () => {
  const workFiltered = handleFilterWorks(CATEGORIES.flat);

  createGallery(workFiltered);
  toggleActiveButtonStyles(document.querySelector(".buttonAppartements"));
});

document
  .querySelector(".buttonHotelRestaurants")
  .addEventListener("click", () => {
    const workFiltered = handleFilterWorks(CATEGORIES.hostel);

    createGallery(workFiltered);
    toggleActiveButtonStyles(document.querySelector(".buttonHotelRestaurants"));
  });

/* LOGIN et Modale */

/* Recupère les données dans le storage */
const token = localStorage.getItem("token");

// Je check si le token est dans le localstorage si oui je montre la bannière et les boutons modifier
// sinon je montre les boutons pour filtrer les travaux
const userLoginCheck = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      changeLoginToLogout();
    } else {
      createButtonFilters();
    }
  });
};
userLoginCheck();

// Je change le nom login vers logout en mode edition
const changeLoginToLogout = () => {
  const logoutElement = document.getElementById("logout");
  logoutElement.textContent = "logout";
  logoutElement.addEventListener("click", () => {
    localStorage.clear("token");
  });
};

// Récupérer les éléments de la modale
const modale = document.querySelector("modale");
const openModaleBtn = document.querySelector("fa-regular fa-pen-to-square");
const closeModaleBtn = document.querySelector(".closeModale");
const selfDestructBtn = document.querySelector("selfDestructBtn");
const arrowLeftBtn = document.querySelector(".arrowLeft");
const modale2 = document.querySelector(".modale2");

// Fonction pour ouvrir la modale
function openModale() {
  modale.style.display = "block";
}

// Fonction pour fermer la modale
function closeModale() {
  modale.style.display = "none";
}

// Gérer l'événement clic sur le bouton pour ouvrir la modale
openModaleBtn.addEventListener("click", openModale);

// Gérer l'événement clic sur le bouton pour fermer la modale
closeModaleBtn.addEventListener("click", closeModale);

// Gérer l'événement clic sur le bouton pour supprimer la galerie
selfDestructBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Empêcher le comportement de lien par défaut
  if (confirm("Voulez-vous vraiment supprimer la galerie?")) {
    // Code pour supprimer la galerie
    console.log("Galerie supprimée !");
    closeModale(); // Fermer la modale après la suppression
  }
});

// Gérer l'événement clic sur le bouton pour revenir à la modale principale depuis modale2
arrowLeftBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Empêcher le comportement de lien par défaut
  modale2.style.display = "none"; // Cacher modale2
});

// Gérer l'événement clic sur le bouton "Ajouter une photo" pour afficher modale2
openModaleBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Empêcher le comportement de lien par défaut
  modale2.style.display = "block"; // Afficher modale2
});

// Fonction pour afficher ou masquer les boutons "modifier" en fonction de l'état de connexion
function updateButtonVisibility() {
  const isLoggedInUser = userLoginCheck(); // Vérifiez l'état de connexion en utilisant la fonction définie ci-dessus.
  const editButtons = document.querySelectorAll(
    ".fa fa-light fa-pen-to-square"
  );

  // Parcours de tous les boutons "modifier"
  editButtons.forEach((a) => {
    // Affiche le bouton si l'utilisateur est connecté
    // ou masque le bouton si l'utilisateur n'est pas connecté
    button.style.display = isLoggedInUser ? "block" : "none";
  });
}

// Appelez la fonction pour mettre à jour la visibilité des boutons au chargement de la page.
document.addEventListener("DOMContentLoaded", updateButtonVisibility);
