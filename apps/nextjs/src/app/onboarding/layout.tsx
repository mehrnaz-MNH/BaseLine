"use client";

import "../ui/global.css";
import "@rainbow-me/rainbowkit/styles.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import Navbar from "../_components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const account = useAccount();
  const router = useRouter();
  useEffect(() => {
    if (account.status === "disconnected") {
      router.push("/");
    }
  }, [account.status, router]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto flex max-h-screen min-h-screen max-w-2xl flex-grow flex-col px-4 py-8 font-[inter]">
        {children}
      </div>
    </div>
  );
}
