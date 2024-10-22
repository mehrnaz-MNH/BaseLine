"use client";

import "../ui/global.css";
import "@rainbow-me/rainbowkit/styles.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccount, WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

import Navbar from "../_components/Navbar";

const config = getDefaultConfig({
  appName: "baseline",
  projectId: "f2fc7017f2367ac92ade262af6ca2380",
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

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
      {/* <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider> */}
      <Navbar />
      <div className="mx-auto flex min-h-screen max-w-2xl flex-grow flex-col px-4 py-8 font-[inter]">
        {/* <main className="min-h-screen flex-grow bg-yellow-800"> */}
        {children}
        {/* </main> */}
      </div>
      {/* </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider> */}
    </div>
  );
}
