import React, { useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';

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
        <Container
            id="message-controls"
            maxWidth="sm"
            sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                label="Custom Message"
                placeholder="Enter a custom message"
                value={inputValue}
                onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSetMessage}
                    sx={{ padding: '10px 20px' }}
                >
                    Set Message
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClearMessage}
                    sx={{ padding: '10px 20px' }}
                >
                    Clear Message
                </Button>
            </Box>
        </Container>
    );
};

export default Message;
