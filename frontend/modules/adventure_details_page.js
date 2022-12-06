import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
//console.log(search);
const urlParams = new URLSearchParams(search);
const myParam = urlParams.get('adventure');
//console.log(urlParams);

  return myParam;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
//console.log(adventureId);

try{
  let response= await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);;
  let data =  await response.json();
  //console.log(data);
  return data;
 }
 catch(err){
   return null;
 }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
//console.log(adventure);

    //let adventureDetailParent=document.getElementsByClassName("adventure-detail-card");
    //console.log(adventure.subtitle);
    document.getElementById("adventure-name").innerHTML=adventure.name;
    document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
    let images=adventure.images;
    let imageElement;
    images.forEach((image) => {
      //console.log(image);
      imageElement=document.createElement("img");
      imageElement.setAttribute("src",image);
      imageElement.setAttribute("class","activity-card-image");
      //console.log(imageElement);
      document.getElementById("photo-gallery").append(imageElement);
    });
    document.getElementById("adventure-content").innerHTML=adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
//console.log(images);
document.getElementById("photo-gallery").innerHTML=`<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-inner">
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`;
let Parent = document.querySelector(".carousel-inner");
let child;
images.forEach((image) => {
  child=document.createElement("div");
  child.setAttribute("class","carousel-item");
  child.innerHTML=`<img src="${image}" class="d-block w-100 activity-card-image">`;
  //console.log(child);
  Parent.append(child);
})
document.getElementsByClassName("carousel-item")[0].setAttribute("class","carousel-item active");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
//console.log(adventure);
if(adventure.available ===  true){
document.getElementById("reservation-panel-sold-out").style.display="none";
document.getElementById("reservation-panel-available").style.display="block";
document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
}
else{
  document.getElementById("reservation-panel-sold-out").style.display="block";
  document.getElementById("reservation-panel-available").style.display="none";
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
//console.log(persons);
let totalCost=persons*adventure.costPerHead;
document.getElementById("reservation-cost").innerHTML=totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  //console.log(adventure);
  let form = document.querySelector("#myForm");
  //console.log(form);

  form.addEventListener("submit", async (Event) => {
    Event.preventDefault();
    let url=config.backendEndpoint+"/reservations/new";
    //console.log(url);
    let formElements=form.elements;
    //console.log(formElements);
    let bodyString={
      name : formElements['name'].value,
      date : formElements['date'].value,
      person : formElements['person'].value,
      adventure : adventure.id
      };
      console.log(bodyString);
      try{
      let res = await fetch(url,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyString)
        });
        if(res.ok){
          alert('success');
          window.location.reload();
          }
          else{
            alert('Failed');
          }
        }
        catch(error){
          console.log(error);
          return null;
        }
          })
        }        

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  //console.log(adventure.reserved);
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
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
