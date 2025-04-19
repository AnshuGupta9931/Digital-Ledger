import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); 

export const Friends = () => {
  const [search, setSearch] = useState("");
  const [pendingRequests, setPendingRequests] = useState([
    { name: "Alice Brown" },
    { name: "David Wilson" },
  ]);
  const [friendsList, setFriendsList] = useState([
    { name: "John Doe", note: "+ You paid $50.00" },
    { name: "Emma Johnson", note: "Dinner" },
    { name: "Michael Lee", note: "" },
  ]);

  const currentUser = "You"; // Replace with actual logged-in user name
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef();

  useEffect(() => {
    socket.emit("register", currentUser);

    socket.on("receive_message", ({ from, text }) => {
      setMessages((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { text, fromUser: false }],
      }));
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages[selectedFriend]]);

  const handleAddFriend = () => {
    if (search) {
      alert(`Friend request sent to ${search}`);
      setSearch("");
    }
  };

  const handleAccept = (name) => {
    setFriendsList([...friendsList, { name, note: "" }]);
    setPendingRequests(pendingRequests.filter((req) => req.name !== name));
  };

  const handleDecline = (name) => {
    setPendingRequests(pendingRequests.filter((req) => req.name !== name));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedFriend) return;

    const msg = { text: newMessage, fromUser: true };
    setMessages((prev) => ({
      ...prev,
      [selectedFriend]: [...(prev[selectedFriend] || []), msg],
    }));

    socket.emit("private_message", {
      from: currentUser,
      to: selectedFriend,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-[#fefcf8] text-gray-800">
      {/* Add Friend */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add a Friend</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter email id"
            className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleAddFriend}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md font-semibold transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Pending Requests</h3>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((req) => (
            <div
              key={req.name}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3 hover:shadow"
            >
              <span className="text-md font-medium">{req.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(req.name)}
                  className="px-4 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(req.name)}
                  className="px-4 py-1 bg-red-400 hover:bg-red-300 text-white rounded-md transition"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No pending requests.</p>
        )}
      </div>

      {/* Friends List */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Friends List</h3>
        {friendsList.length > 0 ? (
          friendsList.map((friend) => (
            <div
              key={friend.name}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3 hover:shadow"
            >
              <div>
                <span className="font-semibold">{friend.name}</span>
                {friend.note && (
                  <span className="ml-2 text-sm text-gray-500">{friend.note}</span>
                )}
              </div>
              <button
                onClick={() => setSelectedFriend(friend.name)}
                className="px-4 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition"
              >
                Chat
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no friends added yet.</p>
        )}
      </div>

      {/* Chat Window */}
      {selectedFriend && (
        <div className="fixed bottom-0 right-4 w-full max-w-md bg-white border rounded-t-lg shadow-lg z-50 flex flex-col">
          <div className="p-3 border-b flex justify-between items-center bg-teal-600 text-white rounded-t-lg">
            <span className="font-semibold">Chat with {selectedFriend}</span>
            <button onClick={() => setSelectedFriend(null)} className="text-sm">Close</button>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-2 flex flex-col">
            {(messages[selectedFriend] || []).map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[75%] ${
                  msg.fromUser ? "bg-teal-100 self-end" : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex p-3 border-t">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 bg-teal-600 hover:bg-teal-500 text-white rounded-r-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
