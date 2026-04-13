# Contributing to Stellar-VouchNFT

Thank you for your interest in contributing to VouchNFT! This guide will help you set up your development environment and submit quality contributions.

## Prerequisites

Before you begin, ensure you have:
- **Git** for version control
- **Rust 1.70+** (for smart contracts and backend)
- **Node.js 18+** (for frontend)
- **npm or yarn** (for frontend package management)

## Setting Up the Soroban Environment

### 1. Install Rust and Cargo

Follow the [official Rust installation guide](https://www.rust-lang.org/tools/install):
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 2. Install Soroban CLI

Install the Soroban command-line tool:
```bash
cargo install soroban-cli
```

### 3. Add WebAssembly Target

The Soroban contracts compile to WebAssembly:
```bash
rustup target add wasm32-unknown-unknown
```

### 4. Verify Installation

Check that everything is installed correctly:
```bash
soroban --version
cargo --version
rustup target list | grep wasm32
```

## Project Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/stellar-vouchnft.git
cd stellar-vouchnft
```

## Running Each Component

### Smart Contract (/contracts)

1. Navigate to the contracts directory:
   ```bash
   cd contracts
   ```

2. Build the contract:
   ```bash
   cargo build --target wasm32-unknown-unknown --release
   ```

3. Run tests:
   ```bash
   cargo test
   ```

4. Deploy to Soroban testnet (see Soroban CLI docs):
   ```bash
   soroban contract deploy --wasm target/wasm32-unknown-unknown/release/stellar_vouchnft.wasm
   ```

### Backend (/backend)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the server:
   ```bash
   cargo build
   ```

3. Run the development server:
   ```bash
   cargo run
   ```

   The server will start at `http://localhost:3001` by default.

4. Run tests:
   ```bash
   cargo test
   ```

### Frontend (/frontend)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

4. Build for production:
   ```bash
   npm run build
   npm run start
   ```

## Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit regularly:
   ```bash
   git add .
   git commit -m "feat: brief description of changes"
   ```

3. **Follow commit conventions**: Use conventional commits (feat:, fix:, docs:, etc.)

4. **Test your changes**:
   - Run unit tests in the modified component
   - Test integration between components if applicable

5. **Push and create a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guidelines

### Rust

- Follow [Rust naming conventions](https://doc.rust-lang.org/1.0.0/style/style/naming.html)
- Use `cargo fmt` for code formatting
- Run `cargo clippy` for linting advice
- Add comments explaining complex logic
- Mark incomplete work with `// TODO: description`

### TypeScript/Next.js

- Use TypeScript for type safety
- Follow [Airbnb style guide](https://github.com/airbnb/javascript)
- Use `prettier` for formatting (configured in the project)
- Add JSDoc comments for components and functions
- Mark incomplete work with `// TODO: description`

## Testing

- **Smart Contracts**: Write tests in the contract crate using Soroban test utilities
- **Backend**: Add tests adjacent to the code using Rust's `#[cfg(test)]`
- **Frontend**: Write tests for components using Jest/React Testing Library

## Reporting Issues

When reporting bugs, please include:
- A clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Environment details (OS, Rust version, Node version, etc.)

## Asking Questions

- Use GitHub Discussions for general questions
- Use Issues for bugs
- Join our community channels for real-time discussion

## Documentation

- Update README.md if you add major features
- Add inline comments for complex logic
- Update this CONTRIBUTING.md if you change the setup process

## Pull Request Process

1. Ensure your code passes all tests
2. Update README.md if needed
3. Reference any related issues in your PR description
4. Request review from maintainers
5. Address feedback promptly

## Additional Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Docs](https://soroban.stellar.org/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Next.js Documentation](https://nextjs.org/docs)

Thank you for contributing to Stellar-VouchNFT! 🚀
