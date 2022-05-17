nodemailer = require('nodemailer')
require('dotenv').config()

exports.sendMail = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_ACCESSS_TOKEN
    }});

    
    let receivers = ''
    console.log(req.body)
    req.body.recivers.forEach((reciver, idx) => {
        if (idx == 0){
            receivers += reciver
        }
        else {
            receivers += (',' + reciver)
        }
    })
    
    let mailOptions = {
        to: receivers,
        subject: req.body.subject,
        text: req.body.content
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some errors occurred while sending email."
            });
        else res.send({ message: `Email was sent successfully!` });
    });
}

