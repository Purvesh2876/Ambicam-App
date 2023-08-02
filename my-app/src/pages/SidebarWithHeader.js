import { Box, CloseButton, Divider, Drawer, DrawerContent, Flex, useDisclosure, Text, Icon, IconButton, HStack, Menu, MenuButton, Avatar, VStack, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileHeader from '@component/MobileHeader';
import DesktopHeader from '@component/DesktopHeader';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import {BsBell, BsCameraVideo, BsCloudArrowDown, BsFillCarFrontFill, BsPeople} from 'react-icons/bs';
import {TbArrowsDiff, TbFaceId} from 'react-icons/tb';
import {AiOutlineHeatMap} from 'react-icons/ai';
import CameraList from './CameraList';
import Image from 'next/image'
import ambicam from '@img/ambicam.png'
import { useRouter } from 'next/router';
import Header from '@/components/Header';


const MobileNav = ({ onOpen, ...rest }) => {
  const router = useRouter();
  const handleLogout = () => {
    // Perform logout logic here
    // ...
  
    // Delete logged-in details from localStorage
    localStorage.removeItem('isLoggedIn');
  
    // Redirect to the homepage after logout
    router.push('/');
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="gray.100"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        textAlign='center'
        alignItems="center"
      >
        <Image style={{width:'75%'}} src={ambicam} alt='ambicam logo' />
      </Text>
      
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems="center">
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size="sm"
                  src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg="white" borderColor="gray.200">
              <MenuItem onClick={()=>router.push('/profile')}>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              {/* <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem onClick={handleLogout} >Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100">
      <Header />
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="md">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* <MobileNav onOpen={onOpen} /> */}
      <Box ml={{ base: 0, md: '5rem' }} p="4">
        <CameraList />
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
