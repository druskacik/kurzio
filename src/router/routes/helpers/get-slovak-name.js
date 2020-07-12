const getSlovakName = (name) => {
  const names = {
    football: 'Futbal',
    'ice hockey': 'Hokej',
    tennis: 'Tenis',
    basketball: 'Basketbal',
  }

  return names[name];
}

module.exports = getSlovakName;