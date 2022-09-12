const mongoose = require('mongoose');

const validateId = (value) => {
  if (!mongoose.isObjectIdOrHexString(value)) {
    throw new Error('Неправильный формат Id');
  }
  return value;
};

module.exports = { validateId };
