class Trip {
  constructor(data) {
    this.id = data.id;
    this.userID = data.userID;
    this.destinationID = data.destinationID;
    this.travelers = data.travelers;
    this.duration = data.duration;
    this.date = data.date;
    this.status = data.status;
    this.suggestedActivities = data.suggestedActivities;
  }
}

export default Trip;
