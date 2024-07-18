// src/components/InvoiceList.tsx

import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface InvoiceListProps {
  invoices: any[];
  onUpdate: (invoice: any, index: number) => void; // Update to include index parameter
  onDelete: (invoiceId: string) => void;
  onEdit: (invoice: any, index: number) => void; // Update to include index parameter
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onUpdate,
  onDelete,
  onEdit,
}) => {
  const handleEdit = (invoice: any, index: number) => {
    // Accept index parameter
    onEdit(invoice, index); // Pass selected invoice data and index to parent component (InvoicePage) for editing
  };

  const handleDeleteClick = (invoiceId: string) => {
    onDelete(invoiceId);
  };

  if (!invoices || invoices.length === 0) {
    return (
      <Box w="full" p={4}>
        <p>No invoices found.</p>
      </Box>
    );
  }

  return (
    <Box w="full" borderWidth="1px" borderRadius="lg" boxShadow="md" p={4}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Invoice Number</Th>
            <Th>Date</Th>
            <Th>Due Date</Th>
            <Th>Customer ID</Th>
            <Th>Total Amount</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoices.map(
            (
              invoice,
              index // Provide index to map function
            ) => (
              <Tr key={invoice.id}>
                <Td>{invoice.invoiceNumber}</Td>
                <Td>{invoice.date}</Td>
                <Td>{invoice.dueDate}</Td>
                <Td>{invoice.customerId}</Td>
                <Td>{invoice.totalAmount.toFixed(2)}</Td>
                <Td>{invoice.status}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    aria-label="Edit Invoice"
                    size="sm"
                    onClick={() => handleEdit(invoice, index)} // Call handleEdit with invoice data and index
                    mr={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Delete Invoice"
                    size="sm"
                    onClick={() => handleDeleteClick(invoice.id)}
                  />
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InvoiceList;
