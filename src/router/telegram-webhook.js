const express = require('express');

const User = require('../models/User');

const telegramBot = require('../services/telegram-bot');
const telegramTracker = require('../utils/telegram-tracker');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {

            const message = req.body.message || req.body.edited_message;

            // if message is undefined, probably the bot was added to a group
            if (!message) {
                res.status(200)
                    .end('ok');
                return;
            }

            const chatID = message.chat.id;
            const userID = await addUserIfNotExists(chatID);

            let messageText = message.text;
            if (!messageText) {
                res.status(200)
                    .end('ok');
                return;
            }

            await telegramTracker.saveTelegramMessage(chatID, messageText);

            if (!messageText.startsWith('/') && message.reply_to_message) {
                const replyToMessage = message.reply_to_message;
                const replyToMessageText = replyToMessage.text || '';

                // TODO: save all sent messages to DB and check types of replyToMessage from DB by its ID
                if (replyToMessageText.startsWith('Zadaj query')) {
                    await telegramBot.sendTrackQuerySuccessMessage(chatID, userID, messageText);
                    res.status(200)
                        .end('ok');
                    return;
                }
            }

            messageText = messageText.replace(/ /g, '_')

            let command = messageText.split('_')[0];

            switch (command) {
                case '/start':
                    await telegramBot.sendStartMessage(chatID);
                    break;

                case '/list':
                    await telegramBot.sendListMessage(chatID);
                    break;
                
                case '/sports':
                    await telegramBot.sendSportsMessage(chatID);
                    break;

                case '/track':
                    const competitionToTrackIds = messageText.trim().split(/_+/).slice(1);
                    await telegramBot.sendTrackMessage(chatID, userID, competitionToTrackIds);
                    break;

                case '/untrack':
                    const competitionToUntrackIds = messageText.trim().split(/_+/).slice(1);
                    await telegramBot.sendUntrackMessage(chatID, userID, competitionToUntrackIds);
                    break;

                case '/tracksport':
                    const sportToTrackIds = messageText.trim().split(/_+/).slice(1);
                    await telegramBot.sendTrackSportMessage(chatID, userID, sportToTrackIds);
                    break;

                case '/untracksport':
                    const sportToUntrackIds = messageText.trim().split(/_+/).slice(1);
                    await telegramBot.sendUntrackSportMessage(chatID, userID, sportToUntrackIds);
                    break;

                case '/trackmatch':
                    const matchToTrackIds = messageText.trim().split(/_+/).slice(1);
                    await telegramBot.sendTrackMatchMessage(chatID, userID, matchToTrackIds);
                    break;

                case '/untrackmatch':
                    const matchToUntrackIds = messageText.trim().split(/_+/).slice(1);
                    await telegramBot.sendUntrackMatchMessage(chatID, userID, matchToUntrackIds);
                    break;

                case '/trackquery':
                    await telegramBot.sendTrackQueryMessage(chatID);
                    break;

                case '/untrackquery':
                    const queriesToUntrackIds = messageText.trim().split(/_+/).slice(1);
                    await telegramBot.sendUntrackQueryMessage(chatID, userID, queriesToUntrackIds);
                    break;

                case '/settings':

                    await telegramBot.sendSettingsMessage(chatID);
                    break;

                case '/help':
                    await telegramBot.sendHelpMessage(chatID);
                    break;

                case '/support':
                    await telegramBot.sendSupportMessage(chatID);
                    break;

                case '/status':
                    await telegramBot.sendStatusMessage(chatID);
                    break;

                default:
                    await telegramBot.sendHelpMessage(chatID);
            }

            res.status(200)
                .end('ok');
        } catch (err) {
            console.log(req.body);
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                });
        }
    });

const addUserIfNotExists = async (chatID) => {
    try {
        let user = await User.where({
            telegram_chat_id: chatID,
        }).fetch({ require: false });

        if (!user) {

            user = await new User({
                telegram_chat_id: chatID,
                token: chatID
            }).save();
            console.log('New Telegram user created !');
        }

        user = user.toJSON();
        return user.id;

    } catch (err) {
        throw err;
    }
};

module.exports = router;
