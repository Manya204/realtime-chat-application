import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import NoChat from "./NoChat";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to handle chat selection
  const handleChatSelection = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mt-4" style={{ height: "90vh", overflow: "hidden" }}>
      <div className="card h-100">
        <div className="card-body d-flex" style={{ height: "100%" }}>
          <div style={{ flex: "0 0 30%", height: "100%", overflowY: "auto" }}>
            <Sidebar onChatSelect={handleChatSelection} />
          </div>
          <div style={{ flex: "1 0 70%", height: "100%", overflowY: "auto" }}>
            {selectedUser ? (
              <MessageContainer user={selectedUser} />
            ) : (
              <NoChat />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
