import React, { useState, useEffect } from 'react';
import { supabase, CommissionSubmission, ContactSubmission } from '../lib/supabase';
import { Users, Mail, Clock, CheckCircle, Eye, EyeOff } from 'lucide-react';

const Admin = () => {
  const [commissions, setCommissions] = useState<CommissionSubmission[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<'commissions' | 'contacts'>('commissions');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple password protection (in production, use proper authentication)
  const ADMIN_PASSWORD = 'hope2025admin'; // Change this to your preferred password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch commissions
    const { data: commissionsData, error: commissionsError } = await supabase
      .from('commission_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (commissionsError) {
      console.error('Error fetching commissions:', commissionsError);
    } else {
      setCommissions(commissionsData || []);
    }

    // Fetch contacts
    const { data: contactsData, error: contactsError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (contactsError) {
      console.error('Error fetching contacts:', contactsError);
    } else {
      setContacts(contactsData || []);
    }

    setLoading(false);
  };

  const updateCommissionStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('commission_submissions')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating commission status:', error);
    } else {
      fetchData();
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating contact status:', error);
    } else {
      fetchData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-black p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <EyeOff className="h-8 w-8 text-pink-200" />
            </div>
            <h1 className="text-2xl font-bold text-black">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter password to view submissions</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-transparent transition-all duration-200 mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalCommissions: commissions.length,
    pendingCommissions: commissions.filter(c => c.status === 'pending').length,
    totalContacts: contacts.length,
    unreadContacts: contacts.filter(c => c.status === 'unread').length,
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Eye className="h-8 w-8 text-black mr-2" />
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage commission requests and contact submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-black">{stats.totalCommissions}</p>
                <p className="text-gray-600 text-sm">Total Commissions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-black">{stats.pendingCommissions}</p>
                <p className="text-gray-600 text-sm">Pending Commissions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-black">{stats.totalContacts}</p>
                <p className="text-gray-600 text-sm">Total Contacts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-black">{stats.unreadContacts}</p>
                <p className="text-gray-600 text-sm">Unread Contacts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('commissions')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'commissions'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                Commission Requests ({commissions.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'contacts'
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                Contact Submissions ({contacts.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'commissions' ? (
              <div className="space-y-4">
                {commissions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No commission requests yet.</p>
                ) : (
                  commissions.map((commission) => (
                    <div key={commission.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-black">{commission.discord_user}</h3>
                          <p className="text-gray-600">{commission.email}</p>
                          <p className="text-sm text-gray-500">{new Date(commission.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            commission.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            commission.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {commission.status}
                          </span>
                          <select
                            value={commission.status}
                            onChange={(e) => updateCommissionStatus(commission.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Type:</strong> {commission.commission_type}</p>
                          <p><strong>Animation:</strong> {commission.animation_type || 'Not specified'}</p>
                          <p><strong>Deadline:</strong> {commission.deadline || 'Not specified'}</p>
                          <p><strong>Custom Size:</strong> {commission.custom_size || 'Not specified'}</p>
                          <p><strong>Reference File:</strong> {commission.reference_file_name || 'None'}</p>
                        </div>
                        <div>
                          <p><strong>Description:</strong></p>
                          <p className="text-gray-700 mt-1">{commission.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No contact submissions yet.</p>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-black">{contact.discord_user}</h3>
                          <p className="text-gray-600">{contact.email}</p>
                          <p className="text-sm text-gray-500">{new Date(contact.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            contact.status === 'unread' ? 'bg-red-100 text-red-800' :
                            contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                            contact.status === 'replied' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {contact.status}
                          </span>
                          <select
                            value={contact.status}
                            onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded px-2 py-1"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <p><strong>Subject:</strong> {contact.subject}</p>
                        <p><strong>Message:</strong></p>
                        <p className="text-gray-700 mt-1 whitespace-pre-wrap">{contact.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;