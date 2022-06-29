const sendStartMessage = require('./messages/start');
const sendListMessage = require('./messages/list');
const sendSportsMessage = require('./messages/sports');
const sendTrackMessage = require('./messages/track');
const sendUntrackMessage = require('./messages/untrack');
const sendTrackSportMessage = require('./messages/tracksport');
const sendUntrackSportMessage = require('./messages/untracksport');
const sendTrackMatchMessage = require('./messages/trackmatch');
const sendUntrackMatchMessage = require('./messages/untrackmatch');
const sendTrackQueryMessage = require('./messages/trackquery');
const sendUntrackQueryMessage = require('./messages/untrackquery');
const sendTrackQuerySuccessMessage = require('./messages/trackquerysuccess');
const sendSettingsMessage = require('./messages/settings');
const sendHelpMessage = require('./messages/help');
const sendStatusMessage = require('./messages/status');
const sendSupportMessage = require('./messages/support');

const sendNewMatchesNotification = require('./notifications/new-matches');
const sendNewCompetitionNotification = require('./notifications/new-competition');
const sendNewOddsNotification = require('./notifications/new-odds');
const sendNewMatchWithQueryNotification = require('./notifications/new-match-with-query');

module.exports = {
    sendStartMessage,
    sendListMessage,
    sendSportsMessage,
    sendTrackMessage,
    sendUntrackMessage,
    sendTrackSportMessage,
    sendUntrackSportMessage,
    sendTrackMatchMessage,
    sendUntrackMatchMessage,
    sendTrackQueryMessage,
    sendUntrackQueryMessage,
    sendTrackQuerySuccessMessage,
    sendSettingsMessage,
    sendHelpMessage,
    sendStatusMessage,
    sendSupportMessage,
    sendNewMatchesNotification,
    sendNewCompetitionNotification,
    sendNewOddsNotification,
    sendNewMatchWithQueryNotification,
}