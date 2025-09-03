import React from "react";
import { Card, Typography, Button } from "antd";
import {
  ArrowLeftOutlined,
  PushpinOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../shared/layout/components/sidebar";
import Content from "../../shared/layout/components/content";

const { Title, Paragraph, Text } = Typography;

const AnnouncementDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const announcement = location.state?.announcement;

 
  
  if (!announcement) {
     const [isCollapsed, setIsCollapsed] = useState(false);
    return (
      <div className="flex h-screen bg-[#1F3BAE]">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <Content>
          <div className="flex items-center justify-center h-full">
            <Text type="secondary">No announcement found.</Text>
          </div>
        </Content>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar />
      <Content>
        <div className="flex-1 p-6 overflow-y-auto">
          {/* widened box + padding */}
          <Card className="max-w-9xl w-full h-[90vh] mx-auto p-8 shadow-md flex flex-col">
            {/* Gmail-style top actions */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
              {/* Left icons */}
              <div className="flex items-center gap-6">
                <ArrowLeftOutlined
                  className="text-xl cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(-1)}
                />
                <PushpinOutlined className="text-xl cursor-pointer hover:text-blue-600" />
                <DeleteOutlined className="text-xl cursor-pointer hover:text-red-600" />
                <ExclamationCircleOutlined className="text-xl cursor-pointer hover:text-yellow-600" />
              </div>

              {/* Right pagination */}
              <div className="flex items-center gap-3 text-gray-600">
                <Text type="secondary">1 of 1,000</Text>
                <LeftOutlined className="cursor-pointer hover:text-blue-600" />
                <RightOutlined className="cursor-pointer hover:text-blue-600" />
              </div>
            </div>

            {/* Sender info */}
            <div className="mb-6">
              <Text strong>{announcement.author}</Text>
              <br />
              <Text type="secondary">
                {announcement.author.toLowerCase().replace(/\s+/g, ".")}
                @example.com
              </Text>
              <br />
              <Text type="secondary">Date: {announcement.date}</Text>
              <br />
              <Text type="secondary">
                To:{" "}
                {announcement.recipients
                  ? announcement.recipients.length === 1
                    ? "You"
                    : announcement.isAll
                    ? "All"
                    : announcement.recipients.join(", ")
                  : "All"}
              </Text>
            </div>

            {/* Divider before subject */}
            <div className="border-t border-gray-300 my-4" />

            {/* Subject */}
            <Title level={3} className="mb-4">
              <Text type="secondary" className="font-normal mr-4 text-2xl">
                Subject:
              </Text>
              {announcement.title}
            </Title>

            {/* Scrollable body */}
            <div className="overflow-y-auto max-h-[50vh] pr-2 flex-1 border-t border-gray-300 pt-4">
              <Typography>
                <Paragraph>Hi,</Paragraph>
                <Paragraph>
                  This is a sample detail page for{" "}
                  <Text strong>{announcement.title}</Text>. You can replace this
                  placeholder text with the actual announcement body fetched
                  from your backend or database. If this message is very long,
                  this section will scroll independently without moving the
                  header and footer.
                </Paragraph>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sollicitudin, ligula nec gravida ultrices, ligula justo
                  volutpat risus, at euismod elit odio sit amet purus. Aenean
                  suscipit, nunc vel aliquet tristique, purus justo tincidunt
                  lacus, vitae malesuada tortor nunc nec velit. Praesent ac
                  sollicitudin purus, vel consequat mi. Donec vel venenatis
                  nulla, vel tincidunt turpis.
                </Paragraph>
              </Typography>
            </div>

            {/* Footer actions */}
            {/* <div className="pt-4 mt-4 border-t border-gray-300">
              <Button icon={<ShareAltOutlined />}>Forward</Button>
            </div> */}
          </Card>
        </div>
      </Content>
    </div>
  );
};

export default AnnouncementDetail;
