
const domUpdates = {

  greetUser(user) {
    const userName = document.getElementById('userName');
    const travelerType = document.getElementById('travelerType');
    userName.innerHTML = user.name;
    travelerType.innerHTML = `To-level: ${user.travelerType}`
  },

  displayTravelerInfo(total, trips) {
    console.log(trips);
    const tripStatus = trips.reduce((tripObj, trip) => {
      if (!tripObj[trip.status]) {
        tripObj[trip.status] = 1;
      } else {
        tripObj[trip.status]++
      }
      return tripObj;
    }, {})
    console.log(tripStatus, 'approved trips');
    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML =
    ` <h3> Welcome Back! </h3>
    <h3>Confirmed Trips: ${tripStatus.approved}</h3>
    <h3>Pending Trips: ${tripStatus.pending}</h3>
    <h3>Usable To-Points: ${total.toFixed(2)} </h3>`

  },

  displayDestinations(user, trips, destinations) {
    const userTrips = document.getElementById('userTrips');
    userTrips.innerHTML = '';
    // console.log(trips, '<>>> trips')
    // console.log(destinations, '<>>>> destinations')
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
    })
  },

  // displayTripInfo(user, trips, destinations) {
  //   const tripDetailsDisplay = document.getElementById('tripDetailsDisplay')
  //   tripDetailsDisplay.innerHTML = '';
  //   trips.map(trip => {
  //     if (trips.destinationID === destinationID) {
  //       return tripDetailsDisplay.innerHTML = `hi, this trip is ${trip.status}`
  //     }
  //   })
  // },

  displayErr(err) {
    const userTrips = document.getElementById('userTrips');
    const message = err.message === 'Failed to fetch' ?
      'Something went wrong. please check your internet connection' : err.message;
    userTrips.innerHTML = message;
  }
}

export default domUpdates;
