const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendNotificationEmail = async (email, { sportName, competition }) => {
  try {
    console.log('Sending email notification about new competition ...');

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${email.token}`

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
      sportName,
      competition,
      unsubscribeUrl,
    });

    const options = {
      to: email.address,
      subject: `Nové kurzy na šport ${sportName}`,
      text,
    }

    await sendMail(options);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNotificationEmail;