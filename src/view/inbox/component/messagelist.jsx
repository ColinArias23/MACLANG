import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({
  messages,
  onSelectMessage,
  onDelete,
  onTogglePin,
  listRef,
}) => {
  return (
    <div ref={listRef} className="flex-1 overflow-hidden bg-white">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          onSelect={() => onSelectMessage(msg)}
          onDelete={() => onDelete(msg.id)}
          onTogglePin={() => onTogglePin(msg.id)}
        />
      ))}
    </div>
  );
};

export default MessageList;
