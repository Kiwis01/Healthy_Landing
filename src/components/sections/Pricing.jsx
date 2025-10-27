import { memo } from 'react';
import { Check, Sparkles } from 'lucide-react';

const Pricing = () => {

  const tiers = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small clinics getting started',
      features: [
        'Up to 200 patients',
        'Up to 200 MRI scans',
        'Basic AI analysis',
        'Email support',
        'Cloud storage',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'For growing practices and specialists',
      features: [
        'Unlimited patients',
        'Unlimited MRI scans',
        'Advanced AI diagnostics',
        'Priority support',
        'Advanced analytics',
        'API access',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'On-premise deployment',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-healthy-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-healthy-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-healthy-primary/10 text-healthy-primary text-sm font-semibold mb-6">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Transparent pricing that scales with your practice.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-white shadow-2xl ring-2 ring-healthy-primary scale-105 md:scale-110 z-10'
                  : 'bg-white shadow-lg hover:shadow-xl border border-gray-100'
              }`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-healthy-primary to-healthy-secondary text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    {tier.badge}
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gray-900">{tier.price}</span>
                  {tier.period && <span className="text-gray-600 text-lg">{tier.period}</span>}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className={`h-5 w-5 ${
                        tier.highlighted ? 'text-healthy-primary' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-healthy-primary text-white hover:bg-healthy-secondary shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Pricing);
