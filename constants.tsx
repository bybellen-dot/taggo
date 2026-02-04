
import React from 'react';
import { User, Spot, Taggo, Notification } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  handle: '@arivera',
  avatar: 'https://picsum.photos/seed/alex/200',
  stats: {
    spots: 42,
    taggos: 8,
    likes: 1205,
    followers: 840
  }
};

export const MOCK_SPOTS: Spot[] = [
  {
    id: 's1',
    title: 'Secret Rooftop Garden',
    description: 'A hidden oasis in the middle of downtown. Great for sunset views.',
    location: { lat: -23.5505, lng: -46.6333, address: 'Downtown, São Paulo' },
    image: 'https://picsum.photos/seed/garden/800/600',
    tags: ['outdoor', 'sunset', 'quiet'],
    ownerId: 'u1',
    likes: 24,
    comments: 5,
    createdAt: '2023-10-01'
  },
  {
    id: 's2',
    title: 'Retro Vinyl Cafe',
    description: 'Best coffee and amazing vinyl collection. Very chill vibe.',
    location: { lat: -23.5615, lng: -46.6553, address: 'Pinheiros, São Paulo' },
    image: 'https://picsum.photos/seed/vinyl/800/600',
    tags: ['coffee', 'music', 'retro'],
    ownerId: 'u2',
    likes: 56,
    comments: 12,
    createdAt: '2023-10-05'
  },
  {
    id: 's3',
    title: 'Brutalist Library',
    description: 'Architectural masterpiece with plenty of natural light.',
    location: { lat: -23.5555, lng: -46.6444, address: 'Centro, São Paulo' },
    image: 'https://picsum.photos/seed/library/800/600',
    tags: ['architecture', 'books', 'quiet'],
    ownerId: 'u3',
    likes: 89,
    comments: 21,
    createdAt: '2023-10-10'
  }
];

export const MOCK_TAGGOS: Taggo[] = [
  {
    id: 't1',
    name: 'Weekend Getaways',
    description: 'Best spots for a short trip.',
    isPrivate: false,
    spotIds: ['s1', 's2'],
    ownerId: 'u1',
    color: 'indigo'
  },
  {
    id: 't2',
    name: 'Future House Dreams',
    description: 'Architecture I love.',
    isPrivate: true,
    spotIds: ['s3'],
    ownerId: 'u1',
    color: 'emerald'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    user: { name: 'Sarah J.', avatar: 'https://picsum.photos/seed/sarah/100' },
    content: 'liked your spot "Secret Rooftop Garden"',
    timestamp: '2m ago',
    read: false
  },
  {
    id: 'n2',
    type: 'follow',
    user: { name: 'Mark Wilson', avatar: 'https://picsum.photos/seed/mark/100' },
    content: 'started following you',
    timestamp: '1h ago',
    read: true
  }
];
