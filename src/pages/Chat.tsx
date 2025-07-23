import React, { useState, useEffect } from 'react';
import { MessageCircle, Lock, CheckCircle, AlertCircle, Send } from 'lucide-react';

const Chat = () => {
  const [hasActiveCommission, setHasActiveCommission] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Hope',
      content: 'Hi! Thanks for your commission. I\'ll start working on your Discord banner right away. Feel free to ask any questions!',
      timestamp: '2:30 PM',
      isAdmin: true
    }
  ]);

  // Simulate checking for active commission
  useEffect(() => {
    // In a real app, this would check the user's commission status
    const commissionStatus = localStorage.getItem('activeCommission');
    setHasActiveCommission(!!commissionStatus);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !hasActiveCommission) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAdmin: false
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate Hope's response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: 'Hope',
        content: 'Got it! I\'ll update you on the progress soon. Thanks for the details!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAdmin: true
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  if (!hasActiveCommission) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <Lock className="h-12 w-12 text-gray-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-black mb-4">Chat Access Restricted</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Private chat access is only available to clients with active commissions. 
              This helps me focus on current projects and provide the best service to paying customers.
            </p>

            <div className="bg-pink-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-black mb-4 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                How to Get Chat Access
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                  <p className="text-gray-700">Submit a commission request with your project details</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                  <p className="text-gray-700">Receive and pay your PayPal invoice</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                  <p className="text-gray-700">Chat access is automatically unlocked!</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/commission"
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Request a Commission
              </a>
              <a
                href="/contact"
                className="bg-pink-200 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-300 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                General Questions
              </a>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <strong>Have questions before commissioning?</strong> Use the contact form for general inquiries, 
                  pricing questions, or to discuss your project ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Commission Chat</h1>
          <p className="text-lg text-gray-600">
            Direct communication with Hope about your active commission
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-black text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-pink-200 p-2 rounded-full mr-3">
                  <MessageCircle className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Hope's Services</h2>
                  <p className="text-pink-200 text-sm">Usually responds within a few hours</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm text-pink-200">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.isAdmin
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-black text-white'
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{msg.sender}</p>
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.isAdmin ? 'text-gray-500' : 'text-pink-200'
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Commission Status */}
        <div className="mt-8 bg-pink-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-black mb-4">Your Commission Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-black">Payment Received</p>
              <p className="text-sm text-gray-600">Jan 15, 2025</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="h-8 w-8 bg-yellow-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="h-4 w-4 bg-white rounded-full"></div>
              </div>
              <p className="font-medium text-black">In Progress</p>
              <p className="text-sm text-gray-600">Started today</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-gray-500">Completion</p>
              <p className="text-sm text-gray-600">Est. Jan 17, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;