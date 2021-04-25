
const domUpdates = {

  greetUser(user) {
    const userName = document.getElementById('userName');
    const travelerType = document.getElementById('travelerType');
    userName.innerHTML = user.name;
    travelerType.innerHTML = `Traveler-level: ${user.travelerType}`
  },

  displayTravelerInfo(total, trips) {
    const userStats = document.getElementById('userInfo');
    const tripStatus = trips.reduce((tripObj, trip) => {
      if (!tripObj[trip.status]) {
        tripObj[trip.status] = 1;
      } else {
        tripObj[trip.status]++
      }
      return tripObj;
    }, {})
    userStats.innerHTML =
      ` <h3> Welcome Back! </h3>
    <h3>Confirmed Trips: ${tripStatus.approved}</h3>
    <h3>Pending Trips: ${tripStatus.pending}</h3>
    <h3>Usable To-Points: ${total.toFixed(2)} </h3>`
  },

  displayDestinations(user, trips, destinations) {
    const userTrips = document.getElementById('userTrips');
    userTrips.innerHTML = '';
    destinations.map(destination => {
      const tripDetailsDisplay = document.getElementById('tripDetailsDisplay')
      return userTrips.innerHTML +=
      `<article class="trip" aria-label="trip-information">
        <div class="trip-wrap id="${destination.id}">
          <img class="trip-image" src="${destination.image}" alt="${destination.alt}"
          <div class="trip-info-display">
          <h2>${destination.destination}</h2>
          <h3 class="trip-date"></h3>
          </div class="trip-details-display" id="tripDetailsDisplay ${destination.id}">
          </div>
        </div>
       </article>`
    });
  },

  planTrip(destinations, trips) {
    const userStats = document.getElementById('userInfo');
    const newTripForm = document.getElementById('newTripForm');
    const destinationList = document.getElementById('destinationList');
    const estimatedTripCost = document.getElementById('estimatedTripCost');
    const tripDepart = document.getElementById('tripDepart');
    const tripReturn = document.getElementById('tripReturn');
    const numTravelers = document.getElementById('numTravelers');
    userStats.classList.toggle('hidden');
    newTripForm.classList.toggle('hidden');
    destinationList.innerHTML = destinations.map(destination => {
      return `<option value="${destination.id}"> "${destination.destination}" </option>`
    })
  },

  bookTrip(destinations, trips) {
    const estimatedTripCost = document.getElementById('estimatedTripCost');
    const numTravelers = document.getElementById('numTravelers');
    const tripDepart = document.getElementById('tripDepart').split('-');
    const tripReturn = document.getElementById('tripReturn').split('-');
    const departureDate = tripDepart.value.split('-');

    console.log(tripDepart.value, '<>>> depart');
    console.log(tripReturn.value, '<>>> return');


    estimatedTripCost.innerHTML = `Estimated Cost: ${trips.tripEstimate(numTravelers.value, destinationList.value)}`
  },

  displayErr(err) {
    const userTrips = document.getElementById('userTrips');
    const message = err.message === 'Failed to fetch' ?
      'Something went wrong. please check your internet connection' : err.message;
    userTrips.innerHTML = message;
  }



}

export default domUpdates;
