import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  // console.log(urlParams);

  const adventureParamId = urlParams.get("adventure");
  // console.log(adventureParamId);
  // Place holder for functionality to work in the Stubs
  return adventureParamId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const adventureDetails = await fetch(
      config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`
    );
    const adventureDetailsData = await adventureDetails.json();
    // console.log(adventureDetailsData)
    return adventureDetailsData;
    // Place holder for functionality to work in the Stubs
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  const adventureDetailsNameId = document.getElementById("adventure-name");
  const adventureDetailsSubTitleId =
    document.getElementById("adventure-subtitle");
  const adventureDetailsImageId = document.getElementById("photo-gallery");
  const adventureDetailsContentId =
    document.getElementById("adventure-content");
  //  console.log(adventure)
  adventureDetailsNameId.textContent = `${adventure.name}`;
  adventureDetailsSubTitleId.textContent = `${adventure.subtitle}`;
  adventure.images.forEach((image) => {
    const divTag = document.createElement("div");
    // const imageTag=document.createElement("img");
    // imageTag.src=image;
    divTag.innerHTML = `<img src=${image} class="w-100 activity-card-image"  alt=${adventure.name}/>`;
    adventureDetailsImageId.appendChild(divTag);
  });

  // adventureDetailsImageId.appendChild(divTag);
  adventureDetailsContentId.innerText = `${adventure.content}`;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  const adventureDetailsImageId = document.getElementById("photo-gallery");

  adventureDetailsImageId.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

  <div id="carousel-inner" class="carousel-inner">
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  // images.map((image, index) => {
  //   let img = document.createElement("div");
  //   img.className = `carousel-item ${index === 0 ? "active" : ""}`;
  //   img.innerHTML = `
  // <img src=${image}
  // class = "activity-card-image pb-3 pb-md-0"
  // />`;
  //   let carousel = document.getElementById("carousel-inner");
  //   console.log(carousel, "carousel");
  //   carousel.appendChild(img);
  // });

  const carouselInner = document.querySelector("#carousel-inner");

  images.forEach((image, index) => {
    const divTag = document.createElement("div");
    divTag.className = `carousel-item ${index == 0 ? "active" : ""}`;

    // if(index==0){
    // divTag.setAttribute("class","carousel-item active")
    // }
    // else{
    //   divTag.setAttribute("class","carousel-item")
    // }
    divTag.innerHTML += `<img src=${image} class="d-block w-100 image-height" alt=${images}>`;

    carouselInner.appendChild(divTag);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // if adventure is available or not
  if (adventure.available == true) {
    document.querySelector("#reservation-panel-sold-out").style.display =
      "none";
    document.querySelector("#reservation-panel-available").style.display =
      "block";
    const reservationCostID = document.querySelector(
      "#reservation-person-cost"
    );
    reservationCostID.textContent = adventure.costPerHead;
  } else {
    document.querySelector("#reservation-panel-sold-out").style.display =
      "block";
    document.querySelector("#reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(adventure);
  // console.log(persons);
  // const reservationCostID=document.querySelector("#reservation-person-cost");
  const totalCostId = document.querySelector("#reservation-cost");
  const totalCostPerHead = adventure.costPerHead * persons;
  return (totalCostId.textContent = totalCostPerHead);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation

  const formId = document.getElementById("myForm");

  formId.addEventListener("submit", async (e) => {
    e.preventDefault();
    // console.log(formId.elements.person.value);
    const dataObject = {
      name: formId.elements["name"].value,
      date: formId.elements.date.value,
      person: formId.elements.person.value,
      adventure: adventure.id,
    };
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      };
      console.log(options);

      const res = await fetch(
        config.backendEndpoint + `/reservations/new`,
        options
      );
      if (res.ok) {
        alert("Success!");
        location.reload();
      } else {
        alert("Failed!");
      }
    } catch (err) {
      console.log(err);
      alert("Failed!");
    }
  });

  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure)
  const bannerID = document.getElementById("reserved-banner");
  if (adventure.reserved == true) {
    bannerID.style.display = "block";
  } else {
    bannerID.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
