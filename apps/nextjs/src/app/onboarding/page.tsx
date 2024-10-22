"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTemplateExpression } from "typescript";
import { useAccount } from "wagmi";

import Card from "../_components/Card";
import { CustomBtn } from "../_components/CustomBtn";
import Navbar from "../_components/Navbar";

const onBoardingSteps = [
  {
    StepNumber: 1,
    CardName: "Complete your profile",
  },
  {
    StepNumber: 2,
    CardName: "Confirm email address",
  },
  {
    StepNumber: 3,
    CardName: "Verify your identity",
  },
  {
    StepNumber: 4,
    CardName: "View my portfolio",
  },
];

const Page = () => {
  // const account = useAccount();

  // const router = useRouter();
  // useEffect(() => {
  //   if (account.status === "disconnected") {
  //     router.push("/");
  //   }
  // }, [account.status, router]);
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <p className="text pl-4 text-2xl font-bold text-[#FFFFFF]">Welcome</p>
        <div className="mb-6 min-h-full">
          {onBoardingSteps.map((item) => (
            <Card
              key={item.StepNumber}
              StepNumber={item.StepNumber}
              CardName={item.CardName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
