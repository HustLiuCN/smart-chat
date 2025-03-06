import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchApi } from '@/utils/openai';
import type { IChatContext } from '@/types';

export function useChat() {
  // 用户输入
  const [inputs, setInputs] = useState<string>('中国的首都是哪里');
  // 会话 id
  const [chatId] = useState<string>(uuidv4());
  // 会话记录
  const [context, setContext] = useState<IChatContext[]>([{ role: 'assistant', content: '你好，我是你的智能助手' }]);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);

  async function send() {
    const content = inputs;

    if (!content.trim()) {
      return;
    }

    const userInput: IChatContext = { role: 'user', content };

    setContext((prevContext) => [...prevContext, userInput]);
    setLoading(true);

    setContext((prevContext) => [...prevContext, { role: 'assistant', content: '思考中……', loading: true }]);

    setInputs('');

    fetchApi(
      {
        chatId,
        content,
      },
      {
        onRead: (str: string) => {
          setContext((prevContext) => {
            const lastContext = prevContext.slice(-1)?.[0];
            if (!lastContext) {
              return prevContext;
            }

            if (lastContext.loading) {
              lastContext.content = '';
              lastContext.loading = false;
            }

            lastContext.content += str;
            return [...prevContext.slice(0, -1), lastContext];
          });
        },
        onFinish: () => {
          setLoading(false);
        },
      },
    );
  }

  return {
    inputs,
    context,
    loading,
    send,
    setInputs
  };
}
