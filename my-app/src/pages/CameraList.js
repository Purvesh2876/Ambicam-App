import React, { useEffect, useState } from 'react';
import { getCustomerCameraList } from './api/getcamera';
import { useRouter } from 'next/router';
import LiveFeed from '@/components/LiveFeed';
import withAuth from '@/components/withAuth';
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

const CameraList = () => {
  const router = useRouter();
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

  
  return (
    
       <Flex >
        {/* Content */}
        <Box flex={1} p={4}>
          <Flex mb={4} align="center">
            {/* Mobile Sidebar Toggle */}
            <Heading size="lg">My Cameras</Heading>
            <Spacer />
            <Button colorScheme="teal" size="sm">
              Add Camera
            </Button>
          </Flex>

          <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={4}>
            {/* Camera Card 1 */}
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
                
                <Image src="https://via.placeholder.com/240x160" alt="Camera" borderRadius="md" mb={4} />
                <Text fontWeight="bold" fontSize="xl" mb={2}>
                Status : {camera.islive ? "On" : "Off" }
                </Text>
                <Text fontWeight="bold" fontSize="xl" mb={2}>
                {camera.cameraname}
                </Text>
                <Text color="gray.500" mb={4}>
                  Camera Id: {camera.deviceid}
                </Text>
                <Button
                  colorScheme="teal"
                  size="sm"
                  width="full"
                  onClick={() => router.push(`/cameraview?streamname=${camera.streamname}`)}
                >
                  View Live Stream
                </Button>
              </Box>
            </GridItem>
            ))}
           

            {/* Add more camera cards here */}
          </Grid>
        </Box>
      </Flex>

    
  );
};

export default withAuth(CameraList);
