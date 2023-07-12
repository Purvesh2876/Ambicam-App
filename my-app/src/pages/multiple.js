
import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth';
import DesktopHeader from '@component/DesktopHeader';
import MobileHeader from '@component/MobileHeader';
import { getCustomerCameraList } from './api/getcamera';
import LiveFeed from '@/components/LiveFeed';
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
const CameraFeedsPage = () => {
 
  const [isMobile, setIsMobile] = useState(false);
  const [cameraList, setCameraList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // JSON.parse(localStorage.getItem('userDetails'));
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      // console.log(userDetails)
  
      const customerId = userDetails.userId;
      const username = userDetails.email;
      const langflag = 'en';
      try {
        const result = await getCustomerCameraList(customerId, username, langflag);
        console.log(result)
        const startIndex = result.indexOf('SUCCESS:') + 'SUCCESS:'.length;
        const trimmedResult = result.substring(startIndex);
        const parsedResult = JSON.parse(trimmedResult);
        setCameraList(parsedResult);
      } catch (error) {
        console.error('Error fetching camera list:', error);
      }
    };

    fetchData();
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };
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
  return (
    <Box>
       {/* Mobile Header */}
       {isMobile && (<>
        <MobileHeader  />
        </>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <DesktopHeader/>  )}

        
      <Box marginTop={isMobile ? '5rem' : '5rem'} paddingLeft={3} paddingRight={3}>
          <Heading size="lg" mb={4}>
            Camera Multiple-View Feeds
          </Heading>

          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} >
          {cameraList.map((camera) => (
            <GridItem key={camera.cameraid}>
              <Box
                bg="white"
                borderRadius="md"
                p={4}
                boxShadow="md"
                transition="box-shadow 0.3s"
                _hover={{ boxShadow: 'lg' }}
              >
                
                {/* <Image src="https://via.placeholder.com/240x160" alt="Camera" borderRadius="md" mb={4} /> */}
                <LiveFeed
              source={`https://media1.ambicam.com:443/dvr30/${camera.streamname}/index.m3u8`}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              />
    
                <Text fontWeight="bold" fontSize="xl" mb={2}>
                {camera.cameraname}
                </Text>
                
              
              </Box>
            </GridItem>
            ))}
           
          </Grid>
    </Box>
    </Box>
  );
};

export default withAuth(CameraFeedsPage);
