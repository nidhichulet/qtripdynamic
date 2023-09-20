import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description

  let cities = await fetchCities();
  // console.log(config);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  //make use axios
  try {
    // fetch(config.backendEndpoint+"/cities")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    const res = await fetch(config.backendEndpoint + "/cities");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // const cityContainer=document.querySelector(".row");
  // document.getElementById("data").appendChild(div);
  let divId = document.getElementById("data");

  let div1 = document.createElement("div");
  div1.setAttribute("class", "col-12 col-sm-6 col-lg-3 my-3");

  let aTag = document.createElement("a");
  aTag.setAttribute("href", `pages/adventures/?city=${id}`);
  aTag.setAttribute("id", id);

  let div2 = document.createElement("div");
  div2.setAttribute("class", "tile");

  let div3 = document.createElement("div");
  div3.setAttribute("class", "tile-text");

  let h5Tag = document.createElement("h5");
  h5Tag.textContent = city;

  let pTag = document.createElement("p");
  pTag.textContent = description;

  div3.appendChild(h5Tag);
  div3.appendChild(pTag);

  let imgTag = document.createElement("img");
  imgTag.setAttribute("src", image);
  imgTag.setAttribute("alt", city);

  div2.appendChild(div3);
  div2.appendChild(imgTag);

  aTag.appendChild(div2);
  div1.appendChild(aTag);

  divId.appendChild(div1);
}

export { init, fetchCities, addCityToDOM };
