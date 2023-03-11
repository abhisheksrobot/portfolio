const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhisheks.29vt@gmail.com', // Replace with your own email
    pass: 'Ronabhi1' // Replace with your own email password
  }
});

const sendMail = (name, email, subject, message, callback) => {
  const mailOptions = {
    from: email,
    to: 'abhisheks.29vt@gmail.com', // Replace with your own email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, info);
    }
  });
};

module.exports = { sendMail };
const express = require('express');
const { sendMail } = require('./contact');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/send-mail', (req, res) => {
  const { name, email, subject, message } = req.body;

  sendMail(name, email, subject, message, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send('Message sent successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
