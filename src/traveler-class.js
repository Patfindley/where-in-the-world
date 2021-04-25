class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.travelerType;
    this.trips = [];
  }

  travelerTrips(allTrips) {
    const myTrips = allTrips.filter(trip => trip.userID === this.id)
    myTrips.forEach(trip => this.trips.push(trip));
  }

  destinationsVisited(destinations) { // write a test for this!
    return destinations.filter(destination => this.trips.find(trip => trip.destinationID === destination.id))
  }

  //for every trip
  //find

};

export default Traveler;
