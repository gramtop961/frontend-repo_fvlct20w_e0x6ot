import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Simulator from './components/Simulator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062706] via-[#0B3D0B] to-[#062706] text-[#062706]">
      <Hero />
      <Dashboard />
      <Simulator />
      <footer className="mt-24 pb-12 text-center text-white/80">
        Built for agronomists and growers • Forest green glassmorphism UI
      </footer>
    </div>
  )
}

export default App