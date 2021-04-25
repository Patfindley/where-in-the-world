class TripsRepo {
  constructor(tripsData) {
    this.allTrips = tripsData;
  }

  travelerTrips(travelerID) {
    return this.allTrips.filter(trip => trip.userID === travelerID)
  }

  destinationsVisited(travelerID, destinations) { // write a test for this!
    const allTrips = this.travelerTrips(travelerID);
    return destinations.filter(destination => allTrips.find(trip => trip.destinationID === destination.id))
  }

  travelerAnnualSpent(travelerID, destinations) {
    const tripsInYear = this.travelerTrips(travelerID).filter(trip => trip.date.split('/')[0] === '2020');
    const destinationsList = this.destinationsVisited(travelerID, destinations);
    return tripsInYear.reduce((total, trip) => {
      destinationsList.forEach(destination => {
        if (trip.destinationID === destination.id) {
          total += (trip.travelers * destination.estimatedLodgingCostPerDay) * trip.duration;
          total += trip.travelers * destination.estimatedFlightCostPerPerson;
        }
      })
      return total += total * 0.1;
    }, 0)
  }

  tripEstimate(numTravelers, destinationID, numDays, destinations) {
    const foundDestination = destinations.find(destination => destination.id === destinationID);
    const flightTotal = foundDestination.estimatedFlightCostPerPerson * numTravelers;
    const stayTotal = (foundDestination.estimatedLodgingCostPerDay * numTravelers) * numDays;
    const agentFee = (flightTotal + stayTotal) * 0.1
    return (flightTotal + stayTotal) + agentFee;
  }
}

export default TripsRepo;
