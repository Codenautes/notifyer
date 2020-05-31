const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nasaequipe106@gmail.com',
    pass: '' // put the password here,
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    const body = JSON.stringify(req.body);
    const data = JSON.parse(body);

    const mailOptions = {
      from: 'nasaequipe106@gmail.com',
      to: data.email,
      subject: 'notificação',
      html: `<p style="font-size: 16px;">${data.email}</p>
        <br />
        <p>${data.message}</p>
        <br />
        <p>${data.name}</p>
      `
    };

    return transporter.sendMail(mailOptions, (erro, info) => {
      if(erro){
        return res.send(erro.toString());
      }
      return res.send('Sended');
    });
  });
});
