import Logger from './winston';
import { smtp } from '../../cred.json';
import ResMessages from './resMessages';
import nodemailer, { Transporter } from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const createTransporter = (): Transporter => {
  return nodemailer.createTransport(
    smtpTransport({
      host: smtp.smtpHost,
      port: +smtp.smtpPort,
      secure: false,
      requireTLS: true,
      tls: {
        rejectUnauthorized: true,
      },
      auth: {
        type: 'OAuth2',
        user: smtp.smtpUser,
        pass: smtp.smtpPass,
      },
    })
  );
};

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = createTransporter();

  const mailOptions = {
    from: smtp.smtpUser,
    ...options,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    Logger.error('Failed to send email.');
    throw new Error(ResMessages.FAILED_TO_SEND_EMAIL);
  }
};
