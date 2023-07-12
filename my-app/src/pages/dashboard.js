import { useState ,useEffect} from 'react';
import { useRouter } from 'next/router';
import withAuth from '@component/withAuth';
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
  Link
} from '@chakra-ui/react';
import { FiMenu, FiSettings, FiBell, FiX } from 'react-icons/fi';
import DesktopHeader from '@component/DesktopHeader';
import MobileHeader from '@component/MobileHeader';

import axios from 'axios';
import CameraList from '@/pages/CameraList';



const DashboardPage = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

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

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleLogout = () => {
//     // Perform logout logic here
//     // ...

//     // Delete logged-in details from localStorage
//     localStorage.removeItem('isLoggedIn');

//     // Redirect to the homepage after logout
//     router.push('/');
//   };

//   const Sidebar = () => (
//     <Drawer
//       placement={isMobile ? 'left' : 'left-start'}
//       onClose={onClose}
//       isOpen={isMobile ? isOpen : true}
//     >
//       <DrawerOverlay />
//       <DrawerContent>
//         <DrawerHeader margin={4} borderBottomWidth="1px">
//         <Flex justify="space-between" align="center">
//             <Box>
//                 <Flex direction="row" align="center">
//                 <Avatar name="John Doe" src="https://via.placeholder.com/48" size="sm">
//                     <AvatarBadge boxSize="1.2em" bg="green.500" />
//                 </Avatar>
//                 <Text ml={2} fontWeight="bold">Username</Text>
//                 </Flex>
//             </Box>
//             <IconButton
//                 icon={<FiX />}
//                 aria-label="Close"
//                 variant="ghost"
//                 colorScheme="teal"
//                 onClick={onClose}
//             />
//             </Flex>
//         </DrawerHeader>
//         <DrawerBody>
//           <VStack spacing={4} align="start">
//             <Button colorScheme="teal" variant="ghost" width="full">
//               Home
//             </Button>
//             <Button colorScheme="teal" variant="ghost" width="full">
//               Cameras
//             </Button>
//             <Button colorScheme="teal" variant="ghost" width="full" onClick={()=>router.push('/multiple')}>
//               Multiple Screen
//             </Button>
//             <Button colorScheme="teal" variant="ghost" width="full" >
//               Settings
//             </Button>
//             <Button colorScheme="teal" variant="ghost" width="full" onClick={handleLogout}>
//               Logout
//             </Button>
//           </VStack>
//         </DrawerBody>
//       </DrawerContent>
//     </Drawer>
//   );


//   console.log(cameraList); 
  return (
    <Box>
      
      {/* Mobile Header */}
      {isMobile && (
      
        <MobileHeader />

      )}

      {/* Desktop Header */}
      {!isMobile && (
        
        <DesktopHeader />  
       
        )}

      {/* Main Content */}
      <Box marginTop={isMobile ? '5rem' : '5rem'} paddingLeft={3} paddingRight={3} >
     
      
      <CameraList/>
      {/* Footer */}
      <Divider />
      <Box p={4} textAlign="center" fontSize="sm" color="gray.500">
        &copy; 2023 Smart Home Camera App. All rights reserved.
      </Box>
    </Box>
    </Box>
  );
};
export default withAuth(DashboardPage);