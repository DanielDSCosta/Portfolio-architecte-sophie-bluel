const gallery = document.querySelector(".gallery");
let works = [];

const fetchWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");

  return response.json();
};

function createGallery(works) {
  let galleries = "";

  for (let work of works) {
    galleries += `
      <figure>
          <img src="${work.imageUrl}">
          <figcaption>${work.title}</figcaption>
      </figure>`;
  }

  gallery.innerHtml = galleries;
}

function createButtonFilters() {
  document.querySelector(".filtres").innerHTML = `
  <button class="buttonTous">Tous</button>
  <button class="buttonObjets">Objets</button>
  <button class="buttonAppartements">Appartements</button>
  <button class="buttonHotelRestaurants">Hôtels & restaurants</button>`;
}

const CATEGORIES = {
  reset: 0,
  objects: 1,
  flat: 2,
  hostel: 3,
};

const handleFilterWorks = (categoryId = CATEGORIES.objects) => {
  if (catergoryId === CATEGORIES.reset) return works;

  return works.filter((event) => {
    return event.category.id === categoryId;
  });
};

const toggleActiveButtonStyles = (element) => {
  document.querySelector(".filtres").forEach((filterElement) => {
    if (filterElement === element) {
      return filterElement.classList.add("btnFilled");
    }

    filterElement.classList.remove("btnFilled");
  });
};

works = fetchWorks();
createGallery(works);
createButtonFilters();

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
