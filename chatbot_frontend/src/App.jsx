import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    // Add user message
    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask_ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,   // 🔥 matches your backend
        }),
      });

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.answer,
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🩺 Medical Chatbot</h2>

      <div
        style={{
          border: "1px solid black",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                background: msg.sender === "user" ? "#007bff" : "#eee",
                color: msg.sender === "user" ? "white" : "black",
                padding: "8px",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a medical question..."
        style={{ width: "70%", padding: "10px" }}
      />

      <button
        onClick={sendMessage}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Send
      </button>
    </div>
  );
}

export default App;