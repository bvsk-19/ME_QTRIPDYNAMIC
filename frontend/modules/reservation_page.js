import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
let url= config.backendEndpoint+"/reservations/";
//console.log(url);
try{
let res= await fetch(url);
let data= await res.json();
//console.log(data);
return data;
}
catch(error){
  //console.log(error);
  return null;
}

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
console.log(reservations);
//reservations={};
let keys=Object.keys(reservations);
console.log(keys.length);
let date;
let time;
let baseUrl="../detail/?adventure=";
let url;
const options={
  year: 'numeric', month: 'long', day: 'numeric'
}
if(keys.length){
document.getElementById("no-reservation-banner").style.display="none";
document.getElementById("reservation-table-parent").style.display="block";
let tbody = document.getElementById("reservation-table");
//console.log(tbody);

reservations.forEach((item) => {
  let child=document.createElement("tr");
  date=new Date(item.date);
  date=date.toLocaleDateString("en-IN");
  time=new Date(item.time);
  console.log(time);
  time=time.toLocaleDateString("en-IN",options)+", "+time.toLocaleTimeString("en-IN");
  console.log(time);
  url=`${baseUrl}${item.adventure}`;
  console.log(url);
  child.innerHTML=`<td>${item.id}</td>
  <td>${item.name}</td>
  <td>${item.adventureName}</td>
  <td>${item.person}</td>
  <td>${date}</td>
  <td>${item.price}</td>
  <td>${time}</td>
  <td><button id="${item.id}" class="reservation-visit-button"><a href="${url}">Visit Adventure</a></button></td>`;
  tbody.appendChild(child);
})
}
else{
  document.getElementById("no-reservation-banner").style.display="block";
  document.getElementById("reservation-table-parent").style.display="none";
}
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
