const nodemailer = require('nodemailer');

exports.sendEmail = async (emailData) => {
    const { recipient, subject, text } = emailData;
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'toysway1@gmail.com',
            pass: 'ltxrqpumlkmcszpf'
        }
    });
    const mailOptions = {
        from: 'Toys Way <toysway1@gmail.com>',
        to: recipient,
        subject: subject,
        html: 
        `
    <p>${text}</p>
    <div style="text-align:center"><img src="https://ci3.googleusercontent.com/mail-sig/AIorK4yQXdHp3wXnPP8SsKetoDw0v0xdHu0t9JDXVh4_sx24ygsyCntTo-O0dgaNE3JD-db9RpfzX7I" class="CToWUd" data-bit="iit"><b><font size="4" color="#ff0000">נשמח לעמוד לשירותכם! צוות Toys Way</font></b></div>
`,
   
    };
    try {
        const result = await transport.sendMail(mailOptions);
        return {
            status: 200,
            message: 'Email sent successfully'
        };
    } catch (err) {
        throw new Error('Failed to send email');
    }
}