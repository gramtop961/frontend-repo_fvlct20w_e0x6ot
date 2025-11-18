import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-16">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">Yield Prediction App</h1>
          <p className="mt-4 text-white/90 text-lg sm:text-xl max-w-2xl">Predict crop yields with satellite imagery, weather, soil, and management data. Run what-if simulations and get actionable recommendations.</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#062706]/40 via-[#0B3D0B]/60 to-[#062706] pointer-events-none"></div>
    </section>
  );
}
