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

// Je cree le banner en mode edition
const createBanner = () => {
  const divBanner = document.createElement("div");
  divBanner.className = "loggedIn banner";
  document.querySelector("body").prepend(divBanner);
  document.querySelector(".banner").innerHTML = `
    <i class="fa-regular fa-pen-to-square"></i>
	<p>Mode édition</p>
	<button>publier les changements</button>
    `;
};

// Je check si le token est dans le localstorage si oui je montre le banner et les boutons modifier
// sinon je montre les boutons pour filtrer les travaux
const userLoginCheck = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      changeLoginToLogout();
      createBanner();
      createModifierBtns();
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

// Je cree les 2 boutons pour les modifications en mode edition,
// avec l'ecoute pour ouvrir et fermer la modale
const createModifierBtns = () => {
  document.querySelector("#introduction figure figcaption").innerHTML = `
    <p><i class="fa-regular fa-pen-to-square"></i> modifier</p>`;
  const modifier = "modifier";
  document.querySelector("#portfolio span").innerHTML = `
    <a id="linkModal"><i class="fa-regular fa-pen-to-square"></i> ${modifier}</a>`;
  document.querySelector("#linkModal").addEventListener("click", openModal);
  document
    .querySelector("#modal-close-btn")
    .addEventListener("click", closeModal);
};
