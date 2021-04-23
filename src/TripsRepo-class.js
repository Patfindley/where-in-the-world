class TripsRepo {
  constructor(tripsData) {
    this.allTrips = tripsData;
  }

  travelerTrips(travelerID) {
    return this.allTrips.filter(trip => trip.userID === travelerID)
  }

  travelerTotalSpent(travelerID, destinations) {
    let allTrips = this.travelerTrips(travelerID);
    let destinationsVisited = destinations.filter(destination => {
      return allTrips.find(trip => {
        return trip.destinationID === destination.id
      })
    })
    return allTrips.reduce((total, trip) => {
      destinationsVisited.forEach(destination => {
        if (trip.destinationID === destination.id) {
          total += (trip.travelers * destination.estimatedLodgingCostPerDay) * trip.duration;
          total += trip.travelers * destination.estimatedFlightCostPerPerson;
        }
      })
      return total += total * .10;
    }, 0)
  }

}

export default TripsRepo;
