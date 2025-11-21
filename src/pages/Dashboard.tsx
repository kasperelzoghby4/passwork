import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Copy, Eye, EyeOff, Trash2, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { AddAccountModal } from '../components/AddAccountModal';
import { Account } from '../types';
import { PlatformIcon, getPlatformColor } from '../components/PlatformIcon';
import { cn } from '../lib/utils';

// Mock Initial Data
const INITIAL_ACCOUNTS: Account[] = [
  {
    id: '1',
    platform: 'facebook',
    email: 'ahmed@example.com',
    username: 'ahmed.ali',
    password: 'password123',
    createdAt: new Date(),
  },
  {
    id: '2',
    platform: 'google',
    email: 'work@gmail.com',
    password: 'supersecretpass',
    createdAt: new Date(),
  },
];

export const Dashboard = () => {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddAccount = (newAccountData: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = {
      ...newAccountData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setAccounts([newAccount, ...accounts]);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
      setAccounts(accounts.filter(a => a.id !== id));
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const filteredAccounts = accounts.filter(acc => {
    const searchLower = searchQuery.toLowerCase();
    return (
      acc.platform.includes(searchLower) ||
      acc.username?.toLowerCase().includes(searchLower) ||
      acc.email?.toLowerCase().includes(searchLower) ||
      acc.platformName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-8">
      {/* Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="بحث عن حساب..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto shadow-lg shadow-primary-500/20">
          <Plus className="w-5 h-5" />
          إضافة حساب جديد
        </Button>
      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">لا توجد حسابات محفوظة حالياً</p>
          <Button variant="link" onClick={() => setIsModalOpen(true)} className="mt-2 text-primary-600">
            أضف حسابك الأول
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className={cn("absolute top-0 right-0 w-full h-1.5", getPlatformColor(account.platform))} />
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-inner", getPlatformColor(account.platform))}>
                    <PlatformIcon platform={account.platform} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg capitalize">
                      {account.platform === 'other' ? account.platformName : account.platform}
                    </h3>
                    <p className="text-xs text-gray-400">تمت الإضافة: {account.createdAt.toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(account.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {account.email && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">البريد الإلكتروني</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 text-sm truncate">{account.email}</span>
                      <button onClick={() => copyToClipboard(account.email!)} className="text-gray-400 hover:text-primary-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {account.username && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">اسم المستخدم</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 text-sm truncate" dir="ltr">{account.username}</span>
                      <button onClick={() => copyToClipboard(account.username!)} className="text-gray-400 hover:text-primary-600">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {account.password && (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">كلمة المرور</p>
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-mono text-gray-700 text-sm truncate flex-1" dir="ltr">
                        {visiblePasswords[account.id] ? account.password : '••••••••••••'}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => togglePasswordVisibility(account.id)} 
                          className="text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          {visiblePasswords[account.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(account.password!)} 
                          className="text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AddAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddAccount} 
      />
    </div>
  );
};
