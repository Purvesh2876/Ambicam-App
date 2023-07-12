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
import { FiMenu, FiSettings, FiBell, FiX } from 'react-icons/fi';
import NotificationDialog from '@component/NotificationDialog';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
const DesktopHeader = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Perform logout logic here
    // ...

    // Delete logged-in details from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect to the homepage after logout
    router.push('/');
  };


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

  return (
    <Flex p={4} align="center" bg="white" position="fixed" top={0} left={0} right={0} zIndex={10}>
    {/* <Heading size="lg">Dashboard</Heading>
    <Spacer /> */}
    <HStack spacing={4}>
      <Link href="/dashboard" passHref>
        <Button as="a" colorScheme="teal" variant="ghost">
          Home
        </Button>
      </Link>
      <Link href="/cameras" passHref>
        <Button as="a" colorScheme="teal" variant="ghost">
          Cameras
        </Button>
      </Link>
      <Link href="/multiple" passHref>
        <Button as="a" colorScheme="teal" variant="ghost">
          Multiple Screen
        </Button>
      </Link>
      <Link href="/settings" passHref>
        <Button as="a" colorScheme="teal" variant="ghost">
          Settings
        </Button>
      </Link>
    </HStack>
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
    <Menu>
      <MenuButton as={IconButton} icon={<Avatar name="John Doe" src="https://via.placeholder.com/48" size="sm" />}>
        <AvatarBadge boxSize="1.2em" bg="green.500" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={()=>router.push('/profile')}>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  </Flex>
  );
};

export default DesktopHeader;
