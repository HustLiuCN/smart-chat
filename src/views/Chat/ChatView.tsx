import { set } from '@vueuse/core';
import { Button, Comment, Input } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { useChat } from './hooks';

export const ChatView = defineComponent({
  setup() {
    const { inputs, context, loading, send } = useChat();

    return () => {
      return (
        <div class="chat-view">
          <div class="chat-box">
            {context.value.map((ctx) => (
              <Comment author={ctx.role} content={ctx.content} />
            ))}
          </div>
          <div class="input-box">
            <Input.TextArea
              value={inputs.value}
              onChange={(val) => set(inputs, val.target.value)}
              onKeydown={(e) => {
                if (e.key.toLowerCase() === 'enter') {
                  send();
                }
              }}
            />
            <Button type="primary" onClick={send} loading={loading.value}>
              发送
            </Button>
          </div>
        </div>
      );
    };
  },
});
