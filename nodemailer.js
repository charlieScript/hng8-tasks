const nodemailer = require('nodemailer');

async function main(reciever, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.user,
  //     pass: process.env.password, // naturally, replace both with your real credentials or an application-specific password
  //   },
  // });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Charles', // sender address
    to: reciever, // list of receivers
    subject: 'From Charles', // Subject line
    text: message, // plain text body
    // html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
}

// main().catch(console.error);

module.exports = main
