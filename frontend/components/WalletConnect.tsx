"use client";

import React, { useState, useEffect } from "react";

/**
 * WalletConnect Component
 *
 * Detects and manages connection to the Freighter browser extension wallet.
 * Uses @stellar/freighter-api to interact with the wallet.
 *
 * # TODO
 * - Implement error handling for wallet not installed
 * - Add wallet detection polling
 * - Implement disconnect functionality
 * - Add network selection (testnet/public)
 * - Display wallet balance
 * - Handle wallet switching events
 */

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
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(false);

  // Check if Freighter is installed
  useEffect(() => {
    const checkFreighter = async () => {
      try {
        // TODO: Check for window.freighter or use @stellar/freighter-api
        // const isConnected = await window.freighter.getPublicKey();
        // setIsFreighterInstalled(true);

        // Placeholder check
        const hasFreighter = typeof window !== "undefined" && "freighter" in window;
        setIsFreighterInstalled(hasFreighter);
      } catch (err) {
        console.log("Freighter not detected:", err);
        setIsFreighterInstalled(false);
      }
    };

    checkFreighter();
  }, []);

  /**
   * Connect to Freighter wallet
   *
   * # TODO
   * - Handle case where Freighter is not installed
   * - Implement error handling for connection failures
   * - Store connected wallet address in localStorage
   * - Request required permissions from wallet
   */
  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // TODO: Implement actual Freighter connection
      // Example using @stellar/freighter-api:
      // import { getPublicKey } from "@stellar/freighter-api";
      // const publicKey = await getPublicKey();

      // Placeholder implementation
      console.log("Connecting to Freighter...");

      // For now, simulate connection with a placeholder
      const placeholderWallet = "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
      setConnectedWallet(placeholderWallet);

      if (onConnected) {
        onConnected(placeholderWallet);
      }

      // TODO: Store wallet address in localStorage for persistence
      // localStorage.setItem("connectedWallet", placeholderWallet);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setError(errorMessage);
      console.error("Connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  };

  /**
   * Disconnect from wallet
   */
  const handleDisconnect = () => {
    setConnectedWallet(null);
    setError(null);

    if (onDisconnected) {
      onDisconnected();
    }

    // TODO: Clear wallet data from localStorage
    // localStorage.removeItem("connectedWallet");
  };

  return (
    <div className="w-full">
      {/* Freighter Not Installed Warning */}
      {!isFreighterInstalled && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 flex items-center gap-2">
            <span>⚠️</span>
            <span>
              <strong>Freighter not detected.</strong> Please install the{" "}
              <a
                href="https://www.freighter.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold hover:text-amber-900"
              >
                Freighter wallet extension
              </a>{" "}
              to connect.
            </span>
          </p>
        </div>
      )}

      {/* Connection Status */}
      {connectedWallet ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-green-900 mb-2">
                ✓ Connected
              </p>
              <p className="text-sm text-green-700 font-mono break-all">
                {/* TODO: Display formatted wallet address */}
                {connectedWallet}
              </p>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold"
            >
              Disconnect
            </button>
          </div>

          {/* TODO: Display additional wallet info */}
          {/* - Account balance
              - Network (testnet/public)
              - Recent transactions
          */}
        </div>
      ) : (
        <div>
          {/* Connection Error */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Connect Button */}
          <button
            onClick={handleConnect}
            disabled={isConnecting || !isFreighterInstalled}
            className="w-full px-6 py-3 bg-stellar-600 hover:bg-stellar-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
          >
            {isConnecting ? "Connecting..." : "Connect with Freighter"}
          </button>

          {/* Helper Text */}
          <p className="text-sm text-gray-500 mt-4">
            {/* TODO: Add more helpful information */}
            💡 Make sure the Freighter extension is installed and your wallet
            is unlocked.
          </p>
        </div>
      )}
    </div>
  );
}
