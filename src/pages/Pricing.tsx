import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Pricing = () => {
  const pricingData = [
    {
      service: 'Discord Profile Banner',
      static: { min: 2, max: 5 },
      animated: { min: 5, max: 10 },
      description: 'Custom profile banners to showcase your personality',
      features: ['High resolution', 'Multiple concepts', '2-3 revisions']
    },
    {
      service: 'Discord Server Logo',
      static: { min: 4, max: 8 },
      animated: { min: 7, max: 12 },
      description: 'Professional server logos that represent your community',
      features: ['Vector format', 'Brand guidelines', 'Unlimited revisions']
    },
    {
      service: 'Discord Server Banner',
      static: { min: 5, max: 8 },
      animated: { min: 8, max: 15 },
      description: 'Eye-catching server banners to welcome new members',
      features: ['Multiple sizes', 'Web optimized', 'Source files included']
    },
    {
      service: 'Discord Rank Icons / Emojis',
      static: { min: 10, max: 10 },
      animated: { min: 10, max: 10 },
      description: 'Complete sets of custom rank icons and utility emojis',
      features: ['Full emoji pack', 'Consistent style', 'Discord ready']
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Commission Pricing</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transparent, affordable pricing for high-quality Discord artwork. All prices include revisions and high-resolution files.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-black text-white px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="font-semibold text-lg">Service</div>
                <div className="font-semibold text-lg text-center">Static</div>
                <div className="font-semibold text-lg text-center">Animated</div>
                <div className="font-semibold text-lg text-center">Features</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {pricingData.map((item, index) => (
                <div key={index} className="px-8 py-6 hover:bg-pink-50 transition-colors duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Service */}
                    <div>
                      <h3 className="font-semibold text-black text-lg mb-1">{item.service}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>

                    {/* Static Price */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">
                        {item.static.min === item.static.max 
                          ? `$${item.static.min}` 
                          : `$${item.static.min} - $${item.static.max}`
                        }
                      </div>
                      <div className="text-sm text-gray-500">Static Design</div>
                    </div>

                    {/* Animated Price */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">
                        {item.animated.min === item.animated.max 
                          ? `$${item.animated.min}` 
                          : `$${item.animated.min} - $${item.animated.max}`
                        }
                      </div>
                      <div className="text-sm text-gray-500">Animated Design</div>
                    </div>

                    {/* Features */}
                    <div>
                      <ul className="space-y-1">
                        {item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Note */}
          <div className="mt-6 bg-pink-50 rounded-xl p-6">
            <div className="flex items-start">
              <Star className="h-6 w-6 text-black mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-black mb-2">Pricing Notes</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Prices may vary slightly based on complexity, custom requirements, and project scope. 
                  Final pricing will be confirmed before payment. All commissions include multiple revisions 
                  and high-resolution files suitable for Discord use.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Payment Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-black p-3 rounded-full mr-4">
                <Zap className="h-6 w-6 text-pink-200" />
              </div>
              <h2 className="text-2xl font-bold text-black">Payment Process</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-pink-100 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                <p className="text-gray-700">Submit commission request with details</p>
              </div>
              <div className="flex items-start">
                <div className="bg-pink-100 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                <p className="text-gray-700">Receive PayPal invoice within 24 hours</p>
              </div>
              <div className="flex items-start">
                <div className="bg-pink-100 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                <p className="text-gray-700">Full payment required before work begins</p>
              </div>
              <div className="flex items-start">
                <div className="bg-pink-100 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
                <p className="text-gray-700">Work starts immediately after payment</p>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-pink-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-black mb-6">What's Always Included</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">High-resolution files (PNG, JPG)</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Multiple revision rounds</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Discord-optimized formats</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Source files (when applicable)</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Direct Discord communication</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Small watermark (non-removable)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-black rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-pink-200 text-lg mb-8 max-w-2xl mx-auto">
            Transform your Discord presence with custom artwork that stands out from the crowd.
          </p>
          <a
            href="/commission"
            className="bg-pink-200 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-300 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
          >
            Request Your Commission
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;