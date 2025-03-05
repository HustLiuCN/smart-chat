import { $request } from '@/utils';
import { $openai, fetchApi } from '@/utils/openai';
import axios from 'axios';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { IChatContext } from '@/types';
import { set, useToggle } from '@vueuse/core';

export function useChat() {
  // 用户输入
  const inputs = ref<string>('中国的首都是哪里');
  // 会话 id
  const chatId = ref<string>(uuidv4());
  // 会话记录
  const context = ref<IChatContext[]>([{ role: 'assistant', content: '你好，我是你的智能助手' }]);

  const [loading, toggleLoading] = useToggle(false);

  async function send() {
    const content = inputs.value;

    if (!content.trim()) {
      return;
    }

    const userInput: IChatContext = { role: 'user', content };

    context.value.push(userInput);
    toggleLoading(true);

    context.value.push({ role: 'assistant', content: '思考中……', loading: true });

    set(inputs, '');

    fetchApi(
      {
        chatId: chatId.value,
        content,
      },
      {
        onRead: (str: string) => {
          const lastContext = context.value.slice(-1)?.[0];
          if (!lastContext) {
            return;
          }

          if (lastContext.loading) {
            lastContext.content = '';
            lastContext.loading = false;
          }

          lastContext.content += str;
        },
        onFinish: () => {
          toggleLoading(false);
        },
      },
    );
  }

  return {
    inputs,
    context,
    loading,
    send,
  };
}
