exports.seed = (knex) =>
	Promise.all([
    // Inserts seed entries
    knex('sport').insert({
      sport_name: 'snowboarding',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 38,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/snowboarding-38'
      })
    }),
    knex('sport').insert({
      sport_name: 'alpine skiing',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 35,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/alpske-lyzovanie-35'
      })
    }),
    knex('sport').insert({
      sport_name: 'bandy',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 5,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/bandy-5'
      })
    }),
    knex('sport').insert({
      sport_name: 'floorball',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 14,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/florbal-14'
      })
    }),
    knex('sport').insert({
      sport_name: 'futsal',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 17,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/futsal-17'
      })
    }),
    knex('sport').insert({
      sport_name: 'handball',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 20,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/hadzana-20'
      })
    }),
    knex('sport').insert({
      sport_name: 'yachting',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 89,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/jachting-89'
      })
    }),
    knex('sport').insert({
      sport_name: 'ski jumping',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 107,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/skoky-na-lyziach-107'
      })
    }),
  ]);
