import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://mailgen.js/", //Test Link
    },
  });

  let emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  let emailHtml = mailGenerator.generate(options);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email failed", error);
  }
};

//Email verification mail body generator factory function
const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Task Manager App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Task Manager, please click here:",
        button: {
          color: "#22BC66",
          text: "Verify Email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

//Forgot Password mail body generator factory function
const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your account password.",
      action: {
        instructions: "To change your password please click the button:",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

//Example format of how the sendMail method will be used
// sendMail({
//     email: user.email,
//     subject: "Subject of email",
//     mailGenContent: emailVerificationMailGenContent(user.username, `Verification URL`)
// });

export {
  sendMail,
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
};