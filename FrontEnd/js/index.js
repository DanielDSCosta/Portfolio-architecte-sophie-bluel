const gallery = document.querySelector(".gallery");
let works = [];

/* Function pour aller chercher les fichiers dans l'API */
async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  works = data;
  createGallery(works);
  createModalGallery(works);
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
const closeGallerysecondModalButtonElement = document.querySelector(
  ".close-gallery-second-modal-button"
);

const suppElement = document.querySelector(".btn-supprimer");
const arrowLeftBtn = document.querySelector(".modal-return-btn");
const secondmodalgallery = document.querySelector(".modal-two");
const buttonAjouterElement = document.querySelector(".btn-ajouter");

openGalleryModalButtonElement.addEventListener("click", () => {
  modalGalleryElement.style.display = "flex";
});

closeGalleryModalButtonElement.addEventListener("click", () => {
  modalGalleryElement.style.display = "none";
});
closeGallerysecondModalButtonElement.addEventListener("click", () => {
  secondmodalgallery.style.display = "none";
});

const closeModal = () => {
  modalGalleryElement.style.display = "none";
  secondmodalgallery.style.display = "none";
};

// J'ecoute le autour la modale pour fermer la modale
addEventListener("click", (e) => {
  if (e.target === modalGalleryElement || e.target === secondmodalgallery) {
    closeModal();
  }
});

// J'ecoute l'appuie sur la touche esc pour fermer la modale
addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});

arrowLeftBtn.addEventListener("click", function (event) {
  event.preventDefault();
  secondmodalgallery.style.display = "none";
  modalGalleryElement.style.display = "flex";
});

buttonAjouterElement.addEventListener("click", function (event) {
  event.preventDefault();
  secondmodalgallery.style.display = "flex";
  modalGalleryElement.style.display = "none";
});

const galleryModal = document.querySelector(".galleryModal");

// Je cree la gallery dans le modal
const createModalGallery = (objet) => {
  let galleries = "";
  for (let work of objet) {
    galleries += `
    <figure class="gallery-modal-work">
        <img src="${work.imageUrl}">
        <i class="fa-solid fa-trash-can delete" id="${work.id}"></i>
        <figcaption>éditer</figcaption>
    </figure>`;
  }
  galleryModal.innerHTML = galleries;
  deleteWork();
};

//Supprimer gallery

const deleteWork = () => {
  const arrays = document.querySelectorAll(".delete");
  for (work of arrays) {
    work.addEventListener("click", (e) => {
      fetch("http://localhost:5678/api/works/" + e.target.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.ok) {
            newGallery();
            confirm("Voulez-vous vraiment supprimer la galerie?");
            console.log("Galerie supprimée !");
          }
        })
        .catch((error) => {
          console.log("Une erreur c'est produite" + error);
        });
      console.log(e.target.id);
    });
  }
};

suppElement.addEventListener("click", function (event) {
  event.preventDefault();
  if (confirm("Voulez-vous vraiment supprimer la galerie?")) {
    console.log("Galerie supprimée !");
    closeModale();
  }
});

// Je fais la mise a jour des galeries
const newGallery = () => {
  fetch("http://localhost:5678/api/works/")
    .then((resp) => resp.json())
    .then((data) => {
      createGallery(data);
      createModalGallery(data);
    });
};

// Deuxième modal

const newWorksForm = document.getElementById("new-form");
const inputImageContainer = document.getElementById("input-image-container");
const exampleImage = document.getElementById("example-img");
const fileImage = document.getElementById("file-img");
const imageInput = document.getElementById("img-input");
const imageRestriction = document.getElementById("image-restriction");

// Fonction pour effacer la formulaire modale 2
const clearModalTwo = () => {
  newWorksForm.reset();
  inputImageContainer.style.display = "flex";
  exampleImage.style.display = "flex";
  fileImage.style.display = "none";
  imageRestriction.style.display = "flex";
};

// J'ecoute si la photo est selectione, j'efface le contenue du containeur
// et je remplace avec une photo miniature
imageInput.onchange = () => {
  const [file] = imageInput.files;
  if (file) {
    fileImage.src = URL.createObjectURL(file);
    inputImageContainer.style.display = "none";
    imageRestriction.style.display = "none";
    exampleImage.style.display = "none";
    fileImage.style.display = "flex";
  }
};

//Validation

const fileValue = document.querySelector('input[type="file"]');
const titleValue = document.getElementById("title-input");
const categoryValue = document.getElementById("category");
const buttonValidate = document.querySelector(".btn-valider");

const errorMsg = document.getElementById("error-msg");

// Je recupere les info du formulaire et cree une objet
// J'envoie au backend
const fetchNewWorks = () => {
  const formData = new FormData();
  formData.append("image", fileValue.files[0]);
  formData.append("title", titleValue.value);
  formData.append("category", Number(categoryValue.value));

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      addNewWorkGallery(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// J'ecoute le bouton valider si toutes les champs sont remplis sinon message d'erreur
newWorksForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchNewWorks();
  if (
    titleValue.value === "" ||
    Number(categoryValue.value) === 0 ||
    fileValue.files[0] === undefined
  ) {
    errorMsg.innerText = "Veuillez remplir tous les champs pour continuer.";
  }
  clearModalTwo();
});

// Je recupere les travaux et je mets les galeries a jour
const addNewWorkGallery = () => {
  fetch("http://localhost:5678/api/works/")
    .then((resp) => resp.json())
    .then((data) => {
      createGallery(data);
      createModalGallery(data);
    });
};

// Je check si tout est remplis dans la form et je change la couleur du bouton valider
titleValue.addEventListener("change", checkForm);
categoryValue.addEventListener("change", checkForm);
fileValue.addEventListener("change", checkForm);

function checkForm() {
  if (
    titleValue.value !== "" &&
    categoryValue.value !== "" &&
    fileValue.files[0] !== undefined
  ) {
    buttonValidate.style.backgroundColor = "#1D6154";
    errorMsg.innerText = "";
  } else {
    buttonValidate.style.backgroundColor = "#A7A7A7";
  }
}
