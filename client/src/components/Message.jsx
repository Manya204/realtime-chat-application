import React from 'react';
import { Typography } from '@mui/material';
import BadgeAvatars from './BadgeAvatars';

const Message = ({ message, fromMe, loggedInUserProfile, otherUserProfile }) => {
  const bubbleColor = fromMe ? 'bg-light' : 'bg-primary text-white';
  const alignClass = fromMe ? 'align-self-end' : 'align-self-start';

  return (
    <div className={`d-flex mb-2 justify-content-${fromMe ? 'start' : 'end'}`}>
      {!fromMe && (
        <BadgeAvatars src={otherUserProfile} alt="Other User Avatar" />
      )}
      <div
        className={`p-2 rounded-3 border border-2 ${bubbleColor} ${alignClass}`}
        style={{ maxWidth: '70%', wordWrap: 'break-word' }}
      >
        <Typography variant="body1">{message}</Typography>
      </div>
      {fromMe && (
        <BadgeAvatars src={loggedInUserProfile} alt="Logged In User Avatar" />
      )}
    </div>
  );
};

export default Message;


