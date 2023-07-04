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
