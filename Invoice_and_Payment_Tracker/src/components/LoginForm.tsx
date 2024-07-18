import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";

const mockClarkSignIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "user@example.com" && password === "password") {
        resolve({ token: "fake-jwt-token" });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

const LoginForm = ({ onLogin, onOpenSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await mockClarkSignIn(email, password);
      onLogin(response.token);
      toast({
        title: "Login successful.",
        description: "You've successfully logged in.",
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

  return (
    <VStack spacing={4}>
      <Heading as="h2">Login</Heading>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleLogin}>Login</Button>
      <Button variant="link" onClick={onOpenSignUp}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default LoginForm;
