import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { Button } from '@mui/material';
import useSendMessage from '../hooks/useSendMessage';
import useGetMessage from '../hooks/useGetMessage';
import { useSocketContext } from '../context/SocketContext';

const MessageContainer = ({ user }) => {
  const [messageText, setMessageText] = useState('');
  const { sendMessage, loading: sendingMessage, error: sendError } = useSendMessage();
  const { messages, loading: fetchingMessages, error: fetchError, fetchMessages } = useGetMessage(user._id);
  const messagesEndRef = useRef(null);
  const { socket, onlineUsers } = useSocketContext();
  const messagesContainerRef = useRef(null);

  const loggedInUser = JSON.parse(localStorage.getItem('chat-user'));

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const newMessage = await sendMessage(user._id, messageText);
      socket.emit("sendMessage", { receiverId: user._id, message: messageText });
      fetchMessages();
      scrollToBottom();
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isUserAtBottom = scrollHeight - scrollTop === clientHeight;
      if (isUserAtBottom) {
        scrollToBottom();
      }
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        if (newMessage.senderId === user._id || newMessage.receiverId === user._id) {
          fetchMessages();
          scrollToBottom();
        }
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, user._id, fetchMessages]);

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        className="bg-slate-500 px-4 py-2 mb-2"
        style={{ position: 'sticky', top: 0, zIndex: 1, background: 'white' }}
      >
        <span className="label-text">To:</span>{' '}
        <span className="text-gray-900 font-bold">{user.username}</span>
        {isUserOnline(user._id) && <span style={{ color: 'green', marginLeft: '10px' }}>Online</span>}
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }} ref={messagesContainerRef}>
        {fetchingMessages ? (
          <div>Loading messages...</div>
        ) : fetchError ? (
          <div>Error fetching messages: {fetchError}</div>
        ) : (
          messages.map((message) => (
            <Message
              key={message._id}
              message={message.message}
              fromMe={message.senderId === loggedInUser._id}
              loggedInUserProfile={loggedInUser.profile}
              otherUserProfile={user.profile}
              onlineStatus={message.senderId === loggedInUser._id ? isUserOnline(loggedInUser._id) : isUserOnline(user._id)}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start mt-2"
        style={{
          position: 'sticky',
          bottom: 0,
          background: 'white',
          padding: '1rem',
          zIndex: 1,
        }}
      >
        <form onSubmit={handleSendMessage} className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" style={{ flex: 1 }}>
          <input
            type="search"
            className="form-control"
            placeholder="Send a message..."
            aria-label="Search"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
        </form>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleSendMessage}
          disabled={!messageText.trim() || sendingMessage}
        >
          {sendingMessage ? 'Sending...' : 'Send'}
        </Button>
        {sendError && <div className="text-danger ms-2">{sendError}</div>}
      </div>
    </div>
  );
};

export default MessageContainer;
