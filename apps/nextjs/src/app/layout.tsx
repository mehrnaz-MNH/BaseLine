"use client";

import "./ui/global.css";
import "@rainbow-me/rainbowkit/styles.css";

import { TRPCReactProvider } from "@/trpc/react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "baseline",
  projectId: "f2fc7017f2367ac92ade262af6ca2380",
  chains: [mainnet, sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0909F7]">
        <TRPCReactProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider>
                <div className="mx-auto flex max-h-screen min-h-screen max-w-2xl flex-grow flex-col px-4 py-8 font-[inter]">
                  {children}
                </div>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
