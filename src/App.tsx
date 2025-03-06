import { ConversationDrawer, Header } from "@/components";
import { ChatView } from "@/views/Chat";
import { useState } from "react";

function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onDrawerOpen = () => {
    setDrawerVisible(true);
  };

  const onEdit = () => {
    console.log("edit");
  };

  return (
    <>
      <Header onDrawerOpen={onDrawerOpen} onEdit={onEdit} />
      <ChatView />
      <ConversationDrawer open={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </>
  );
}

export default App;
