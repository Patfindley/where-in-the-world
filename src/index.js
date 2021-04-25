
import './css/base.scss';

import domUpdates from './dom-update.js';

import TripsRepo from './TripsRepo-Class'
import DestinationsRepo from './DestinationsRepo-Class'

import datepicker from 'js-datepicker'
// const picker = datepicker('selector', 'options');
import { getData, postData } from './APICalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

const userName = document.getElementById('userName');
const bookTrip = document.getElementById('bookTrip');
const newTripForm = document.getElementById('NewTripForm');
let allDestinations, trips;
window.onload = onStartup();

bookTrip.addEventListener('click', () => {
  domUpdates.bookTrip(allDestinations.destinations, trips);
});


function onStartup() {
  fetchCurrentData()
};


function fetchCurrentData() {
  getData()
  .then(allData => {
    let userID = 2;
    let currentUser = allData.travelerData.find(traveler => {
      return traveler.id === Number(userID);
    });
    let trips = new TripsRepo(allData.tripsData);
    allDestinations = new DestinationsRepo(allData.destinationsData);
    let visitedDestinations = trips.destinationsVisited(userID, allDestinations.destinations);
    domUpdates.greetUser(currentUser);
    domUpdates.displayTravelerInfo(trips.travelerAnnualSpent(userID, allDestinations.destinations), trips.travelerTrips(userID)); // refactor this
    domUpdates.displayDestinations(currentUser, trips.travelerTrips(userID), visitedDestinations);
  })
}
