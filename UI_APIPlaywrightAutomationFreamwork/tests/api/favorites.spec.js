// tests/api/favorites.spec.js
const { test, expect } = require('@playwright/test');
const FavoritesClient = require('../../api/FavoritesClient');
const { validateSchema } = require('../../utils/schemaValidator');
const favoriteSchema = require('../../schemas/favorite.schema.json');
const {
  validFavoritePayload,
  invalidAirportPayload,
  generateNote,
} = require('../../utils/testData');

let favoriteId;
let client;

test.beforeEach(() => {
  client = new FavoritesClient(); // will use token from .env
});

// Helper
function expectErrorResponse(res, statusCode, title) {
  expect(res.status).toBe(statusCode);
  expect(res.error).toBeTruthy();
  expect(res.error.errors[0].status).toBe(String(statusCode));
  if (title) expect(res.error.errors[0].title).toBe(title);
}

// Helper
function expectValidSchema(data) {
  const { valid, errors } = validateSchema(favoriteSchema, data);
  expect(valid).toBe(true);
  if (!valid) console.error(' Schema validation errors:', errors);
}

test('NEGATIVE: create favorite Record with invalid token returns 401', async () => {
  const invalidClient = new FavoritesClient('inyybfgfggggg');
  const payload = validFavoritePayload();

  const res = await invalidClient.createFavorite(payload);
  expectErrorResponse(res, 401, 'Unauthorized');

  console.log(' Unauthorized access (401)');
});

test('NEGATIVE: invalid airport_id returns 422', async () => {
  const res = await client.createFavorite(invalidAirportPayload());
  expectErrorResponse(res, 422);
  expect(res.error.errors[0].detail).toBe('Airport Please enter a valid airport code');

  console.log(' Invalid airport code correctly rejected (422)');
});

test('POST: create favorite', async () => {
  const payload = validFavoritePayload();
  const res = await client.createFavorite(payload);

  expect(res.status).toBe(201);
  const { data } = res;
  favoriteId = data.id;

  expect(data.attributes.note).toBe(payload.note);
  expect(data.attributes.airport.iata).toBe(payload.airport_id);
  expectValidSchema(data);

  console.log(` Favorite created. ID: ${favoriteId}`);
});

test('GET: validate favorite was created', async () => {
  const res = await client.getFavoriteById(favoriteId);

  expect(res.status).toBe(200);
  expect(res.data.id).toBe(favoriteId);
  expectValidSchema(res.data);

  console.log(` Favorite fetched. Note: ${res.data.attributes.note}`);
});

test('PATCH: update favorite note', async () => {
  const updatedNote = generateNote('Updated note');
  const res = await client.updateFavorite(favoriteId, { note: updatedNote });

  expect(res.status).toBe(200);
  expect(res.data.attributes.note).toBe(updatedNote);
  expectValidSchema(res.data);

  console.log(` Favorite updated. New note: ${updatedNote}`);
});

test('DELETE: remove favorite', async () => {
  const res = await client.deleteFavorite(favoriteId);

  expect(res.status).toBe(204);
  console.log(` Favorite deleted. ID: ${favoriteId}`);
});

test('NEGATIVE: invalid URL returns 404', async () => {
  const res = await client.request('/invalid-path', 'GET');

  expect(res.status).toBe(404);
  console.log(' Invalid endpoint correctly returned 404');
});
