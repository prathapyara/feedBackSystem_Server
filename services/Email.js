import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.EMAIL_SECRET_KEY);

// const msg = {
//   to: "prathapyara@gmail.co",
//   from: "prathapyara123@gmail.co",
//   subject: "Sending with Twilio SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

export const sendMail = async (msg) => {
  try {
    const response=await sgMail.send(msg);
    console.log("iam inside the sendMail");
  } catch (error) {
    console.log("iam inside the error of sendMail");
    console.log(error);
  }
};
