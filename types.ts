export enum ViewMode {
  Chat = 'CHAT',
  Image = 'IMAGE',
  Stats = 'STATS'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ImageResult {
  url: string;
  prompt: string;
  timestamp: number;
}

export interface UsageData {
  name: string;
  tokens: number;
  requests: number;
}