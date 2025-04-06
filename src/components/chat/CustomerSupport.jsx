import React, { useState } from "react";
import { Button, Input, List } from "antd";
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
} from "@ant-design/icons";

const CustomerSupport = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setVisible(!visible);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = { sender: "user", content: message };
      setMessages([...messages, userMessage]);
      setMessage("");
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {visible ? (
        <div
          style={{
            width: 300,
            height: 400,
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f6f8fa",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <span>
              <b>3XG Customer Support</b>{" "}
            </span>
            <Button
              icon={<CloseOutlined />}
              size="small"
              onClick={toggleChat}
              style={{ border: "none", boxShadow: "none" }}
            />
          </div>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            <List
              dataSource={messages}
              renderItem={(msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: "16px",
                      backgroundColor:
                        msg.sender === "user" ? "#FF800F" : "#f0f0f0",
                      color: msg.sender === "user" ? "#fff" : "#000",
                      maxWidth: "70%",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              )}
            />
          </div>
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f6f8fa",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={handleSendMessage}
              style={{ marginRight: "10px" }}
            />
            <Button
              icon={<SendOutlined />}
              shape="circle"
              type="primary"
              size="large"
              alignItems="center"
              justifyContent="center"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            />
          </div>
        </div>
      ) : (
        <Button
          icon={<MessageOutlined />}
          shape="circle"
          type="primary"
          size="large"
          onClick={toggleChat}
          style={{ boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
        />
      )}
    </div>
  );
};

export default CustomerSupport;
