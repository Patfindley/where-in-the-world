import {
  bookPlannedTrip
} from './index';
import profileImg from '../assets/profile-img.png'


const domUpdates = {

  userLogin() {
    console.log(userName);
    if (usernameInput)
      loginPage.classList.toggle('hidden');
    sideWindow.classList.toggle('hidden');
    tripsDisplay.classList.toggle('hidden');
    planTrip.classList.toggle('hidden');
  },

  greetUser(user) {
    const userPicture = document.getElementById('userPicture')
    const userName = document.getElementById('userName');
    const travelerType = document.getElementById('travelerType');
    userPicture.src = user.profileImg;
    if (user.name) {
      userName.innerHTML = user.name;
      travelerType.innerHTML = `Traveler-level: ${user.type}`
    }
  },

  displayTravelerInfo(total, trips) {
    const userStats = document.getElementById('userInfo');
    const tripStatus = trips.reduce((tripObj, trip) => {
      tripObj[trip.status]++
      return tripObj;
    }, {
      approved: 0,
      pending: 0
    })
    userStats.innerHTML =
      ` <h3 aria-label="welcome" class="user-under"> Welcome Back! </h3>
    <h3>Confirmed Trips: ${tripStatus.approved}</h3>
    <h3>Pending Trips: ${tripStatus.pending}</h3>
    <h3>Usable To-Points: ${total.toFixed(2)} </h3>`
  },

  displayDestinations(user, trips, destinations) {
    const userTrips = document.getElementById('userTrips');
    userTrips.innerHTML = '';
    if (!destinations) {
      userTrips.innerHTML = Book your first trip!
    } else {
      destinations.map(destination => {
        let trip = trips.find(trip => {
          return trip.destinationID === destination.id
        })
        const tripDetailsDisplay = document.getElementById('tripDetailsDisplay')
        return userTrips.innerHTML +=
          `<article class="trip" aria-label="trip-information">
        <div class="trip-wrap" id="${destination.id}">
          <img class="trip-image" src="${destination.image}" alt="${destination.alt}"
          <div class="trip-info-display">
            <div class="trip-details-display" id="tripDetailsDisplay ${destination.id}">
            <h2 id="destinationDisplay"aria-label="destination">${destination.destination}</h2>
              <h3 class="trip-status" aria-label="trip-status">${trip.status}</h3>
              <h3 class="trip-date">Departure: ${trip.date}</h3>
              <h3>Duration: ${trip.duration} Days</h3>
              <h3>Travelers: ${trip.travelers}</h3>
            </div>
          </div>
        </div>
      </article>`
      });
    }
  },

  planTrip(destinations, trips) {
    const today = new Date();
    const userStats = document.getElementById('userInfo');
    const newTripForm = document.getElementById('newTripForm');
    const destinationList = document.getElementById('destinationList');
    const estimatedTripCost = document.getElementById('estimatedTripCost');
    const tripDepart = document.getElementById('tripDepart');
    const tripReturn = document.getElementById('tripReturn');
    const numTravelers = document.getElementById('numTravelers');
    newTripForm.setAttribute('min', today)
    planTrip.classList.toggle('hidden');
    userStats.classList.toggle('hidden');
    newTripForm.classList.toggle('hidden');
    destinationList.innerHTML = destinations.map(destination => {
      return `<option value="${destination.id}"> "${destination.destination}" </option>`
    })
  },

  bookTrip(event, currentUser, destinations, trips) {
    event.preventDefault();
    const estimatedTripCost = document.getElementById('estimatedTripCost');
    const numTravelers = document.getElementById('numTravelers');
    const tripDepart = document.getElementById('tripDepart');
    const tripReturn = document.getElementById('tripReturn');
    const daysAway = tripReturn.value.split('-')[2] - tripDepart.value.split('-')[2];
    let tripID = trips.allTrips.length;
    if (!tripDepart.value) {
      estimatedTripCost.innerHTML = "Please select departure date";
    } else if (tripReturn.value.split('-') < tripDepart.value.split('-')) {
      estimatedTripCost.innerHTML = "Please select valid return date";
    } else if (!tripReturn.value) {
      estimatedTripCost.innerHTML = "Please select return date"
    } else {
      bookPlannedTrip(tripID + 1, currentUser.id, Number(destinationList.value), Number(numTravelers.value), tripDepart.value.split('-').join('/'), daysAway);
      tripID++
      currentUser.trips.push({
        id: tripID + 1,
        userID: currentUser.id,
        destinationID: Number(destinationList.value),
        travelers: Number(numTravelers.value),
        date: tripDepart.value.split('-').join('/'),
        duration: daysAway,
        status: 'pending',
        suggestedActivities: []
      })
      estimatedTripCost.innerHTML = `Estimated Cost: ${trips.tripEstimate(Number(numTravelers.value), Number(destinationList.value), daysAway, destinations)}$`;
      bookTrip.innerHTML = "BOOKED!"
      domUpdates.displayDestinations(currentUser, trips.travelerTrips(currentUser.id), trips.destinationsVisited(currentUser.id, destinations));
    }
  },

  displayErr(err) {
    const userTrips = document.getElementById('userTrips');
    const message = err.message === 'Failed to fetch' ?
      'Something went wrong. please check your internet connection' : err.message;
    userTrips.innerHTML = message;
  }

}

export default domUpdates;
