# ChainRaffle 🎰

A modern, production-ready Web3 raffle draw platform built with Next.js 14, TypeScript, Solidity, and wagmi.

## Features

- 🎯 **Raffle Management** - Create, view, and enter on-chain raffles
- 🌐 **Multi-Blockchain** - Support for Ethereum, Solana, Polkadot, Cardano, Aptos, and Avalanche
- 💳 **Wallet Integration** - RainbowKit with MetaMask, WalletConnect, and Coinbase Wallet support
- 📝 **Smart Contract** - Production-ready Solidity contract with OpenZeppelin security
- 🔄 **Mock Mode** - Toggle between live blockchain and mock data for development
- 📱 **Responsive Design** - Mobile-first UI with Tailwind CSS
- ⚡ **Real-time Updates** - React Query polling for live raffle data
- 🎨 **Modern UI** - Dark theme with Framer Motion animations and shadcn/ui components
- 🔐 **Type-safe** - Full TypeScript coverage with ethers.js and viem
- 🧪 **Comprehensive Tests** - 15+ test cases covering all contract functionality

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** + shadcn/ui
- **RainbowKit** + wagmi + viem
- **ethers.js**
- **TanStack Query** (React Query)
- **Framer Motion**
- **Sonner** (toast notifications)

### Backend / Smart Contract
- **Solidity 0.8.20**
- **Hardhat** (development environment)
- **OpenZeppelin Contracts** (ReentrancyGuard, Ownable)
- **Chai** (testing)
- **Etherscan** (contract verification) with blockchain filters
  ├── raffle/[id]/        # Raffle details page
  ├── create/             # Create raffle page
  ├── my-tickets/         # User tickets page
  └── winners/            # Winners page

components/
  ├── ui/                 # shadcn/ui components
  ├── BlockchainIcons.tsx # Custom blockchain SVG icons
  ├── Navbar.tsx
  ├── Footer.tsx
  ├── RaffleCard.tsx      # With blockchain badge
  ├── EnterRaffleModal.tsx # Enhanced with blockchain info
  ├── WinnerCard.tsx
  └── WalletButton.tsx

hooks/
  ├── useRaffles.ts       # Fetch all raffles
  ├── useRaffle.ts        # Fetch single raffle + participants
  ├── useEnterRaffle.ts   # Enter raffle mutation
  ├── useCreateRaffle.ts  # Create raffle mutation
  ├── useUserTickets.ts   # Fetch user tickets
  └── useWallet.ts        # Wallet connection state

lib/
  ├── contract.ts         # Smart contract ABI & functions
  ├── mockData.ts         # Mock data with 15 raffles
  ├── blockchainConfig.ts # Multi-chain configuration
  ├── types.ts            # TypeScript types
  └── utils.ts            # Utility functions

contracts/
  └── ChainRaffle.sol     # Production-ready smart contract

scripts/
  └── deploy.js           # Deployment script

test/
  └── ChainRaffle.test.js # Comprehensive test suite
  ├── useWallet.ts        # Wallet connection state
  └── useMockMode.tsx     # Mock data toggle

lib/
  ├── contract.ts         # Smart contract ABI & functions
  ├── mockData.ts         # Mock data fallback
  ├─Quick Start (Development with Mock Data)

See [SETUP.md](./SETUP.md) for detailed setup instructions.

```bash
# 1. Clone and install
git clone https://github.com/JetflowUX/Web3-Raffle.git
cd Web3-Raffle
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Add your WalletConnect Project ID

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - the app runs in mock mode by default!

### Full Setup (With Smart Contract)

For complete blockchain integration:

```bash
# 1. Install contract dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts

# 2. Compile smart contract
npm run compile

# 3. Run tests
npm run test:contract


The project includes a production-ready Solidity smart contract ([contracts/ChainRaffle.sol](./contracts/ChainRaffle.sol)) with:

### Features
- ✅ Create raffles with customizable parameters (prize, ticket price, duration, max participants)
- ✅ Weighted ticket system (more tickets = higher win chance)
- ✅ Pseudo-random winner selection using block data
- ✅ Platform fee system (5% default, adjustable)
- ✅ ReentrancyGuard protection against reentrancy attacks
- ✅ Ownable for administrative functions
- ✅ Support for multiple concurrent raffles
- ✅ Track user tickets across all raffles

### Key Functions

