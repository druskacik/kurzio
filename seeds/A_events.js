exports.seed = (knex) =>
	// Deletes ALL existing entries
	knex('event').del()
		.then(() => Promise.all([
			// Inserts seed entries
			knex('event').insert({
        id: 1,
        name: 'Fico Robert bude 31.12.2020 predsedom strany SMER-SD',
        type: 'politics',
        url: 'https://www.tipsport.sk/rest/offer/v1/matches/3647661/event-tables?fromResults=false',
			}),
			knex('event').insert({
				id: 2,
				name: 'USA - prezidentské voľby 2020 - vítaz',
				type: 'politics',
				url: 'https://www.tipsport.sk/rest/offer/v1/matches/3048185/event-tables?fromResults=false',
			})
		]));
