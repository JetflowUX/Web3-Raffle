# ChainRaffle

A modern, production-ready Web3 raffle draw platform built with Next.js 14, TypeScript, and wagmi.

## Features

- 🎯 **Raffle Management** - Create, view, and enter on-chain raffles
- 💳 **Wallet Integration** - RainbowKit with MetaMask, WalletConnect, and Coinbase Wallet support
- 🔄 **Mock Mode** - Toggle between live blockchain and mock data for development
- 📱 **Responsive Design** - Mobile-first UI with Tailwind CSS
- ⚡ **Real-time Updates** - React Query polling for live raffle data
- 🎨 **Modern UI** - Dark theme with Framer Motion animations and shadcn/ui components
- 🔐 **Type-safe** - Full TypeScript coverage with ethers.js and viem

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** + shadcn/ui
- **RainbowKit** + wagmi + viem
- **ethers.js**
- **TanStack Query** (React Query)
- **Framer Motion**
- **Sonner** (toast notifications)

## Project Structure

```
app/
  ├── layout.tsx          # Root layout with providers
  ├── providers.tsx       # Wagmi, RainbowKit, React Query
  ├── page.tsx            # Landing page
  ├── raffle/[id]/        # Raffle details page
  ├── create/             # Create raffle page
  ├── my-tickets/         # User tickets page
  └── winners/            # Winners page

components/
  ├── ui/                 # shadcn/ui components
  ├── Navbar.tsx
  ├── Footer.tsx
  ├── RaffleCard.tsx
  ├── RaffleGrid.tsx
  ├── EnterRaffleModal.tsx
  ├── ParticipantsList.tsx
  ├── WinnerCard.tsx
  ├── Countdown.tsx
  └── Hero.tsx

hooks/
  ├── useRaffles.ts       # Fetch all raffles
  ├── useRaffle.ts        # Fetch single raffle + participants
  ├── useEnterRaffle.ts   # Enter raffle mutation
  ├── useCreateRaffle.ts  # Create raffle mutation
  ├── useUserTickets.ts   # Fetch user tickets
  ├── useWinners.ts       # Fetch winners
  ├── useWallet.ts        # Wallet connection state
  └── useMockMode.tsx     # Mock data toggle

lib/
  ├── contract.ts         # Smart contract ABI & functions
  ├── mockData.ts         # Mock data fallback
  ├── types.ts            # TypeScript types
  └── utils.ts            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- A WalletConnect Project ID (get one at [cloud.walletconnect.com](https://cloud.walletconnect.com))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JetflowUX/Web3-Raffle.git
   cd Web3-Raffle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0x...
   NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0x...
   NEXT_PUBLIC_USE_MOCKS=true  # Optional: enable mock mode by default
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Integration

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