```solidity
// Create a new raffle
function createRaffle(
  uint256 ticketPrice,
  uint256 maxParticipants,
  uint256 duration
) external payable;

// Enter raffle by purchasing tickets
function enterRaffle(uint256 raffleId, uint256 ticketCount) external payable;

// Select winner (callable by anyone after raffle ends)
function selectWinner(uint256 raffleId) external;

// View functions
function getRaffles() external view returns (Raffle[] memory);
function getUserTickets(address user) external view returns (UserTicket[] memory);
```

### Testing

Run comprehensive test suite:

```bash
npm run test:contract
```

**Test Coverage:**
- Raffle creation validation
- Ticket purchasing logic
- Winner selection (time-based and max participants)
- Platform fee management
- EAvailable Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Smart Contract
- `npm run compile` - Compile Solidity contracts
- `npm run test:contract` - Run contract test suite
- `npm run deploy:sepolia` - Deploy to Sepolia testnet
- `npm run deploy:mainnet` - Deploy to Ethereum mainnet
- `npm run deploy:polygon` - Deploy to Polygon
- `npm run deploy:bsc` - Deploy to Binance Smart Chain
- `npm run verify:sepolia` - Verify contract on Etherscan (Sepolia)
- `npm run verify:mainnet` - Verify contract on Etherscan (Mainnet)

## Environment Variables

See [.env.local.example](./.env.local.example) for complete configuration.

### Frontend (Required)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID |
| `NEXT_PUBLIC_USE_MOCKS` | Enable mock mode (`true`/`false`) |

### Frontend (Optional)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET` | Contract address on Ethereum mainnet |
| `NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA` | Contract address on Sepolia testnet |
| `NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON` | Contract address on Polygon |

### Backend (For Deployment)
| Variable | Description |
|----------|-------------|
| `PRIVATE_KEY` | Wallet private key (without 0x prefix) |
| `SEPOLIA_RPC_URL` | Sepolia RPC endpoint |
| `MAINNET_RPC_URL` | Mainnet RPC endpoint |
| `ETHERSCAN_API_KEY` | Etherscan API key for verification
npm run deploy:mainnet   # Ethereum mainnet
npm run deploy:polygon   # Polygon network
npm run deploy:bsc       # Binance Smart Chain
```

After deployment, verify on Etherscan:

```bash
npm run verify:sepolia -- DEPLOYED_CONTRACT_ADDRESS
```

The app expects a raffle contract with the following interface:

```solidity
// Read functions
function getRaffles() external view returns (Raffle[] memory);
function getRaffle(uint256 raffleId) external view returns (Raffle memory);
function getParticipants(uint256 raffleId) external view returns (address[] memory);
function getUserTickets(address user) external view returns (UserTicket[] memory);

// Write functions
function enterRaffle(uint256 raffleId, uint256 ticketCount) external payable;
function createRaffle(uint256 ticketPrice, uint256 maxParticipants, uint256 duration) external payable;
```

Update the ABI in `lib/contract.ts` to match your deployed contract.

## Mock Mode

The app includes a mock mode for development without a deployed contract:

- Toggle via the "Mock On/Off" button in the navbar
- Persisted in localStorage
- Provides realistic test data for all features
- Falls back to mock data automatically if contract calls fail

## Deployment

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel:

```bash
vercel deploy
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project ID | Yes |
| `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET` | Contract address on Ethereum mainnet | No |
| `NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA` | Contract address on Sepolia testnet | No |
| `NEXT_PUBLIC_USE_MOCKS` | Enable mock mode by default (`true`/`false`) | No |

## Features in Detail

### Wallet Connection
- Powered by RainbowKit with custom theming
- Supports Ethereum mainnet and Sepolia testnet
- Shows balance and chain switcher
- Copy address and explorer links

### Raffle Entry
- Modal with ticket count input
- Real-time total cost calculation
- Transaction status (pending, success, failed)
- Explorer link for completed transactions
- Automatic data refresh on success

### Create Raffle
- Form with validation
- Set ticket price, max participants, duration, and prize
- Loading states during transaction
- Toast notifications for feedback

### My Tickets
- View all raffles user has entered
- Shows ticket count per raffle
- Winner badge and claim button
- Empty state when no tickets

### Winners
- Recent winners list
- Prize amount and raffle ID
- Timestamp of win
- Winner wallet address

## Design System

### Colors
- Background: `#0B0F1A`
- Primary: `#6366F1` (indigo)
- Secondary: `#8B5CF6` (purple)
- Accent: `#22C55E` (green)
- Card: `#111827`
- Border: `#1F2937`
- Text: `#E5E7EB`
- Muted: `#9CA3AF`

### Typography
- Sora (body)
- Space Grotesk (display)
- JetBrains Mono (monospace)

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
