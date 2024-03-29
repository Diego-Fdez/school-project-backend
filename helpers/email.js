import nodemailer from 'nodemailer';

//function that sends account recovery mail

export const emailForgetPassword = async (data) => {
  const { email, userName, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //email body
  await transport.sendMail({
    from: '"SchoolOffice App" <accounts@schoolofficeapp.com>',
    to: email,
    subject: 'School Office - reset your password',
    text: 'Reset your password.',
    html: `
    <p>Hi: ${userName}, you have requested to reset your password</p>

    <p>Follow the link below to generate a new password</p>

    <a href="${process.env.FRONT_END}/forgetpwd/${token}">Restore password</a>

    <p>If you did not create this account, you can ignore the message.</p>
    `,
  });
};
