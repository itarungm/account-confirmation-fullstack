const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require('handlebars');

const index = (req, res, next) => {

    User.find().then(response => {
        res.json({
            response,
            success: true,
        })
    }).catch(error => {
        res.json({
            success: false,
            message: 'An error Occured'
        })
    })
}

const register = (req, res, next) => {
    let email = req.body.email;
    User.findOne({ email }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: error
            })
        } else if (user) {
            res.json({
                success: false,
                message: 'Duplicate Email'
            })
        } else {
            console.log(req.body)
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password, //TODO: Need Password Encryption
                dob: req.body.dob,
                url:req.body.url,
                isactive: false,
                token: jwt.sign({ email: req.body.email }, process.env.JWT_SECRET)
            })
            sendEmail(user).then(()=>{
                user.save()
                .then(response => {
                    res.json({
                        response:req.body,
                        success: true,
                        message: 'User Created!'
                    })
                })
                .catch((error) => {
                    res.json({
                        success: false,
                        message: error
                    })
                })
            }).catch((err)=>{
                res.json({
                    success: false,
                    message: err
                })
            });
           
        }
    })

}


let readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            console.log(err);
            console.log(err);


            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


 async function sendEmail(details){
 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_SENDER_USER, // generated ethereal user
      pass: process.env.NODEMAILER_SENDER_PASS // generated ethereal password
    },
  });
  let htmlToSend;
  await readHTMLFile('public/verification-email-template.html', function(err, html) {
    let template = handlebars.compile(html);
    let replacements = {
         name:details.name,
         verificationUrl:details.url.toString()+details.token
    };
    htmlToSend= template(replacements);
// send mail with defined transport object
transporter.sendMail({
    from: '"Fence" <iTarunGM>', // sender address
    to: details.email, // list of receivers
    subject: "Verify Email", // Subject line
    text: "<p>Verification Email</p><a href={{details.url}}>{{details.url}}</a>", // plain text body
    html: htmlToSend, // html body
  }).then(()=>{

  }).catch((err)=>{
      throw err;
  });

});

let replacementForSelf={
    name: details.name,
    email:details.email,
    password: details.password,
    dob: details.dob,
    phone: details.phone
}

let htmlForSelf = "<p>Name: {{name}}</p><p>Password: {{password}}</p><p>Email: {{email}}</p><p>Phone: {{details.phone}}</p><p>DOB: {{dob}}</p>";
let temp =  handlebars.compile(htmlForSelf);

// send mail copy with defined transport object
transporter.sendMail({
    from: '"Fence New Member" <iTarunGM>', // sender address
    to: process.env.NODEMAILER_SENDER_USER, // list of receivers
    subject: "User Details", // Subject line
    text: "<p>Verification Link</p><a href={{url}}>{{url}}</a>", // plain text body
    html: temp(replacementForSelf), // html body
  }).then(()=>{

  }).catch((err)=>{
      throw err;
  });



     
}

const verifyEmail = (req, res, next)=>{
    User.findOneAndUpdate({token: req.body.token},{ "$set":{isactive: true,token:null}}, (err, user)=>{
        if(err){
            res.json({
                success: false,
                message: err
            })
        }else if(user){
            res.json({
                success: true,
                message: 'success'
            })
        }else{
            res.json({
                success: false,
                message: 'Oops! Already Verified.'
            })
        }
    })
}

const login = (req,res,next)=>{
    User.findOne({ email: req.body.email }, function(err, user) {
        // error occur
        if(err){
            return res.json({
                success: false,
                message: err.message
            })
        }
        // user is not found in database i.e. user is not registered yet.
        else if (!user){
            return res.json({
                success: false,
                message: 'The email address ' + req.body.email + ' is not associated with any account. please check and try again!'
            })
        }
        // comapre user's password if user is find in above step
        else if(req.body.password!== user.password){
            return res.json({
                success: false,
                message: 'Wrong Password!',
            })
        }
        // check user is verified or not
        else if (!user.isactive){
            return res.json({
                success: false,
                message: 'Your Email has not been verified. Please check your mail box',
            })
        } 
        // user successfully logged in
        else{
            return res.json({
                response:user.name,
                success: true,
                message: 'Logged In',
                token: jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {expiresIn:'30m'})
            })
        }
    });
}






module.exports = {
    index, register, verifyEmail, login
}