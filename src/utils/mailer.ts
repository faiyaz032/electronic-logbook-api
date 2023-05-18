import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import log from './logger';

/**
 * Configured Transporter to send email
 */
const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'laro36lec7aq4y6h@ethereal.email',
    pass: '4hupzqQbuT5xykQN3m',
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
