import profileImg from '../assets/profile-img.png'


class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.travelerType;
    this.profileImg = profileImg || data.profileImg;
    this.trips = [];
  }

  travelerTrips(allTrips) {
    const myTrips = allTrips.filter(trip => trip.userID === this.id)
    myTrips.forEach(trip => this.trips.push(trip));
  }

  destinationsVisited(destinations) {
    return destinations.filter(destination => this.trips.find(trip => trip.destinationID === destination.id))
  }

};

export default Traveler;
