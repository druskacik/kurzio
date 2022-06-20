const sendStartMessage = require('./messages/start');
const sendListMessage = require('./messages/list');
const sendTrackMessage = require('./messages/track');
const sendUntrackMessage = require('./messages/untrack');
const sendSettingsMessage = require('./messages/settings');
const sendHelpMessage = require('./messages/help');
const sendStatusMessage = require('./messages/status');
const sendSupportMessage = require('./messages/support');

const sendNewMatchesNotification = require('./notifications/new-matches');

module.exports = {
    sendStartMessage,
    sendListMessage,
    sendTrackMessage,
    sendUntrackMessage,
    sendSettingsMessage,
    sendHelpMessage,
    sendStatusMessage,
    sendSupportMessage,
    sendNewMatchesNotification,
}