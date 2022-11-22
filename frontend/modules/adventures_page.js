
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let regExp = /\?city=(?<city_name>\w+)/ ;
  let matching= search.match(regExp);
  let matchingArray = Array.from(matching);
  //console.log(matchingArray[1]);
  return matchingArray[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let response= await fetch(config.backendEndpoint+"/adventures/?city="+city);
    let data =  await response.json();
    //console.log(data);
    return data;
   }
   catch(err){
     return null;
   }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
//console.log(adventures);
adventures.forEach((adventure) => {
let adventures_grid=document.createElement("div");
adventures_grid.className ="col-lg-3 col-md-3 col-6";
adventures_grid.innerHTML=`<a class="activity-card" id=${adventure.id} href="detail/?adventure=${adventure.id}">
<img src="${adventure.image}" alt="${adventure.name}">
<div class="d-flex flex-wrap justify-content-around">
<p style="flex-basis:50%;align-self:flex-start;flex-grow:1;flex-shrink:1;">${adventure.name}<p>
<p style="flex-basis:50%;align-self:flex-start;flex-grow:1;flex-shrink:1;">${adventure.costPerHead}</p>
<p>Duration</p>
<p>${adventure.duration}</p>
</div>
<p class="category-banner">${adventure.category}</p>
</a>`;
document.getElementById("data").appendChild(adventures_grid);
})
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

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
