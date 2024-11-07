"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useAccountEffect } from "wagmi";

import { CustomBtn } from "./_components/CustomBtn";

export default function Page() {
  const router = useRouter();
  // const { isConnected } = useAccount();
  // const [hasRedirected, setHasRedirected] = useState(false);

  // useEffect(() => {
  //   if (isConnected && !hasRedirected) {
  //     router.push("/onboarding");
  //     setHasRedirected(true);
  //   } else if (!isConnected && hasRedirected) {
  //     router.push("/");
  //     setHasRedirected(false);
  //   }
  // }, [isConnected, hasRedirected, router]);

  useAccountEffect({
    onConnect(data) {
      console.log("connected"!, data);
      router.push("/onboarding");
    },
    // onDisconnect() {
    //   router.push("/");
    // },
  });

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
