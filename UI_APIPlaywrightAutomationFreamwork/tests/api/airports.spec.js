const { test, expect } = require('@playwright/test');
const AirportClient = require('../../api/AirportClient');

const airportClient = new AirportClient();

test('API: get all airports', async () => {
  const airports = await airportClient.getAirports();
//  console.log('Airports:', airports);
  expect(Array.isArray(airports.data)).toBeTruthy(); 
  expect(airports.data.length).toBeGreaterThan(0);
});

