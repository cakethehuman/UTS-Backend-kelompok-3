function GenerateSeats() {
	s = ['A', 'B', 'C', 'D', 'E'];
	for (const n of s) {
		for (let i = 0; i < 10; i++) {
			console.log(`${n}${i}`);
		}
	}
}

GenerateSeats();
