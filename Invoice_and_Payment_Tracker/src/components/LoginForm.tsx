import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../api"; // Update the import path

const LoginForm = ({ onLogin, onOpenSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      console.log("Attempting to log in:", username, password);
      const response = await loginUser(username, password);
      console.log("Login successful, token:", response.token);
      onLogin(response.token);
      toast({
        title: "Login successful.",
        description: "You've successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formBackground = useColorModeValue("white", "gray.700");

  return (
    <Box
      bg="gray.100"
      minH="70vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg={formBackground}
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxW="sm"
        w="full"
      >
        <VStack spacing={4}>
          <Heading as="h2" size="lg">
            Login
          </Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleTogglePassword}
                  variant="ghost"
                  aria-label="Toggle Password Visibility"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue" onClick={handleLogin} width="full">
            Login
          </Button>
          <Button variant="link" onClick={onOpenSignUp}>
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginForm;
