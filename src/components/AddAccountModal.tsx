import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Account, PlatformType } from '../types';
import { PlatformIcon } from './PlatformIcon';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: Omit<Account, 'id' | 'createdAt'>) => void;
}

const platforms: { id: PlatformType; label: string }[] = [
  { id: 'facebook', label: 'فيسبوك' },
  { id: 'twitter', label: 'X (تويتر)' },
  { id: 'google', label: 'جوجل' },
  { id: 'vk', label: 'VK' },
  { id: 'instagram', label: 'انستجرام' },
  { id: 'linkedin', label: 'لينكد إن' },
  { id: 'other', label: 'أخرى' },
];

export const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose, onSave }) => {
  const [platform, setPlatform] = useState<PlatformType>('facebook');
  const [platformName, setPlatformName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      platform,
      platformName: platform === 'other' ? platformName : undefined,
      email,
      username,
      password,
    });
    // Reset form
    setEmail('');
    setUsername('');
    setPassword('');
    setPlatformName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">إضافة حساب جديد</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">المنصة</label>
              <div className="grid grid-cols-4 gap-2">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                      platform === p.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <PlatformIcon platform={p.id} className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {platform === 'other' && (
              <Input
                label="اسم المنصة"
                placeholder="مثال: تيك توك"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                required
              />
            )}

            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="اسم المستخدم"
              type="text"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              label="كلمة المرور"
              type="text" // Intentionally text to let user see what they type for storage
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="pt-4 flex gap-3">
              <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4" />
                حفظ الحساب
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
