import { useChat } from "@/hooks";
import { Bubble, Sender, Welcome } from "@ant-design/x";
import { Flex } from "antd";

export const ChatView: React.FC = () => {
  const { inputs, context, send, setInputs } = useChat();

  const handleInputChange = (val: string) => {
    setInputs(val);
  };

  const handleKeyDown = () => {
    send();
  };

  return (
    <div className="chat-view">
      <div className="chat-box">
        <Flex gap="middle" vertical>
          <Welcome
            icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
            title="Hello, I'm smart chat"
          />
          {context.map((ctx, index) => (
            <Bubble
              key={index}
              content={ctx.content}
              placement={ctx.role === "user" ? "end" : "start"}
              variant={ctx.role === "user" ? "shadow" : "filled"}
            />
          ))}
        </Flex>
      </div>
      <div className="input-box">
        <Sender value={inputs} onChange={handleInputChange} onSubmit={handleKeyDown} />
      </div>
    </div>
  );
};
