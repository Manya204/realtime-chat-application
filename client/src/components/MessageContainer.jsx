import React from "react";
import Message from "./Message";
import { Button } from "@mui/material";

export default function MessageContainer() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="bg-slate-500 px-4 py-2 mb-2" style={{ position: "sticky", top: 0, zIndex: 1, background: "white" }}>
        <span className="label-text">To:</span>{" "}
        <span className="text-gray-900 font-bold">John Doe</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Message message="Hello there!" fromMe={true} />
        <Message message="Hi! How are you?" fromMe={false} />
        <Message message="I'm doing great, whbdwd hbwdjwed hwdbjwd jwdjwed thanks!" fromMe={true} />
        <Message message="That's good to hear!" fromMe={false} />
        <Message message="Hello there!" fromMe={true} />
        <Message message="Hi! How are you?" fromMe={false} />
        <Message message="I'm doing great, thanks!" fromMe={true} />
        <Message message="Hello there!" fromMe={true} />
        <Message message="Hi! How are you?" fromMe={false} />
        <Message message="I'm doing great, thanks!" fromMe={true} />
        <Message message="That's good to hear! hash vdjh wvdjwhd vwdw " fromMe={false} />
      </div>
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start mt-2" style={{ position: "sticky", bottom: 0, background: "white", padding: "1rem", zIndex: 1 }}>
        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" style={{ flex: 1 }}>
          <input
            type="search"
            className="form-control"
            placeholder="Send a message..."
            aria-label="Search"
          />
        </form>
        <Button variant="contained" color="secondary">
          Send
        </Button>
      </div>
    </div>
  );
}
