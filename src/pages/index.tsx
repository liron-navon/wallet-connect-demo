import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ethers } from "ethers";
import { useMountedState } from "react-use";

const messageToSign = "Hello world!";

export default function Home() {
  const [signature, setSignature] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const isMounted = useMountedState();
  const { disconnect } = useDisconnect();

  const modal = useWeb3Modal();
  const account = useAccount({
    onConnect: (data) => console.log("connected", data),
    onDisconnect: () => console.log("disconnected"),
  });

  const handleSignWithClient = async () => {
    try {
      const client = await account.connector!.getWalletClient();
      const sig = await client!.signMessage({
        message: messageToSign,
      });
      setSignature(sig);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  const handleSignWithProvider = async () => {
    try {
      const ap = await account.connector!.getProvider();
      const provider = new ethers.BrowserProvider(ap, "any");
      const signer = await provider!.getSigner();

      const sig = await signer.signMessage(messageToSign);
      setSignature(sig);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <main className="pt-10">
      {errorMessage && <div className="mb-10">{errorMessage}</div>}
      {signature && <div className="mb-10">{signature}</div>}
      {isMounted() && (
        <div>
          {!account.isConnected && (
            <div className="mb-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => modal.open()}
              >
                Connect wallet
              </button>
            </div>
          )}
          {account.isConnected && (
            <div className="mb-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleSignWithClient}
              >
                Sign message using client (viem)
              </button>
            </div>
          )}
          {account.isConnected && (
            <div className="mb-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleSignWithProvider}
              >
                Sign message using provider (ethers)
              </button>
            </div>
          )}
          {account.isConnected && (
            <div className="mb-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
