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

/* Function pour créer la galerie */
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

/* Function pour créer les boutons de filtre */
function createButtonFilters() {
  document.querySelector(".filtres").innerHTML = `
    <button class="buttonTous">Tous</button>
    <button class="buttonObjets">Objets</button>
    <button class="buttonAppartements">Appartements</button>
    <button class="buttonHotelRestaurants">Hôtels & restaurants</button>`;
}

/* Initialisation des catégories */
const CATEGORIES = {
  reset: 0,
  objects: 1,
  flat: 2,
  hostel: 3,
};

/* Gestion du changement de catégories */
const handleFilterWorks = (categoryId = CATEGORIES.objects) => {
  if (categoryId === CATEGORIES.reset) return works;

  return works.filter((work) => {
    return work.category.id === categoryId;
  });
};

/* Gestion du style au clic de la catégorie */
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

/* Lancement des fonctions */
createGallery(works);
createButtonFilters();

/* Événements au clic des boutons */
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

const logoutElement = document.getElementById("logout");
const token = localStorage.getItem("token");
const isLoggedIn = !!token;
const filtres = document.querySelector(".filtres");
const loggedInBannerElement = document.querySelector("#loggedin-banner");
const loggedInModifFirstElement = document.querySelector(
  ".loggedin-modif-intro"
);
const loggedInModifSecondElement = document.querySelector(".loggedin-modif");

loggedInBannerElement.style.display = isLoggedIn ? "flex" : "none";
logoutElement.textContent = isLoggedIn ? "logout" : "login";
loggedInModifFirstElement.style.display = isLoggedIn ? "flex" : "none";
loggedInModifSecondElement.style.display = isLoggedIn ? "inline" : "none";
filtres.style.display = isLoggedIn ? "none" : "flex";

logoutElement.addEventListener("click", () => {
  localStorage.clear("token");
});

// Récupérer les éléments de la modal
const modalGalleryElement = document.querySelector("#modal-gallery");
const openGalleryModalButtonElement = document.querySelector(
  "#open-gallery-modal-button"
);
const closeGalleryModalButtonElement = document.querySelector(
  ".close-gallery-modal-button"
);

const suppElement = document.querySelector(".btn-supprimer");
const arrowLeftBtn = document.querySelector(".modal-return-btn");
const secondmodalgallery = document.querySelector(".modal-two");

console.log(suppElement);
console.log(arrowLeftBtn);
console.log(secondmodalgallery);

openGalleryModalButtonElement.addEventListener("click", () => {
  modalGalleryElement.style.display = "flex";
});

closeGalleryModalButtonElement.addEventListener("click", () => {
  modalGalleryElement.style.display = "none";
});

// Gérer l'événement clic sur le bouton pour supprimer la galerie
suppElement.addEventListener("click", function (event) {
  event.preventDefault(); // Empêcher le comportement de lien par défaut
  if (confirm("Voulez-vous vraiment supprimer la galerie?")) {
    // Code pour supprimer la galerie
    console.log("Galerie supprimée !");
    closeModale(); // Fermer la modal après la suppression
  }
});

// Gérer l'événement clic sur le bouton pour revenir à la modal principale depuis modale2
arrowLeftBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Empêcher le comportement de lien par défaut
  secondmodalgallery.style.display = "none"; // Cacher modale2
});

// Gérer l'événement clic sur le bouton "Ajouter une photo" pour afficher modale2
openGalleryModalButtonElement.addEventListener("click", function (event) {
  event.preventDefault(); // Empêcher le comportement de lien par défaut
  secondmodalgallery.style.display = "block"; // Afficher modale2
});

/*const editLinks = document.querySelectorAll(".link-modal");

const updateButtonVisibility = () => {
  const isLoggedInUser = isLoggedIn; // Utilisez la variable isLoggedIn pour vérifier l'état de connexion
  const logoutElement = document.getElementById("logout");
  logoutElement.textContent = "logout";
  logoutElement.addEventListener("click", () => {
    localStorage.clear("token");
  });

  // Utilisez editLinks au lieu de editButtons
  editLinks.forEach((link) => {
    // Affiche le bouton si l'utilisateur est connecté
    // ou masque le bouton si l'utilisateur n'est pas connecté
    link.style.display = isLoggedInUser ? "block" : "none";
  });
};

// Appelez la fonction pour mettre à jour la visibilité des boutons au chargement de la page.
document.addEventListener("DOMContentLoaded", () => {
  updateButtonVisibility();
});*/
