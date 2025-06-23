// utils/testData.js
function generateNote(prefix = 'Favorite note') {
  return `${prefix} - ${new Date().toISOString()}`;
}

function validFavoritePayload() {
  return {
    airport_id: 'SFO',
    note: generateNote(),
  };
}

function invalidAirportPayload() {
  return {
    airport_id: '1234',
    note: 'Invalid airport test',
  };
}

module.exports = {
  validFavoritePayload,
  invalidAirportPayload,
  generateNote,
};
