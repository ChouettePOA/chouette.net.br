/**
 * @file
 * Custom UUID generator.
 *
 * @example
 * 	$ node src/uuid.js
 */

const { v4: uuidv4 } = require('uuid');
console.log(uuidv4());
