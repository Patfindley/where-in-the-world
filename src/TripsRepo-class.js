class TripsRepo {
  constructor(tripsData) {
    this.allTrips = tripsData;
  }

  travelerTrips(travelerID) {
    return this.allTrips.filter(trip => trip.userID === travelerID)
  }

  travelerTotalSpent(travelerID, destinations) {
    const allTrips = this.travelerTrips(travelerID);
    //find all travelers trips
    const destinationsVisited = destinations.filter(destination => {
      return allTrips.find(trip => {
        return trip.destinationID === destination.id
      })
    })
    console.log(destinationsVisited, '<<>>> destinations visited')
    const moneySpent = allTrips.reduce((finalObj, trip) => {

    }, {})
    // find destination of all trips
    // calculate total days spent on trip
    //sum cost of daily estimatedLodgingCostPerDay
    //add estimatedFlightCostPerPerson
    //add 10% agent fee
  }

}

export default TripsRepo;
