import { ArrowRight } from "lucide-react";

const IntroPanel = () => {
  return (
    <section id="intro" className="relative container mx-auto px-4 md:px-6 scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-5xl mx-auto text-center py-16 md:py-24">
        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-medium">
          Plataforma AI para Salud
        </div>
        <h1 className="heading-xl mb-6">
          Healthy es <span className="text-gradient font-bold">moderna</span>, <span className="text-gradient font-bold">tecnológica</span> e <span className="text-gradient font-bold">innovadora</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Una plataforma colaborativa impulsada por IA para diagnóstico por imagen que funciona en cualquier lugar, sin hardware de alto rendimiento.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="#features"
            className="inline-flex items-center gap-2 bg-healthy-primary hover:bg-healthy-secondary text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Explorar características
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntroPanel;
