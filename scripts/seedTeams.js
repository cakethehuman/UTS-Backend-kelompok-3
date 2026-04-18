const {Teams} = require('../src/models');

async function seedNbaTeams() {
	teamList = [
		{name: 'Atlanta Hawks', abbreviation: 'ATL', venue: 'State Farm Arena', city: 'Atlanta', state: 'Georgia'},
		{name: 'Boston Celtics', abbreviation: 'BOS', venue: 'TD Garden', city: 'Boston', state: 'Massachusetts'},
		{name: 'Brooklyn Nets', abbreviation: 'BKN', venue: 'Barclays Center', city: 'Brooklyn', state: 'New York'},
		{name: 'Charlotte Hornets', abbreviation: 'CHA', venue: 'Spectrum Center', city: 'Charlotte', state: 'North Carolina'},
		{name: 'Chicago Bulls', abbreviation: 'CHI', venue: 'United Center', city: 'Chicago', state: 'Illinois'},
		{name: 'Cleveland Cavaliers', abbreviation: 'CLE', venue: 'Rocket Mortgage FieldHouse', city: 'Cleveland', state: 'Ohio'},
		{name: 'Dallas Mavericks', abbreviation: 'DAL', venue: 'American Airlines Center', city: 'Dallas', state: 'Texas'},
		{name: 'Denver Nuggets', abbreviation: 'DEN', venue: 'Ball Arena', city: 'Denver', state: 'Colorado'},
		{name: 'Detroit Pistons', abbreviation: 'DET', venue: 'Little Caesars Arena', city: 'Detroit', state: 'Michigan'},
		{name: 'Golden State Warriors', abbreviation: 'GSW', venue: 'Chase Center', city: 'San Francisco', state: 'California'},
		{name: 'Houston Rockets', abbreviation: 'HOU', venue: 'Toyota Center', city: 'Houston', state: 'Texas'},
		{name: 'Indiana Pacers', abbreviation: 'IND', venue: 'Gainbridge Fieldhouse', city: 'Indianapolis', state: 'Indiana'},
		{name: 'LA Clippers', abbreviation: 'LAC', venue: 'Intuit Dome', city: 'Inglewood', state: 'California'},
		{name: 'Los Angeles Lakers', abbreviation: 'LAL', venue: 'Crypto.com Arena', city: 'Los Angeles', state: 'California'},
		{name: 'Memphis Grizzlies', abbreviation: 'MEM', venue: 'FedExForum', city: 'Memphis', state: 'Tennessee'},
		{name: 'Miami Heat', abbreviation: 'MIA', venue: 'Kaseya Center', city: 'Miami', state: 'Florida'},
		{name: 'Milwaukee Bucks', abbreviation: 'MIL', venue: 'Fiserv Forum', city: 'Milwaukee', state: 'Wisconsin'},
		{name: 'Minnesota Timberwolves', abbreviation: 'MIN', venue: 'Target Center', city: 'Minneapolis', state: 'Minnesota'},
		{name: 'New Orleans Pelicans', abbreviation: 'NOP', venue: 'Smoothie King Center', city: 'New Orleans', state: 'Louisiana'},
		{name: 'New York Knicks', abbreviation: 'NYK', venue: 'Madison Square Garden', city: 'New York', state: 'New York'},
		{name: 'Oklahoma City Thunder', abbreviation: 'OKC', venue: 'Paycom Center', city: 'Oklahoma City', state: 'Oklahoma'},
		{name: 'Orlando Magic', abbreviation: 'ORL', venue: 'Kia Center', city: 'Orlando', state: 'Florida'},
		{name: 'Philadelphia 76ers', abbreviation: 'PHI', venue: 'Wells Fargo Center', city: 'Philadelphia', state: 'Pennsylvania'},
		{name: 'Phoenix Suns', abbreviation: 'PHX', venue: 'Footprint Center', city: 'Phoenix', state: 'Arizona'},
		{name: 'Portland Trail Blazers', abbreviation: 'POR', venue: 'Moda Center', city: 'Portland', state: 'Oregon'},
		{name: 'Sacramento Kings', abbreviation: 'SAC', venue: 'Golden 1 Center', city: 'Sacramento', state: 'California'},
		{name: 'San Antonio Spurs', abbreviation: 'SAS', venue: 'Frost Bank Center', city: 'San Antonio', state: 'Texas'},
		{name: 'Toronto Raptors', abbreviation: 'TOR', venue: 'Scotiabank Arena', city: 'Toronto', state: 'Ontario'},
		{name: 'Utah Jazz', abbreviation: 'UTA', venue: 'Delta Center', city: 'Salt Lake City', state: 'Utah'},
		{name: 'Washington Wizards', abbreviation: 'WAS', venue: 'Capital One Arena', city: 'Washington', state: 'D.C.'},
	];

	await Teams.create(teamList);
	console.log('Done masukin semua team nba');
	process.exit();
}

seedNbaTeams();
