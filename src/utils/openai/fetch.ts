export async function fetchApi(
  // params
  { chatId, content }: { chatId: string; content: string },
  // callback
  {
    onFinish,
    onRead,
  }: {
    onFinish?: () => void;
    onRead?: (str: string) => void;
  },
) {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId, content }),
    });

    if (!response.ok) {
      throw new Error('请求 /api/chat 失败');
    }

    const reader = response.body?.getReader(); // 获取流的读取器
    const decoder = new TextDecoder('utf-8'); // 用于解码二进制数据

    if (!reader) {
      return;
    }

    while (true) {
      const { done, value } = await reader.read(); // 读取流中的数据

      if (done) {
        onFinish?.();
        break;
      }

      const chunkText = decoder.decode(value, { stream: true }); // 解码为字符串
      console.log(chunkText);

      onRead?.(chunkText);
    }
  } catch (error) {
    console.error('Error fetching stream:', error);
  }
}
