import { expect } from 'chai';

import destinations from '../test-data/destinations-data';
import Destination from '../src/Destination-class';

let destination1, destination2;

describe('Destination', () => {
  beforeEach(() => {
    destination1 = new Destination(destinations[0]);
    destination2 = new Destination(destinations[0]);
  });

  it('Should have a property of id', () => {
    expect(destination1.id).to.eql(1);
  });

  it('Should have a property of location', () => {
    expect(destination1.location).to.eql("Lima, Peru");
  });

  it('Should have a property of estimated daly lodging', () => {
    expect(destination1.estimatedDailyLodging).to.eql(70);
  });

  it('Should have a property of estimated flight cost per person', () => {
    expect(destination1.estimatedFlightCostPerPerson).to.eql(400);
  });

  it('Should have a property of image link', () => {
    expect(destination1.image).to.eql("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
  });

  it('Should have a property of alt text for image', () => {
    expect(destination1.alt).to.eql("overview of city buildings with a clear sky");
  });

})
