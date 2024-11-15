import sgMail from "@sendgrid/mail";

const api_key: string = process.env.NEXT_PUBLIC_API_KEY_SENDGRID as string;

sgMail.setApiKey(api_key);

export const sendEmailVerification = async (
  email: string,
  verificationCode: string,
) => {
  const emailMsg = {
    to: email,
    from: "mehrnazibw@gmail.com",
    subject: "BASELINE EMAIL VERIFICATION",
    text: `Your verification code is ${verificationCode}`,
    html: `<strong>Your verification code is ${verificationCode}</strong>`,
  };

  try {
    await sgMail.send(emailMsg);
  } catch (error) {
    throw new Error(`Error seding email : ${error}`);
  }
};

export const generateVerificationCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};
