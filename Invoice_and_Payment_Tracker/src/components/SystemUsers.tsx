// src/components/SystemUsers.tsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Box,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const SystemUsers = () => {
  const [users, setUsers] = useState([]);
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://api-payment-e5gt.onrender.com/users");
      setUsers(response.data);
    } catch (error) {
      toast({
        title: "Error.",
        description: "Failed to fetch users.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Implement edit functionality here
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://api-payment-e5gt.onrender.com/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast({
        title: "User deleted.",
        description: "User has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error.",
        description: "Failed to delete user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={8} overflowX="auto">
      <Heading as="h2" size="lg" mb={4}>
        System Users
      </Heading>
      <Table variant="simple" size={isMobile ? "sm" : "md"}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.username}</Td>
              <Td>{user.role}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEdit(user.id)}
                  mr={2}
                  colorScheme="blue"
                  aria-label="Edit User"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(user.id)}
                  colorScheme="red"
                  aria-label="Delete User"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SystemUsers;
