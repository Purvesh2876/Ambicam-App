import React from 'react';
import {
  Box,
  Flex,
  Text,
  CloseButton,
  Icon,
} from '@chakra-ui/react';
import { BsCameraVideo, BsBell, BsCloudArrowDown, BsPeople, BsFillCarFrontFill } from 'react-icons/bs';
import { TbFaceId, TbArrowsDiff } from 'react-icons/tb'; // Replace with the actual import for TbFaceId and TbArrowsDiff
import { AiOutlineHeatMap } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import Image from 'next/image'
import ambicam from '@img/ambicam.png'
import ambicam1 from '@img/Ambicam1.png'


const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        flexDir="column" // Added flex direction column
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mb="2" // Added margin-bottom to separate icon and text
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        <Text  fontSize="10" >{children}</Text> {/* Display the link.name here */}
      </Flex>
    </Box>
  );
};


const LinkItems = [
  { name: 'Cameras', icon: BsCameraVideo },
  { name: 'Events', icon: BsBell },
  { name: 'Archive Export', icon: BsCloudArrowDown },
  { name: 'Faces', icon: TbFaceId },
  { name: 'Heatmap', icon: AiOutlineHeatMap },
  { name: 'People', icon: BsPeople },
  { name: 'Visitors', icon: TbArrowsDiff },
  { name: 'ANPR', icon: BsFillCarFrontFill },
  { name: 'Settings', icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
    transition="3s ease"
    bg="gray.100"
    borderRight="1px"
    borderRightColor="gray.200"
    boxSize={{ base: 'full', md: '5rem' }} // Set width to 5rem on larger screens
    display={{ base: 'none', md: 'block' }} // Use display prop to show on larger screens
    pos="fixed"
    h="full"
    {...rest}
  >
      {/* <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Image style={{width:'50px'}} src={ambicam1} alt='ambicam logo' />
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex> */}
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
