import { expect } from 'chai';

import trips from '../test-data/trips-data';
import Trip from '../src/trip-class';

let trip1, trip2;

describe('trips', () => {
  beforeEach(() => {
    trip1 = new Trip(trips[0]);
    trip2 = new Trip(trips[5]);
  });

  it('should have a property of id', () => {
    expect(trip1.id).to.eql(1);
  });

  it('should have a property of userID', () => {
    expect(trip1.userID).to.eql(1);
  });

  it('should have a property of destinationID', () => {
    expect(trip1.destinationID).to.eql(49);
  });

  it('should have a property of travelers', () => {
    expect(trip1.travelers).to.eql(1);
  });

  it('should have a property of date', () => {
    expect(trip1.date).to.eql("2019/09/16");
  });

  it('should have a property of duration', () => {
    expect(trip1.duration).to.eql(8);
  });

  it('should have a property of status', () => {
    expect(trip1.status).to.eql('approved');
  });

  it('should have a property of suggestedActivities', () => {
    expect(trip1.suggestedActivities).to.eql([]);
  });

})
