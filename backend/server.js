
import express from 'express';
import { upload } from './upload.js';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
const app = express();

dotenv.config() // load .env file variables into process.env

app.use(express.json())

// setup email sender
const smtpClient = nodemailer.createTransport({
  service: process.env.MAIL_PROVIDER,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * FORM DATA from frontend
 * {
 *  "name": "Mojdeh"
 *  "file": 1277247328288888  (binary)
 * }
 * 
 * 
 */
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body) // normal JSON data
  console.log(req.file); // binary file

  // send email to boss
  smtpClient
    .sendMail({
      from: process.env.MAIL_FROM,
      to: "moj.saadat@gmail.com",
      subject: "Hello from Nodemailer",
      html: "Hello there. <br /><br />Short test if it is working.<br /><br />Greetings from Rob",
      text: "Hello there.\n\nShort test if it is working.\n\nGreetings from Rob",
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    })

    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log("[ERR]", err));

    res.json({
      file: req.file, 
      json: req.body
    });
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
