import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Simulator() {
  const [fert, setFert] = useState(0);
  const [irr, setIrr] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSim = async () => {
    setLoading(true);
    const payload = {
      geometry: { type: 'Polygon', coordinates: [[[0,0],[0,1],[1,1],[1,0],[0,0]]] },
      baseline: {
        geometry: { type: 'Polygon', coordinates: [[[0,0],[0,1],[1,1],[1,0],[0,0]]] },
        satellite: [
          { timestamp: new Date().toISOString(), ndvi: 0.62, cloud_mask: 0 }
        ],
        weather: [
          { timestamp: new Date().toISOString().slice(0,10), rainfall_mm: 180, tmean: 22 }
        ],
        soil: { ph: 6.4, organic_matter_pct: 2.1 },
        management: {
          fertilizer_events: [{ date: new Date().toISOString().slice(0,10), type:'N', amount_kg_ha: 90 }],
          irrigation_events: []
        }
      },
      adjustments: {
        fertilizer_pct: fert,
        irrigation_mm: irr
      }
    };
    const res = await fetch(`${API}/v1/simulate`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-10 my-16">
      <div className="backdrop-blur-2xl bg-white/20 border border-white/30 rounded-3xl shadow-xl p-6">
        <h3 className="text-[#062706] text-xl font-semibold">Scenario Simulator</h3>
        <p className="text-[#062706]/80 mb-6">Adjust inputs and instantly compare yield outcomes.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[#062706]/80 mb-2">Fertilizer change (%)</label>
            <input type="range" min="-50" max="50" value={fert} onChange={e=>setFert(Number(e.target.value))} className="w-full"/>
            <div className="text-[#062706] font-semibold mt-1">{fert}%</div>
          </div>
          <div>
            <label className="block text-[#062706]/80 mb-2">Add irrigation (mm)</label>
            <input type="range" min="0" max="150" value={irr} onChange={e=>setIrr(Number(e.target.value))} className="w-full"/>
            <div className="text-[#062706] font-semibold mt-1">{irr} mm</div>
          </div>
          <div className="flex items-end">
            <button onClick={runSim} className="w-full py-3 rounded-2xl bg-[#0B3D0B] text-white shadow-lg hover:opacity-90 transition">
              {loading ? 'Running...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white/60 backdrop-blur-xl p-6 border border-white/50">
              <h4 className="text-[#062706] font-semibold mb-2">Baseline</h4>
              <div className="text-[#062706]/90">Yield: <span className="font-bold">{result.baseline.yield_t_ha.toFixed(2)} t/ha</span></div>
              <div className="text-[#062706]/70">P10–P90: {result.baseline.p10.toFixed(2)}–{result.baseline.p90.toFixed(2)}</div>
            </div>
            <div className="rounded-3xl bg-white/60 backdrop-blur-xl p-6 border border-white/50">
              <h4 className="text-[#062706] font-semibold mb-2">Scenario</h4>
              <div className="text-[#062706]/90">Yield: <span className="font-bold">{result.scenario.yield_t_ha.toFixed(2)} t/ha</span></div>
              <div className="text-[#062706]/70">P10–P90: {result.scenario.p10.toFixed(2)}–{result.scenario.p90.toFixed(2)}</div>
              <div className="text-[#062706] mt-2">Delta: <span className="font-bold">{result.deltas.yield_delta.toFixed(2)} t/ha</span></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
