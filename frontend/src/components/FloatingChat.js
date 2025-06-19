import React, { useState } from "react";
import "./FloatingChat.css";

function FloatingChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(true); 
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true); 
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error contacting server" }]);
    } finally {
      setIsTyping(false); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  if (!visible) return null;

  return (
    <div className="floating-chat-box">
      <div className="chat-header">
        <span className="chat-title">🛕 SisuMitra AI</span>
        <span className="close-btn" onClick={() => setVisible(false)}>✖</span>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.sender === "bot" && <span className="bot-icon">🪔 </span>}
            {m.text}
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Indian heritage..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default FloatingChat;
