import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  Modal,
  Input,
  Avatar,
  Typography,
  Popconfirm,
  Pagination,
  Select,
  message as antMessage,
  notification,
} from "antd";
import {
  CameraOutlined,
  FileTextOutlined,
  EditOutlined,
  LinkOutlined,
  CalendarOutlined,
  PushpinOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
  CloseOutlined,
  SendOutlined,
  ReloadOutlined,
  SyncOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const InboxInterface = () => {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [activeTab, setActiveTab] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [composeData, setComposeData] = useState({
    subject: "",
    message: "",
    department: "",
  });
  const getInitialMessages = () => {
    const saved = localStorage.getItem("inboxMessages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
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
      {
        id: 2,
        sender: "System",
        subject: "Update completed",
        content: "The system update was successfully installed.",
        email: "system@example.com",
        isPinned: false,
        date: "Aug 30, 2025",
        department: "All",
      },
    ];
  };

  const handleReloadClick = () => {
    if (isReloading) return; // prevent multiple clicks
    setIsReloading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 1 second spin animation before reload
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const listRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setActiveTab("all");
      return;
    }

    // Check filtered messages to decide which tab to activate
    const lowerSearch = value.toLowerCase();

    // Filter messages based on search including department, subject, sender
    const searchFiltered = messages.filter((msg) => {
      return (
        msg.subject.toLowerCase().includes(lowerSearch) ||
        msg.sender.toLowerCase().includes(lowerSearch) ||
        (msg.department && msg.department.toLowerCase().includes(lowerSearch))
      );
    });

    // Decide tab based on filtered results
    if (searchFiltered.length === 0) {
      setActiveTab("all"); // no results, fallback to all
    } else if (searchFiltered.every((msg) => msg.isPinned)) {
      setActiveTab("pinned");
    } else if (
      searchFiltered.some((msg) => msg.department && msg.department !== "All")
    ) {
      setActiveTab("department");
    } else {
      setActiveTab("all");
    }
  };

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

  useEffect(() => {
    if (count === 0) {
      setCount(1);
    }
  }, [count]);
  // 💾 Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem("inboxMessages", JSON.stringify(messages));
  }, [messages]);

  // Dynamically adjust page size based on height
  useEffect(() => {
    if (!listRef.current) return;

    const observedElement = listRef.current;

    const calculateVisibleItems = () => {
      const itemElements = observedElement.querySelectorAll(
        ".inbox-message-item"
      );
      if (!itemElements.length) return;

      const containerHeight = observedElement.clientHeight;
      const itemHeight = itemElements[0].offsetHeight;
      const visibleCount = Math.floor(containerHeight / itemHeight);

      setPageSize(visibleCount > 0 ? visibleCount : 10);
    };

    const resizeObserver = new ResizeObserver(calculateVisibleItems);
    resizeObserver.observe(observedElement);

    // Initial calculation after messages render
    setTimeout(calculateVisibleItems, 100);

    return () => {
      resizeObserver.disconnect();
    };
  }, [messages]);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter messages based on activeTab
  const filteredMessages = messages.filter((msg) => {
    if (activeTab === "department") {
      if (!msg.department || msg.department === "All") return false;
    } else if (activeTab === "all") {
      if (msg.department !== "All") return false;
    } else if (activeTab === "pinned") {
      if (!msg.isPinned) return false;
    }

    if (searchTerm.trim() === "") return true;
    const lowerSearch = searchTerm.toLowerCase();
    return (
      msg.subject.toLowerCase().includes(lowerSearch) ||
      msg.sender.toLowerCase().includes(lowerSearch) ||
      (msg.department && msg.department.toLowerCase().includes(lowerSearch))
    );
  });

  const currentIndex = selectedMessage
    ? filteredMessages.findIndex((m) => m.id === selectedMessage.id)
    : 0;

  const handleMessageClick = (msg) => setSelectedMessage(msg);
  const handleBackToList = () => setSelectedMessage(null);
  const handleComposeOpen = () => setIsComposeOpen(true);
  const handleComposeClose = () => setIsComposeOpen(false);

  const handleComposeChange = (field, value) =>
    setComposeData({ ...composeData, [field]: value });

  const handleSend = () => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      subject: composeData.subject,
      content: composeData.message,
      email: "you@example.com",
      isPinned: false,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      department: composeData.department || "All",
    };
    setMessages([newMessage, ...messages]);
    setIsComposeOpen(false);
    setComposeData({ subject: "", message: "", department: "" });
    api.success(
      {
        message: "Success!",
        description: "Your message has been posted successfully.",
        placement: "topRight",
        duration: 4,
      },
      []
    );
  };

  const handleDelete = (id) => {
    const deletedMsg = messages.find((msg) => msg.id === id);

    setMessages(messages.filter((msg) => msg.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);

    api.warning({
      message: "Message deleted",
      description: `The message "${deletedMsg?.subject}" has been deleted.`,
      placement: "topRight",
    });
  };

  const handleTogglePin = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg
      )
    );

    const toggledMsg = messages.find((msg) => msg.id === id);
    const action = toggledMsg?.isPinned ? "unpinned" : "pinned";

    api.info({
      message: `Message ${action}`,
      description: `The message "${toggledMsg?.subject}" has been ${action}.`,
      placement: "topRight",
    });
  };

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full h-[88vh] flex flex-col">
      {contextHolder}
      <Card
        className="shadow-xl border-0 rounded-xl overflow-hidden flex flex-col w-full h-full 
                   [&>.ant-card-body]:flex [&>.ant-card-body]:flex-col 
                   [&>.ant-card-body]:h-full [&>.ant-card-body]:p-0"
      >
        {!selectedMessage ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0 gap-4">
              {/* Tabs */}
              <div className="flex border-b-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 cursor-pointer ${
                      activeTab === tab.key
                        ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Right side: Reload, Search, Post */}
              <div className="flex items-center gap-3">
                <Button
                  icon={<SyncOutlined spin={isReloading} />}
                  onClick={handleReloadClick}
                  title="Reload messages"
                  className="border border-gray-300 hover:border-gray-400"
                />
                <Input.Search
                  placeholder="Search messages"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  allowClear
                  className="w-64"
                  enterButton={false}
                />
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleComposeOpen}
                  className="bg-indigo-600 hover:bg-indigo-700 border-0"
                >
                  Post
                </Button>
              </div>
            </div>

            {/* Messages List */}
            <div ref={listRef} className="flex-3 overflow-hidden bg-white">
              {paginatedMessages.map((msg) => (
<div
  key={msg.id}
  className={`inbox-message-item flex px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 
    ${msg.sender === "You" ? "justify-end" : "justify-start"}`} // Conditionally apply justify-end for user messages
>
  <div
    onClick={() => handleMessageClick(msg)}
    className={`flex items-center gap-4 cursor-pointer ${msg.sender === "You" ? "flex-row-reverse" : ""}`} // Flip content for user messages
  >
    {msg.sender !== "You" && (
      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <Text className="font-medium text-gray-900 text-sm">
          {msg.sender}
        </Text>
        {msg.isPinned && (
          <PushpinOutlined className="text-orange-500 text-xs" />
        )}
      </div>
      <Text className="text-gray-700 text-sm block truncate">
        {msg.subject}
        {msg.department && (
          <span className="ml-2 text-xs text-blue-500">
            [{msg.department}]
          </span>
        )}
      </Text>
    </div>
  </div>

  <div className="flex items-center gap-2">
    <span className="text-gray-500 text-sm">
      {msg?.date || "No Date"}
    </span>
    {msg.sender !== "You" && (
      <>
        <Button
          type="text"
          icon={<PushpinOutlined />}
          onClick={() => handleTogglePin(msg.id)}
          className={`${
            msg.isPinned ? "text-orange-500" : "text-gray-400"
          }`}
        />
        <Popconfirm
          title="Delete this message?"
          onConfirm={() => handleDelete(msg.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-red-400"
          />
        </Popconfirm>
      </>
    )}
  </div>
</div>

              ))}
            </div>

            {/* Pagination */}
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
          // Message Detail
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  onClick={handleBackToList}
                  className="text-gray-500 hover:text-gray-700"
                />
                <Button
                  type="text"
                  icon={<PushpinOutlined />}
                  onClick={() => handleTogglePin(selectedMessage.id)}
                  className={`${
                    selectedMessage.isPinned
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-orange-500"
                  }`}
                />
                <Popconfirm
                  title="Delete this message?"
                  onConfirm={() => handleDelete(selectedMessage.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    className="text-gray-500 hover:text-red-500"
                  />
                </Popconfirm>
                <Button
                  type="text"
                  icon={<ClockCircleOutlined />}
                  className="text-gray-500 hover:text-gray-700"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  {currentIndex + 1} of {filteredMessages.length}
                </span>
                <Button type="text" icon={<LeftOutlined />} size="small" />
                <Button type="text" icon={<RightOutlined />} size="small" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <div className="flex items-start gap-4">
                  <Avatar
                    size={48}
                    className="bg-gray-400 text-white font-medium"
                  >
                    {selectedMessage.sender.charAt(0)}
                  </Avatar>
                  <div className="flex-1">
                    <Title level={4} className="!mb-0 !text-lg font-semibold">
                      {selectedMessage.sender}
                    </Title>
                    <Text className="text-sm text-gray-500 block mb-1">
                      {selectedMessage.email}
                    </Text>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Text className="text-sm text-gray-500 block mb-1">
                  Subject:
                </Text>
                <Title level={4} className="!mb-0 !text-base font-semibold">
                  {selectedMessage.subject}
                </Title>
                {/* ✅ Show Department Info */}
                <Text className="text-sm text-blue-600 font-medium">
                  {selectedMessage.department === "All"
                    ? "For All Departments"
                    : `For ${selectedMessage.department}`}
                </Text>
              </div>

              <div className="mb-6 text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedMessage.content}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  icon={<EyeOutlined />}
                  className="text-gray-600 hover:text-blue-600"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Compose Modal */}
      <Modal
  open={isComposeOpen}
  onCancel={handleComposeClose}
  footer={null}
  width={800}
  closable={true}
  closeIcon={<CloseOutlined />}
  centered
>
  <div className="p-6">
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Subject
      </label>
      <Input
        placeholder="Enter subject"
        value={composeData.subject}
        onChange={(e) => handleComposeChange("subject", e.target.value)}
        className="flex-1 text-base"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Department
      </label>
      <Select
        placeholder="Select department"
        value={composeData.department}
        onChange={(value) => handleComposeChange("department", value)}
        className="w-full"
      >
        {departments.map((dept) => (
          <Option key={dept} value={dept}>
            {dept}
          </Option>
        ))}
      </Select>
    </div>
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Message
      </label>
      <TextArea
        placeholder="Type your message here..."
        value={composeData.message}
        onChange={(e) => handleComposeChange("message", e.target.value)}
        rows={10}
        className="w-full border rounded-lg p-4 resize-none text-base"
      />
    </div>

    {/* Add Image, Add Document, Add Event, Add Links */}
    <div className="flex gap-4 mt-4">
      <Button
        icon={<CameraOutlined />}
        onClick={() => handleAddAttachment("picture")}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
      >
        Add Image
      </Button>
      <Button
        icon={<FileTextOutlined />}
        onClick={() => handleAddAttachment("document")}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
      >
        Add Document
      </Button>
      <Button
        icon={<LinkOutlined />}
        onClick={() => handleAddAttachment("link")}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
      >
        Add Links
      </Button>
      <Button
        icon={<CalendarOutlined />}
        onClick={() => handleAddAttachment("event")}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
      >
        Add Event
      </Button>
    </div>

    <div className="flex items-center justify-end gap-3 mt-4">
      <Button
        onClick={handleSend}
        type="primary"
        icon={<SendOutlined />}
        disabled={
          !composeData.subject ||
          !composeData.message ||
          !composeData.department
        }
        className="bg-indigo-600 hover:bg-indigo-700 border-0"
      >
        Post Message
      </Button>
    </div>
  </div>
</Modal>
    </div>
  );
};

export default InboxInterface;
