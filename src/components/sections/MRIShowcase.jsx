const MRIShowcase = () => {
  return (
    <section id="mri-showcase" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="heading-lg mb-4 text-gray-900">AI-assisted MRI review</h2>
            <p className="text-gray-600 text-lg">
              Slices de resonancia con áreas de interés resaltadas por IA para apoyar el diagnóstico. Rendimiento fluido y reproducible desde cualquier dispositivo.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-black">
              <video
                src="/videos/cerebro-con-tumor.mp4"
                className="w-full h-[46vh] md:h-[58vh] object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
              {/* vignette for readability over dark areas */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.55)_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MRIShowcase;
