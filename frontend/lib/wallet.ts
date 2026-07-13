/**
 * Wallet utility functions for Freighter integration.
 *
 * This file exposes the core Freighter wallet helpers used by the UI.
 */

export const isFreighterInstalled = (): boolean => {
  if (typeof window === "undefined") return false;
  return typeof (window as any).freighter !== "undefined";
};

export const getFreighterPublicKey = async (): Promise<string> => {
  if (typeof window === "undefined") {
    throw new Error("Freighter is only available in the browser.");
  }

  const { getPublicKey } = await import("@stellar/freighter-api");
  return await getPublicKey();
};

export const signTransactionWithFreighter = async (
  transactionXdr: string
): Promise<string> => {
  const { signTransaction } = await import("@stellar/freighter-api");
  const result = await signTransaction(transactionXdr);

  if (typeof result === "string") {
    return result;
  }

  if (result && typeof result === "object") {
    if ("signature" in result) {
      return (result as any).signature;
    }

    if ("signedTransaction" in result) {
      return (result as any).signedTransaction;
    }
  }

  throw new Error("Unexpected Freighter signing result.");
};

export const connectToNetwork = async (network: "testnet" | "public") => {
  console.log(`Connecting to Stellar ${network}`);
  return network;
};
