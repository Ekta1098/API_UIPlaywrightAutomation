// api/FavoritesClient.js
const ApiClient = require('../base/ApiClient');
const { BASE_URL, API_TOKEN } = require('../utils/env');

class FavoritesClient extends ApiClient {
  constructor(token = API_TOKEN) {
    super(BASE_URL, token);
  }

  createFavorite(payload) {
    return this.request('', 'POST', payload);
  }

  getFavoriteById(id) {
    return this.request(`/${id}`, 'GET');
  }

  updateFavorite(id, payload) {
    return this.request(`/${id}`, 'PATCH', payload);
  }

  deleteFavorite(id) {
    return this.request(`/${id}`, 'DELETE');
  }
}

module.exports = FavoritesClient;
