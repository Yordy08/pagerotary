import nodemailer from 'nodemailer';

const config = useRuntimeConfig()
const password = config.PASSWORD!;
const correo = config.CORREO!;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: correo,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//@ts-ignore
transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter:', error);
  } 
});

export default transporter;