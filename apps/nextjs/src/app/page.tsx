"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { CustomBtn } from "./_components/CustomBtn";

export default function Page() {
  const account = useAccount();
  const router = useRouter();
  useEffect(() => {
    if (account.status === "connected") {
      router.push("/onboarding");
    }
  }, [account.status, router]);
  return (
    <div className="flex min-h-full flex-grow flex-col">
      <div>
        <img src="/logo.png" alt="our Logo" />
        <p className="pb-[] text-[72px] font-bold text-[#00FFD1]">BaseLine</p>
        <p className="text-[28px] font-extralight text-[#FFFFFF]">Fianance</p>
        <p className="text-[13px] text-[#929292]">
          Track your crypto portfolio , after doxxing yourself hard for no
          apparent reason
        </p>
      </div>
      <div className="mx-auto mt-auto items-center justify-center pb-[13px] align-middle">
        {/* <p className="text-[15px] font-extralight text-[#FFFFFF]">
          {account.address}
        </p> */}
        {/* <button className="min-h-[52px] w-full max-w-[312px] rounded-[4px] bg-[#00FFD1] font-bold text-[#000000]">
          Connect Wallet
        </button> */}
        {/* <ConnectButton /> */}
        <CustomBtn />
      </div>
    </div>
  );
}
