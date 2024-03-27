import { env } from "process";

const nodemailer = require("nodemailer");

interface body{
  email:string, 
  subject: string, 
  body: string,
}

export const sendMail = async (p:body) => {
  try {
    const trasporter = nodemailer.createTransport({
      host: env.HOST,
      service: env.SERVICE,
      port: Number(env.EMAIL_PORT),
      secure: Boolean(env.SECURE),
      auth: {
        user: env.USERNAME,
        pass: env.PASSWORD,
      },
    });

    await trasporter.sendMail({
      to: p.email,
      subject: p.subject,
      text: p.body,
    });
    console.log("Email send successfully");
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
};
