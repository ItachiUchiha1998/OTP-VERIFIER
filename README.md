# OTP-VERIFIER
A Project which verifies user's OTP after obtaining the user's mobile number

Nodejs(Express Framework) has been used to deploy backend and pug is the front-end 

to use the repository
install nodejs,twilio,otplib
npm install
npm install twilio --save
npm install otplib --save
Register yourself on www.twilio.com 
replace AUTH_TOKEN,ACCOUNT_SID and PHONE_NUMBER
and type npm start in terminal to start the project
The country code can be changed by changing
the value of countrycode variable in 
/routes/index.js
