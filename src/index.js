
import './css/base.scss';

import domUpdates from './dom-update.js';

import Traveler from './Traveler-Class';
import TripsRepo from './TripsRepo-Class';
import DestinationsRepo from './DestinationsRepo-Class';

import datepicker from 'js-datepicker'
// const picker = datepicker('selector', 'options');
import { getData, postData } from './APICalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

const userName = document.getElementById('userName');
const planTrip = document.getElementById('planTrip');
const newTripForm = document.getElementById('NewTripForm');
const bookTrip = document.getElementById('bookTrip');
const backToMain = document.getElementById('backToMain');
let currentUser, allDestinations, trips;
window.onload = onStartup();

planTrip.addEventListener('click', () => {
  domUpdates.planTrip(allDestinations.destinations, trips);
});

bookTrip.addEventListener('click', () => {
  domUpdates.bookTrip(event, currentUser, allDestinations.destinations, trips);
})

backToMain.addEventListener('click', () => {
  planTrip.classList.toggle('hidden');
  userStats.classList.toggle('hidden');
  newTripForm.classList.toggle('hidden');
})

function onStartup() {
  fetchCurrentData()
};


function fetchCurrentData() {
  getData()
  .then(allData => {
    let userID = 2;
    trips = new TripsRepo(allData.tripsData);
    allDestinations = new DestinationsRepo(allData.destinationsData);
    currentUser = new Traveler(allData.travelerData.find(traveler => traveler.id === Number(userID)));
    currentUser.travelerTrips(trips.allTrips)
    let visitedDestinations = currentUser.destinationsVisited(allDestinations.destinations);
    domUpdates.greetUser(currentUser);
    domUpdates.displayTravelerInfo(trips.travelerAnnualSpent(userID, allDestinations.destinations), trips.travelerTrips(userID)); // refactor this
    domUpdates.displayDestinations(currentUser, currentUser.trips, currentUser.destinationsVisited(allDestinations.destinations));
  })
}

export function bookPlannedTrip(id, userID, destID, numTravelers, departDate, daysAway) {
  let data = {
    "id": id ,
    "userID": userID ,
    "destinationID": destID ,
    "travelers": numTravelers ,
    "date": departDate ,
    "duration": daysAway,
    "status": 'pending',
    "suggestedActivities": []
  }
  postData(data);
}

// function removePantry(arr) {
//   if (typeof(arr[0]) === "string") {
//     return
//   }
//   arr.forEach(ingredient => {
//     let data = {
//       "userID": user.id,
//       "ingredientID": ingredient.id,
//       "ingredientModification": Number(`-${ingredient.quantity.amount}`)
//     };
//     postData(data)
//   })
//}
