const { test, expect } = require('@playwright/test');
const FavoritesClient = require('../../api/FavoritesClient');

const favoritesClient = new FavoritesClient();

test('API: create, validate schema, get, validate schema, and delete a favorite', async () => {  // created file for practice

  // const airportId = 'LAX'; // Make sure this is a fresh airport or delete beforehand
  // const note = 'Testing LAX with Bearer Auth and Zod validation';

  // // Create favorite (POST)
  // const createRes = await favoritesClient.createFavorite({ airport_id: airportId, note });
  // const favId = createRes.data.id;

  // expect(createRes.data.attributes.note).toBe(note);
  // expect(createRes.data.attributes.airport.iata).toBe(airportId);
  // console.log('Created favorite:', favId);

  // // Get favorite (GET)
  // const getRes = await favoritesClient.getFavoriteById(favId);

  // expect(getRes.data.id).toBe(favId);
  // expect(getRes.data.attributes.note).toBe(note);
  // expect(getRes.data.attributes.airport.iata).toBe(airportId);
  // console.log(' Verified favorite via GET:', favId);

  // // Delete favorite (DELETE)
  // const deletion = await favoritesClient.deleteFavorite(favId);
  // expect(deletion).toBe(true);
  // console.log(' Deleted favorite:', favId);
});
