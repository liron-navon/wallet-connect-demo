import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

export const chains = [arbitrum, mainnet, polygon];
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

export const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);
