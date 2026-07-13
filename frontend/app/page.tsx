"use client";

import React, { useEffect, useState } from "react";
import WalletConnect from "@/components/WalletConnect";
import VouchBadge from "@/components/VouchBadge";
import { checkBackendHealth, listVouches, Vouch } from "@/lib/api";

const sampleVouches: Vouch[] = [
  {
    id: "example-1",
    skill: "Rust Programming",
    issuer: "Stellar Foundation",
    issueDate: new Date().toISOString(),
    metadataUri: "ipfs://example-1",
  },
  {
    id: "example-2",
    skill: "Smart Contracts",
    issuer: "Soroban Guild",
    issueDate: new Date().toISOString(),
    metadataUri: "ipfs://example-2",
  },
];

export default function Home() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [vouches, setVouches] = useState<Vouch[]>([]);
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedWallet = window.localStorage.getItem("connectedWallet");
    if (storedWallet) {
      setConnectedWallet(storedWallet);
    }
  }, []);

  useEffect(() => {
    const loadHealth = async () => {
      const healthy = await checkBackendHealth();
      setBackendHealthy(healthy);
    };
    loadHealth();
  }, []);

  useEffect(() => {
    if (!connectedWallet) {
      setVouches([]);
      return;
    }

    const loadVouches = async () => {
      setIsFetching(true);
      setApiMessage(null);

      try {
        const response = await listVouches(connectedWallet);
        setVouches(response.vouches ?? sampleVouches);
      } catch (error) {
        setApiMessage(
          "Unable to load vouches from backend. Displaying sample data."
        );
        setVouches(sampleVouches);
      } finally {
        setIsFetching(false);
      }
    };

    loadVouches();
  }, [connectedWallet]);

  const handleWalletConnected = (wallet: string) => {
    setConnectedWallet(wallet);
    setApiMessage(null);
  };

  const handleWalletDisconnected = () => {
    setConnectedWallet(null);
    setVouches([]);
    setApiMessage(null);
  };

  return (
    <div>
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-stellar-900">
          Professional Identity on Stellar
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Issue and manage Soulbound NFTs as verifiable professional endorsements.
        </p>
        <div className="inline-flex gap-3">
          <span className="px-4 py-2 bg-stellar-100 text-stellar-700 rounded-full font-semibold">
            {backendHealthy === null
              ? "Checking backend..."
              : backendHealthy
              ? "Backend online"
              : "Backend offline"}
          </span>
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full font-semibold">
            Network: {process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "testnet"}
          </span>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h3 className="text-2xl font-bold mb-6">Connect Your Wallet</h3>
        <WalletConnect
          onConnected={handleWalletConnected}
          onDisconnected={handleWalletDisconnected}
        />
      </section>

      {connectedWallet && (
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">Your Vouches</h3>
              <p className="text-sm text-slate-500">
                {isFetching
                  ? "Loading your vouches..."
                  : `${vouches.length} vouch(es) found.`}
              </p>
            </div>
          </div>

          {apiMessage && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              {apiMessage}
            </div>
          )}

          {vouches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                You don't have any vouches yet.
              </p>
              <button className="bg-stellar-600 text-white px-6 py-2 rounded-lg hover:bg-stellar-700 transition">
                Request a Vouch
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {vouches.map((vouch) => (
                <VouchBadge
                  key={vouch.id}
                  skill={vouch.skill}
                  issuer={vouch.issuer}
                  issueDate={vouch.issueDate}
                  badge={{
                    id: vouch.id,
                    skill: vouch.skill,
                    issuer: vouch.issuer,
                    metadataUri: vouch.metadataUri,
                  }}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mt-12">
        <h3 className="text-2xl font-bold mb-6">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">🔐</div>
            <h4 className="text-xl font-bold mb-2">Soulbound NFTs</h4>
            <p className="text-gray-600">
              Non-transferable credentials bound directly to your Stellar account.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">✅</div>
            <h4 className="text-xl font-bold mb-2">Verified Credentials</h4>
            <p className="text-gray-600">
              Endorsements are issued and verified on the Stellar network.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-4">🌐</div>
            <h4 className="text-xl font-bold mb-2">Decentralized</h4>
            <p className="text-gray-600">
              Build reputation without a central authority controlling your data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
