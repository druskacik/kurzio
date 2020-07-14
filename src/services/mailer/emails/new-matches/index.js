const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendNotificationEmail = async (email, { competition, matches }) => {
  try {
    console.log(`Sending email notification about new matches to ${email.address}`);

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${email.token}`

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
      competition,
      matches,
      unsubscribeUrl,
    });

    const options = {
      to: email.address,
      subject: `Nové zápasy v súťaži ${competition.name}`,
      text,
    }

    await sendMail(options);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNotificationEmail;