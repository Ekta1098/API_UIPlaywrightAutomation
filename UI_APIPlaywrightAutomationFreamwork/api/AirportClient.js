class AirportClient {
  constructor() {
    this.baseUrl = 'https://airportgap.com/api';
    this.token = 'i6kiCFHkbt2hPZsGLX267JG6';  
  }

  async getAirports() {
    const response = await fetch(`${this.baseUrl}/airports`, {
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch airports: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

module.exports = AirportClient;
