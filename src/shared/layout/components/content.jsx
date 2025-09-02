import React, { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Input,
  Space,
  Typography,
  Badge,
  Divider,
  Tag,
  Modal,
} from "antd";
import {
  PictureOutlined,
  VideoCameraOutlined,
  LinkOutlined,
  FileTextOutlined,
  CalendarOutlined,
  PushpinOutlined,
  MoreOutlined,
  EyeOutlined,
  ShareAltOutlined,
  SendOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { TextArea } = Input;

function Content() {
  const [postContent, setPostContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);
  const [forwardTo, setForwardTo] = useState("");

  const announcements = [
    {
      id: 1,
      author: "Sharmaine Dy Banquiles",
      role: "General",
      title: "Welcome to RMBGH Intranet Portal",
      content:
        "We're glad to have you here. This platform is designed to keep you connected, informed, and empowered.\n\nThrough the intranet, you can easily access company updates, announcements, resources, and tools to support your work every day.\n\nTake a moment to explore the features available and stay engaged with the latest happenings at RMBGH. Together, let's continue building a workplace that thrives on collaboration, innovation, and excellence.\n\nYour journey with RMBGH starts here—welcome aboard!",
      isPinned: true,
      hasViewPost: true,
      date: "Aug 29, 2024  9:00 AM",
      subject: "Welcome to RMBGH Intranet Portal",
    },
    {
      id: 2,
      author: "Colin Arias",
      role: "General",
      title: "The Purpose of the RMBGH Intranet",
      content:
        "The RMBGH Intranet has been launched to serve as the central hub for all employees. This platform will streamline communication, enhance collaboration, and provide easy access to important company resources.\n\nKey features include:\n- Real-time announcements and updates\n- Document sharing and collaboration\n- Employee directory and contact information\n- Project management tools\n- Knowledge base and FAQs\n\nWe encourage all team members to actively participate and make the most of this new communication platform.",
      isPinned: true,
      hasViewPost: true,
      date: "Aug 28, 2024  2:30 PM",
      subject: "The Purpose of the RMBGH Intranet",
    },
    {
      id: 3,
      author: "Firstname Lastname",
      role: "General",
      title: "Support Activity",
      content:
        "Please contact IT support for any technical issues or assistance needed with the new intranet portal. Our support team is available Monday to Friday, 8:00 AM to 5:00 PM.",
      isPinned: false,
      hasViewPost: true,
      date: "Aug 27, 2024  10:15 AM",
      subject: "Support Activity",
    },
  ];

  const posts = [
    {
      id: 1,
      author: "Colin Arias",
      role: "IT Admin",
      date: "Aug 30, 2024  5:00 AM",
      subject: "The Purpose of RMBGH Intranet",
      content:
        "We're glad to have you here. This platform is designed to keep you connected, informed, and empowered.\n\nThrough the intranet, you can easily access company updates, announcements, resources, and tools to support your work every day.\n\nTake a moment to explore the features available and stay engaged with the latest happenings at RMBGH. Together, let's continue building a workplace that thrives on collaboration, innovation, and excellence.\n\nYour journey with RMBGH starts here—welcome aboard!",
      isViewFullPost: true,
    },
  ];

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
    setIsReplying(false);
    setIsForwarding(false);
    setReplyContent("");
    setForwardTo("");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedPost(null);
    setIsReplying(false);
    setIsForwarding(false);
    setReplyContent("");
    setForwardTo("");
  };

  const handleReply = () => {
    setIsReplying(true);
    setIsForwarding(false);
  };

  const handleForward = () => {
    setIsForwarding(true);
    setIsReplying(false);
  };

  const handleSendReply = () => {
    console.log("Sending reply:", replyContent);
    setReplyContent("");
    setIsReplying(false);
  };

  const handleSendForward = () => {
    console.log("Forwarding to:", forwardTo);
    setForwardTo("");
    setIsForwarding(false);
  };

  return (
    <div className="flex-1 p-6 ml-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6 flex flex-col gap-4">
            <Card className="shadow-lg border-0">
              <div className="flex gap-3">
                <Avatar
                  size={48}
                  src="https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=U"
                  className="flex-shrink-0"
                />
                <div className="flex-1">
                  <TextArea
                    placeholder="Create Announcement"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="border-0 shadow-none resize-none"
                    style={{ backgroundColor: "transparent" }}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />

                  <div className="flex items-center justify-between mt-4">
                    <Space size={16}>
                      <Button
                        type="text"
                        icon={<PictureOutlined />}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        size="small"
                      >
                        Photo
                      </Button>
                      <Button
                        type="text"
                        icon={<VideoCameraOutlined />}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        size="small"
                      >
                        Video
                      </Button>
                      <Button
                        type="text"
                        icon={<LinkOutlined />}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        size="small"
                      >
                        Link
                      </Button>
                      <Button
                        type="text"
                        icon={<FileTextOutlined />}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        size="small"
                      >
                        Document
                      </Button>
                      <Button
                        type="text"
                        icon={<CalendarOutlined />}
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        size="small"
                      >
                        Event
                      </Button>
                    </Space>

                    <Button
                      type="primary"
                      className="bg-blue-600 hover:bg-blue-700 border-blue-600"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {posts.map((post) => (
              <Card key={post.id} className="shadow-lg border-0">
                <div className="flex gap-3">
                  <Avatar
                    size={48}
                    src="https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=CA"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <Text strong className="text-gray-900">
                          {post.author}
                        </Text>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                          <span>{post.role}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <Button
                        type="text"
                        icon={<MoreOutlined />}
                        className="text-gray-400"
                      />
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Text className="text-gray-600 text-sm">Sent To:</Text>
                        <Tag color="default" className="text-xs">
                          General
                        </Tag>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Text className="text-gray-600 text-sm">Subject:</Text>
                        <Text strong className="text-sm">
                          {post.subject}
                        </Text>
                      </div>
                    </div>

                    <div className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-line">
                      {post.content.length > 200
                        ? `${post.content.substring(0, 200)}...`
                        : post.content}
                    </div>

                    {post.isViewFullPost && (
                      <Button
                        type="link"
                        className="flex items-center gap-1 text-blue-600 text-sm p-0"
                        onClick={() => handleViewPost(post)}
                      >
                        <EyeOutlined />
                        <span>View Full Post</span>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card
              className="shadow-lg border-0"
              title={
                <div className="flex items-center gap-2 text-blue-600">
                  <PushpinOutlined />
                  <span>Pinned Announcement</span>
                </div>
              }
              headStyle={{
                borderBottom: "2px solid #3b82f6",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id}>
                    <div className="flex gap-3 mb-3">
                      <Avatar
                        size={32}
                        src={`https://via.placeholder.com/32x32/4F46E5/FFFFFF?text=${announcement.author.charAt(
                          0
                        )}`}
                        className="flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Text strong className="text-sm text-gray-900">
                            {announcement.author}
                          </Text>
                          <Button
                            type="text"
                            icon={<MoreOutlined />}
                            size="small"
                            className="text-gray-400"
                          />
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge color="gray" />
                          <Text className="text-xs text-gray-500">
                            {announcement.role}
                          </Text>
                        </div>
                      </div>
                    </div>

                    <div className="ml-11">
                      <Title
                        level={5}
                        className="text-gray-900 mb-2 !text-sm !font-semibold"
                      >
                        {announcement.title}
                      </Title>
                      {announcement.content && (
                        <Text className="text-xs text-gray-600 leading-relaxed">
                          {announcement.content.length > 100
                            ? `${announcement.content.substring(0, 100)}...`
                            : announcement.content}
                        </Text>
                      )}
                      {announcement.hasViewPost && (
                        <Button
                          type="link"
                          className="flex items-center gap-1 text-blue-600 text-xs mt-2 p-0"
                          onClick={() => handleViewPost(announcement)}
                        >
                          <EyeOutlined />
                          <span>View Post</span>
                        </Button>
                      )}
                    </div>

                    {announcement.id !==
                      announcements[announcements.length - 1].id && (
                      <Divider className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        className="post-modal"
        closeIcon={<CloseOutlined />}
      >
        {selectedPost && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar
                  size={48}
                  src={`https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=${selectedPost.author.charAt(
                    0
                  )}`}
                />
                <div>
                  <Text strong className="text-lg">
                    {selectedPost.subject || selectedPost.title}
                  </Text>
                  <div className="text-gray-500 text-sm">
                    From:{" "}
                    <span className="font-medium">{selectedPost.author}</span>
                    <span className="mx-2">•</span>
                    {selectedPost.date}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>
            </div>

            <div className="flex items-center gap-3 py-3 border-t">
              <Button
                icon={<SendOutlined />}
                onClick={handleReply}
                className={
                  isReplying ? "bg-blue-50 text-blue-600 border-blue-300" : ""
                }
              >
                Reply
              </Button>
              <Button
                icon={<ShareAltOutlined />}
                onClick={handleForward}
                className={
                  isForwarding ? "bg-blue-50 text-blue-600 border-blue-300" : ""
                }
              >
                Forward
              </Button>
            </div>

            {isReplying && (
              <div className="space-y-3 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Replying to:{" "}
                  <span className="font-medium">{selectedPost.author}</span>
                </div>
                <TextArea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendReply}
                    disabled={!replyContent.trim()}
                  >
                    Send Reply
                  </Button>
                  <Button onClick={() => setIsReplying(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {isForwarding && (
              <div className="space-y-3 pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2">Forward to:</div>
                <Input
                  placeholder="Enter recipient email or name..."
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <Button
                    type="primary"
                    icon={<ShareAltOutlined />}
                    onClick={handleSendForward}
                    disabled={!forwardTo.trim()}
                  >
                    Forward
                  </Button>
                  <Button onClick={() => setIsForwarding(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Content;
