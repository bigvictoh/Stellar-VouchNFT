import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stellar VouchNFT - Professional Identity on Stellar",
  description:
    "Issue and manage Soulbound NFTs for professional credentials on the Stellar network. Part of the Stellar Drips Wave initiative.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen">
          {/* Navigation header */}
          <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-stellar-700">
                  VouchNFT
                </h1>
                {/* TODO: Add navigation links */}
              </div>
            </nav>
          </header>

          {/* Main content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-100 mt-12 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-gray-600 text-center">
                {/* TODO: Add footer content */}
                VouchNFT - Part of the Stellar Drips Wave. Building the future
                of professional credentials on Stellar.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
