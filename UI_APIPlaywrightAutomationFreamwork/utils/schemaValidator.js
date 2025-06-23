// utils/schemaValidator.js
const Ajv = require('ajv');
const ajv = new Ajv();

function validateSchema(schema, data) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  return { valid, errors: validate.errors };
}

module.exports = { validateSchema };
