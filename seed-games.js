/* eslint-disable prettier/prettier */
const {Games} = require('./src/models');

async function SeedGames() {
	await Games.deleteMany();
	try {
		console.log('Sudah masukin data games');
		return Games.create([
			{
				homeTeam: 'Lakers',
				awayTeam: 'Warriors',
				date: '2026-05-01T19:00:00Z',
				status: 'scheduled',
			},
			{
				homeTeam: 'Celtics',
				awayTeam: 'Bulls',
				date: '2026-05-02T20:30:00Z',
				status: 'scheduled',
			},
		]);
	} catch (error) {
		process.exit(1);
	}
}

SeedGames();
