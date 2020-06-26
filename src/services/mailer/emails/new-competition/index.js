const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendNotificationEmail = async (email, name) => {
  try {
    console.log('Sending email notification about new competition ...');

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
      name,
    });

    const options = {
      to: email,
      subject: 'Nová ponuka tenisových kurzov !',
      text,
    }

    await sendMail(options);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNotificationEmail;