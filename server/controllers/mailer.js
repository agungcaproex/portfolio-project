const nodemailer = require('nodemailer');


module.exports = {
    sendMail: (receivers, task) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'agung.pr4bowo@gmail.com', // generated ethereal user
                    pass: process.env.MAIL_PASS // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Admin System" <agung.pr4bowo@gmail.com>', // sender address
                to: receivers, // list of receivers
                subject: 'Update ToDo ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: `<p>Anda baru saja telah mengubah ToDo List. Nama Task :<strong> "${task}"</strong></p>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
}
