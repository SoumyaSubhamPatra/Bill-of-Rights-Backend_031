import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Alert,
  AlertIcon,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loadCustomers, addCustomer, editCustomer, removeCustomer } from '../features/customers/customerSlice';
import { motion } from 'framer-motion';

interface Customer {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

const Customer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, error, loading } = useSelector((state: RootState) => state.customers);
  const toast = useToast();
  const boxBgColor = useColorModeValue('gray.50', 'gray.700');
  const headingColor = useColorModeValue('brand.700', 'brand.300');
  const buttonColor = useColorModeValue('blue.500', 'blue.200');

  const [formState, setFormState] = useState<Customer>({
    id: 0,
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      await dispatch(editCustomer(formState));
      toast({
        title: 'Customer Updated',
        description: 'Customer information has been updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      await dispatch(addCustomer(formState));
      toast({
        title: 'Customer Added',
        description: 'A new customer has been added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    setFormState({ id: 0, name: '', email: '', address: '', phone: '' });
    setEditingCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setFormState(customer);
    setEditingCustomer(customer);
  };

  const handleDelete = async (customerId: number) => {
    await dispatch(removeCustomer(customerId));
    toast({
      title: 'Customer Deleted',
      description: 'Customer has been deleted.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box mx="auto" maxW={{ base: '90%', md: '80%', lg: '70%' }} py={{ base: 4, md: 8 }}>
      <VStack spacing={{ base: 4, md: 8 }}>
        <Heading as="h1" size="2xl" color={headingColor}>
          Customers
        </Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Box
          as="form"
          onSubmit={handleSubmit}
          mb={8}
          p={{ base: 4, md: 6 }}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg={boxBgColor}
          w="full"
        >
          <Heading as="h3" size="lg" mb={6} color={headingColor}>
            {editingCustomer ? 'Edit Customer' : 'Add Customer'}
          </Heading>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formState.name} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" value={formState.email} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input name="address" value={formState.address} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input name="phone" type="tel" value={formState.phone} onChange={handleChange} />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              bg={buttonColor}
              _hover={{ bg: 'blue.600' }}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {editingCustomer ? 'Update' : 'Add'}
            </Button>
          </VStack>
        </Box>
        <Box w="full" borderWidth="1px" borderRadius="lg" boxShadow="md" p={{ base: 2, md: 4 }} bg={boxBgColor}>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Address</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr key={customer.id} as={motion.tr} whileHover={{ scale: 1.02 }}>
                  <Td>{customer.name}</Td>
                  <Td>{customer.email}</Td>
                  <Td>{customer.address}</Td>
                  <Td>{customer.phone}</Td>
                  <Td>
                    <IconButton
                      icon={<EditIcon />}
                      colorScheme="blue"
                      aria-label="Edit Customer"
                      size="sm"
                      onClick={() => handleEdit(customer)}
                      mr={2}
                      as={motion.button}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      aria-label="Delete Customer"
                      size="sm"
                      onClick={() => handleDelete(customer.id)}
                      as={motion.button}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default Customer;
