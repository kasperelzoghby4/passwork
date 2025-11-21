import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail } from 'lucide-react';
import { PlatformType } from '../types';

// Custom VK Icon since it's not in Lucide standard set sometimes
const VkIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 21.5c-4.5 0-6.5-3.5-6.5-10.5 0 0 .5 0 0.5-3.5 0-1.5 0-3.5 2.5-3.5 2.5 0 2.5 2 2.5 2s1.5-2 3.5-2c2.5 0 2.5 2.5 2.5 2.5s0 5.5-2.5 8.5c-2 2.5-4.5 2.5-4.5 2.5z" />
    <path d="M9 7c-2 0-4.5 2-4.5 8.5 0 3 2 6 6 6" />
  </svg>
);

// Custom Google Icon
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M12 12H17" />
    <path d="M12 12V17" />
  </svg>
);

export const PlatformIcon = ({ platform, className }: { platform: PlatformType; className?: string }) => {
  switch (platform) {
    case 'facebook': return <Facebook className={className} />;
    case 'twitter': return <Twitter className={className} />;
    case 'instagram': return <Instagram className={className} />;
    case 'linkedin': return <Linkedin className={className} />;
    case 'vk': return <VkIcon className={className} />;
    case 'google': return <GoogleIcon className={className} />;
    default: return <Globe className={className} />;
  }
};

export const getPlatformColor = (platform: PlatformType) => {
  switch (platform) {
    case 'facebook': return 'bg-blue-600 text-white';
    case 'twitter': return 'bg-black text-white';
    case 'instagram': return 'bg-pink-600 text-white';
    case 'linkedin': return 'bg-blue-700 text-white';
    case 'vk': return 'bg-blue-500 text-white';
    case 'google': return 'bg-red-500 text-white';
    default: return 'bg-gray-600 text-white';
  }
};
