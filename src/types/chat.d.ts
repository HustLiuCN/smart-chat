export interface IChatContext {
  role: IChatRole;
  content: string;
  name?: string;
  loading?: boolean;
}

export type IChatRole = 'system' | 'user' | 'assistant';
