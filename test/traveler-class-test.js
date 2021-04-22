import { expect } from 'chai';

import travelers from '../test-data/traveler-data';
import Traveler from '../src/traveler-class';

let traveler1, traveler2;

describe('Traveler', () => {
  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[1]);
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

})
