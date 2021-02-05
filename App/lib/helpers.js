/*
 * Helpers for various tasks
 */

// Dependencies
const crypto = require('crypto');
const config = require('./config');

// Container for all the helpers
const helpers = {};

// Create the SHA256 hash
helpers.hash = (str) => {
  if (typeof str == 'string' && str.length > 0) {
    const hash = crypto
      .createHmac('sha256', config.hashingSecret)
      .update(str)
      .digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function (str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function (strLenght) {
  const strLength =
    typeof strLenght == 'number' && strLenght > 0 ? strLenght : false;
  if (strLength) {
    // Define all possible characters that can go into the string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the string
    let str = '';

    for (let i = 0; i < strLenght; i++) {
      // Get random char from possible characters
      const randomChar = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
      // Append to final string
      str += randomChar;
    }

    // Return final string
    return str;
  } else {
    return false;
  }
};

// Export the module
module.exports = helpers;
