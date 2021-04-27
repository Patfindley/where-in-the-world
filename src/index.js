import './css/base.scss';

import domUpdates from './dom-update.js';

import Traveler from './Traveler-Class';
import TripsRepo from './TripsRepo-Class';
import DestinationsRepo from './DestinationsRepo-Class';

// const picker = datepicker('selector', 'options');
import {
  getData,
  postData
} from './APICalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
// import '../assets/profile-img.png'
const loginButton = document.getElementById('loginButton');
const loginPage = document.getElementById('loginPage');

const userPicture = document.getElementById('userPicture');
const userName = document.getElementById('userName');
const planTrip = document.getElementById('planTrip');
const tripsDisplay = document.getElementById('tripsDisplay');

const newTripForm = document.getElementById('newTripForm');
const tripDepart = document.getElementById('tripDepart');
const tripReturn = document.getElementById('tripReturn');
const numTravelers = document.getElementById('numTravelers');
const bookTrip = document.getElementById('bookTrip');
const backToMain = document.getElementById('backToMain');

const sideWindow = document.getElementById('sideWindow');
const userStats = document.getElementById('userInfo');


let currentUser, allDestinations, trips;

loginButton.addEventListener('click', () => {
  userValidation()
})

planTrip.addEventListener('click', () => {
  domUpdates.planTrip(allDestinations.destinations, trips);
});

bookTrip.addEventListener('click', () => {
  domUpdates.bookTrip(event, currentUser, allDestinations.destinations, trips);
})

newTripForm.addEventListener('change', () => {
  getTripEstimate();
})

backToMain.addEventListener('click', () => {
  const newTripForm = document.getElementById('newTripForm');
  event.preventDefault()
  planTrip.classList.toggle('hidden');
  userStats.classList.toggle('hidden');
  newTripForm.classList.toggle('hidden');
})

function userValidation() {
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const loginError = document.getElementById('loginError');
  let userName = usernameInput.value;
  let userID = Number(userName.split('traveler')[1]);
  const validateUser = () => {}
  if (userID <= 50 && userID > 0 && passwordInput.value === 'travel2020') {
    loginPage.classList.toggle('hidden');
    sideWindow.classList.toggle('hidden');
    tripsDisplay.classList.toggle('hidden');
    planTrip.classList.toggle('hidden');
    fetchCurrentData(userID)
    setMinDates()
  } else if (userID > 50 || userID < 0 || !userID) {
    loginError.innerHTML = 'Invalid user name, please try again.'
  } else if (passwordInput.value != 'travel2020') {
    loginError.innerHTML = 'Invalid password, please try again.'
  }
}

function fetchCurrentData(num) {
  getData(num)
    .then(allData => {
      let userID = num;
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

function setMinDates() {
  let today = new Date().toISOString().substring(0, 10);
  tripDepart.setAttribute("min", today);
  tripReturn.setAttribute("min", today);
}

function getTripEstimate() {
  const daysAway = tripReturn.value.split('-')[2] - tripDepart.value.split('-')[2];
  if (!tripDepart.value || !tripReturn.value) {
    let daysAway = 1
    console.log(trips.tripEstimate(Number(numTravelers.value), Number(destinationList.value), daysAway, allDestinations.destinations))
    estimatedTripCost.innerHTML = `Estimated Cost: ${trips.tripEstimate(Number(numTravelers.value), Number(destinationList.value), daysAway, allDestinations.destinations)}$`;
  } else {
    estimatedTripCost.innerHTML = `Estimated Cost: ${trips.tripEstimate(Number(numTravelers.value), Number(destinationList.value), daysAway, allDestinations.destinations)}$`;
  }
}

export function bookPlannedTrip(id, userID, destID, numTravelers, departDate, daysAway) {
  let data = {
    "id": id,
    "userID": userID,
    "destinationID": destID,
    "travelers": numTravelers,
    "date": departDate,
    "duration": daysAway,
    "status": 'pending',
    "suggestedActivities": []
  }
  postData(data);
}
