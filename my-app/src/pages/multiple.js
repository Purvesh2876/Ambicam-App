import { Box, Grid, GridItem, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import withAuth from '@/components/withAuth';
import DesktopHeader from '@component/DesktopHeader';
import MobileHeader from '@component/MobileHeader';

const CameraFeedsPage = () => {
  const [cameraFeeds, setCameraFeeds] = useState([]);
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
  useEffect(() => {
    // Simulating API call to fetch camera feeds
    const fetchCameraFeeds = async () => {
      // Make API call to fetch camera feeds data
      // const response = await fetch('/api/camera-feeds');
      // const data = await response.json();
      // setCameraFeeds(data);

      // Dummy camera feeds data for testing
      const dummyData = [
        {
          id: 1,
          name: 'Living Room',
          image: 'https://via.placeholder.com/400x300',
        },
        {
          id: 2,
          name: 'Bedroom',
          image: 'https://via.placeholder.com/400x300',
        },
        {
          id: 3,
          name: 'Kitchen',
          image: 'https://via.placeholder.com/400x300',
        },
        {
          id: 4,
          name: 'Backyard',
          image: 'https://via.placeholder.com/400x300',
        },
      ];
      setCameraFeeds(dummyData);
    };

    fetchCameraFeeds();
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
      <Box marginTop={isMobile ? '5rem' : '0'} paddingLeft={3} paddingRight={3}>
          <Heading size="lg" mb={4}>
            Camera Feeds
          </Heading>

          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} >
            {cameraFeeds.map((feed) => (
              <GridItem key={feed.id}>
                <Box
                  bg="white"
                  borderRadius="md"
                  p={4}
                  boxShadow="md"
                  transition="box-shadow 0.3s"
                  _hover={{ boxShadow: 'lg' }}
                >
                  <Image src={feed.image} alt={feed.name} borderRadius="md" mb={4} />

                  <VStack spacing={2} align="start">
                    <Heading size="md">{feed.name}</Heading>
                    <Text color="gray.500">Last Activity: 1 hour ago</Text>
                  </VStack>
                </Box>
              </GridItem>
            ))}
          </Grid>
    </Box>
    </Box>
  );
};

export default withAuth(CameraFeedsPage);
