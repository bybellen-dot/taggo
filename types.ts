
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  stats: {
    spots: number;
    taggos: number;
    likes: number;
    followers: number;
  };
}

export interface Spot {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image: string;
  tags: string[];
  ownerId: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface Taggo {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  spotIds: string[];
  ownerId: string;
  color: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
}
