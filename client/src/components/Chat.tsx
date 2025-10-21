import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Video } from "lucide-react";

interface User {
  _id: string;
  name: string;
}

interface ChatProps {
  user: User | null;
  onLogout: () => void;
}

interface ChatPerson {
  id: string;
  name: string;
  country: string;
  lastMessage: string;
  messages: { from: string; text: string }[];
}

const Chat: React.FC<ChatProps> = ({ user, onLogout }) => {
  const [selectedChat, setSelectedChat] = useState<ChatPerson | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Dummy cultural people & conversations
  const chatPeople: ChatPerson[] = [
    {
      id: "1",
      name: "Aarav",
      country: "India",
      lastMessage: "Have you tried Diwali sweets?",
      messages: [
        { from: "Aarav", text: "Namaste! Do you celebrate Diwali?" },
        { from: "You", text: "I’ve heard about it, but not celebrated yet." },
        { from: "Aarav", text: "It’s full of lights and sweets, you’d love it!" },
      ],
    },
    {
      id: "2",
      name: "Sakura",
      country: "Japan",
      lastMessage: "Cherry blossoms are so beautiful in spring.",
      messages: [
        { from: "Sakura", text: "Do you know about Hanami festival?" },
        { from: "You", text: "Is it the cherry blossom viewing?" },
        { from: "Sakura", text: "Yes! People gather under the trees to enjoy food & nature." },
      ],
    },
    // ... keep others same as before
  ];

  // Handle sending message
  const handleSend = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const updatedMessages = [
      ...selectedChat.messages,
      { from: "You", text: newMessage.trim() },
    ];

    setSelectedChat({
      ...selectedChat,
      messages: updatedMessages,
    });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="text-2xl font-bold text-orange-900"
              >
                Sanskriti Setu
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-orange-600"
              >
                Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 gap-6">
        {/* Left Sidebar (Chats List) */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-lg font-bold mb-4">Your Matches</h2>
          <div className="space-y-3">
            {chatPeople.map((person) => (
              <div
                key={person.id}
                onClick={() => setSelectedChat(person)}
                className={`cursor-pointer p-3 rounded-lg hover:bg-orange-50 ${
                  selectedChat?.id === person.id ? "bg-orange-100" : ""
                }`}
              >
                <div className="font-semibold text-gray-800">{person.name}</div>
                <div className="text-sm text-gray-500">{person.lastMessage}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side (Chat Window) */}
        <div className="col-span-2 bg-white rounded-xl shadow-lg p-6 flex flex-col">
          {!selectedChat ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a person to start chatting 💬
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="border-b pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedChat.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedChat.country}
                  </p>
                </div>
                <div className="flex space-x-4 text-gray-600">
                  <button className="hover:text-orange-600">
                    <Phone size={20} />
                  </button>
                  <button className="hover:text-orange-600">
                    <Video size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {selectedChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.from === "You" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl shadow ${
                        msg.from === "You"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Box */}
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-l-xl px-4 py-2 focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="bg-orange-600 text-white px-4 py-2 rounded-r-xl hover:bg-orange-700"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
