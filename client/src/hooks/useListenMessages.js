import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";

const useListenMessages = (onMessageReceived) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        onMessageReceived(message);
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, onMessageReceived]);
};

export default useListenMessages;
