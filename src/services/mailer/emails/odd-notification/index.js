const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendNotificationEmail = async (value) => {
  try {
    console.log('Sending notification email ...');

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
      value,
    });

    const options = {
      to: 'robert.druska@gmail.com',
      subject: 'Kurz stúpol nad stanovenú hodnotu !',
      text,
    }

    await sendMail(options);
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNotificationEmail;