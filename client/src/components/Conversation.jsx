import React from 'react';
import BadgeAvatars from './BadgeAvatars';
import { getRandomEmoji } from '../utils/emoji.js';
import { useSocketContext } from '../context/SocketContext';

export default function Conversation({ user, isActive, onClick }) {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <>
      <div
        className={`d-flex align-items-center p-2 py-1 rounded cursor-pointer ${isActive ? 'bg-sky-500' : ''}`}
        onClick={onClick}
        style={{ background: isActive ? '#e0f7fa' : 'transparent' }}
      >
        <div className="avatar" style={{ position: 'relative' }}>
          <BadgeAvatars src={user.profile} alt={user.username} online={isOnline} />
        </div>
        &nbsp;
        <div className="flex-grow-1 d-flex flex-column">
          <div className="d-flex justify-content-between">
            <p className="font-weight-bold text-secondary mb-0">{user.username}</p>
            <span className="h4 mb-0">{getRandomEmoji()}</span>
          </div>
        </div>
      </div>
      <div className="my-0 py-0" style={{ height: '1px', background: '#dee2e6' }} />
    </>
  );
}
