
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
const keys = Object.keys(adventures);
//console.log(keys);
keys.forEach((key) => {
let adventures_grid=document.createElement("div");
adventures_grid.className ="col-lg-3 col-md-3 col-6";
adventures_grid.innerHTML=`<a class="activity-card" id=${adventures[key].id} href="detail/?adventure=${adventures[key].id}">
<img src="${adventures[key].image}" alt="${adventures[key].name}">
<div class="d-flex flex-wrap justify-content-around">
<p style="flex-basis:50%;align-self:flex-start;flex-grow:1;flex-shrink:1;">${adventures[key].name}<p>
<p style="flex-basis:50%;align-self:flex-start;flex-grow:1;flex-shrink:1;">${adventures[key].costPerHead}</p>
<p>Duration</p>
<p>${adventures[key].duration}</p>
</div>
<p class="category-banner">${adventures[key].category}</p>
</a>`;
document.getElementById("data").appendChild(adventures_grid);
})
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  //console.log(list,low,high);
  let filteredList= list.filter((item) => {
    return item.duration >= low ;
  });
  filteredList= filteredList.filter((item) => {
    return item.duration <= high ;
  });
  //console.log(filteredList);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //console.log(list,categoryList);
  let filteredList= list.filter((item) => categoryList.includes(item.category));
  //console.log(filteredList);
  return filteredList;
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
let filteredList = [];

//console.log(list,filters)
// filter by duration
//console.log(typeof filters['duration']);
// case 1: when we have duration and category applied
if(filters.duration!="" && filters['category'].length>0){
  let durationLimits= filters['duration'].split('-');
  let filteredListByDuration=filterByDuration(list,parseInt(durationLimits[0]),parseInt(durationLimits[1]));
  //console.log(filteredListByDuration);
  // filter by category
  let categoryList=Array.from(filters['category'].values());
  let filteredListByCategory=filterByCategory(list,categoryList);
  //console.log(filteredListByCategory)
  filteredList=filteredListByDuration.filter((item) => categoryList.includes(item.category))
  //console.log(filteredList)
  return filteredList;
}
// case 2: when we have duration applied
else if(filters.duration!="") {
  let durationLimits= filters.duration.split('-');
  //console.log(durationLimits);
  filteredList=filterByDuration(list,parseInt(durationLimits[0]),parseInt(durationLimits[1]));
  //console.log(filteredList);
  return filteredList;
}
// case 3: when we have category applied
else if(filters['category'].length>0) {
  let categoryList=Array.from(filters['category'].values());
  filteredList=filterByCategory(list,categoryList);
  return filteredList;
}
// case 4: when we have no filters applied
else {
  return filteredList;
}
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  // if(typeof filterItem === "string"){
  //   filters["duration"]=filterItem;
  // }
  // else{
  //   filters["category"]=filterItem;
  // }
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
let filters= JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
let categoryList = Array.from(filters['category'].values());
//console.log(categoryList);
let categoryListItem;
categoryList.forEach((item) => {
  categoryListItem=document.createElement("p");
  categoryListItem.innerText=item;
  categoryListItem.className="category-filter";
  document.getElementById("category-list").appendChild(categoryListItem);
})
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
