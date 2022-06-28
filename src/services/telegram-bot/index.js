const sendStartMessage = require('./messages/start');
const sendListMessage = require('./messages/list');
const sendSportsMessage = require('./messages/sports');
const sendTrackMessage = require('./messages/track');
const sendUntrackMessage = require('./messages/untrack');
const sendTrackSportMessage = require('./messages/tracksport');
const sendUntrackSportMessage = require('./messages/untracksport');
const sendTrackMatchMessage = require('./messages/trackmatch');
const sendUntrackMatchMessage = require('./messages/untrackmatch');
const sendSettingsMessage = require('./messages/settings');
const sendHelpMessage = require('./messages/help');
const sendStatusMessage = require('./messages/status');
const sendSupportMessage = require('./messages/support');

const sendNewMatchesNotification = require('./notifications/new-matches');
const sendNewCompetitionNotification = require('./notifications/new-competition');
const sendNewOddsNotification = require('./notifications/new-odds');

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
    sendSettingsMessage,
    sendHelpMessage,
    sendStatusMessage,
    sendSupportMessage,
    sendNewMatchesNotification,
    sendNewCompetitionNotification,
    sendNewOddsNotification,
}