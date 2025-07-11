// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzdlZTc4Y2RkZjAwMTU1ZDY3YWIiLCJpYXQiOjE3NTIyMjE2NzgsImV4cCI6MTc1MzQzMTI3OH0.AtlXCgvBIHI1F43mYHdwk227UegyzevWx_wR43wCu2s"

const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

class Album {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const albumForm = document.getElementById("album-form");

const resetForm = () => {
  albumForm.reset();
};

albumForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imgInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const newAlbum = new Album(
    nameInput.value,
    descInput.value,
    brandInput.value,
    imgInput.value,
    priceInput.value
  );
  console.log("Album details :", newAlbum);

  let finalURL;
  if (eventId) {
    finalURL = endpoint + "/" + eventId;
  } else {
    finalURL = endpoint;
  }

  let methodToUse;
  if (eventId) {
    methodToUse = "PUT";
  } else {
    methodToUse = "POST";
  }
  console.log("Metodo", methodToUse);

  fetch(finalURL, {
    method: methodToUse,
    body: JSON.stringify(newAlbum),
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzdlZTc4Y2RkZjAwMTU1ZDY3YWIiLCJpYXQiOjE3NTIyMjE2NzgsImV4cCI6MTc1MzQzMTI3OH0.AtlXCgvBIHI1F43mYHdwk227UegyzevWx_wR43wCu2s",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("Form Salvato");
        albumForm.reset();
      } else {
        throw new Error(`Errore ${res.status}`);
      }
    })
    .catch((err) => {
      console.log("Errore", err);
    });
});
