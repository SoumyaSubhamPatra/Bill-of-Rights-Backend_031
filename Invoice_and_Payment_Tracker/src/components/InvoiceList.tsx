import React, { useRef } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useBreakpointValue,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";

interface InvoiceListProps {
  invoices: any[];
  onUpdate: (invoice: any, index: number) => void;
  onDelete: (invoiceId: string) => void;
  onEdit: (invoice: any, index: number) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onUpdate,
  onDelete,
  onEdit,
}) => {
  const handleEdit = (invoice: any, index: number) => {
    onEdit(invoice, index);
  };

  const handleDeleteClick = (invoiceId: string) => {
    onDelete(invoiceId);
  };

  const tableSize = useBreakpointValue({ base: "sm", md: "md" });

  const tableRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.html(tableRef.current as HTMLElement, {
      callback: function (doc) {
        doc.save("invoices.pdf");
      },
      x: 10,
      y: 10,
    });
  };

  if (!invoices || invoices.length === 0) {
    return (
      <Box w="full" p={4}>
        <Text>No invoices found.</Text>
      </Box>
    );
  }

  return (
    <Box
      w="full"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      p={{ base: 2, md: 4 }}
      overflowX="auto"
      mx="auto"
    >
      <HStack spacing={4} mb={4}>
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme="teal"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
        <Button
          leftIcon={<ExternalLinkIcon />}
          colorScheme="teal"
          onClick={handlePrint}
        >
          Print
        </Button>
      </HStack>
      <Box ref={tableRef}>
        <Table variant="simple" size={tableSize} w="full">
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
            {invoices.map((invoice, index) => (
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
                    onClick={() => handleEdit(invoice, index)}
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
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default InvoiceList;
