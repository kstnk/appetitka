const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'wizzard.market@yandex.ru',
    pass: 'adiwxvefeejnqpgl',
  },
}, {
  from: 'Mailer Test <wizzard.market@yandex.ru>',
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) console.log(err);
    console.log('Email sent: ', info);
  });
};

module.exports = mailer;
