import { API_KEY, API_PREFIX } from '@/constants';
import OpenAI from 'openai';

export * from './fetch';

export const $openai = new OpenAI({
  baseURL: API_PREFIX,
  apiKey: API_KEY,
  // TODO 在服务端调用
  dangerouslyAllowBrowser: true,
});
