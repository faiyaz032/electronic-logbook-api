import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import log from './logger';

/**
 * Configured Transporter to send email
 */

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
});

/**
 * This function will send a email to the user
 * @param payload
 */
const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(`${err}: Error sending email`);
      return;
    }
    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
};

export default sendEmail;
