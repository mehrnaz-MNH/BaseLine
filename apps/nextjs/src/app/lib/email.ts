import { api } from "@/trpc/react";
import sgMail from "@sendgrid/mail";

const api_key: string = process.env.NEXT_PUBLIC_API_KEY_SENDGRID as string;

sgMail.setApiKey(api_key);

export const sendEmailVerification = async (
  email: string,
  verificationCode: string,
) => {
  console.log("here");
  const emailMsg = {
    to: email,
    from: "mehrnazibw@gmail.com",
    subject: "BASELINE EMAIL VERIFICATION",
    text: `Your verification code is ${verificationCode}`,
    html: `<strong>Your verification code is ${verificationCode}</strong>`,
  };

  try {
    console.log("now here");
    const response = await sgMail.send(emailMsg);

    console.log({ response });
    console.log("reached here!");
    return { success: true, status: 200, email: email };
  } catch (error) {
    return { success: false, status: 500, error: error };
  }
};

export const generateVerificationCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

// export const verifyCode = async (id: string, inputCode: string) => {
//   try {
//     const { data } = api.user.byId.useQuery({ id: id });
//     const user = (data as any)?._doc;
//     const code: string = user?.verificationCode;

//     if (code && code === inputCode) {
//       const updateUserVerification = api.user.update.useMutation();

//       await updateUserVerification.mutateAsync({
//         id,
//         emailVerified: true,
//       });

//       return true;
//     }

//     return false;
//   } catch (error) {
//     console.error("Verification failed:", error);
//     return false;
//   }
// };
