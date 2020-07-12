const express = require('express');
const randomstring = require('randomstring');

const path = require('path');

const knex = require('../../../knex_connection');
const confirmSubscription = require('./helpers/confirm-subscription-request');
const sendConfirmationEmail = require('../../services/mailer/emails/confirm-subscription');

const router = express.Router();

router.route('/create')
  .post(async (req, res) => {
    try {
      const request = req.body;
      const confirmationToken = randomstring.generate(12);
      await knex('subscription_request').insert({
        confirmation_token: confirmationToken,
        request_json: JSON.stringify(request),
        active: 1,
      });

      // send email
      const confirmationUrl = `${process.env.BASE_URL}/api/subscription/confirm?token=${confirmationToken}`;
      await sendConfirmationEmail(request.email, confirmationUrl);

      res.status(200)
        .json({
          message: 'Subscription request successful !',
          token: confirmationToken,
        });
    } catch (err) {
      console.log(err);
      res.status(err.status || 500)
        .json({
          status: err.status || 500,
          message: err.message,
        })
    }
  })

router.route('/confirm')
  .get(async (req, res) => {
    try {
      const token = req.query.token;

      const request = await knex('subscription_request')
        .where({
          'confirmation_token': token,
        })
        .select();
      if (request.length === 0) {
        throw new Error("Unknown or expired confirmation token !");
      }

      if (request[0].active === 1) {
        await confirmSubscription(JSON.parse(request[0].request_json), token);
  
        await knex('subscription_request')
          .where({
            'confirmation_token': token,
          })
          .update({
            active: 0,
          })
      }

      res.status(200)
        .sendFile(path.join(__dirname, '../../pages/subscription-confirmed/index.html'));

    } catch (err) {
      console.log(err);
      res.status(err.status || 500)
        .json({
          status: err.status || 500,
          message: err.message,
        })
    }
  })

router.route('/unsubscribe')
  .get(async (req, res) => {
    try {
      const token = req.query.token;

      await knex('email')
        .where({
          token,
        })
        .update({
          active: 0,
        })

      res.status(200)
        .sendFile(path.join(__dirname, '../../pages/unsubscribe-page/index.html'));
    } catch (err) {
      console.log(err);
      res.status(err.status || 500)
        .json({
          status: err.status || 500,
          message: err.message,
        })
    }
  })

module.exports = router;