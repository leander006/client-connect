import { env } from "process";

const nodemailer = require("nodemailer");

interface body{
  email:string, 
  subject: string, 
  title:string,
  para:string,
  link:string
}

export const sendMail = async ({email,subject,title,para,link}:body) => {
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
    const htmlContent = `
    <h1>${title}</h1>
    <p>${para}</p>
    <a href="${link}">Link</a>
  `;

    await trasporter.sendMail({
      to: email,
      subject: subject,
      html: htmlContent
    });
    console.log("Email send successfully");
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
};
