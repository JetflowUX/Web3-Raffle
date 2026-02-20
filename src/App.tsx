import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { RaffleProvider } from './context/RaffleContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { RaffleDetails } from './pages/RaffleDetails';
import { CreateRaffle } from './pages/CreateRaffle';
import { MyTickets } from './pages/MyTickets';
import { Winners } from './pages/Winners';
function App() {
  return <Router>
      <WalletProvider>
        <RaffleProvider>
          <div className="min-h-screen bg-[#0B0F1A] text-white font-sans selection:bg-indigo-500/30">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/raffle/:id" element={<RaffleDetails />} />
                <Route path="/create" element={<CreateRaffle />} />
                <Route path="/my-tickets" element={<MyTickets />} />
                <Route path="/winners" element={<Winners />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </RaffleProvider>
      </WalletProvider>
    </Router>;
}
export { App };