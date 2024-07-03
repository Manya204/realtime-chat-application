import React from 'react';
import BadgeAvatars from './BadgeAvatars';

export default function Conversation() {
  return (
    <>
      <div className="d-flex align-items-center p-2 py-1 rounded hover-bg-sky-500 cursor-pointer">
        <div className="avatar online">
          <BadgeAvatars />
        </div>
        &nbsp;
        <div className="flex-grow-1 d-flex flex-column">
          <div className="d-flex justify-content-between">
            <p className="font-weight-bold text-secondary mb-0">John Doe</p>
            <span className="h4 mb-0">🎃</span>
          </div>
        </div>
      </div>
      <div className="my-0 py-0" style={{ height: '1px', background: '#dee2e6' }} />
    </>
  );
}
