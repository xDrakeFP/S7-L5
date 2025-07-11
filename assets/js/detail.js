const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

const alertError = (tipo, messaggio) => {
  const alertbox = document.getElementById("messaggio");
  const alertcol = document.getElementById("alertcol");
  alertbox.className = `alert alert-${tipo}`;
  alertbox.textContent = messaggio;
  alertcol.classList.remove("d-none");
};

fetch(endpoint + "/" + eventId, {
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzdlZTc4Y2RkZjAwMTU1ZDY3YWIiLCJpYXQiOjE3NTIyMjE2NzgsImV4cCI6MTc1MzQzMTI3OH0.AtlXCgvBIHI1F43mYHdwk227UegyzevWx_wR43wCu2s",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      alertError("danger", `Errore nel caricamento : ${res.status}`);
      throw new Error(`${res.status}`);
    }
  })
  .then((data) => {
    console.log("Data", data);
    document.getElementById("spinner-container").classList.add("d-none");
    const immagine = document.querySelector("img");
    immagine.setAttribute("src", data.imageUrl);
    document.getElementById("name").textContent = data.name;
    document.getElementById("description").textContent = data.description;
    document.getElementById("brand").textContent = data.brand;
    document.getElementById("price").textContent = data.price + "€";
  })
  .catch((err) => {
    console.log(err);
  });

const editAlbum = function () {
  location.assign("./backoffice.html?eventId=" + eventId);
};

const deleteAlbum = function () {
  fetch(endpoint + "/" + eventId, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzdlZTc4Y2RkZjAwMTU1ZDY3YWIiLCJpYXQiOjE3NTIyMjE2NzgsImV4cCI6MTc1MzQzMTI3OH0.AtlXCgvBIHI1F43mYHdwk227UegyzevWx_wR43wCu2s",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Elemento eliminato con successo");
        window.location.replace("./index.html");
      } else {
        alertError("danger", `Errore nel caricamento : ${res.status}`);
        throw new Error(`${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const confirmDeleteAlbum = () => {
  const conferma = confirm("Sei sicuro di voler eliminare questo elemento?");
  if (conferma) {
    deleteAlbum();
  }
};
