import { expect } from 'chai';

import trips from '../test-data/trips-data';

import destinations from '../test-data/destinations-data';
import DestinationsRepo from '../src/DestinationsRepo-class';

import TripsRepo from '../src/TripsRepo-class';

let tripsRepo, destinations1;

describe('TripsRepo', () => {
  beforeEach(() => {
    tripsRepo = new TripsRepo(trips);
    destinations1 = new DestinationsRepo(destinations)
  });

  it('should have a property containing ALL trip data', () => {
    expect(tripsRepo.allTrips.length).to.eql(8)
  });

  it('should have a method call a travelers entire trips data', () => {
    expect(tripsRepo.travelerTrips(1).length).to.eql(4);
    expect(tripsRepo.travelerTrips(1)).to.deep.eql([{id: 1, userID: 1, destinationID: 1, travelers: 1, date: "2019/09/16", duration: 8, status: "approved", suggestedActivities: []},
    { id: 2, userID: 1, destinationID: 2, travelers: 5, date: "2020/10/04", duration: 18, status: "pending", suggestedActivities: []},
    { id: 3, userID: 1, destinationID: 3, travelers: 4, date: "2020/05/22", duration: 17, status: "pending", suggestedActivities: []},
    { id: 4, userID: 1, destinationID: 4, travelers: 2, date: "2020/02/25", duration: 10, status: "approved", suggestedActivities: []}]);
  });

  it('should have a method to calculate the traveler\'s total spent on trips', () => {
    expect(tripsRepo.travelerTotalSpent(1, destinations1.destinations)).to.eql();
  })


})
