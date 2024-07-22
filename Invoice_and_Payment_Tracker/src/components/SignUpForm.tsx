// src/components/SignUpForm.tsx
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
  Select,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpUser } from '../features/signup/SignUp';

const SignUpForm = ({ onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // Default role
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSignUp = async () => {
    try {
      const response = await signUpUser(username, password, role);
      onSignUp(response.token);
      toast({
        title: "Sign up successful.",
        description: "You've successfully signed up.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
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
            Sign Up
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
          <FormControl id="role">
            <FormLabel>Role</FormLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" onClick={handleSignUp} width="full">
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignUpForm;
