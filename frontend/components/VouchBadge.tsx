"use client";

import React from "react";

/**
 * VouchBadge Component
 *
 * Displays an NFT vouch/badge with metadata about the skill and issuer.
 * Represents a Soulbound NFT credential issued on the Stellar network.
 *
 * # TODO
 * - Implement detailed modal/view for full metadata
 * - Add ability to share badge on social media
 * - Display verification status
 * - Add copy-to-clipboard for contract/NFT ID
 * - Implement interactive hover effects
 * - Add metadata from IPFS or HTTP endpoints
 */

interface Badge {
  id: string; // NFT ID on the blockchain
  skill: string;
  issuer: string;
  metadataUri: string;
}

interface VouchBadgeProps {
  skill: string;
  issuer: string;
  issueDate: string;
  badge: Badge;
}

export default function VouchBadge({
  skill,
  issuer,
  issueDate,
  badge,
}: VouchBadgeProps) {
  // Format the issue date
  const formattedDate = new Date(issueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // TODO: Add logic to fetch metadata from IPFS/HTTP if needed
  const handleViewDetails = () => {
    console.log("View details for badge:", badge.id);
    // TODO: Open modal or navigate to detailed view
  };

  const handleShare = () => {
    console.log("Share badge:", badge.id);
    // TODO: Implement sharing functionality
    // - Share link
    // - Share to social media
    // - Generate QR code
  };

  const handleVerify = () => {
    console.log("Verify badge:", badge.id);
    // TODO: Implement verification check
    // - Query Stellar network for badge authenticity
    // - Display issuer verification status
    // - Check for badge revocation
  };

  return (
    <div className="bg-gradient-to-br from-stellar-50 to-stellar-100 rounded-lg shadow-md hover:shadow-lg transition border border-stellar-200 overflow-hidden">
      {/* Header with skill and issuer */}
      <div className="bg-stellar-600 text-white px-6 py-4">
        <h4 className="text-lg font-bold">{skill}</h4>
        <p className="text-stellar-100 text-sm">Issued by {issuer}</p>
      </div>

      {/* Card content */}
      <div className="px-6 py-4">
        {/* Badge visual representation */}
        <div className="text-center mb-4">
          {/* TODO: Add NFT image/icon from metadata */}
          <div className="text-5xl mb-2">🏆</div>
          <p className="text-xs text-gray-500 font-mono">{badge.id}</p>
        </div>

        {/* Issue date */}
        <div className="mb-4 pb-4 border-b border-stellar-200">
          <p className="text-xs text-gray-600 label">Issued</p>
          <p className="text-sm font-semibold text-gray-900">{formattedDate}</p>
        </div>

        {/* Status indicators */}
        <div className="mb-4 space-y-2">
          {/* Soulbound indicator */}
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">
              <strong>Soulbound</strong> - Non-transferable credential
            </span>
          </div>

          {/* TODO: Add verification status */}
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-sm text-gray-700">
              <strong>Verified</strong> - On Stellar network
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleViewDetails}
            className="px-3 py-2 bg-stellar-100 hover:bg-stellar-200 text-stellar-700 font-semibold rounded transition text-sm"
            title="View full details and metadata"
          >
            {/* TODO: Make icon responsive */}
            Details
          </button>

          <button
            onClick={handleVerify}
            className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded transition text-sm"
            title="Verify on blockchain"
          >
            Verify
          </button>

          <button
            onClick={handleShare}
            className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded transition text-sm"
            title="Share this badge"
          >
            Share
          </button>
        </div>
      </div>

      {/* Footer with metadata URI */}
      <div className="bg-gray-50 px-6 py-3 border-t border-stellar-200">
        <p className="text-xs text-gray-500 break-all">
          {/* TODO: Make this clickable to view metadata */}
          <strong>Metadata:</strong> {badge.metadataUri}
        </p>
      </div>
    </div>
  );
}
