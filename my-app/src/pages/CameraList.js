import React, { useEffect, useState } from 'react';
import { getCustomerCameraList } from './api/getcamera';
import { useRouter } from 'next/router';
import LiveFeed from '@/components/LiveFeed';
import withAuth from '@/components/withAuth';
import DashboardTable from '@/components/DashboardTable';
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
  Link,
  Badge
} from '@chakra-ui/react';
import { FiMenu, FiSettings, FiBell, FiX } from 'react-icons/fi';

// ... (import statements)

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

    // ... (fetchData function)
  }, []);

  const sortedCameraList = [...cameraList].sort((a, b) => {
    if (a.islive && !b.islive) return -1;
    if (!a.islive && b.islive) return 1;
    return 0;
  });

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      flexWrap="wrap"
      align="stretch"
      height="100%"
    >
      {/* Left Part - Table */}
      <Box flex={2} pt={4} pb={4} minWidth={{ base: '100%', md: 'initial' }}>
        {/* Add your table here */}
        {/* For example: */}
        <Heading size="lg" pl={8}>Camera Table</Heading>
        <DashboardTable cameraList={cameraList} />
      </Box>

      {/* Right Part - List of Cameras */}
      <Box flex={6} pt={4} pb={4}>
        <Flex mb={4} align="center">
          {/* Mobile Sidebar Toggle */}
          <Heading size="lg">My Cameras</Heading>
          <Spacer />
          <Button colorScheme="teal" backgroundColor={"#0bc5ea"} size="sm">
            Add Camera
          </Button>
        </Flex>

        <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={1} mt={8} ml={0}>
          {/* Camera Card 1 */}
          {sortedCameraList.map((camera) => (
            <GridItem key={camera.cameraid}>
              <Box
                bg="white"
                borderRadius="md"
                p={1}
                mb={2}
                boxShadow="md"
                transition="box-shadow 0.3s"
                _hover={{ boxShadow: 'lg' }}
                width={"280px"}
              >
                  <Box position="relative"> {/* Container with relative positioning */}
                  <Image src="https://via.placeholder.com/240x160" alt="Camera" width={"280px"} />
                  {/* Badge to display status */}
                  {camera.islive && (
                    <Badge
                      position="absolute" // Position the badge absolutely within the container
                      top={2} // Top position from the edge of the container
                      right={2} // Right position from the edge of the container
                      fontSize="sm"
                      colorScheme="green" // You can adjust the color scheme of the badge
                    >
                      On
                    </Badge>
                  )}
                </Box>
                {/* <Text fontSize="l" width={"240px"}>
                  Status : {camera.islive ? "On" : "Off"}
                </Text> */}
                <Text fontWeight="bold" fontSize="l" width={"240px"}>
                  {camera.cameraname}
                </Text>
                {/* <Text color="gray.500" width={"240px"}>
                  Camera Id: {camera.deviceid}
                </Text>
                <Button
                  colorScheme="teal"
                  backgroundColor={"#0bc5ea"}
                  size="sm"
                  width="full"
                  // width="240px"
                  onClick={() => router.push(`/cameraview?streamname=${camera.streamname}`)}
                >
                  View Live Stream
                </Button> */}
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
