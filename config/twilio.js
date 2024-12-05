const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
require("dotenv").config();

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = (otp, phone) => {
  client.messages
    .create({
      body: `Here is your OTP number - ${otp}. The code will expire after 3 minutes`,
      to: phone,
      from: "+14345426764",
    })
    .then((message) => console.log(message))
    .catch((error) => {
      console.log(error);
    });
};
