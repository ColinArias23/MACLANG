import React, { useState } from "react";
import { Card, Avatar, Button, Typography, Modal, Input, Select } from "antd";
import {
  InboxOutlined,
  GlobalOutlined,
  PushpinOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  StarOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
  SendOutlined,
  CloseOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  LinkOutlined,
  FileTextOutlined,
  CalendarOutlined,
  MoreOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function InboxInterface() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const announcements = [
    {
      id: 1,
      sender: "Sharmaine Dy Banquiles",
      email: "sharmaine@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: true,
      content: `Hi,

We are delighted to welcome all employees to the official RMBGH Intranet — your one-stop digital workplace. This platform is designed to make communication, collaboration, and access to important resources easier than ever before.

Here, you will find company announcements, policies, forms, and updates all in one convenient location. The intranet also provides tools that will help you stay informed about upcoming events, internal programs, and organizational changes.

More than just a communication channel, the RMBGH Intranet is a space for collaboration and knowledge sharing. Whether you are looking for quick access to HR resources, staying up to date with departmental news, or connecting with colleagues across teams, this platform is built with you in mind.`,
    },
    {
      id: 2,
      sender: "Colin Arias",
      email: "colin@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: false,
      content: `Dear Team,

Welcome to our new digital workplace! This intranet portal will serve as your central hub for all company communications and resources.

Please take some time to explore the various features and let us know if you have any questions.

Best regards,
Colin Arias`,
    },
    {
      id: 3,
      sender: "Announcement 1",
      email: "announcements@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: false,
      content: "System announcement regarding the new intranet portal launch.",
    },
    {
      id: 4,
      sender: "Announcement 2",
      email: "announcements@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: false,
      content: "Additional information about the intranet portal features.",
    },
    {
      id: 5,
      sender: "Announcement 3",
      email: "announcements@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: false,
      content: "Guidelines for using the new intranet portal effectively.",
    },
    {
      id: 6,
      sender: "Announcement 4",
      email: "announcements@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: false,
      content: "Training schedule for the new intranet portal.",
    },
    {
      id: 7,
      sender: "Announcement 5",
      email: "announcements@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: false,
      content: "FAQ section for the intranet portal.",
    },
    {
      id: 8,
      sender: "Announcement 6",
      email: "announcements@rmbgh.com",
      subject: "Welcome to RMBGH Intranet Portal!",
      date: "Aug 29",
      isPinned: false,
      content: "Technical support information for the intranet portal.",
    },
  ];

  const tabs = [
    { key: "Direct", label: "Direct", icon: <InboxOutlined /> },
    { key: "All", label: "All", icon: <GlobalOutlined /> },
    { key: "Pinned", label: "Pinned", icon: <PushpinOutlined /> },
  ];

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (activeTab === "Pinned") return announcement.isPinned;
    return true;
  });

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  const handleComposeOpen = () => {
    setIsComposeOpen(true);
  };

  const handleComposeClose = () => {
    setIsComposeOpen(false);
    setComposeData({ to: "", subject: "", message: "" });
  };

  const handleComposeChange = (field, value) => {
    setComposeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSend = () => {
    console.log("Sending message:", composeData);
    handleComposeClose();
  };

  const currentIndex = selectedMessage
    ? announcements.findIndex((a) => a.id === selectedMessage.id)
    : -1;
  const totalMessages = announcements.length;

  return (
    <div className="h-screen w-full overflow-y-hidden p-2 bg-blue-200">
      <div>
        <Card
          className={`shadow-xl border-0 rounded-xl overflow-auto scrollbar-hide bg-white flex flex-col ${
            selectedMessage ? "h-157 mx-4" : "h-157"
          }`}
        >
          {!selectedMessage ? (
            // Message List View
            <>
              {/* Header with Compose Button */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <div className="flex border-b-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 px-6 py-2 font-medium transition-all duration-200 cursor-pointer ${
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
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleComposeOpen}
                  className="bg-indigo-600 hover:bg-indigo-700 border-0"
                >
                  Compose
                </Button>
              </div>

              {/* Announcements List */}
              <div className="bg-white flex-1 overflow-y-auto">
                {filteredAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    onClick={() => handleMessageClick(announcement)}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Blue notification dot */}
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Text className="font-medium text-gray-900 text-sm">
                            {announcement.sender}
                          </Text>
                          {announcement.isPinned && (
                            <PushpinOutlined className="text-orange-500 text-xs" />
                          )}
                        </div>
                        <Text className="text-gray-700 text-sm block truncate">
                          {announcement.subject}
                        </Text>
                      </div>
                    </div>

                    <div className="text-gray-500 text-sm ml-4">
                      {announcement.date}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Message Detail View
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
                    icon={<StarOutlined />}
                    className="text-gray-500 hover:text-yellow-500"
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    className="text-gray-500 hover:text-red-500"
                  />
                  <Button
                    type="text"
                    icon={<ClockCircleOutlined />}
                    className="text-gray-500 hover:text-gray-700"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>
                    {currentIndex + 1} of {totalMessages}
                  </span>
                  <Button type="text" icon={<LeftOutlined />} size="small" />
                  <Button type="text" icon={<RightOutlined />} size="small" />
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                  <div className="flex items-start gap-4">
                    <Avatar
                      size={48}
                      className="bg-gray-400 text-white font-medium flex-shrink-0"
                    >
                      {selectedMessage.sender.charAt(0)}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Title
                          level={4}
                          className="!mb-0 !text-lg font-semibold text-gray-900"
                        >
                          {selectedMessage.sender}
                        </Title>
                      </div>
                      <Text className="text-sm text-gray-500 block mb-1">
                        {selectedMessage.email}
                      </Text>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Text>To:</Text>
                        <Text>All</Text>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <Text className="text-sm text-gray-500 block mb-1">
                    Subject
                  </Text>
                  <Title
                    level={4}
                    className="!mb-0 !text-base font-semibold text-gray-900"
                  >
                    {selectedMessage.subject}
                  </Title>
                </div>

                {/* Message Content */}
                <div className="mb-6">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedMessage.content}
                  </div>
                </div>

                {/* Forward Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    icon={<ShareAltOutlined />}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Forward
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
          width={1000}
          closable={true}
          closeIcon={<CloseOutlined />}
          className="compose-modal-custom"
          centered
        >
          <div className="p-6">
            {/* To Field */}
            <div className="mb-4">
              <div className="flex items-center gap-4 py-4 border-b border-gray-200">
                <label className="text-sm text-gray-600 w-20 flex-shrink-0 font-medium">
                  Send to
                </label>
                <div className="flex gap-2 flex-wrap flex-1">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-500 text-white shadow-sm">
                    sharmainedybanquiles@example.com
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-500 text-white shadow-sm">
                    colinarias@example.com
                  </span>
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="mb-4">
              <div className="flex items-center gap-4 py-4 border-b border-gray-200">
                <label className="text-sm text-gray-600 w-20 flex-shrink-0 font-medium">
                  Subject
                </label>
                <Input
                  placeholder="Enter subject"
                  value={composeData.subject}
                  onChange={(e) =>
                    handleComposeChange("subject", e.target.value)
                  }
                  className="flex-1 border-0 p-0 focus:shadow-none text-base"
                  style={{ boxShadow: "none" }}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <TextArea
                placeholder="Type your message here..."
                value={composeData.message}
                onChange={(e) => handleComposeChange("message", e.target.value)}
                rows={12}
                className="w-full border-2 border-gray-200 rounded-lg p-4 resize-none focus:border-blue-400 transition-all text-base"
                style={{ outline: "none", boxShadow: "none" }}
              />
            </div>

            {/* Formatting and Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              {/* Text Formatting and Attachments */}
              <div className="flex items-center gap-2">
                {/* Text Formatting */}
                <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white hover:bg-gray-600 text-gray-700 hover:text-white shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer">
                  <BoldOutlined className="text-base" />
                </button>
                <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white hover:bg-gray-600 text-gray-700 hover:text-white shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer">
                  <ItalicOutlined className="text-base" />
                </button>
                <button className="w-9 h-9 rounded-lg border border-gray-300 bg-white hover:bg-gray-600 text-gray-700 hover:text-white shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer">
                  <UnderlineOutlined className="text-base" />
                </button>

                {/* Divider */}
                <div className="w-px h-8 bg-gray-300 mx-3"></div>

                {/* Attachment Options */}
                <button className="h-9 px-3 rounded-lg border border-orange-200 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer">
                  <PictureOutlined className="text-base" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="h-9 px-3 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-500 text-purple-600 hover:text-white shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer">
                  <PlayCircleOutlined className="text-base" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button className="h-9 px-3 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer">
                  <LinkOutlined className="text-base" />
                  <span className="text-sm font-medium">Link</span>
                </button>
                <button className="h-9 px-3 rounded-lg border border-green-200 bg-green-50 hover:bg-green-500 text-green-600 hover:text-white shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer">
                  <FileTextOutlined className="text-base" />
                  <span className="text-sm font-medium">Document</span>
                </button>
                <button className="h-9 px-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer">
                  <CalendarOutlined className="text-base" />
                  <span className="text-sm font-medium">Event</span>
                </button>
              </div>

              {/* More Options and Send */}
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 hover:bg-red-500 text-gray-500 hover:text-white shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer">
                  <DeleteOutlined className="text-base" />
                </button>
                <button className="w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-500 text-gray-500 hover:text-white shadow-sm transition-all duration-200 flex items-center justify-center cursor-pointer">
                  <MoreOutlined className="text-base" />
                </button>
                <Button
                  type="primary"
                  onClick={handleSend}
                  disabled={!composeData.subject || !composeData.message}
                  className="bg-indigo-600 hover:bg-indigo-700 border-0 ml-2 px-6 h-10 rounded-lg shadow-lg hover:shadow-xl transition-all text-white font-medium"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default InboxInterface;
