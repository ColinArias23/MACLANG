import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const Footer = () => {
  return (
    <div className="text-center py-4">
      <Text className="text-sm text-gray-600">
        © 2025 IT Department. All rights reserved.
      </Text>
    </div>
  );
};

export default Footer;
