// base/ApiClient.js
const fetch = require('node-fetch');

class ApiClient {
  constructor(baseUrl, token) {
    if (!baseUrl || !baseUrl.startsWith('http')) {
      throw new Error(`Invalid base URL: ${baseUrl}`);
    }

    this.baseUrl = baseUrl;
    this.token = token;
  }

  async request(path, method = 'GET', body = null, customHeaders = {}) {
    const url = `${this.baseUrl}${path}`; // will throw error if baseUrl is undefined
    const headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const options = { method, headers };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    let responseBody = null;

    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (!response.ok) {
      return { status: response.status, error: responseBody };
    }

    return { status: response.status, ...responseBody };
  }
}

module.exports = ApiClient;
