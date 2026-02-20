# 🚀 ChainRaffle - Complete Setup Guide

This guide will help you set up and run the ChainRaffle platform with full blockchain functionality.

## 📋 Table of Contents

1. [Quick Start (Mock Mode)](#quick-start-mock-mode)
2. [Full Setup (Blockchain Mode)](#full-setup-blockchain-mode)
3. [Smart Contract Deployment](#smart-contract-deployment)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

## ⚡ Quick Start (Mock Mode)

Get the frontend running immediately with mock data (no blockchain required):

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

```bash
cp .env.local.example .env.local
```

### 3. Get WalletConnect Project ID

1. Visit https://cloud.walletconnect.com
2. Create a free account
3. Create a new project
4. Copy the Project ID
5. Add it to `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_USE_MOCKS=true
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 - The app is now running in mock mode! 🎉

## 🔗 Full Setup (Blockchain Mode)

To enable real blockchain functionality:

### Step 1: Install Smart Contract Dependencies

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv chai
```

### Step 2: Get Test ETH

For Sepolia testnet, get free test ETH from:
- **Alchemy Faucet**: https://sepoliafaucet.com
- **Infura Faucet**: https://www.infura.io/faucet/sepolia
- **Chainlink Faucet**: https://faucets.chain.link/sepolia

### Step 3: Set Up Wallet

1. Create a new Metamask wallet (or use existing)
2. Switch to Sepolia testnet
3. Export your private key (Settings → Security → Export Private Key)
   - ⚠️ **NEVER share this or commit it to git!**

### Step 4: Configure Environment

Add to `.env.local`:

```env
# Private key WITHOUT the 0x prefix
PRIVATE_KEY=your_private_key_here

# RPC URLs (optional - using public RPCs by default)
SEPOLIA_RPC_URL=https://rpc.sepolia.org
MAINNET_RPC_URL=https://eth.public-rpc.com

# For better reliability, get free API keys from:
# Infura: https://infura.io
# Alchemy: https://alchemy.com
# Then use: https://sepolia.infura.io/v3/YOUR_API_KEY
```

## 📝 Smart Contract Deployment

### Option 1: Deploy to Sepolia Testnet (Recommended)

1. **Compile the contract:**
```bash
npm run compile
```

2. **Run tests (optional but recommended):**
```bash
npm run test:contract
```

Expected output: ✅ All tests passing

3. **Deploy to Sepolia:**
```bash
npm run deploy:sepolia
```

You'll see output like:
```
Deploying ChainRaffle contract...
ChainRaffle deployed to: 0x1234...5678
Waiting for block confirmations...
Deployment completed!

Add this to your .env.local file:
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0x1234...5678
```

4. **Update `.env.local`:**
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xYourDeployedContractAddress
NEXT_PUBLIC_USE_MOCKS=false
```

5. **Restart the development server:**
```bash
npm run dev
```

### Option 2: Deploy to Mainnet (Production)

⚠️ **Only after thorough testing on testnet!**

1. Ensure you have real ETH for deployment (~0.1 ETH for gas)
2. Deploy:
```bash
npm run deploy:mainnet
```

3. Update `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET=0xYourMainnetAddress
NEXT_PUBLIC_USE_MOCKS=false
```

## 🧪 Testing

### Frontend Testing

1. **Connect Wallet:**
   - Click "Connect Wallet" button
   - Select Metamask
   - Approve connection
   - Ensure you're on Sepolia network

2. **Create a Test Raffle:**
   - Click "Create Raffle"
   - Fill in details:
     - Prize Pool: 0.01 ETH+
     - Ticket Price: 0.001 ETH+
     - Max Participants: 10
     - Duration: 1 hour+
   - Confirm transaction in Metamask

3. **Enter the Raffle:**
   - Browse to the raffle you created
   - Click "Enter Raffle"
   - Purchase tickets (1-99)
   - Confirm transaction

4. **Check Transaction:**
   - After transaction, click "View transaction"
   - Verify on Etherscan (Sepolia)

### Smart Contract Testing

Run comprehensive tests:

```bash
npm run test:contract
```

Expected results:
- ✅ Raffle Creation (4 tests)
- ✅ Entering Raffle (3 tests)
- ✅ Winner Selection (4 tests)
- ✅ User Tickets (1 test)
- ✅ Platform Management (4 tests)

## 🌐 Multi-Blockchain Support

The frontend supports multiple blockchains, but contracts need to be deployed separately:

### Deploy to Polygon

```bash
# Get MATIC from https://faucet.polygon.technology
npm run deploy:polygon
```

Add to `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON=0xYourPolygonAddress
```

### Deploy to BSC

```bash
# Get BNB from https://testnet.binance.org/faucet-smart
npm run deploy:bsc
```

Add to `.env.local`:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS_BSC=0xYourBSCAddress
```

## 🔐 Security Best Practices

### For Development:

1. **Never commit `.env.local`**
   - Already in `.gitignore`
   - Contains sensitive private keys

2. **Use testnet for development**
   - Free test ETH
   - No real money at risk

3. **Test thoroughly before mainnet**
   - Run all contract tests
   - Test all features on testnet
   - Have others test the platform

### For Production:

1. **Smart Contract Security:**
   - ✅ ReentrancyGuard implemented
   - ✅ Access control (Ownable)
   - ✅ Input validation
   - ✅ Comprehensive testing
   - Consider: Professional audit

2. **Frontend Security:**
   - ✅ Transaction confirmation required
   - ✅ Error handling
   - ✅ Amount validation
   - ✅ No sensitive data in frontend

3. **Wallet Security:**
   - Use hardware wallet for mainnet deployment
   - Use separate wallet for platform operations
   - Keep private keys encrypted and backed up

## 📚 Additional Resources

### Documentation

- **Hardhat**: https://hardhat.org/docs
- **Wagmi/Viem**: https://wagmi.sh
- **RainbowKit**: https://www.rainbowkit.com
- **OpenZeppelin**: https://docs.openzeppelin.com

### Getting Help

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment details
2. Review smart contract tests in `/test`
3. Check Hardhat console for deployment errors
4. Verify contract addresses in `.env.local`

### Common Commands

```bash
# Frontend
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Smart Contracts
npm run compile         # Compile contracts
npm run test:contract   # Run contract tests
npm run deploy:sepolia  # Deploy to Sepolia
npm run deploy:mainnet  # Deploy to mainnet
```

## 💰 Gas Cost Estimates

### Sepolia Testnet (FREE test ETH):
- Contract Deployment: ~2.5M gas
- Create Raffle: ~150K gas
- Enter Raffle: ~80K gas
- Select Winner: ~120K gas

### Ethereum Mainnet (estimated):
- Contract Deployment: ~$100-200 (one-time)
- Create Raffle: ~$10-20
- Enter Raffle: ~$5-10
- Select Winner: ~$8-15

*Note: Prices vary with gas prices. Use Polygon or BSC for cheaper transactions.*

## ✨ Features Checklist

After setup, verify these features work:

- [ ] Wallet connection (Metamask/WalletConnect)
- [ ] View all raffles
- [ ] Filter by blockchain
- [ ] Create new raffle
- [ ] Enter raffle with ticket purchase
- [ ] Transaction confirmation in wallet
- [ ] View transaction on block explorer
- [ ] See updated raffle data after entry
- [ ] View "My Tickets" section
- [ ] Winner selection (after raffle ends)
- [ ] View winners list

## 🎯 Next Steps

1. **Development Phase:**
   - Set up mock mode ✅
   - Test all frontend features
   - Deploy to Sepolia testnet
   - Test real blockchain integration

2. **Pre-Production:**
   - Complete all testing
   - Get feedback from test users
   - Consider smart contract audit
   - Prepare marketing materials

3. **Production:**
   - Deploy to mainnet
   - Set up monitoring
   - Prepare customer support
   - Launch! 🚀

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review error messages in browser console
3. Check Metamask for rejected transactions
4. Verify network and contract address settings

---

**Happy Building! 🎉**

If you found this helpful, consider starring the repository!
