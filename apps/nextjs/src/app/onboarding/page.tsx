"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import Card from "../_components/Card";
import { generateVerificationCode, sendEmailVerification } from "../lib/email";
import { sendEmail } from "../lib/Utils";

const Page = () => {
  const account = useAccount();
  const address: string = account.address as string;
  const { data } = api.user.byId.useQuery({ id: address });
  const user = (data as any)?._doc;
  const email: string = user?.email;
  const profileComplete: boolean = user?.profileComplete;
  const emailVerified: boolean = user?.emailVerified;
  const updateUserVerification = api.user.update.useMutation();
  const { mutate } = sendEmail();

  const onBoardingSteps = [
    {
      StepNumber: 1,
      CardName: profileComplete ? "Profile complete" : "Complete your profile",
      page: "/onboarding/profile",
      isDone: profileComplete,
    },
    {
      StepNumber: 2,
      CardName: emailVerified ? "Email verified" : "Confirm email address",
      page: "/onboarding/emailverify",
      isDone: emailVerified,
    },

    {
      StepNumber: 3,
      CardName: "View my portfolio",
      page: "/homepage/portfolio",
      isDone: false,
    },
  ];

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
        <p className="text pl-4 text-2xl font-bold text-[#FFFFFF]">
          {user?.profileComplete
            ? "All set!"
            : user?.firstName
              ? `Hi ${user.firstName} !`
              : "Welcome"}
        </p>
        <div className="mb-6 min-h-full">
          {onBoardingSteps.map((item) => (
            <Card
              key={item.StepNumber}
              StepNumber={item.StepNumber}
              CardName={item.CardName}
              isDone={item.isDone}
              navTo={() => handleNavigate(item.page)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
