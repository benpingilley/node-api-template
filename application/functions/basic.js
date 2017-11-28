// Require external modules
const exec = require('sync-exec');

// Must include the jsdoc comments above functions to pass lint testing

/**
 * It echoes Hello from the command line
 * @return {string} - Hello
 */
const hello = async() => {
  const version = await exec('echo "Hello"');
  return (version.stdout.trim());
};

/**
 * It add two number together
 * @param {int} num1 - First Number
 * @param {int} num2 - Second Number
 * @return {int} - Sum of Numbers
 */
const addTwo = (num1, num2) => {
  return num1 + num2;
};

// Export functions as modules for use in other files and testing
exports.addTwo = addTwo;
exports.hello = hello;
