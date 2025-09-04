import React from "react";
import { Modal, Input, Select, Button } from "antd";
import { SendOutlined, CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const ComposeModal = ({ open, onClose, composeData, setComposeData, onSend, departments }) => {
  const handleChange = (field, value) => setComposeData({ ...composeData, [field]: value });

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={800} closable closeIcon={<CloseOutlined />} centered>
      <div className="p-6">
        <div className="mb-4">
          <Input
            placeholder="Enter subject"
            value={composeData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            className="flex-1 text-base"
          />
        </div>

        <div className="mb-4">
          <Select
            placeholder="Select department"
            value={composeData.department}
            onChange={(value) => handleChange("department", value)}
            className="w-full"
          >
            {departments.map((dept) => (
              <Option key={dept} value={dept}>{dept}</Option>
            ))}
          </Select>
        </div>

        <div className="mb-6">
          <TextArea
            placeholder="Type your message here..."
            value={composeData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            rows={10}
            className="w-full border rounded-lg p-4 resize-none text-base"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={onSend}
            type="primary"
            icon={<SendOutlined />}
            disabled={!composeData.subject || !composeData.message || !composeData.department}
            className="bg-indigo-600 hover:bg-indigo-700 border-0"
          >
            Post Message
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ComposeModal;
