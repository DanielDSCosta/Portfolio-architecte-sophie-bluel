// Je recupere mes balises dans le dom
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("userLogin");
const error = document.querySelector(".error");

const BASE_API_URL = "http://localhost:5678/api";

// J'ecoute le submit du bouton de mon login
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Je stock les valeur des mes variables
  const data = {
    email: email.value,
    password: password.value,
  };

  // Je place les options pour le fetch dans une variable
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };

  // Je fait la requéte a l'API
  fetch(`${BASE_API_URL}/users/login`, options)
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // Je sauvegarde le token dans le local storage
        localStorage.setItem("token", data.token);

        // Je renvoie sur la page d'accueille
        window.location.href = "./index.html";
      }

      if (!data.token) {
        error.textContent = "Erreur dans l’identifiant ou le mot de passe";
      }

      form.reset();
    });
});
