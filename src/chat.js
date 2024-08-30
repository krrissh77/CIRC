import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatindex.css'; // Import chat-specific styles

function Chat() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [responses, setResponses] = useState([]);
  const [typingMessage, setTypingMessage] = useState(''); // For typing effect
  const [isTyping, setIsTyping] = useState(false); // To trigger typing effect

  const handleSend = async () => {
    const formData = new FormData();
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const botResponse = response.data.response;

      // Add the user message and empty bot message to responses
      setResponses([...responses, { user: message, bot: '' }]);
      setMessage('');
      setImage(null); // Clear the image after sending

      // Trigger the typing effect
      setTypingMessage(botResponse);
      setIsTyping(true);
    } catch (error) {
      console.error('Error sending message:', error);
    } 
  };

  useEffect(() => {
    if (isTyping && typingMessage) {
      let index = 0;
      const interval = setInterval(() => {
        setResponses(prevResponses => {
          const newResponses = [...prevResponses];
          newResponses[newResponses.length - 1].bot = typingMessage.substring(0, index + 1);
          return newResponses;
        });

        index += 1;

        if (index >= typingMessage.length) {
          clearInterval(interval);
          setIsTyping(false); // Stop typing effect
        }
      }, 50); // Adjust typing speed here
    }
  }, [isTyping, typingMessage]);

  return (
    <div className="chat-box">
      <div className="chat-history">
        {responses.map((entry, index) => (
          <div key={index} className="message-container">
            <div className="user-message-main">
              <div className="user-message">{entry.user}</div>
              <img 
                src='https://static.vecteezy.com/system/resources/previews/035/857/643/non_2x/3d-simple-user-icon-isolated-render-profile-photo-symbol-ui-avatar-sign-person-or-people-gui-element-realistic-illustration-vector.jpg' 
                alt="User Avatar" 
              />
            </div>
            <div className="bot-message-main">
              <img 
                src='https://images.unsplash.com/photo-1589254066213-a0c9dc853511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw0ckJoTjFTMENsY3x8ZW58MHx8fHx8' 
                alt="Bot Avatar" 
              />
              <div className="bot-message">{entry.bot}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='InputDiv'>
        <textarea 
          className='InputBox'
          placeholder='Your question goes here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])} // Handle file input
        />
        <button className='SendBttn' onClick={handleSend}>
          <img 
            src='https://th.bing.com/th/id/OIP.0hhDzKKwz6IXgt_FaYpzOAHaHa?w=209&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7' 
            alt="Send Button" 
          />
        </button>
      </div>
    </div>
  );
}

export default Chat;
