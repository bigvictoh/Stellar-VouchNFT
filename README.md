# Stellar-VouchNFT

**VouchNFT** is a decentralized professional identity system built on the **Stellar network**. It enables users to issue Soulbound (non-transferable) NFTs as professional "vouches" for verified skills and expertise.

This project is part of the **Stellar Drips Wave**, an initiative to foster innovative applications on the Stellar blockchain.

## Overview

VouchNFT allows organizations and individuals to:
- **Mint Soulbound NFTs** on Stellar to represent professional endorsements
- **Verify identities** through GitHub or other integrations
- **Display digital credentials** in a decentralized and portable format
- **Build professional reputation** without centralized intermediaries

## Tech Stack

- **Smart Contract**: Rust using [soroban-sdk](https://github.com/stellar/rs-soroban-sdk)
- **Backend**: Rust with [Axum](https://github.com/tokio-rs/axum) and [stellar-sdk](https://github.com/stellar/rs-soroban-sdk)
- **Frontend**: [Next.js](https://nextjs.org/) (TypeScript) with [Tailwind CSS](https://tailwindcss.com/) and [@stellar/freighter-api](https://github.com/stellar/freighter)

## Project Structure

```
stella-vouchnft/
├── contracts/          # Soroban smart contract
├── backend/            # Axum web server
├── frontend/           # Next.js application
├── README.md          # This file
├── CONTRIBUTING.md    # Contribution guidelines
└── .gitignore         # Git ignore rules
```

## Quick Start

### Prerequisites
- Rust 1.70+ (for smart contracts and backend)
- Node.js 18+ (for frontend)
- Soroban CLI

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stellar-vouchnft.git
   cd stellar-vouchnft
   ```

2. **Set up the smart contract**
   ```bash
   cd contracts
   # See CONTRIBUTING.md for detailed instructions
   ```

3. **Start the backend server**
   ```bash
   cd ../backend
   cargo run
   ```

4. **Run the frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Features

- 🔐 Soulbound NFTs (non-transferable)
- ✅ Identity verification integration
- 🌐 Stellar network integration
- 🎨 Modern UI with TailwindCSS
- 📱 Freighter wallet support

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on setting up your development environment and submitting changes.

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://soroban.stellar.org/)
- [Freighter Wallet](https://www.freighter.app/)

## Support

For questions or issues, please open an issue on the GitHub repository.
