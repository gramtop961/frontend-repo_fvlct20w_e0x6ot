import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function GlassCard({ title, children }) {
  return (
    <div className="backdrop-blur-2xl bg-white/20 border border-white/30 rounded-3xl shadow-xl p-6">
      {title && <h3 className="text-[#062706] text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}

export default function Dashboard() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/v1/fields`).then(r => r.json()).then(setFields).finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative -mt-24 z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard title="Portfolio Summary">
          <div className="text-[#062706]/80">
            <div className="flex items-center justify-between py-2">
              <span>Total Fields</span>
              <span className="font-bold">{loading ? '...' : fields.length}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Average Predicted Yield</span>
              <span className="font-bold">—</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Alerts</span>
              <span className="font-bold text-amber-700">2</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Recent Predictions">
          <ul className="space-y-3 text-[#062706]/80">
            <li className="flex items-center justify-between">
              <span>Demo Field A</span>
              <span className="font-bold">7.2 t/ha</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Demo Field B</span>
              <span className="font-bold">6.4 t/ha</span>
            </li>
          </ul>
        </GlassCard>

        <GlassCard title="Notifications">
          <div className="text-[#062706]/80">
            <div className="p-3 rounded-2xl bg-[#B4D6A0]/40">Low water inputs detected for 2 fields</div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
