import React, { useState } from 'react';
import Sidebar from '../../shared/layout/components/sidebar';
import Content from '../../shared/layout/components/content';
import {
  Tabs,
  List,
  Button,
  Modal,
  Input,
  Tag,
  Tooltip,
} from 'antd';
import {
  PushpinOutlined,
  PushpinFilled,
  PlusOutlined,
  DeleteOutlined,
  MoreOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  LinkOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;
const { TextArea } = Input;

const getCurrentDate = () => {
  const options = { month: 'short', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

const Users = () => {
  const navigate = useNavigate();
  const [directAnnouncements, setDirectAnnouncements] = useState([
    {
      
      author: 'Colin Arias',
      title: 'Welcome to RMBGH Intranet Portal',
      date: 'Aug 29',
      pinned: false,
      recipients: ['You'],
    },
    {
      author: 'Liam Santos',
      title: 'Update Your Emergency Contacts',
      date: 'Aug 28',
      pinned: false,
      recipients: ['You'],
    },
     {
      author: 'Liam Santos',
      title: 'Random',
      date: 'Aug 28',
      pinned: false,
      recipients: ['You'],
    },
    {
      author: 'Johnny Bravo',
      title: 'Update for PhilHealth Contributions',
      date: 'Aug 28',
      pinned: false,
      recipients: ['You'],
    },
  ]);
  const [allAnnouncements, setAllAnnouncements] = useState([
    {
      author: 'Sharmaine Dy Banquiles',
      title: 'Welcome to RMBGH Intranet Portal',
      date: 'Aug 29',
      pinned: false,
    },
    {
      author: 'Carlos Mendoza',
      title: 'Quarterly Company Update',
      date: 'Aug 28',
      pinned: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // Fix sendTo as an array of strings (tags)
  const [sendTo, setSendTo] = useState(['']); // Start with empty tag input
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const togglePinDirect = (item) => {
    const updated = directAnnouncements.map((a) =>
      a.title === item.title ? { ...a, pinned: !a.pinned } : a
    );
    setDirectAnnouncements(updated);
  };

  const togglePinAll = (item) => {
    const updated = allAnnouncements.map((a) =>
      a.title === item.title ? { ...a, pinned: !a.pinned } : a
    );
    setAllAnnouncements(updated);
  };

  const handleAnnouncementClick = (announcement) => {
    navigate(`/announcement/${encodeURIComponent(announcement.title)}`, {
      state: { announcement },
    });
  };

  // Remove a recipient tag
  const handleCloseTag = (removedTag) => {
    setSendTo(sendTo.filter((tag) => tag !== removedTag));
  };

  // Add recipient when user presses Enter in input
  const handleAddRecipient = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      if (!sendTo.includes(e.target.value.trim())) {
        setSendTo([...sendTo, e.target.value.trim()]);
      }
      e.target.value = '';
      e.preventDefault();
    }
  };

  const handleSendMessage = () => {
    const recipients =
      sendTo.length === 0 || (sendTo.length === 1 && sendTo[0] === '')
        ? ['All']
        : sendTo;

    const newAnnouncement = {
      author: 'You',
      title: subject,
      date: getCurrentDate(),
      pinned: false,
      recipients,
    };

    if (recipients.includes('All')) {
      setAllAnnouncements([newAnnouncement, ...allAnnouncements]);
    } else {
      setDirectAnnouncements([newAnnouncement, ...directAnnouncements]);
    }

    setSendTo([]);
    setSubject('');
    setMessage('');
    setIsModalVisible(false);
  };
const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Content>
        <div className="flex flex-col">
          <div className="pb-0 border-b border-gray-300">
            <div className="flex justify-center items-center">
              <Tabs defaultActiveKey="1" centered tabBarGutter={700}>
                <TabPane tab="Direct" key="1">
                  <AnnouncementList
                    announcements={directAnnouncements}
                    togglePin={togglePinDirect}
                    header="Direct Announcement"
                    onItemClick={handleAnnouncementClick}
                  />
                </TabPane>

                <TabPane tab="All Announcement" key="2">
                  <AnnouncementList
                    announcements={allAnnouncements}
                    togglePin={togglePinAll}
                    header="All Announcement"
                    onItemClick={handleAnnouncementClick}
                  />
                </TabPane>

                <TabPane tab="Pinned" key="3">
                  <AnnouncementList
                    announcements={[
                      ...directAnnouncements
                        .filter((item) => item.pinned)
                        .map((item) => ({ ...item, source: 'direct' })),
                      ...allAnnouncements
                        .filter((item) => item.pinned)
                        .map((item) => ({ ...item, source: 'all' })),
                    ]}
                    togglePin={(itemToUnpin) => {
                      if (itemToUnpin.source === 'direct') {
                        const updated = directAnnouncements.map((a) =>
                          a.title === itemToUnpin.title ? { ...a, pinned: false } : a
                        );
                        setDirectAnnouncements(updated);
                      } else if (itemToUnpin.source === 'all') {
                        const updated = allAnnouncements.map((a) =>
                          a.title === itemToUnpin.title ? { ...a, pinned: false } : a
                        );
                        setAllAnnouncements(updated);
                      }
                    }}
                    header="Pinned"
                    onItemClick={handleAnnouncementClick}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>

          {/* Floating Plus Button */}
          <div className="fixed bottom-16 right-8 z-50 pr-12">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              className="shadow-lg"
              onClick={() => setIsModalVisible(true)}
            />
          </div>

          <Modal
            title={null}
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={700}
            bodyStyle={{ padding: '24px 32px 32px' }}
          >
            {/* Send To */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
              >
                Send to
              </label>
              <div
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                  padding: 8,
                  minHeight: 40,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                {sendTo
                  .filter((tag) => tag.trim() !== '')
                  .map((email) => (
                    <Tag
                      key={email}
                      closable
                      onClose={() => handleCloseTag(email)}
                      style={{ userSelect: 'text' }}
                    >
                      {email}
                    </Tag>
                  ))}
                <Input
                  bordered={false}
                  placeholder="Add recipient and press Enter"
                  style={{ flex: 1, minWidth: 120 }}
                  onKeyDown={handleAddRecipient}
                />
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
              >
                Subject
              </label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                style={{ fontWeight: 500 }}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}
              >
                Message
              </label>
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                placeholder="Type your message..."
                style={{ resize: 'vertical' }}
              />
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  paddingTop: 12,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <Tooltip title="Photo">
                  <Button
                    type="text"
                    icon={<PictureOutlined style={{ color: '#52c41a' }} />}
                  >
                    Photo
                  </Button>
                </Tooltip>
                <Tooltip title="Video">
                  <Button
                    type="text"
                    icon={<VideoCameraOutlined style={{ color: '#722ed1' }} />}
                  >
                    Video
                  </Button>
                </Tooltip>
                <Tooltip title="Link">
                  <Button
                    type="text"
                    icon={<LinkOutlined style={{ color: '#1890ff' }} />}
                  >
                    Link
                  </Button>
                </Tooltip>
                <Tooltip title="Document">
                  <Button
                    type="text"
                    icon={<FileTextOutlined style={{ color: '#a8a6a6ff' }} />}
                  >
                    Document
                  </Button>
                </Tooltip>
                <Tooltip title="Event">
                  <Button
                    type="text"
                    icon={<CalendarOutlined style={{ color: '#fa8c16' }} />}
                  >
                    Event
                  </Button>
                </Tooltip>
              </div>
            </div>

            {/* Footer Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {/* <Button
                danger
                icon={<DeleteOutlined />}
                style={{ marginRight: 'auto' }}
                onClick={() => {
                  setSendTo([]);
                  setSubject('');
                  setMessage('');
                }}
              /> */}
              <Button icon={<MoreOutlined />} />
              <Button type="primary" onClick={handleSendMessage}>
                Send Message
              </Button>
            </div>
          </Modal>
        </div>
      </Content>
    </div>
  );
};

// AnnouncementList component remains unchanged
const AnnouncementList = ({ announcements, togglePin, header, onItemClick }) => {
  return (
    <div className="pb-3 h-[calc(100vh-220px)] overflow-y-auto">
      <div className="font-semibold text-sm text-gray-500 mb-6">{header}</div>
      <List
        itemLayout="horizontal"
        dataSource={announcements}
        renderItem={(item) => (
          <List.Item
            className="hover:bg-gray-50 rounded-md px-4 py-2 cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            <div className="flex w-full items-center">
              <div className="w-1/3 flex items-center space-x-2 text-sm text-gray-700">
                {item.pinned ? (
                  <PushpinFilled
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(item);
                    }}
                    className="text-base cursor-pointer text-black transition duration-200"
                  />
                ) : (
                  <PushpinOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(item);
                    }}
                    className="text-base cursor-pointer text-gray-400 transition duration-200"
                  />
                )}
                <span>{item.author}</span>
              </div>

              <div className="w-1/3 font-semibold text-sm text-black">{item.title}</div>
              <div className="w-1/3 text-right text-sm text-gray-500">{item.date}</div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Users;
