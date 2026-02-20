# ChainRaffle Smart Contract Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Wallet** with some test ETH for deployment
4. **Infura/Alchemy** account (optional, for better RPC reliability)

## Installation

### 1. Install Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv
```

### 2. Install OpenZeppelin Contracts

```bash
npm install @openzeppelin/contracts
```

## Configuration

### 1. Create `.env.local` file

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

### 2. Add Your Private Key

```env
PRIVATE_KEY=your_private_key_here_without_0x_prefix
```

**⚠️ SECURITY WARNING**: Never commit your `.env.local` file or share your private key!

### 3. (Optional) Add RPC URLs

For better reliability, get free RPC URLs from:
- **Infura**: https://infura.io
- **Alchemy**: https://alchemy.com

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_API_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_API_KEY
```

## Deployment Steps

### 1. Compile the Contract

```bash
npx hardhat compile
```

### 2. Run Tests (Optional but Recommended)

```bash
npx hardhat test
```

Expected output: All tests should pass ✅

### 3. Deploy to Testnet (Sepolia)

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected Output:**
```
Deploying ChainRaffle contract...
ChainRaffle deployed to: 0x1234567890123456789012345678901234567890
Waiting for block confirmations...
Deployment completed!

Add this to your .env.local file:
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0x1234567890123456789012345678901234567890

Verifying contract on Etherscan...
Contract verified!
```

### 4. Update Frontend Configuration

Copy the contract address and add it to your `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xYourContractAddressHere
NEXT_PUBLIC_USE_MOCKS=false
```

### 5. Deploy to Mainnet (Production)

**⚠️ Only deploy to mainnet after thorough testing on testnet!**

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

Update `.env.local` with mainnet address:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0xYourMainnetContractAddress
```

## Verify Contract on Etherscan

If automatic verification fails during deployment, manually verify:

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

## Testing the Deployment

### 1. Get Test ETH

For Sepolia testnet:
- **Sepolia Faucet**: https://sepoliafaucet.com
- **Alchemy Faucet**: https://sepoliafaucet.com
- **Infura Faucet**: https://www.infura.io/faucet/sepolia

### 2. Test in Frontend

1. Start the development server:
```bash
npm run dev
```

2. Connect your wallet (make sure it's on Sepolia network)
3. Try creating a test raffle
4. Enter the raffle with test ETH
5. Wait for the raffle to end and select a winner

## Troubleshooting

### "Insufficient funds" Error
- Make sure your wallet has enough ETH for both the transaction and gas fees
- On testnet, get more ETH from faucets

### "Contract not deployed" Error
- Verify the contract address in `.env.local` is correct
- Make sure you're connected to the right network (Sepolia/Mainnet)
- Check that `NEXT_PUBLIC_USE_MOCKS` is set to `false`

### "Invalid Private Key" Error
- Ensure private key in `.env.local` doesn't include "0x" prefix
- Double-check you copied the correct private key from your wallet

### Gas Price Too High
- Try again during off-peak hours
- Manually set gas price in `hardhat.config.js`:
```javascript
sepolia: {
  url: process.env.SEPOLIA_RPC_URL,
  accounts: [process.env.PRIVATE_KEY],
  gasPrice: 20000000000 // 20 gwei
}
```

## Multi-Chain Deployment

Deploy to other EVM-compatible chains:

### Polygon
```bash
npx hardhat run scripts/deploy.js --network polygon
```

### BSC (Binance Smart Chain)
```bash
npx hardhat run scripts/deploy.js --network bsc
```

Update `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON=0xYourPolygonAddress
NEXT_PUBLIC_CONTRACT_ADDRESS_BSC=0xYourBSCAddress
```

## Gas Costs Estimation

Typical gas costs on Sepolia testnet:
- **Contract Deployment**: ~2,500,000 gas (~0.05 ETH on testnet)
- **Create Raffle**: ~150,000 gas (~0.003 ETH)
- **Enter Raffle**: ~80,000 gas (~0.0016 ETH)
- **Select Winner**: ~120,000 gas (~0.0024 ETH)

## Smart Contract Features

✅ **Decentralized Raffle Creation**: Anyone can create a raffle
✅ **Weighted Ticket System**: More tickets = higher chance of winning
✅ **Automated Winner Selection**: Pseudo-random winner selection
✅ **Platform Fee System**: Configurable fee (default 5%)
✅ **Multiple Concurrent Raffles**: Unlimited active raffles
✅ **Participant Tracking**: Full history of user tickets
✅ **Security**: ReentrancyGuard + comprehensive testing

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the Hardhat documentation: https://hardhat.org/docs
3. Check OpenZeppelin docs: https://docs.openzeppelin.com

## License

MIT License - See LICENSE file for details
