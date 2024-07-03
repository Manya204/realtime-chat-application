import React from "react";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";


const Message = ({ message, fromMe }) => {
  const bubbleColor = fromMe ? "bg-primary text-white" : "bg-light";
  const alignClass = fromMe ? "align-self-end" : "align-self-start";

  return (
    <div className={`d-flex mb-2 justify-content-${fromMe ? 'end' : 'start'}`}>
      {!fromMe && (
        <Avatar alt="User Avatar" src="https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png" />
      )}
      <div className={`p-2 rounded-3 border border-2 ${bubbleColor} ${alignClass}`} style={{ maxWidth: '70%', wordWrap: 'break-word' }}>
        <Typography variant="body1">{message}</Typography>
      </div>
    </div>
  );
};

export default Message;
