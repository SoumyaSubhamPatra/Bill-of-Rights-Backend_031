// src/components/InvoiceList.tsx
import React from 'react';
import { Box, Button, Text, VStack, HStack, Heading } from '@chakra-ui/react';

interface InvoiceListProps {
  invoices: any[];
  onUpdate: (invoice: any) => void;
  onDelete: (invoiceId: string) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onUpdate, onDelete }) => {
  return (
    <Box>
      <Heading as="h3" size="lg" mb={6} color="brand.700">Invoice List</Heading>
      <VStack spacing={4}>
        {invoices.map((invoice) => (
          <Box key={invoice.id} p={4} borderWidth="1px" borderRadius="lg" w="full" boxShadow="md">
            <VStack align="start" spacing={2}>
              <Text><strong>Invoice Number:</strong> {invoice.invoiceNumber}</Text>
              <Text><strong>Date:</strong> {invoice.date}</Text>
              <Text><strong>Due Date:</strong> {invoice.dueDate}</Text>
              <Text><strong>Customer ID:</strong> {invoice.customerId}</Text>
              <Text><strong>Total Amount:</strong> ${typeof invoice.totalAmount === 'number' ? invoice.totalAmount.toFixed(2) : 'N/A'}</Text>
              <HStack spacing={4}>
                <Button onClick={() => onUpdate(invoice)} colorScheme="teal">Edit</Button>
                <Button onClick={() => onDelete(invoice.id)} colorScheme="red">Delete</Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default InvoiceList;
