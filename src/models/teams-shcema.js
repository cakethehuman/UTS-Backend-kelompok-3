module.exports = (db) =>
	db.model(
		'Teams',
		new db.Schema({
			name: {
				type: String,
				required: true,
				unique: true,
			},
			abbreviation: {
				type: String,
				required: true,
			},
			venue : {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
		})
	);
