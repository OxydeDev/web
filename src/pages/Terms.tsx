import React from 'react';
import { Shield, AlertCircle, CreditCard, Clock, MessageCircle, Image } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: CreditCard,
      title: 'Payment Policy',
      content: [
        'Full payment is required upfront before work begins on any commission.',
        'All payments are processed through PayPal only.',
        'Invoices will be sent within 24 hours of commission request approval.',
        'No refunds are available after the approved sketch phase.',
        'Prices may vary based on complexity and custom requirements.'
      ]
    },
    {
      icon: Clock,
      title: 'Timeline & Deadlines',
      content: [
        'Standard completion time is 2 days or more, depending on complexity.',
        'Rush orders may be available for an additional fee.',
        'Deadlines are discussed and agreed upon before work begins.',
        'Delays will be communicated promptly with updated timelines.',
        'Completion time starts after payment confirmation.'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Communication',
      content: [
        'Discord communication access is granted only after payment confirmation.',
        'You can contact me via Discord to check progress and request changes.',
        'Please provide detailed descriptions and reference images when possible.',
        'Major revisions may require additional fees after the initial concept approval.',
        'Response time is typically within 24 hours during business days.'
      ]
    },
    {
      icon: Image,
      title: 'Custom Sizes & Specifications',
      content: [
        'If you need specific custom dimensions, mention them in your request.',
        'Standard Discord sizes are used unless otherwise specified.',
        'All artwork is delivered in high-resolution PNG and JPG formats.',
        'Source files (PSD, AI) may be provided when applicable.',
        'All final artwork includes a small, non-removable watermark.'
      ]
    },
    {
      icon: Shield,
      title: 'Usage Rights',
      content: [
        'You receive full usage rights for the commissioned artwork.',
        'Artwork may not be resold or redistributed as stock content.',
        'The small watermark must remain on all final deliverables.',
        'Hope\'s Services retains the right to showcase work in portfolio.',
        'Commercial usage rights are included in all commission prices.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Important Notes',
      content: [
        'No inappropriate, offensive, or illegal content will be created.',
        'Revisions are included, but major changes may incur additional costs.',
        'Completion times may vary during high-demand periods.',
        'All communication should remain professional and respectful.',
        'These terms are subject to change with advance notice.'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please read these terms carefully before placing a commission. By submitting a request, 
            you agree to these terms and conditions.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: January 2025
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-black p-3 rounded-full mr-4">
                  <section.icon className="h-6 w-6 text-pink-200" />
                </div>
                <h2 className="text-2xl font-bold text-black">{section.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="bg-pink-100 rounded-full w-2 h-2 mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="mt-16 bg-pink-50 rounded-2xl p-8 border-l-4 border-black">
          <h2 className="text-2xl font-bold text-black mb-4">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-black mb-2">Before You Start:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Payment required upfront</li>
                <li>• PayPal only</li>
                <li>• No refunds after sketch approval</li>
                <li>• Custom sizes must be specified</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">What You Get:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• High-resolution files</li>
                <li>• Discord communication access</li>
                <li>• Multiple revisions included</li>
                <li>• 2+ day completion time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-4">Questions About These Terms?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about these terms of service, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105"
            >
              Contact Me
            </a>
            <a
              href="/commission"
              className="bg-pink-200 text-black px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition-all duration-200 hover:scale-105"
            >
              I Agree - Start Commission
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;