const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

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
      throw new Error(`Errore ${res.status}`);
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
    console.log("Errore", err);
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
  }).then((res) => {
    if (res.ok) {
      alert("Elemento eliminato con successo");
      window.location.replace("./index.html");
    } else {
      throw new Error(`Errore ${res.status}`);
    }
  });
};
