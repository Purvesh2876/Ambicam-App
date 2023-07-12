import { Box, Button, Collapse, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import logo from '@img/logo.png'
import {login} from './api/login'

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


  const handleLogin = async () => {
    try {
      // Call the login function and pass the email, password, and langflag
      const loginResult = await login(email, password, 'en');

      const [status, userId] = loginResult.split(':');
      const userDetails={
        status,userId,email
      }
      console.log(userDetails)

      // Check if the login was successful
      if (userDetails.status === 'SUCCESS') {
        const token = loginResult.substring('SUCCESS:'.length);
 
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          localStorage.setItem('userId', userId);
          localStorage.setItem('email', email);
          
          // Store the token in local storage
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('token', token);
        // Redirect to the dashboard or any other protected page
        router.push('/dashboard');
      } else {
        // Show an error message or perform any other action for failed login
        console.log('Login failed');
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error('Error:', error);
    }
  };
  

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
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack spacing={8} width="400px" p={8}  rounded="lg" shadow="lg">
        <Box>
          <Image src={logo} alt="Website Logo" />
        </Box>
        <Collapse in={isLoginOpen} animateOpacity>
          <VStack spacing={4} width="100%" align="stretch">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <FormControl id="langflag">
        <FormLabel>Lang Flag</FormLabel>
        <Input
          type="text"
          placeholder="Enter lang flag"
          value={langflag}
          onChange={(e) => setLangFlag(e.target.value)}
        />
      </FormControl> */}
            <Button colorScheme="teal" size="lg" width="100%" onClick={handleLogin}>
              Sign In
            </Button>
          </VStack>
        </Collapse>
        <Collapse in={isSignUpOpen} animateOpacity>
          <VStack spacing={4} width="100%" align="stretch">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Enter your name" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <Button colorScheme="teal" size="lg" width="100%">
              Sign Up
            </Button>
          </VStack>
        </Collapse>
        <Button colorScheme="teal" size="lg" width="100%" onClick={handleLoginClick}>
          Sign In
        </Button>
        <Button colorScheme="teal" size="lg" width="100%" onClick={handleSignUpClick}>
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
