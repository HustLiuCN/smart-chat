import { Conversations, type ConversationsProps } from "@ant-design/x";
import { Drawer, type DrawerProps, type GetProp } from "antd";
import type React from "react";

interface IProps extends DrawerProps {
  submit?: () => void;
}

const items: GetProp<ConversationsProps, "items"> = Array.from({ length: 4 }).map((_, index) => ({
  key: `item${index + 1}`,
  label: `Conversation Item ${index + 1}`
}));

export const ConversationDrawer: React.FC<IProps> = props => {
  return (
    <Drawer
      placement="left"
      styles={{
        body: {
          padding: "unset"
        }
      }}
      {...props}>
      <Conversations items={items}></Conversations>
    </Drawer>
  );
};
