// src/components/Message.js

import React, { useState } from 'react';
import '../styles/main.css';

const Message = ({ setCustomMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSetMessage = () => {
        setCustomMessage(inputValue);
    };

    const handleClearMessage = () => {
        setInputValue('');
        setCustomMessage('');
    };

    return (
        <div id="message-controls">
            <input
                type="text"
                placeholder="Enter a custom message"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleSetMessage}>Set Message</button>
            <button onClick={handleClearMessage}>Clear Message</button>
        </div>
    );
};

export default Message;