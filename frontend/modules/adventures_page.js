import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(queryParam) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(queryParam);
  // const currentUrl=window.location;
  // console.log(currentUrl);

  const queryParams = new URLSearchParams(queryParam);
  const cityId = queryParams.get("city");
  return cityId;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const adventuresDetails = await fetch(
      config.backendEndpoint + `/adventures/?city=${city}`
    );
    const adventuresData = await adventuresDetails.json();
    return adventuresData;
  } catch (err) {
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataId = document.getElementById("data");
  adventures.forEach((adventure) => {
     console.log(adventure);
    const divTag = document.createElement("div");
    divTag.setAttribute(
      "class",
      "col-12 col-sm-6 col-lg-3 my-3  position-relative"
    );

    divTag.innerHTML = `  
   <a href="detail/?adventure=${adventure.id}" id=${adventure.id}> 
     
   <div class="category-banner"><h6>${adventure.category}</h6></div>
    <div class="card activity-card ">
    

  <img src="${adventure.image}" class="card-img-top" alt="${adventure.name}">
  <div class="d-md-flex justify-content-between mt-3 px-2 w-100">
    <h5>${adventure.name}</h5>
    <p class="card-text">₹${adventure.costPerHead}</p> 
  </div> 
  <div class="d-md-flex justify-content-between mt-3 px-2 w-100">
    <h5>Duration</h5>
    <p class="card-text">${adventure.duration} Hours</p>
 </div>
  </div> 
  </div>
  
  </a>  
  `;

    dataId.append(divTag);

    // let div1=document.createElement("div");
    // div1.setAttribute("class","container");

    // let div2=document.createElement("div");
    // div2.setAttribute("class","content pt-0");

    // // http://52.66.60.185:8082/adventures/?city=bengaluru

    // let aTag =document.createElement("a");
    // aTag.setAttribute("href","detail/?adventure="`${adventure.id}`)
    // aTag.setAttribute("id",id)

    // // aTag.setAttribute("href", `pages/adventures/?city=${id}`);

    // let div3=document.createElement("div")
    // div3.setAttributeNS("class", "row")

    // let div4=document.createElement("div")
    // div4.setAttribute("class","col-12 col-sm-6 col-lg-3 my-3 ps-0")

    // let div5=document.createElement("div")
    // div5.setAttribute("class","adventure-card")

    // let imgTag=document.createElement("img");
    // imgTag.setAttribute("src",);
    // imgTag.setAttribute("alt",);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filterDuration = [];
  list.map((adventure) => {
    if (adventure.duration >= low && adventure.duration <= high)
      filterDuration.push(adventure);
  });
  console.log(filterDuration);
  return filterDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  console.log(categoryList);
  return list.filter((adventure) => categoryList.includes(adventure.category));

  // *****2nd method****/////
  //   const selectedList=[];
  //   for(let i=0;i<list.length;i++)
  //   {
  // for(let j=0;j<categoryList.length;j++)
  // {
  //   if(list[i].category===categoryList[j])
  //   selectedList.push(list[i])
  // }
  //   }
  // console.log(selectedList,"slectedlist");
  //   return selectedList;
}

// filters object looks like this filters = { duration: "", category: [] };

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // console.log(list);
  //console.log(filters);
  let filterdList;
  if (filters.category.length > 0 && filters.duration.length > 0) {
    const lower = parseInt(filters.duration.split("-")[0]);
    const upper = parseInt(filters.duration.split("-")[1]);
    filterdList = filterByDuration(list, lower, upper);
    filterdList = filterByCategory(filterdList, filters.category);
    return filterdList;
  } else if (filters.category.length > 0) {
    filterdList = filterByCategory(list, filters.category);
    return filterdList;
  }

  // Place holder for functionality to work in the Stubs
  else if (filters.duration.length > 0) {
    const lower = parseInt(filters.duration.split("-")[0]);
    const upper = parseInt(filters.duration.split("-")[1]);
    filterdList = filterByDuration(list, lower, upper);
    return filterdList;
  }
  // Place holder for functionality to work in the Stubs
  return list;

  // if (filters.category.length > 0)
  //   list = filterByCategory(list, filters.category);
  // if (filters.duration.length > 0) {
  //   list = filterByDuration(
  //     list,
  //     filters.duration.split("-")[0],
  //     filters.duration.split("-")[1]
  //   );
  // }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filtersParsedData = JSON.parse(window.localStorage.getItem("filters"));
  // console.log(filtersParsedData);

  // Place holder for functionality to work in the Stubs
  return filtersParsedData;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryListDiv = document.getElementById("category-list");
  categoryListDiv.innerHTML = "";
  // ["cycling","party","hillsside"]
  filters.category.forEach((category) => {
    const divElem = document.createElement("div");
    divElem.setAttribute("class", "category-filter");
    divElem.textContent = category;
    categoryListDiv.appendChild(divElem);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
