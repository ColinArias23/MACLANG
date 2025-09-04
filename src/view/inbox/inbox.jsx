import React, { useState, useEffect, useRef } from "react";
import { Card, Pagination, notification } from "antd";

import InboxHeader from "./InboxHeader";
import MessageList from "./MessageList";
import MessageDetail from "./MessageDetail";
import ComposeModal from "./ComposeModal";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    subject: "",
    message: "",
    department: "",
  });
  const listRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();

  const departments = [
    "All",
    "IT Department",
    "HR Department",
    "Emergency Room",
    "Finance Department",
    "Radiology",
    "Laboratory",
    "Pharmacy",
    "Nursing",
  ];

  const tabs = [
    { key: "department", label: "Department", icon: "🏢" },
    { key: "all", label: "All", icon: "📨" },
    { key: "pinned", label: "Pinned", icon: "📌" },
  ];

  // Load messages from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem("inboxMessages");
    if (saved) setMessages(JSON.parse(saved));
    else {
      setMessages([
        {
          id: 1,
          sender: "Admin",
          subject: "Welcome to the platform",
          content: "This is a sample announcement.",
          email: "admin@example.com",
          isPinned: true,
          date: "Aug 31, 2025",
          department: "All",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("inboxMessages", JSON.stringify(messages));
  }, [messages]);

  const filteredMessages = messages.filter((msg) => {
    if (activeTab === "department" && msg.department === "All") return false;
    if (activeTab === "pinned" && !msg.isPinned) return false;
    if (searchTerm.trim() === "") return true;
    const lower = searchTerm.toLowerCase();
    return (
      msg.subject.toLowerCase().includes(lower) ||
      msg.sender.toLowerCase().includes(lower) ||
      msg.department?.toLowerCase().includes(lower)
    );
  });

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full h-full flex flex-col">
      {contextHolder}
      <Card
        className="shadow-xl border-0 rounded-xl overflow-hidden flex flex-col w-full h-full
                   [&>.ant-card-body]:flex [&>.ant-card-body]:flex-col [&>.ant-card-body]:h-full [&>.ant-card-body]:p-0"
      >
        {!selectedMessage ? (
          <>
            <InboxHeader
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setIsComposeOpen={setIsComposeOpen}
              listRef={listRef}
            />

            <MessageList
              messages={paginatedMessages}
              onSelectMessage={setSelectedMessage}
              onDelete={(id) =>
                setMessages(messages.filter((msg) => msg.id !== id))
              }
              onTogglePin={(id) =>
                setMessages(
                  messages.map((msg) =>
                    msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg
                  )
                )
              }
              listRef={listRef}
            />

            <div className="p-4 flex justify-center border-t border-gray-200 flex-shrink-0">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredMessages.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <MessageDetail
            message={selectedMessage}
            onBack={() => setSelectedMessage(null)}
            onDelete={(id) =>
              setMessages(messages.filter((msg) => msg.id !== id))
            }
            onTogglePin={(id) =>
              setMessages(
                messages.map((msg) =>
                  msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg
                )
              )
            }
            totalMessages={filteredMessages.length}
            currentIndex={filteredMessages.findIndex(
              (m) => m.id === selectedMessage.id
            )}
          />
        )}
      </Card>

      <ComposeModal
        open={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        composeData={composeData}
        setComposeData={setComposeData}
        onSend={() => {
          const newMsg = {
            id: Date.now(),
            sender: "You",
            subject: composeData.subject,
            content: composeData.message,
            email: "you@example.com",
            isPinned: false,
            date: new Date().toLocaleString(),
            department: composeData.department || "All",
          };
          setMessages([newMsg, ...messages]);
          setIsComposeOpen(false);
          setComposeData({ subject: "", message: "", department: "" });
          api.success({ message: "Success", description: "Message sent!" });
        }}
        departments={departments}
      />
    </div>
  );
};

export default Inbox;
