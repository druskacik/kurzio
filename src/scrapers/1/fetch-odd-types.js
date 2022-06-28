const axios = require('axios');

const getHeaders = require('./utils');

const Sport = require('../../models/Sport');
const OddType = require('../../models/OddType');

const fetchOddTypes = async () => {
    try {
        const headers = await getHeaders();
        let sports = await Sport
            .where('name', 'in', ['Tenis'])
            .fetchAll();
        sports = sports.toJSON();

        for (let sport of sports) {
            try {
                const url = 'https://m.tipsport.sk/rest/offer/v1/offer?limit=999999';
                const response = await axios.post(
                    url,
                    {
                        id: sport.provider_id,
                        results: false,
                        type: 'SUPERSPORT',
                        url: `https://www.tipsport.sk${sport.url}`,
                    },
                    {
                        headers,
                    }
                );
            
                const tabs = response.data.offerSuperSports[0].tabs;

                for (let tab of tabs) {
                    const oddTypes = getAllOddTypesRecursive(tab);

                    for (let oddType of oddTypes) {
                        const providerID = oddType.provider_id;
    
                        let oddTypeDB = await OddType.where({
                            provider_id: providerID,
                        }).fetch({ require: false });
    
                        if (!oddTypeDB) {
                            await new OddType({
                                provider_id: providerID,
                                label: oddType.label,
                                path: oddType.path,
                                sport_id: sport.id,
                            }).save();
                        }
                    }
                }

            } catch (err) {
                console.log(err.message);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllOddTypesRecursive = (tab, path = '', label = '') => {
    let tabPath = path ? `${path}/${tab.matchView}` : tab.matchView;
    let tabLabel = label ? `${label} ${tab.name}` : tab.name;
    const hasSubtabs = tab.subTabs.length > 0;
    const oddTypes = hasSubtabs ? [] : [
        {
            provider_id: tab.matchView,
            label: tabLabel,
            path: tabPath,
        },
    ];
    for (let subTab of tab.subTabs) {
        oddTypes.push(...getAllOddTypesRecursive(subTab, tabPath, tabLabel));
    };
    return oddTypes;
}

module.exports = fetchOddTypes;