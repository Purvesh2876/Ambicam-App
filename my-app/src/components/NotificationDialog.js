
import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
  } from '@chakra-ui/react';
  import PropTypes from 'prop-types';
  import { io } from 'socket.io-client';
  import React, { useState, useEffect } from 'react';

  const NotificationDialog = ({ isOpen, onClose, notificationCount, onMarkAsRead }) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        // Initialize Socket.IO client
        const socket = io(); // No server URL required for static message
        setSocket(socket);
        const staticMessage = `Hello, this is a static message! You have ${notificationCount} new notifications.`;
        setMessage(staticMessage);
        // Cleanup on component unmount
        return () => {
          socket.disconnect();
        };
      }, [notificationCount]);

    const handleMarkAsRead = () => {
      onMarkAsRead();
      setMessage('');
      onClose();
    };
  
    return (
      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Notifications
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {/* You have {notificationCount} new notifications. */}
              {message}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={handleMarkAsRead}>
                Mark as Read
              </Button>
              <Button ml={4} variant="outline" onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };
  
  NotificationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    notificationCount: PropTypes.number.isRequired,
    onMarkAsRead: PropTypes.func.isRequired,
 
  };
  
  export default NotificationDialog;
  