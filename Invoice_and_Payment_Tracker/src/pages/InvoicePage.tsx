import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  fetchInvoicesAsync,
  createInvoiceAsync,
  updateInvoiceAsync,
  deleteInvoiceAsync,
} from "../features/invoices/invoicesSlice";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const InvoicePage: React.FC = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const status = useSelector((state: RootState) => state.invoices.status);
  const error = useSelector((state: RootState) => state.invoices.error);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchInvoicesAsync());
  }, [dispatch]);

  const handleCreate = (invoice: any) => {
    dispatch(createInvoiceAsync(invoice));
  };

  const handleUpdate = (invoice: any) => {
    if (editingIndex !== null) {
      const invoiceToUpdate = { ...invoices[editingIndex], ...invoice }; // Ensure id is preserved
      dispatch(updateInvoiceAsync(invoiceToUpdate));
      setEditingIndex(null); // Clear editing state after update
    }
  };

  const handleDelete = (invoiceId: string) => {
    dispatch(deleteInvoiceAsync(invoiceId));
  };

  const handleEdit = (invoice: any, index: number) => {
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const boxBgColor = useColorModeValue("gray.50", "gray.700");
  const headingColor = useColorModeValue("brand.700", "brand.300");

  return (
    <Box
      p={{ base: 4, md: 8 }}
      mx="auto"
      maxW={{ base: "100%", md: "1000px" }}
      w="full"
      bg={boxBgColor}
    >
      <VStack spacing={{ base: 4, md: 8 }}>
        <Heading as="h1" size="2xl" color={headingColor}>
          Invoices
        </Heading>
        {status === "loading" && <Spinner size="xl" />}
        {status === "failed" && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <InvoiceForm
          onSubmit={editingIndex !== null ? handleUpdate : handleCreate}
          invoice={editingIndex !== null ? invoices[editingIndex] : undefined}
          onCancelEdit={handleCancelEdit}
        />
        <InvoiceList
          invoices={invoices}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </VStack>
    </Box>
  );
};

export default InvoicePage;
