import React, { useState } from "react";

// Sample departments and messages data with static users and timestamps
const departmentsData = [
  {
    id: 1,
    name: "Customer Relations Management",
    messages: [
      { 
        id: 1, 
        text: "Hello CRM team!", 
        user: "John Doe", 
        timestamp: new Date('2025-09-05T10:30:00'), // Static date and time
        department: "Customer Relations Management",
        readBy: [] // List of users who have read this message
      },
      { 
        id: 2, 
        text: "Please submit your reports by end of the week.", 
        user: "Jane Smith", 
        timestamp: new Date('2025-09-05T11:00:00'), // Static date and time
        department: "Customer Relations Management",
        readBy: [] // List of users who have read this message
      },
    ],
  },
  {
    id: 2,
    name: "Accounting Department",
    messages: [
      { 
        id: 1, 
        text: "Finance reports due today.", 
        user: "Robert Brown", 
        timestamp: new Date('2025-09-05T09:30:00'), // Static date and time
        department: "Accounting Department",
        readBy: [] // List of users who have read this message
      },
      { 
        id: 2, 
        text: "Meeting at 3 PM.", 
        user: "Alice Green", 
        timestamp: new Date('2025-09-05T09:45:00'), // Static date and time
        department: "Accounting Department",
        readBy: [] // List of users who have read this message
      },
    ],
  },
  {
    id: 3,
    name: "Engineering Department",
    messages: [
      { 
        id: 1, 
        text: "The new system is almost ready.", 
        user: "Eve White", 
        timestamp: new Date('2025-09-05T08:00:00'), // Static date and time
        department: "Engineering Department",
        readBy: [] // List of users who have read this message
      },
      { 
        id: 2, 
        text: "Let's meet for a sprint review tomorrow.", 
        user: "Charlie Black", 
        timestamp: new Date('2025-09-05T08:15:00'), // Static date and time
        department: "Engineering Department",
        readBy: [] // List of users who have read this message
      },
    ],
  },
];

const All = () => {
  const [selectedDeptId, setSelectedDeptId] = useState(null); // Track the selected department
  const [newMessage, setNewMessage] = useState(""); // Track the new message being typed
  const [messages, setMessages] = useState([]); // Track messages of the selected department or global chat
  const [isGlobalChat, setIsGlobalChat] = useState(true); // To toggle between department and global chat
  const [currentUser] = useState("User"); // Dummy user for now

  // Switch to a selected department's chat
  const handleDeptSelect = (deptId) => {
    setIsGlobalChat(false); // Switch to department chat
    const dept = departmentsData.find((dept) => dept.id === deptId);
    setSelectedDeptId(deptId);
    setMessages(dept.messages); // Load department messages
  };

  // Switch to the global chat
  const handleGlobalChat = () => {
    setIsGlobalChat(true);
    setSelectedDeptId(null); // No department selected for global chat
    setMessages(
      departmentsData.flatMap((dept) => dept.messages)
    ); // Combine messages from all departments
  };

  // Handle sending new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const timestamp = new Date(); // Get current timestamp
      const dummyDept = selectedDeptId ? departmentsData.find(dept => dept.id === selectedDeptId).name : "All Departments"; // Determine the department of the user
      const newMessageData = {
        id: Date.now(),
        text: newMessage.trim(),
        user: currentUser,
        timestamp,
        department: dummyDept,
        readBy: [currentUser], // Mark the sender as the first reader
      };

      if (isGlobalChat) {
        // If it's global chat, add to global messages
        setMessages([...messages, newMessageData]);
      } else {
        // If it's department chat, add to department-specific messages
        setMessages([ ...messages, newMessageData ]);
        // Update department's messages
        const updatedDepartments = departmentsData.map((dept) =>
          dept.id === selectedDeptId
            ? { ...dept, messages: [...dept.messages, newMessageData] }
            : dept
        );
        departmentsData.length = 0;
        departmentsData.push(...updatedDepartments); // Update department data
      }
      setNewMessage(""); // Clear the input field
    }
  };

  // Format the timestamp to a readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} - ${date.toDateString()}`;
  };

  // Handle Enter key press to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent new line on Enter key press, only send message
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mark message as read when the user views it
  const markAsRead = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              readBy: msg.readBy.includes(currentUser)
                ? msg.readBy
                : [...msg.readBy, currentUser], // Add currentUser to readBy if not already added
            }
          : msg
      )
    );
  };

  return (
    <div className="flex flex-col w-full h-full bg-white shadow-lg rounded-lg">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-6 text-center text-3xl font-semibold">
        {isGlobalChat ? "All Departments Chat" : departmentsData.find((dept) => dept.id === selectedDeptId)?.name}
      </div>

      {/* Department Selector */}
      <div className="flex justify-between bg-gray-100 p-4">
        <button
          onClick={handleGlobalChat}
          className={`${
            isGlobalChat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-200"
          } px-6 py-3 rounded-md hover:bg-blue-200 transition`}
        >
          All Departments
        </button>
        <div className="flex space-x-6">
          {departmentsData.map((dept) => (
            <button
              key={dept.id}
              onClick={() => handleDeptSelect(dept.id)}
              className={`px-6 py-3 rounded-md ${
                selectedDeptId === dept.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-300"
              } transition`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.user === currentUser ? "justify-end" : "justify-start"} items-center`}
              onClick={() => markAsRead(message.id)} // Mark as read when clicked
            >
              <div
                className={`p-4 rounded-lg shadow-md max-w-xs w-full ${
                  message.user === currentUser ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <div className="font-semibold">{message.user} ({message.department})</div>
                <div>{message.text}</div>
                <div className="text-sm text-gray-500">{formatTime(message.timestamp)}</div>
                <div className="text-xs text-gray-400">
                  Read by: {message.readBy.join(", ")}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="flex p-6 border-t border-gray-300">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key press
          className="flex-grow px-6 py-3 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="ml-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default All;
