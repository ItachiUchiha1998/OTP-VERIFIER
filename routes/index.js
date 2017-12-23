var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var otp = require('otplib/totp'); // module for generation of otp
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/', function(req, res, next) {
  res.render('index', { title: 'OTP Verifier' });
  next();
});

router.post('/',function(req,res,next){ // Get user's mobile number and send OTP
	var countrycode = "+91" // May vary on basis of Country
	var secret = otp.utils.generateSecret();
	var code = otp.generate(secret);
 	var client = require('twilio')('ACCOUNT_SID','AUTH_TOKEN'); // REGISTER IN TWILIO
	client.sendSms({
    to: countrycode + req.body.number,
    from:'PHONE_NUMBER', // TWILIO NUMBER
    body:  code
	}, function(error, message) {
    if (!error) { // Check whether otp was sent successfully or not
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
	});
	router.post('/verify',function(req,res){ // Verification of OTP
	 if(code == req.body.otp) res.send('success'); 
	 else res.send('failure');	
	 next();
 });
 });
module.exports = router;
