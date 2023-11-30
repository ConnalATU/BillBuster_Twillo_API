

const express = require("express");
const app = express();
const port = process.env.PORT || 80

const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const accountSid = "AC537c572080c1b66d725cad890b7b52d8";
const authToken = "936f3e90aa87dfcd2ac2c65ee3c241ab";
const client = twilio(accountSid, authToken);

app.post('/make-call', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const message = req.body.message;

  client.calls.create({
    twiml: `<Response><Say>${message}</Say></Response>`,
    to: phoneNumber,
    from: '+15674004390'
  })
  .then(call => {
    console.log(call.sid);
    res.status(200).json({ message: "Call initiated successfully!" });
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: "Call initiation failed." });
  });
});

app.listen(port, () => {
  console.log("Server started on port 80");
});