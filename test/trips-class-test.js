import { expect } from 'chai';

import trips from '../test-data/trips-data';
import Trips from '../src/trips-class';

let trip1, trip2;

describe('trips', () => {
  beforeEach(() => {
    trip1 = new Trip(trips[0]);
    trip2 = new Trip(trips[5]);
  })
  
})
