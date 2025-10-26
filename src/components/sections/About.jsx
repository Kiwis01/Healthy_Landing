import { memo } from "react";

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 left-10 h-72 w-72 rounded-full bg-healthy-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-healthy-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-on-scroll">
            <div className="inline-block px-3 py-1 rounded-full bg-healthy-secondary/10 text-healthy-secondary text-sm font-medium mb-4">
              About Us
            </div>
            <h2 className="heading-lg mb-4">The team building the system of intelligence for healthcare</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We’re focused on transforming clinical workflows from reactive to proactive—elevating decisions, reducing friction, and
              empowering clinicians with superhuman insight.
            </p>
          </div>
        </div>

        <div className="relative mt-12 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(38,186,222,0.12),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(77,200,232,0.12),transparent_60%)]" />
          <div className="absolute inset-0 ring-1 ring-black/5" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6">
            <div className="animate-on-scroll bg-white/80 backdrop-blur-md ring-1 ring-black/5 rounded-2xl p-6 shadow-sm">
              <h3 className="heading-sm mb-2">Who we are</h3>
              <p className="text-gray-700">
                Builders, clinicians, and data scientists united by a mission to remove the administrative noise surrounding care.
              </p>
            </div>

            <div className="animate-on-scroll bg-white/80 backdrop-blur-md ring-1 ring-black/5 rounded-2xl p-6 shadow-sm">
              <h3 className="heading-sm mb-2">Our mission</h3>
              <p className="text-gray-700">
                Turn medical systems of record into systems of intelligence—so every decision is data-driven, timely, and precise.
              </p>
            </div>

            <div className="animate-on-scroll bg-white/80 backdrop-blur-md ring-1 ring-black/5 rounded-2xl p-6 shadow-sm">
              <h3 className="heading-sm mb-2">Values</h3>
              <ul className="text-gray-700 space-y-2 list-disc list-inside">
                <li>Augment, don’t replace</li>
                <li>Security by design</li>
                <li>Clinical impact first</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-on-scroll bg-gray-50 ring-1 ring-black/5 rounded-2xl p-6">
            <div className="text-healthy-primary text-sm font-medium mb-1">Founded</div>
            <div className="text-gray-800 font-semibold">Year</div>
            <div className="text-gray-600">Add your founding story and milestones.</div>
          </div>
          <div className="animate-on-scroll bg-gray-50 ring-1 ring-black/5 rounded-2xl p-6">
            <div className="text-healthy-primary text-sm font-medium mb-1">Team</div>
            <div className="text-gray-800 font-semibold">People</div>
            <div className="text-gray-600">Briefly highlight leadership or advisors.</div>
          </div>
          <div className="animate-on-scroll bg-gray-50 ring-1 ring-black/5 rounded-2xl p-6">
            <div className="text-healthy-primary text-sm font-medium mb-1">Backed by</div>
            <div className="text-gray-800 font-semibold">Partners</div>
            <div className="text-gray-600">Logos or notable partners can go here.</div>
          </div>
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <a href="#contact" className="inline-flex items-center gap-2 bg-healthy-primary hover:bg-healthy-secondary text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(About);

