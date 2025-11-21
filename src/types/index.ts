export interface Account {
  id: string;
  platform: 'facebook' | 'twitter' | 'google' | 'vk' | 'instagram' | 'linkedin' | 'other';
  platformName?: string; // For 'other'
  email?: string;
  username?: string;
  password?: string;
  notes?: string;
  createdAt: Date;
}

export type PlatformType = Account['platform'];
