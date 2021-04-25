
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

  bookTrip(destinations, trips) {
    console.log(destinations);
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




    // newTripForm.innerHTML =
    // `<label for="destination-list">Destinations</label>
    // <select aria-label="destination-select" class="destination-list trip-form" name="destination-list">
    // ${destinations.map(destination => {
    //   return `<option value="${destination.id}">"${destination.destination}"</option>`
    //   })
    // }
    // </select>
    // <label for="trip-depart">Departure Date</label>
    // <input aria-label="start-date-selector" type="date" class="trip-depart" name="trip-depart" min="${Date.now}">
    // <label for="trip-return">Return Date</label>
    // <input aria-label="return-date-selector" type="date" class"trip-return" name="trip-return">
    // <label for="number-of-travelers">Number of Travelers</label>
    // <input aria-label="number-of-travelers-select" type="number" class="number-travelers" value="1" min="1">
    // <h3 aria-label="estimated-trip-cost" class="estimated-trip-cost trip-error">Estimated Cost: ${trips.tripEstimate()}</h3>`
  },

  displayErr(err) {
    const userTrips = document.getElementById('userTrips');
    const message = err.message === 'Failed to fetch' ?
      'Something went wrong. please check your internet connection' : err.message;
    userTrips.innerHTML = message;
  }



}

export default domUpdates;
