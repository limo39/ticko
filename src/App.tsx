import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MatchesPage from './pages/MatchesPage';
import TicketSelectionPage from './pages/TicketSelectionPage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MatchesPage />} />
            <Route path="/matches/:matchId" element={<TicketSelectionPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
