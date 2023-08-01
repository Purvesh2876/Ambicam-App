import { Box, Button, Checkbox, Collapse, Flex, FormControl, FormLabel, Heading, Input, Text, Stack, VStack, useColorModeValue, Img } from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import logo from '@img/logo.png'
import {login} from './api/login'
import ambicam from '@img/ambicam.png'

const LoginPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [langflag, setLangFlag] = useState('');
  const [loginResult, setLoginResult] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      router.push('/dashboard');
    }
  }, []);

  const handleLoginClick = () => {
    setLoginOpen(!isLoginOpen);
    setSignUpOpen(false);
  };

  const handleSignUpClick = () => {
    setSignUpOpen(!isSignUpOpen);
    setLoginOpen(false);
  };


  const [isLoading, setIsLoading] = useState(false); // State variable to track loading state
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); // State variable to track redirection

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Show loading animation

      // Call the login function and pass the email, password, and langflag
      const loginResult = await login(email, password, 'en');

      const [status, userId] = loginResult.split(':');
      const userDetails = {
        status,
        userId,
        email,
      };
      console.log(userDetails);

      // Check if the login was successful
      if (userDetails.status === 'SUCCESS') {
        const token = loginResult.substring('SUCCESS:'.length);

        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', email);

        // Store the token in local storage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', token);
        
        setRedirectToDashboard(true); // Set the state variable to trigger redirection
      } else {
        // Show an error message or perform any other action for failed login
        console.log('Login failed');
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };

  // Use useEffect to watch for changes in the redirectToDashboard state
  useEffect(() => {
    if (redirectToDashboard) {
      // Redirect to the dashboard or any other protected page
      router.push('/SidebarWithHeader');
    }
  }, [redirectToDashboard]);
  

  // const handleLogin = () => {
  //   // Perform validation or authentication logic here
  //   // For demonstration purposes, let's check if username and password are both 'admin'
  //   if (username === 'admin' && password === 'admin') {
  //       localStorage.setItem('isLoggedIn', 'true');
  //     // Navigate to the next pages
  //     router.push('/dashboard');
  //   } else {
  //     // Handle incorrect credentials
  //     // For example, display an error message
  //     console.log('Invalid credentials');
  //   }
  // };

  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Image src={logo} alt='ambicam logo' />
        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        <div style={{display:"flex"}}>
        <Text fontSize={'lg'} color={'gray.600'}>
          to enjoy all of our cool <span style={{color:"#4299E1"}}>features</span>
        </Text>
        </div>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.400'}>Forgot password?</Text>
            </Stack>
            <Button
      bg={'blue.400'}
      color={'white'}
      _hover={{
        bg: 'blue.500',
      }}
      isLoading={isLoading} // Use the isLoading prop to show/hide the loading animation
      onClick={handleLogin}
    >
      Sign in
    </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  );
};

export default LoginPage;
