import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { ethereumClient, projectId, wagmiConfig } from "@/web3";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
