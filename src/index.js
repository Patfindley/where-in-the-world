
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

import domUpdates from './dom-update.js';

import TripsRepo from './TripsRepo-Class'
import DestinationsRepo from './DestinationsRepo-Class'

import {
  getData,
  postData
} from './APICalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

const userName = document.querySelector('.user-name');


window.onload = onStartup();


function onStartup() {
  fetchCurrentData()
}


function fetchCurrentData() {
  getData()
  .then(allData => {
    let userID = 2;
    let currentUser = allData.travelerData.find(traveler => {
      return traveler.id === Number(userID);
    });
    let trips = new TripsRepo(allData.tripsData);
    let allDestinations = new DestinationsRepo(allData.destinationsData);
    let visitedDestinations = trips.destinationsVisited(userID, allDestinations.destinations);
    domUpdates.greetUser(currentUser);
    domUpdates.displayTravelerInfo(trips.travelerAnnualSpent(userID, allDestinations.destinations), trips.travelerTrips(userID)); // refactor this
    domUpdates.displayDestinations(currentUser, trips.travelerTrips(userID), visitedDestinations);
    // domUpdates.displayTripInfo(currentUser, trips.destinationsVisited(userID, allDestinations.destinations), allDestinations.destinations);
  })
}
