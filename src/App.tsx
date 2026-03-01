import './App.css'

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 tracking-tight">
        Face ELO MVP
      </h1>
      
      <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-transform transform hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
        Начать дуэль ⚡
      </button>
    </div>
  )
}

export default App
