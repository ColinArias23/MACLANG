import { useState } from "react";
import InboxInterface from "../inbox/component/inboxinterface";

const Main = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <InboxInterface />
    </div>
  );
};

export default Main;
