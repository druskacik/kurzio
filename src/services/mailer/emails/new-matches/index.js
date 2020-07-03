const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendNotificationEmail = async (email, { competition, matches }) => {
  try {
    console.log('Sending email notification about new matches ...');

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
      competition,
      matches,
    });

    const options = {
      to: email,
      subject: `Nové zápasy v súťaži ${competition.name}`,
      text,
    }

    await sendMail(options);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNotificationEmail;