import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { Button } from "@mui/material";
import useLogout from "../hooks/useLogout";

export default function Sidebar({ onChatSelect }) {
  const { loading, logout } = useLogout();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users with all users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search term
    const filteredResults = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  }, [searchTerm, users]);

  const handleConversationClick = (user) => {
    setActiveConversation(user._id);
    onChatSelect(user); // Pass the selected user to the parent component
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="sidebar-container" style={{ height: "100%", position: "relative" }}>
      <div
        className="d-flex align-items-center justify-content-center justify-content-lg-start"
        style={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1,
          padding: "1rem 0",
        }}
      >
        <form className="col-12 col-lg-auto mb-0 me-lg-3 d-flex align-items-center" role="search" style={{ width: "100%" }}>
          <input
            type="search"
            className="form-control flex-grow-1"
            placeholder="Search..."
            aria-label="Search"
            style={{ marginRight: "0.5rem" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
            style={{ cursor: "pointer" }}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </form>
      </div>
      <div className="sidebar-content" style={{ height: "calc(100% - 120px)", overflowY: "auto" }}>
        <div className="conversation-list">
          {filteredUsers.map((user) => (
            <Conversation
              key={user._id}
              user={user}
              isActive={activeConversation === user._id}
              onClick={() => handleConversationClick(user)}
            />
          ))}
        </div>
      </div>
      <div className="logout-button" style={{ position: "sticky", bottom: 0, background: "white", padding: "1rem", zIndex: 1 }}>
        {!loading ? (
          <Button variant="contained" color="secondary" fullWidth onClick={logout}>
            Logout
          </Button>
        ) : (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}
