exports.seed = (knex) =>
	// Deletes ALL existing entries
	knex('sport').del()
		.then(() => Promise.all([
			// Inserts seed entries
			knex('sport').insert({
        sport_name: 'football',
        provider_id: 1,
        url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
        parameters: JSON.stringify({
          type: 'SUPERSPORT',
          id: 16,
          results: false,
          url: 'https://www.tipsport.sk/kurzy/futbal-16'
        })
      }),
      knex('sport').insert({
        sport_name: 'ice hockey',
        provider_id: 1,
        url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
        parameters: JSON.stringify({
          type: 'SUPERSPORT',
          id: 23,
          results: false,
          url: 'https://www.tipsport.sk/kurzy/hokej-23'
        })
      }),
      knex('sport').insert({
        sport_name: 'tennis',
        provider_id: 1,
        url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
        parameters: JSON.stringify({
          type: 'SUPERSPORT',
          id: 43,
          results: false,
          url: 'https://www.tipsport.sk/kurzy/tenis-43'
        })
      }),
      knex('sport').insert({
        sport_name: 'basketball',
        provider_id: 1,
        url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
        parameters: JSON.stringify({
          type: 'SUPERSPORT',
          id: 7,
          results: false,
          url: 'https://www.tipsport.sk/kurzy/basketbal-7'
        })
			}),
		]));
