class Trips {
  constructor(data) {
    this.id = data.id;
    this.userID = data.userID;
    this.destinationID = data.destinationID;
    this.travelers = data.travelers;
    this.date = data.date;
    this.status = data.status;
    this.suggestedActivities = data.suggestedActivities;
  }
}

export default Trips;
