"use client";

import React, { useState, useEffect } from "react";
import { getFreighterPublicKey, isFreighterInstalled } from "@/lib/wallet";

interface WalletConnectProps {
  onConnected?: (wallet: string) => void;
  onDisconnected?: () => void;
}

export default function WalletConnect({
  onConnected,
  onDisconnected,
}: WalletConnectProps) {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freighterAvailable, setFreighterAvailable] = useState(false);

  useEffect(() => {
    setFreighterAvailable(isFreighterInstalled());

    if (typeof window !== "undefined") {
      const savedWallet = window.localStorage.getItem("connectedWallet");
      if (savedWallet) {
        setConnectedWallet(savedWallet);
        onConnected?.(savedWallet);
      }
    }
  }, [onConnected]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const publicKey = await getFreighterPublicKey();
      setConnectedWallet(publicKey);
      window.localStorage.setItem("connectedWallet", publicKey);
      onConnected?.(publicKey);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect to Freighter.";
      setError(errorMessage);
      console.error("Connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
    setError(null);
    window.localStorage.removeItem("connectedWallet");
    onDisconnected?.();
  };

  const shortAddress = connectedWallet
    ? `${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-6)}`
    : "";

  return (
    <div className="w-full">
      {!freighterAvailable && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 flex items-center gap-2">
            <span>⚠️</span>
            <span>
              <strong>Freighter wallet not detected.</strong> Install the
              extension to connect.
            </span>
          </p>
        </div>
      )}

      {connectedWallet ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-green-900 mb-2">
                Connected
              </p>
              <p className="text-sm text-green-700 font-mono break-all">
                {shortAddress}
              </p>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          <button
            onClick={handleConnect}
            disabled={isConnecting || !freighterAvailable}
            className="w-full px-6 py-3 bg-stellar-600 hover:bg-stellar-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            {isConnecting ? "Connecting..." : "Connect with Freighter"}
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Install Freighter and unlock your wallet before connecting.
          </p>
        </div>
      )}
    </div>
  );
}
