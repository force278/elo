import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DuelPage } from './pages/DuelPage';
import { ProfilePage } from './pages/ProfilePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { BottomNav } from './components/BottomNav';

function App() {
  return (
    // BrowserRouter - оборачивает всё приложение, включая роутинг
    <BrowserRouter>
      {/* Главный контейнер (Mobile First: ограничиваем ширину на ПК) */}
      <div className="flex flex-col min-h-screen bg-elo-bg mx-auto max-w-md w-full relative shadow-2xl overflow-hidden">
        
        {/* Routes - здесь меняются страницы */}
        <Routes>
          <Route path="/" element={<DuelPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>

        {/* Наше нижнее меню (оно вне Routes, поэтому видно всегда!) */}
        <BottomNav />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
