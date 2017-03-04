var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var otp = require('otplib/lib/totp');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/', function(req, res, next) {
  res.render('index', { title: 'OTP Verifier' });
  next();
});

router.post('/verify',function(req,res,next){
	var countrycode = "+91"
	var secret = otp.utils.generateSecret();
	var code = otp.generate(secret);
 	var client = require('twilio')('ACed53612b1b9277cfd1f41ae0bd94cc56','0d36b767cce1b3b94b16cceb2d076a80');
	client.sendSms({
    to: countrycode + req.body.number,
    from:'+13312156302',
    body:  code
	}, function(error, message) {
    if (!error) {
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
	});
	res.render('verification')
	//
	router.post('/message',function(req,res){
	 if(code == req.body.otp) res.send('success');
	 else res.send('failure');	
	 next();
 });
	//
 });



module.exports = router;
