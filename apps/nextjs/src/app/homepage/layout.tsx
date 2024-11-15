"use client";

import "../ui/global.css";
import "@rainbow-me/rainbowkit/styles.css";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import { useAccount, useAccountEffect } from "wagmi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const account = useAccount();
  const router = useRouter();
  // useEffect(() => {
  //   if (account.status === "disconnected") {
  //     router.push("/");
  //   }
  // }, [account.status, router]);

  const pathname = usePathname();

  useEffect(() => {
    console.log(account.isConnecting);
    console.log(account.isConnected);
    console.log(account.isDisconnected);
    console.log(account.isReconnecting);
    console.log("test " + account.status);
    console.log(account.connector);
  }, [account]);

  useAccountEffect({
    onConnect(data) {
      console.log("connected"!, data);
    },
    onDisconnect() {
      router.push("/");
    },
  });

  return (
    <div className="flex flex-grow flex-col">
      <Navbar />

      <div className="flex flex-grow flex-col px-3">
        <div className="flex space-x-3">
          <Link
            className="text-[18px] font-bold"
            href="/homepage/portfolio"
            style={{
              color:
                pathname === "/homepage/portfolio" ? "#FFFFFF" : "#FFFFFF4D",
            }}
          >
            Portfolio
          </Link>

          <Link
            className="text-[18px] font-bold"
            href="/homepage/mainprofile"
            style={{
              color:
                pathname === "/homepage/mainprofile" ? "#FFFFFF" : "#FFFFFF4D",
            }}
          >
            Profile
          </Link>
        </div>

        <div className="flex max-w-2xl flex-grow flex-col font-[inter]">
          {children}
        </div>
      </div>
    </div>
  );
}
