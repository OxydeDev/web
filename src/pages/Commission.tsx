import React, { useState } from 'react';
import { Upload, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Commission = () => {
  const [formData, setFormData] = useState({
    discordUser: '',
    email: '',
    commissionType: '',
    animationType: '',
    description: '',
    deadline: '',
    customSize: '',
    termsAccepted: false
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commissionTypes = [
    { value: 'profile-banner', label: 'Discord Profile Banner', staticPrice: [2, 5], animatedPrice: [5, 10] },
    { value: 'server-logo', label: 'Discord Server Logo', staticPrice: [4, 8], animatedPrice: [7, 12] },
    { value: 'server-banner', label: 'Discord Server Banner', staticPrice: [5, 8], animatedPrice: [8, 15] },
    { value: 'rank-icons', label: 'Discord Rank Icons / Utility Emojis', staticPrice: [10, 10], animatedPrice: [10, 10] }
  ];

  const calculatePrice = () => {
    if (!formData.commissionType || !formData.animationType) return null;
    
    const selectedType = commissionTypes.find(type => type.value === formData.commissionType);
    if (!selectedType) return null;
    
    const prices = formData.animationType === 'static' ? selectedType.staticPrice : selectedType.animatedPrice;
    return prices[0] === prices[1] ? `$${prices[0]}` : `$${prices[0]} - $${prices[1]}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommission();
  };

  const submitCommission = async () => {
    setIsSubmitting(true);
    
    try {
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-commission-email', {
        body: {
          discordUser: formData.discordUser,
          email: formData.email,
          commissionType: formData.commissionType,
          animationType: formData.animationType,
          description: formData.description,
          deadline: formData.deadline,
          customSize: formData.customSize,
          referenceFileName: uploadedFile?.name
        }
      });

      if (error) {
        throw error;
      }

      alert('Commission request submitted successfully! Hope will contact you with PayPal payment instructions within 24 hours.');
      
      // Reset form
      setFormData({
        discordUser: '',
        email: '',
        commissionType: '',
        animationType: '',
        description: '',
        deadline: '',
        customSize: '',
        termsAccepted: false
      });
      setUploadedFile(null);
      
    } catch (error) {
      console.error('Error submitting commission:', error);
      alert('There was an error submitting your request. Please try again or contact Hope directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Request a Commission</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to request your custom Discord artwork. Full payment is required upfront via PayPal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Commission Details */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">Commission Details</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type of Commission *</label>
                  <select
                    required
                    value={formData.commissionType}
                    onChange={(e) => setFormData({...formData, commissionType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select commission type</option>
                    {commissionTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {formData.commissionType && formData.commissionType !== 'rank-icons' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Animation Type *</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-pink-50 transition-colors duration-200">
                        <input
                          type="radio"
                          name="animationType"
                          value="static"
                          checked={formData.animationType === 'static'}
                          onChange={(e) => setFormData({...formData, animationType: e.target.value})}
                          className="mr-3"
                        />
                        <span className="font-medium">Static</span>
                      </label>
                      <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-pink-50 transition-colors duration-200">
                        <input
                          type="radio"
                          name="animationType"
                          value="animated"
                          checked={formData.animationType === 'animated'}
                          onChange={(e) => setFormData({...formData, animationType: e.target.value})}
                          className="mr-3"
                        />
                        <span className="font-medium">Animated</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                    placeholder="Describe your vision in detail..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-pink-200 transition-colors duration-200">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        {uploadedFile ? uploadedFile.name : 'Click to upload reference images'}
                      </p>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Deadline</label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Size (Optional)</label>
                    <input
                      type="text"
                      value={formData.customSize}
                      onChange={(e) => setFormData({...formData, customSize: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 1920x1080"
                    />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="mb-8">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({...formData, termsAccepted: e.target.checked})}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="/terms" className="text-black underline hover:text-pink-600">terms of service</a> *
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Commission Request'}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Calculator */}
            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-black mb-4 flex items-center">
                <DollarSign className="h-6 w-6 mr-2" />
                Estimated Price
              </h3>
              {calculatePrice() ? (
                <div className="text-3xl font-bold text-black">{calculatePrice()}</div>
              ) : (
                <p className="text-gray-600">Select commission type and animation to see pricing</p>
              )}
              <p className="text-sm text-gray-500 mt-2">Final price may vary based on complexity</p>
            </div>

            {/* Process */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-4 flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                How It Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <p className="text-sm text-gray-600">Submit your request</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <p className="text-sm text-gray-600">Receive PayPal invoice</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <p className="text-sm text-gray-600">Payment confirmation</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</div>
                  <p className="text-sm text-gray-600">Chat access unlocked</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</div>
                  <p className="text-sm text-gray-600">Work begins (2+ days)</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                What's Included
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  High-resolution files
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Multiple revisions
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Direct Discord communication
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Fast turnaround
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission;