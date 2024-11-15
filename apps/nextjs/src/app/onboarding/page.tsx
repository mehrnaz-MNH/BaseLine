"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import Card from "../_components/Card";
import { generateVerificationCode, sendEmailVerification } from "../lib/email";
import { sendEmail } from "../lib/Utils";

const onBoardingSteps = [
  {
    StepNumber: 1,
    CardName: "Complete your profile",
    page: "/onboarding/profile",
  },
  {
    StepNumber: 2,
    CardName: "Confirm email address",
    page: "/onboarding/emailverify",
  },
  {
    StepNumber: 3,
    CardName: "Verify your identity",
    page: "/onboarding/profile",
  },
  {
    StepNumber: 4,
    CardName: "View my portfolio",
    page: "/onboarding/profile",
  },
];

const Page = () => {
  const account = useAccount();
  const address: string = account.address as string;
  const { data } = api.user.byId.useQuery({ id: address });
  const user = (data as any)?._doc;
  const email: string = user?.email;
  const updateUserVerification = api.user.update.useMutation();
  const { mutate } = sendEmail();

  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleVerificationSend = async () => {
    if (!email) {
      console.error("No email found for the user.");
      return;
    }

    const verificationCode = generateVerificationCode();
    console.log("new code:", verificationCode);
    setIsSending(true);

    try {
      await updateUserVerification.mutateAsync({
        id: address,
        verificationCode,
      });

      mutate({ email, code: verificationCode });
      console.log("Verification email sent.");
    } catch (error) {
      console.error("Error during verification:", error);
    } finally {
      setIsSending(false);
    }
  };
  const handleNavigate = async (page: string) => {
    if (page === "/onboarding/emailverify") {
      await handleVerificationSend();
    }
    router.push(page);
  };
  return (
    <>
      <div>
        <p className="text pl-4 text-2xl font-bold text-[#FFFFFF]">Welcome</p>
        <div className="mb-6 min-h-full">
          {onBoardingSteps.map((item) => (
            <Card
              key={item.StepNumber}
              StepNumber={item.StepNumber}
              CardName={item.CardName}
              navTo={() => handleNavigate(item.page)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
