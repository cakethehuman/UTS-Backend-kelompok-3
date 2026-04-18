async function generateSeats(gameId) {
	let Seatprice = 0;
	let values = [];
	const seats = ['A', 'B', 'C', 'D', 'E'];
	for (const seatId of seats) {
		for (let j = 1; j <= 10; j++) {
			if (seatId === 'A') {
				Seatprice = 200;
			}
			if (seatId === 'B') {
				Seatprice = 150;
			}
			if (seatId === 'C') {
				Seatprice = 100;
			}
			if (seatId === 'D') {
				Seatprice = 50;
			}
			if (seatId === 'E') {
				Seatprice = 25;
			}
			values.push({
				gameId: gameId,
				seatNumber: `${seatId}${j}`,
				price: Seatprice,
				isBooked: false,
			});
		}
	}
	return values;
}


module.exports = {generateSeats}
