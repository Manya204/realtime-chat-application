import { useState, useEffect } from 'react';

const useGetMessage = (receiverId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/messages/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Assuming you have a way to store the access token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const fetchedMessages = await response.json();
      setMessages(fetchedMessages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch messages when component mounts or when receiverId changes
  useEffect(() => {
    if (receiverId) {
      fetchMessages();
    }
  }, [receiverId]); // Make sure to adjust dependencies as needed

  return { messages, loading, error, fetchMessages };
};

export default useGetMessage;
