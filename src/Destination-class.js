class Destination {
  constructor(destinationsData) {
    this.id = destinationsData.id;
    this.location = destinationsData.destination;
    this.estimatedDailyLodging = destinationsData.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationsData.estimatedFlightCostPerPerson;
    this.image = destinationsData.image;
    this.alt = destinationsData.alt;
  }

}

export default Destination;
