// src/components/InvoiceForm.tsx
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, HStack, Heading } from '@chakra-ui/react';

interface InvoiceFormProps {
  onSubmit: (invoice: any) => void;
  invoice?: any;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, invoice }) => {
  const [formState, setFormState] = useState(invoice || {
    invoiceNumber: '',
    date: '',
    dueDate: '',
    customerId: '',
    items: [{ description: '', quantity: 1, price: 0, tax: 0 }],
    totalAmount: 0,
    currency: 'USD',
    status: 'unpaid',
    isRecurring: false,
    recurringInterval: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const items = [...formState.items];
      items[index] = { ...items[index], [name]: value };
      setFormState({ ...formState, items });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleAddItem = () => {
    setFormState({ ...formState, items: [...formState.items, { description: '', quantity: 1, price: 0, tax: 0 }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mb={8} p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading as="h3" size="lg" mb={6} color="brand.700">Create Invoice</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Invoice Number</FormLabel>
          <Input name="invoiceNumber" value={formState.invoiceNumber} onChange={handleChange} />
        </FormControl>
        <HStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={formState.date} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Due Date</FormLabel>
            <Input type="date" name="dueDate" value={formState.dueDate} onChange={handleChange} />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel>Customer ID</FormLabel>
          <Input name="customerId" value={formState.customerId} onChange={handleChange} />
        </FormControl>
        {formState.items.map((item, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" w="full" boxShadow="sm">
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Item Description</FormLabel>
                <Textarea name="description" value={item.description} onChange={(e) => handleChange(e, index)} />
              </FormControl>
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <Input type="number" name="quantity" value={item.quantity} onChange={(e) => handleChange(e, index)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input type="number" name="price" value={item.price} onChange={(e) => handleChange(e, index)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tax</FormLabel>
                  <Input type="number" name="tax" value={item.tax} onChange={(e) => handleChange(e, index)} />
                </FormControl>
              </HStack>
            </VStack>
          </Box>
        ))}
        <Button onClick={handleAddItem} colorScheme="blue" variant="outline" w="full">Add Item</Button>
        <FormControl isRequired>
          <FormLabel>Total Amount</FormLabel>
          <Input type="number" name="totalAmount" value={formState.totalAmount} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue" w="full">Submit</Button>
      </VStack>
    </Box>
  );
};

export default InvoiceForm;
