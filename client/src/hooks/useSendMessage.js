// hooks/useSendMessage.js
import { useState } from 'react';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (receiverId, message) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/messages/send/${receiverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setLoading(false);
      return await response.json();
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Internal server error');
      throw error;
    }
  };

  return { sendMessage, loading, error };
};

export default useSendMessage;
