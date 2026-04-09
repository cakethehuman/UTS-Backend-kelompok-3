const {Teams} = require('../models');

async function addTeamsNames() {
  try {
    await Teams.deleteMany();

    const teams = await Teams.insertMany([
      {name: 'Lakers', city: 'Los Angeles', abbreviation: 'LAL'},
      {name: 'Warriors', city: 'Golden State', abbreviation: 'GSW'},
      {name: 'Celtics', city: 'Boston', abbreviation: 'BOS'},
    ]);
    console.log('Isi team : ', teams);
  } catch (error) {
    console.error(error);
  }
}

module.exports = addTeamsNames;
