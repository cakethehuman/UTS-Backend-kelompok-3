const { faker } = require('@faker-js/faker');
const { errorResponder, errorTypes } = require("../core/errors")

function randomDateGenerator() {
    return faker.date.soon({
      days: 30
    });
}

module.exports = randomDateGenerator;