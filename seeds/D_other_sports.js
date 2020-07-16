exports.seed = (knex) =>
	Promise.all([
    // Inserts seed entries
    knex('sport').insert({
      sport_name: 'american football',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 2,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/americky-futbal-2'
      })
    }),
    knex('sport').insert({
      sport_name: 'australian football',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 456,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/australsky-futbal-456'
      })
    }),
    knex('sport').insert({
      sport_name: 'baseball',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 6,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/baseball-6'
      })
    }),
    knex('sport').insert({
      sport_name: 'fight sports',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 208,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/bojove-sporty-208'
      })
    }),
    knex('sport').insert({
      sport_name: 'box',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 11,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/box-11'
      })
    }),
    knex('sport').insert({
      sport_name: 'cycling',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 13,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/cyklistika-13'
      })
    }),
    knex('sport').insert({
      sport_name: 'horse racing',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 49,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/dostihy-49'
      })
    }),
    knex('sport').insert({
      sport_name: 'e-sports',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 188,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/e-sporty-188'
      })
    }),
    knex('sport').insert({
      sport_name: 'golf',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 18,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/golf-18'
      })
    }),
    knex('sport').insert({
      sport_name: 'motosport',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 26,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/motosport-26'
      })
    }),
    knex('sport').insert({
      sport_name: 'rugby',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 31,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/rugby-31'
      })
    }),
    knex('sport').insert({
      sport_name: 'snooker',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 37,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/snooker-37'
      })
    }),
    knex('sport').insert({
      sport_name: 'society',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 25,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/spolocenske-stavky-25'
      })
    }),
    knex('sport').insert({
      sport_name: 'pingpong',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 40,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/stolny-tenis-40'
      })
    }),
    knex('sport').insert({
      sport_name: 'chess',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 41,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/sachy-41'
      })
    }),
    knex('sport').insert({
      sport_name: 'darts',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 42,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/sipky-42'
      })
    }),
    knex('sport').insert({
      sport_name: 'volleyball',
      provider_id: 1,
      url: 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999',
      parameters: JSON.stringify({
        type: 'SUPERSPORT',
        id: 47,
        results: false,
        url: 'https://www.tipsport.sk/kurzy/volejbal-47'
      })
    })
  ]);
