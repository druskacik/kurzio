const normalizeString = (s) => {
    let normalizedString = s.toLowerCase();
    normalizedString = normalizedString.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    return normalizedString;
};

module.exports = normalizeString;