'use client';

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import ambicam from '@img/ambicam.png'
import Image from 'next/image'

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleLogout = () => {
    // Perform logout logic here
    // ...
  
    // Delete logged-in details from localStorage
    localStorage.removeItem('isLoggedIn');
  
    // Redirect to the homepage after logout
    router.push('/');
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} boxShadow={'base'} zIndex={9999}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box> <Image style={{width:"50%"}} src={ambicam} alt='ambicam logo' /> </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
             

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

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
