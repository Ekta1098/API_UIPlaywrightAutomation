// utils/env.js
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const BASE_URL = process.env.BASE_URL;
const API_TOKEN = process.env.API_TOKEN;

module.exports = { BASE_URL, API_TOKEN };
