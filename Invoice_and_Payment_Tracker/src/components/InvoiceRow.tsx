import React, { useRef } from "react";
import { Tr, Td, IconButton, Box, Table, Thead, Th, Tbody } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useReactToPrint } from "react-to-print";

interface InvoiceRowProps {
  invoice: any;
  index: number;
  onEdit: (invoice: any, index: number) => void;
  onDelete: (invoiceId: string) => void;
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({
  invoice,
  index,
  onEdit,
  onDelete,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    onEdit(invoice, index);
  };

  const handleDeleteClick = () => {
    onDelete(invoice.id);
  };

  const handlePrint = useReactToPrint({
    content: () => rowRef.current,
  });

  return (
    <>
      <Box ref={rowRef} display="none">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Invoice Number</Th>
              <Th>Date</Th>
              <Th>Due Date</Th>
              <Th>Customer ID</Th>
              <Th>Total Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{invoice.invoiceNumber}</Td>
              <Td>{invoice.date}</Td>
              <Td>{invoice.dueDate}</Td>
              <Td>{invoice.customerId}</Td>
              <Td>{invoice.totalAmount.toFixed(2)}</Td>
              <Td>{invoice.status}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
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
            onClick={handleEdit}
            mr={2}
          />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            aria-label="Delete Invoice"
            size="sm"
            onClick={handleDeleteClick}
            mr={2}
          />
          <IconButton
            icon={<ExternalLinkIcon />}
            colorScheme="teal"
            aria-label="Print Invoice"
            size="sm"
            onClick={handlePrint}
          />
        </Td>
      </Tr>
    </>
  );
};

export default InvoiceRow;
