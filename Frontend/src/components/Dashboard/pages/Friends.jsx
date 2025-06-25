import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendFriendRequestAPI,
  acceptFriendAPI,
  declineFriendAPI,
  fetchFriendsAPI,
  fetchPendingRequestsAPI,
} from "../../../services/operations/friendAPI";
import { io } from "socket.io-client";

const socket = io("https://digital-ledger-backend.onrender.com");

export const Friends = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef();

  const authUser = useSelector((state) => state.profile.user);
  const currentUserId = authUser?._id;
  const friendsList = useSelector((state) => state.friend.friends);
  const pendingRequests = useSelector((state) => state.friend.pendingRequests);
  const pendingArray = Object.values(pendingRequests);

  const [messages, setMessages] = useState({});

  useEffect(() => {
    dispatch(fetchFriendsAPI());
    dispatch(fetchPendingRequestsAPI());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUserId) return;
    socket.emit("register", currentUserId);

    socket.on("receive_message", ({ from, text }) => {
      setMessages((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { text, fromUser: false }],
      }));
    });

    return () => {
      socket.off("receive_message");
    };
  }, [currentUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages[selectedFriendId]]);

  const handleAddFriend = async () => {
    if (search.trim()) {
      await dispatch(sendFriendRequestAPI(search));
      await dispatch(fetchPendingRequestsAPI());
      setSearch("");
    }
  };

  const handleAccept = (id) => {
    dispatch(acceptFriendAPI(id));
  };

  const handleDecline = (id) => {
    dispatch(declineFriendAPI(id));
  };
  const handleSelectFriend = async (friend) => {
  setSelectedFriendId(friend._id);

  try {
    const res = await fetch(`/api/v1/messages/${currentUserId}/${friend._id}`);
    const data = await res.json();

    if (data.success) {
      setMessages((prev) => ({
        ...prev,
        [friend._id]: data.messages.map((msg) => ({
          text: msg.text,
          fromUser: msg.from === currentUserId,
        })),
      }));
    }
  } catch (err) {
    console.error("Failed to fetch chat history:", err);
  }
};

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedFriendId) return;

    setMessages((prev) => ({
      ...prev,
      [selectedFriendId]: [...(prev[selectedFriendId] || []), { text: newMessage, fromUser: true }],
    }));

    socket.emit("private_message", {
      from: currentUserId,
      to: selectedFriendId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-[#fefcf8] text-gray-800">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Add a Friend</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter email id"
            className="flex-1 p-3 rounded border border-gray-300"
          />
          <button
            onClick={handleAddFriend}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {pendingArray.length > 0 ? (
        pendingArray.map((req) => (
          <div key={req._id} className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
            <span>{req.from?.email || "No email"}</span>
            <div className="flex gap-2">
              <button onClick={() => handleAccept(req._id)} className="bg-green-600 px-4 py-2 rounded text-white">
                Accept
              </button>
              <button onClick={() => handleDecline(req._id)} className="bg-red-600 px-4 py-2 rounded text-white">
                Decline
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No pending requests</p>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Friends</h3>
        <div className="flex gap-6">
          <div className="w-1/3">
            {Object.values(friendsList).length > 0 ? (
              Object.values(friendsList).map((friend) => (
                <div
                  key={friend._id}
                  onClick={() => handleSelectFriend(friend)}
                  className={`p-2 rounded cursor-pointer hover:bg-teal-100 ${
                    selectedFriendId === friend._id ? "bg-teal-200" : ""
                  }`}
                >
                  {friend.name || friend.email}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No friends added yet</p>
            )}
          </div>

          <div className="w-2/3 border-l pl-4">
            {selectedFriendId ? (
              <div>
                <div className="h-64 overflow-y-auto mb-3">
                  {(messages[selectedFriendId] || []).map((msg, idx) => (
                    <div
                      key={idx}
                      className={`mb-2 p-2 rounded ${
                        msg.fromUser ? "bg-teal-300 ml-auto w-fit" : "bg-gray-200 w-fit"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef}></div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select a friend to chat</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
