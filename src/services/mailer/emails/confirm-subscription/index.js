const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendConfirmationEmail = async (email, confirmationUrl) => {
  try {
    console.log('Sending subscription confirmation email ...');

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
      url: confirmationUrl,
    });

    const options = {
      to: email,
      subject: 'Potvrdenie notifikácií na kurzy',
      text,
    }

    await sendMail(options);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendConfirmationEmail;