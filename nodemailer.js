const nodemailer = require('nodemailer');

async function main(reciever, message) {
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'onedibecharles19@gmail.com',
      pass: 'chigozie1999', // naturally, replace both with your real credentials or an application-specific password
    },
  });

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
