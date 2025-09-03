import { useState } from "react";
import Sidebar from "../../shared/layout/components/sidebar";
import Content from "../../shared/layout/components/content";
import InboxInterface from "../../modules/main/component/inboxinterface";

const Main = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Content */}
      <div
        className={`h-screen transition-all duration-300 flex items-center justify-center ${
          isCollapsed ? "pl-[80px]" : "pl-[280px]"
        }`}
      >
        <Content>
          {/* Wrapper to center InboxInterface */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[95%] h-[95vh] bg-transparent flex items-center justify-center">
              <InboxInterface />
            </div>
          </div>
        </Content>
      </div>
    </div>
  );
};

export default Main;
