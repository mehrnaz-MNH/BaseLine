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
  //   useEffect(() => {
  //     if (account.status === "disconnected") {
  //       router.push("/");
  //     }
  //   }, [account.status, router]);

  const pathname = usePathname();

  useEffect(() => {
    console.log(account.isConnecting);
    console.log(account.isConnected);
    console.log(account.isDisconnected);
    console.log(account.isReconnecting);
    console.log("test " + account.status);
    console.log(account.connector);
  }, [account]);

//   useAccountEffect({
//     onConnect(data) {
//       console.log("connected"!, data);
//     },
//     onDisconnect() {
//       router.push("/");
//     },
//   });

  return (
    <div>
      <Navbar />

      <div>
        <Link
          className={`link ${pathname === "/homepage/portfolio" ? "active" : ""}`}
          href="/homepage/portfolio"
        >
          Portfolio
        </Link>

        <Link
          className={`link ${pathname === "/homepage/profile" ? "active" : ""}`}
          href="/homepage/mainprofile"
        >
          Profile
        </Link>
      </div>

      <div className="mx-auto flex max-h-screen min-h-screen max-w-2xl flex-grow flex-col px-4 py-8 font-[inter]">
        {children}
      </div>
    </div>
  );
}
