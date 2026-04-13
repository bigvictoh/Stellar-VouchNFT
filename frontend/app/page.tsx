"use client";

import React, { useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import VouchBadge from "@/components/VouchBadge";

/**
 * Main application page
 *
 * TODO: Implement full application features
 * - Display connected wallet information
 * - Show user's issued vouches
 * - Provide interface to issue new vouches
 * - Display received vouches from others
 */
export default function Home() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [vouches, setVouches] = useState<any[]>([]);

  const handleWalletConnected = (wallet: string) => {
    setConnectedWallet(wallet);
    // TODO: Fetch user's vouches from backend
  };

  const handleWalletDisconnected = () => {
    setConnectedWallet(null);
    setVouches([]);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-stellar-900">
          Professional Identity on Stellar
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Issue and verify Soulbound NFTs as professional vouches for skills
          and expertise.
        </p>
        {/* TODO: Add call-to-action buttons */}
      </section>

      {/* Wallet Connection Section */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h3 className="text-2xl font-bold mb-6">Connect Your Wallet</h3>
        <WalletConnect
          onConnected={handleWalletConnected}
          onDisconnected={handleWalletDisconnected}
        />
      </section>

      {/* Vouches Display Section */}
      {connectedWallet && (
        <section className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-6">Your Vouches</h3>

          {vouches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                You haven't received any vouches yet.
              </p>
              {/* TODO: Add button to request a vouch */}
              <button className="bg-stellar-600 text-white px-6 py-2 rounded-lg hover:bg-stellar-700 transition">
                Request a Vouch
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TODO: Replace with actual vouch data */}
              {/* Example: */}
              <VouchBadge
                skill="Rust Programming"
                issuer="Stellar Foundation"
                issueDate={new Date().toISOString()}
                badge={{
                  id: "example-1",
                  skill: "Rust Programming",
                  issuer: "Stellar Foundation",
                  metadataUri: "ipfs://example",
                }}
              />
              <VouchBadge
                skill="Smart Contracts"
                issuer="Soroban Guild"
                issueDate={new Date().toISOString()}
                badge={{
                  id: "example-2",
                  skill: "Smart Contracts",
                  issuer: "Soroban Guild",
                  metadataUri: "ipfs://example",
                }}
              />
            </div>
          )}
        </section>
      )}

      {/* Features Section */}
      <section className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO: Make these modular components */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">🔐</div>
            <h4 className="text-xl font-bold mb-2">Soulbound NFTs</h4>
            <p className="text-gray-600">
              Non-transferable credentials permanently bound to your wallet.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">✅</div>
            <h4 className="text-xl font-bold mb-2">Verified Credentials</h4>
            <p className="text-gray-600">
              Identity verification ensures authenticity of all vouches.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">🌐</div>
            <h4 className="text-xl font-bold mb-2">Decentralized</h4>
            <p className="text-gray-600">
              Built on Stellar, no central authority controls your identity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
