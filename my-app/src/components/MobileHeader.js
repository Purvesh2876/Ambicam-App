import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Spacer,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  AvatarBadge,
  Grid,
  GridItem,
  Image,
  Divider,
  VStack,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  HStack,
  Link,Badge
} from '@chakra-ui/react';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
import { FiMenu, FiSettings, FiBell, FiX } from 'react-icons/fi';
import NotificationDialog from '@component/NotificationDialog';
const MobileHeader = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');


  useEffect(() => {
    // Retrieve user details from local storage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails) {
      console.log(userDetails)
      // alert(userDetails.langflag)
      setEmail(userDetails.email);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    // ...

    // Delete logged-in details from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect to the homepage after logout
    router.push('/');
  };

  const Sidebar = () => (
    <Drawer
      placement={isMobile ? 'left' : 'left-start'}
      onClose={onClose}
      isOpen={isMobile ? isOpen : true}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader margin={4} borderBottomWidth="1px">
        <Flex justify="space-between" align="center">
            <Box>
                <Flex direction="row" align="center">
                <Avatar name="John Doe" src="https://via.placeholder.com/48" size="sm">
                    <AvatarBadge boxSize="1.2em" bg="green.500" />
                </Avatar>
                <Text ml={2} fontWeight="bold">{email}</Text>
                </Flex>
            </Box>
            <IconButton
                icon={<FiX />}
                aria-label="Close"
                variant="ghost"
                colorScheme="teal"
                onClick={onClose}
            />
            </Flex>
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="start">
            <Button colorScheme="teal" variant="ghost" width="full" onClick={()=>router.push('/dashboard')}>
              Home
            </Button>
            <Button colorScheme="teal" variant="ghost" width="full" onClick={()=>router.push('/profile')}>
              Profile
            </Button>
            <Button colorScheme="teal" variant="ghost" width="full" >
              Cameras
            </Button>
            <Button colorScheme="teal" variant="ghost" width="full" onClick={()=>router.push('/multiple')}>
              Multiple Screen
            </Button>
            <Button colorScheme="teal" variant="ghost" width="full" >
              Settings
            </Button>
            <Button colorScheme="teal" variant="ghost" width="full" onClick={handleLogout}>
              Logout
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

const [isNotificationOpen, setNotificationOpen] = useState(false);
const [notificationCount, setNotificationCount] = useState(0);


const handleNotificationOpen = () => {
  // Increase the notification count and open the dialog
  setNotificationCount(prevCount => prevCount + 1);
  setNotificationOpen(true);
};

const handleNotificationClose = () => {
  // Close the dialog
  setNotificationOpen(false);
};

const handleMarkAsRead = () => {
  // Reset the notification count
  setNotificationCount(0);
  handleNotificationClose();
};

  return (<Box bg="white" position="fixed" top={0} left={0} right={0} zIndex={10}>
    <Sidebar  />
    <Flex p={4} align="center" marginTop={3}>
    <IconButton
      icon={<FiMenu />}
      aria-label="Menu"
      variant="ghost"
      colorScheme="teal"
      onClick={onOpen}
    />
    <Spacer />
    <Heading size="md">Dashboard</Heading>
    <Spacer />
    <Box position="relative" display="inline-block">
        <Badge
          colorScheme="teal"
          borderRadius="full"
          px={2}
          py={1}
          fontSize="0.8em"
          position="absolute"
          top="-8px"
          right="-8px"
          zIndex={1}
        >
          {notificationCount}
        </Badge>
        <IconButton
          aria-label="Notifications"
          variant="ghost"
          colorScheme="teal"
          onClick={handleNotificationOpen}
        >
          <FiBell />
        </IconButton>
      </Box>
      
      {/* Notification Dialog */}
      <NotificationDialog
        isOpen={isNotificationOpen}
        onClose={handleNotificationClose}
        notificationCount={notificationCount}
        onMarkAsRead={handleMarkAsRead}
    
      />
  </Flex></Box>
  );
};

export default MobileHeader;
