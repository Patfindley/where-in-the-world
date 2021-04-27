import { expect } from 'chai';

import travelers from '../test-data/traveler-data';
import Traveler from '../src/traveler-class';
import destinations from '../test-data/destinations-data';
import DestinationsRepo from '../src/DestinationsRepo-class';
import trips from '../test-data/trips-data';




let traveler1, traveler2, destinations1;

describe('Traveler', () => {
  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[1]);
    destinations1 = new DestinationsRepo(destinations)

  })

  it('should have a property of id', () => {
    expect(traveler1.id).to.eql(1);
    expect(traveler2.id).to.eql(2);
  });

  it('should have a property of name', () => {
    expect(traveler1.name).to.eql("Ham Leadbeater");
    expect(traveler2.name).to.eql("Rachael Vaughten");
  });

  it('should have a property of type', () => {
    expect(traveler1.type).to.eql("relaxer");
  });

  it('should have a property of trips the traveler has been on', () => {
    expect(traveler1.trips).to.eql([]);
  });

  it('should have a method to find what trips', () => {
    traveler2.travelerTrips(trips);
    expect(traveler2.trips).to.deep.eql([{ id: 5, userID: 2, destinationID: 5, travelers: 3, date: '2020/04/30', duration: 18, status: 'approved', suggestedActivities: []},
    { id: 6, userID: 2, destinationID: 6, travelers: 3, date: '2020/06/29', duration: 9, status: 'approved', suggestedActivities: []},
    { id: 7, userID: 2, destinationID: 7, travelers: 5, date: '2020/5/28', duration: 20, status: 'approved', suggestedActivities: []},
    { id: 8, userID: 2, destinationID: 8, travelers: 6, date: '2021/02/07', duration: 4, status: 'approved', suggestedActivities: []}])
  });

  it('should have a method to find all trips traveler has taken', () => {
    traveler2.travelerTrips(trips);
    expect(traveler2.trips).to.deep.eql([{ id: 5, userID: 2, destinationID: 5, travelers: 3, date: '2020/04/30', duration: 18, status: 'approved', suggestedActivities: []},
  { id: 6, userID: 2, destinationID: 6, travelers: 3, date: '2020/06/29', duration: 9, status: 'approved', suggestedActivities: []},
  { id: 7, userID: 2, destinationID: 7, travelers: 5, date: '2020/5/28', duration: 20, status: 'approved', suggestedActivities: []},
  { id: 8, userID: 2, destinationID: 8, travelers: 6, date: '2021/02/07', duration: 4, status: 'approved', suggestedActivities: []}])
  });

  it('should have a method to find all destinations traveler has visited', () => {
    traveler2.travelerTrips(trips);
    expect(traveler2.destinationsVisited(destinations1.destinations)).to.deep.eql([
  { id: 5, destination: 'Madrid, Spain', estimatedLodgingCostPerDay: 150, estimatedFlightCostPerPerson: 650, image: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', alt: 'city with clear skys and a road in the day time'},
  { id: 6, destination: 'Jakarta, Indonesia', estimatedLodgingCostPerDay: 70, estimatedFlightCostPerPerson: 890, image: 'https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80', alt: 'lit up city at night'},
  { id: 7, destination: 'Paris, France', estimatedLodgingCostPerDay: 100, estimatedFlightCostPerPerson: 395, image: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80', alt: 'city during the day time with eiffel tower'},
  { id: 8, destination: 'Tokyo, Japan', estimatedLodgingCostPerDay: 125, estimatedFlightCostPerPerson: 1000, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80', alt: 'city with people walking in crosswalk and brightly lit shops at night'}])
  });

})
