import { Raffle, Ticket, Winner } from './types';

const NOW = new Date();
const ONE_DAY = 24 * 60 * 60 * 1000;

export const MOCK_RAFFLES: Raffle[] = [
{
  id: '1',
  title: 'Bored Ape Yacht Club #8817',
  description:
  'Win a blue chip NFT from the most prestigious collection in Web3. This ape features gold fur and laser eyes.',
  prizePool: '50.0',
  ticketPrice: '0.05',
  maxParticipants: 1000,
  currentParticipants: 842,
  endTime: new Date(NOW.getTime() + 2 * ONE_DAY),
  status: 'active',
  winner: null,
  creatorAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop'
},
{
  id: '2',
  title: '10 ETH Grand Prize',
  description:
  'Direct ETH prize sent straight to your wallet. The ultimate liquidity boost for your portfolio.',
  prizePool: '10.0',
  ticketPrice: '0.01',
  maxParticipants: 2000,
  currentParticipants: 156,
  endTime: new Date(NOW.getTime() + 5 * ONE_DAY),
  status: 'active',
  winner: null,
  creatorAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1622630998477-20aa696fa4a5?q=80&w=1000&auto=format&fit=crop'
},
{
  id: '3',
  title: 'Azuki #4421',
  description:
  'Take the red bean. A rare Azuki with spirit traits waiting for a new holder.',
  prizePool: '12.5',
  ticketPrice: '0.02',
  maxParticipants: 500,
  currentParticipants: 498,
  endTime: new Date(NOW.getTime() + 1000 * 60 * 60), // 1 hour left
  status: 'active',
  winner: null,
  creatorAddress: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=1000&auto=format&fit=crop'
},
{
  id: '4',
  title: 'Mutant Ape #1290',
  description:
  'The serum worked. Win this M2 Mutant Ape with distinct features.',
  prizePool: '8.0',
  ticketPrice: '0.015',
  maxParticipants: 800,
  currentParticipants: 800,
  endTime: new Date(NOW.getTime() - ONE_DAY),
  status: 'drawing',
  winner: null,
  creatorAddress: '0x1234567890123456789012345678901234567890',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
},
{
  id: '5',
  title: 'Doodles #3321',
  description:
  'A colorful companion from the Doodles universe. Pastel vibes only.',
  prizePool: '4.5',
  ticketPrice: '0.01',
  maxParticipants: 600,
  currentParticipants: 600,
  endTime: new Date(NOW.getTime() - 3 * ONE_DAY),
  status: 'completed',
  winner: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  creatorAddress: '0xDef1C0ded9bec7F1a1670819833240f027b25EfF',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=1000&auto=format&fit=crop'
},
{
  id: '6',
  title: 'Clone X #992',
  description: 'RTFKT x Murakami. Future fashion ready for the metaverse.',
  prizePool: '6.2',
  ticketPrice: '0.02',
  maxParticipants: 400,
  currentParticipants: 120,
  endTime: new Date(NOW.getTime() + 7 * ONE_DAY),
  status: 'active',
  winner: null,
  creatorAddress: '0x4206942069420694206942069420694206942069',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop'
},
{
  id: '7',
  title: 'Moonbird #221',
  description: 'Owl pixel art with utility. Nesting rewards included.',
  prizePool: '3.0',
  ticketPrice: '0.01',
  maxParticipants: 300,
  currentParticipants: 300,
  endTime: new Date(NOW.getTime() - 5 * ONE_DAY),
  status: 'completed',
  winner: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  creatorAddress: '0x1111222233334444555566667777888899990000',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop'
},
{
  id: '8',
  title: 'Pudgy Penguin #554',
  description: 'Cute, chubby, and ready to slide into your wallet.',
  prizePool: '4.8',
  ticketPrice: '0.015',
  maxParticipants: 500,
  currentParticipants: 42,
  endTime: new Date(NOW.getTime() + 3 * ONE_DAY),
  status: 'active',
  winner: null,
  creatorAddress: '0x9999888877776666555544443333222211110000',
  participants: [],
  image:
  'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop'
}];


export const MOCK_TICKETS: Ticket[] = [
{
  id: 't1',
  raffleId: '1',
  raffleTitle: 'Bored Ape Yacht Club #8817',
  ticketCount: 2,
  purchaseDate: new Date(NOW.getTime() - 2 * ONE_DAY),
  status: 'active',
  totalCost: '0.1'
},
{
  id: 't2',
  raffleId: '5',
  raffleTitle: 'Doodles #3321',
  ticketCount: 5,
  purchaseDate: new Date(NOW.getTime() - 4 * ONE_DAY),
  status: 'completed',
  totalCost: '0.05'
},
{
  id: 't3',
  raffleId: '4',
  raffleTitle: 'Mutant Ape #1290',
  ticketCount: 1,
  purchaseDate: new Date(NOW.getTime() - 1 * ONE_DAY),
  status: 'drawing',
  totalCost: '0.015'
}];


export const MOCK_WINNERS: Winner[] = [
{
  id: 'w1',
  address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  prizeAmount: '4.5',
  raffleId: '5',
  raffleTitle: 'Doodles #3321',
  date: new Date(NOW.getTime() - 3 * ONE_DAY),
  txHash:
  '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
},
{
  id: 'w2',
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  prizeAmount: '3.0',
  raffleId: '7',
  raffleTitle: 'Moonbird #221',
  date: new Date(NOW.getTime() - 5 * ONE_DAY),
  txHash:
  '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
},
{
  id: 'w3',
  address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  prizeAmount: '15.0',
  raffleId: '99',
  raffleTitle: 'CryptoPunk #5521',
  date: new Date(NOW.getTime() - 10 * ONE_DAY),
  txHash:
  '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
},
{
  id: 'w4',
  address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
  prizeAmount: '2.2',
  raffleId: '100',
  raffleTitle: 'Cool Cat #1102',
  date: new Date(NOW.getTime() - 12 * ONE_DAY),
  txHash:
  '0xa1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890'
},
{
  id: 'w5',
  address: '0xDef1C0ded9bec7F1a1670819833240f027b25EfF',
  prizeAmount: '8.5',
  raffleId: '101',
  raffleTitle: 'Chromie Squiggle #442',
  date: new Date(NOW.getTime() - 15 * ONE_DAY),
  txHash:
  '0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba'
}];