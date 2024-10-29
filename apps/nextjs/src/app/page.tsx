"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { CustomBtn } from "./_components/CustomBtn";

export default function Page() {
  const account = useAccount();
  const router = useRouter();
  useEffect(() => {
    if (account.status === "disconnected") {
      router.push("/");
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
        <CustomBtn />
      </div>
    </div>
  );
}
