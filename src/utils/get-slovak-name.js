const getSlovakName = (name) => {
  const names = {
    football: 'Futbal',
    'ice hockey': 'Hokej',
    tennis: 'Tenis',
    basketball: 'Basketbal',
    baseball: 'Baseball',
    golf: 'Golf',
    cycling: 'Cyklistika',
    'american football': 'Americký futbal',
    'australian football': 'Austrálsky futbal',
    'e-sports': 'E-športy',
    motosport: 'Motošport',
    'fight sports': 'Bojové športy',
    'horse racing': 'Dostihy',
    box: 'Box',
    chess: 'Šach',
    society: 'Spoločenské  stávky',
    pingpong: 'Stolný tenis',
    darts: 'Šípky',
    rugby: 'Rugby',
    snooker: 'Snooker',
    volleyball: 'Volejbal'
  }

  return names[name];
}

module.exports = getSlovakName;