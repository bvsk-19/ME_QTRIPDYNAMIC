import config from "../conf/index.js";
async function init() {
  //Fetches list of all cities along with their images and description
  let root= config.backendEndpoint;
  let cities = await fetchCities(root);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities(root) {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  //console.log(root);
try{
 let response= await fetch(root+"/cities");
 let data =  await response.json();
 return data;
}
catch(err){
  return null;
}
}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
let images_container=document.createElement("div");
images_container.className="tile col-6 col-md-3 p-2";
images_container.style.width="18 rem";
let innerHTML=`<a id=${id} href="pages/adventures/?city=${id}"><img src="${image}" alt="${id}"> <div class="tile-text text-white text-center">
<h5>${city}</h5>
<p>${description}</p>
</a>
</div>`
images_container.innerHTML=innerHTML;
document.getElementById("data").appendChild(images_container);
}

export { init, fetchCities, addCityToDOM };
