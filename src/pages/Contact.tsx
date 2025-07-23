import React, { useState } from 'react';
import { Mail, MessageCircle, Instagram, Twitter, Send, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    discordUser: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact();
  };

  const submitContact = async () => {
    setIsSubmitting(true);
    
    try {
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          discordUser: formData.discordUser,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      });

      if (error) {
        throw error;
      }

      alert('Message sent successfully! Hope will respond within 24 hours.');
      
      // Reset form
      setFormData({ discordUser: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('There was an error sending your message. Please try again or contact Hope directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'General inquiries and support',
      value: 'unbeliveable.vanis@gmail.com',
      link: 'mailto:unbeliveable.vanis@gmail.com'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Direct chat for commission clients',
      value: 'hopeunlimited_',
      link: '#'
    },
    {
      icon: MessageCircle,
      title: 'Portfolio',
      description: 'View my complete portfolio and links',
      value: 'hopeart.carrd.co',
      link: 'https://hopeart.carrd.co/#'
    }
  ];

  const faqs = [
    {
      question: 'How long does a commission take?',
      answer: 'Most commissions are completed within 2-3 days, depending on complexity. Rush orders may be available for an additional fee.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Refunds are not available after the approved sketch phase. However, revisions are included to ensure you\'re happy with the final result.'
    },
    {
      question: 'Can I request custom sizes?',
      answer: 'Absolutely! Just mention your custom size requirements in your commission request and I\'ll accommodate them.'
    },
    {
      question: 'How do I pay for my commission?',
      answer: 'All payments are processed through PayPal. You\'ll receive an invoice after your commission request is approved.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about commissions or want to discuss a custom project? 
            I'd love to hear from you! Choose your preferred way to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Send Me a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discord User *</label>
                    <input
                      type="text"
                      required
                      value={formData.discordUser}
                      onChange={(e) => setFormData({...formData, discordUser: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                      placeholder="Your Discord username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="commission">Commission Question</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                    placeholder="Tell me about your project or ask your question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-pink-50 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-black mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-black mb-2">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-black mb-6">Contact Methods</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    className="flex items-start p-4 rounded-xl hover:bg-pink-50 transition-colors duration-200 group"
                  >
                    <div className="bg-black p-2 rounded-full mr-4 group-hover:scale-110 transition-transform duration-200">
                      <method.icon className="h-5 w-5 text-pink-200" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black">{method.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                      <p className="text-sm font-medium text-black">{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Availability
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-medium text-black">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commission Slots:</span>
                  <span className="font-medium text-green-600">Open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rush Orders:</span>
                  <span className="font-medium text-black">Available</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-pink-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>Note:</strong> Discord chat access is only available to clients with active commissions.
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                Working Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="font-medium text-black">9 AM - 6 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="font-medium text-black">10 AM - 4 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-medium text-black">Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="bg-black rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-3">Ready to Start?</h3>
              <p className="text-pink-200 text-sm mb-4">
                Skip the chat and go straight to commissioning your artwork!
              </p>
              <a
                href="/commission"
                className="bg-pink-200 text-black px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition-all duration-200 hover:scale-105 inline-block"
              >
                Request Commission
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;