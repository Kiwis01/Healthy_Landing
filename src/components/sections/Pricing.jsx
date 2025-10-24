import { memo } from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: 'Basic',
      price: '$29',
      features: [
        'Access to all basic features',
        '200 Patients',
        '200 MRIs',
        'Email support',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Pro',
      price: '$79',
      features: [
        'Access to all pro features',
        'Unlimited Patients',
        'Unlimited MRIs',
        'Priority email support',
        'Advanced analytics',
      ],
      cta: 'Upgrade to Pro',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      features: [
        'Access to all enterprise features',
        'Unlimited Patients',
        'Unlimited MRIs',
        '24/7 phone support',
        'Dedicated account manager',
        'Clinic Analytics',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`border-2 rounded-lg p-8 flex flex-col bg-gray-50 ${tier.highlighted ? 'border-healthy-primary' : 'border-healthy-accent'}`}>
              <h3 className="text-2xl font-semibold mb-4">{tier.name}</h3>
              <p className="text-4xl font-bold mb-6">{tier.price}</p>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-6 w-6 text-healthy-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-auto w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${tier.highlighted ? 'bg-healthy-primary text-white border-2 border-healthy-primary hover:bg-white hover:text-healthy-primary' : 'bg-transparent text-healthy-primary border-2 border-healthy-primary hover:bg-healthy-primary hover:text-white'}`}>
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
