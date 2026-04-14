/* eslint-disable prettier/prettier */
const { Games } = require("./src/models");

async function seedGames() {
  await Games.deleteMany();
  try {
		console.log('Sudah masukin data games');
    return Games.create([
      {}
    ]);
  } catch (error){
    process.exit(1);
  }
}

seedGames();