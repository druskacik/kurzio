exports.seed = (knex) =>
	// Deletes ALL existing entries
	knex('provider').del()
		.then(() => Promise.all([
			// Inserts seed entries
			knex('provider').insert({
        name: 'Tipsport',
        url: 'https://www.tipsport.sk/',
			})
		]));
