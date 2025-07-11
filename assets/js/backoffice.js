// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzdlZTc4Y2RkZjAwMTU1ZDY3YWIiLCJpYXQiOjE3NTIyMjE2NzgsImV4cCI6MTc1MzQzMTI3OH0.AtlXCgvBIHI1F43mYHdwk227UegyzevWx_wR43wCu2s"

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

const finalUrl = () => {
  let final;
  if (eventId) {
    final = endpoint + "/" + eventId;
    return final;
  } else {
    final = endpoint;
    return final;
  }
};

const finalMethod = () => {
  let final;
  if (eventId) {
    final = "PUT";
    return final;
  } else {
    final = "POST";
    return final;
  }
};

const resetForm = () => {
  albumForm.reset();
};

const deleteForm = () => {
  fetch(finalUrl(), {
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
        window.location.replace("/index.html");
      } else {
        alertError("danger", `Errore nel caricamento : ${res.status}`);
        throw new Error(`${res.status}`);
      }
    })
    .catch((err) => {
      console.log("err");
    });
};

confirmDeleteForm = () => {
  const conferma = confirm("Sei sicuro di voler eliminare questo elemento?");
  if (conferma) {
    deleteForm();
  }
};

confirmResetForm = () => {
  const conferma = confirm("Sei sicuro di voler resettare il form?");
  if (conferma) {
    resetForm();
  }
};

if (eventId) {
  console.log("Event ID", eventId);
  console.log("Final Url", finalUrl());
  const nameInput = document.getElementById("name");
  const descInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imgInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  const cancelBtn = document.getElementById("cancella");
  cancelBtn.disabled = false;

  fetch(finalUrl(), {
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
      console.log(data);
      nameInput.value = data.name || "";
      descInput.value = data.description || "";
      brandInput.value = data.brand || "";
      imgInput.value = data.imageUrl || "";
      priceInput.value = data.price || "";
    })
    .catch((err) => {
      console.log(err);
    });
}

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

  fetch(finalUrl(), {
    method: finalMethod(),
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
        resetForm();
        if (finalMethod() === "PUT") {
          window.location.replace("./index.html");
        }
      } else {
        alertError("danger", `Errore nel caricamento : ${res.status}`);
        throw new Error(`${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
