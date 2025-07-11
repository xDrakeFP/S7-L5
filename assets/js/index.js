const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const alertError = (tipo, messaggio) => {
  const alertbox = document.getElementById("messaggio");
  const alertcol = document.getElementById("alertcol");
  alertbox.className = `alert alert-${tipo}`;
  alertbox.textContent = messaggio;
  alertcol.classList.remove("d-none");
};

const displayAlbums = () => {
  fetch(endpoint, {
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
      document.getElementById("spinner-container").classList.add("d-none");
      console.log("data", data);

      const row = document.getElementById("events-row");
      if (data.length === 0) {
        row.innerHTML = `<div class="col">
        <p class="text-center"> Non ci sono album disponibili per la vendita </p>
        </div>`;
      } else {
        data.forEach((album) => {
          row.innerHTML += `
            <div class="col">
              <div class="card h-100 d-flex flex-column">
                <img src= "${album.imageUrl}" class="card-img-top" alt="Cover Album">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${album.name}</h5>
                  <p class="card-text">${album.description}</p>
                  <p class="card-text">${album.brand}</p>
                  <p class="card-text">${album.price}€</p>
                  <a href="./detail.html?eventId=${album._id}" class="btn btn-primary">Vai ai dettagli</a>
                  <a href="./backoffice.html?eventId=${album._id}" class="btn btn-secondary mt-1">Modifica</a>
                </div>
              </div>
            </div>
          `;
        });
        console.log("Data", data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
displayAlbums();
