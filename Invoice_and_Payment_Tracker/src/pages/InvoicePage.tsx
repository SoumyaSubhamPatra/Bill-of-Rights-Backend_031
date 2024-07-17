// src/pages/InvoicePage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchInvoicesAsync, createInvoiceAsync, updateInvoiceAsync, deleteInvoiceAsync } from '../features/invoices/invoicesSlice';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';
import { Box, Heading, Spinner, Alert, AlertIcon, VStack } from '@chakra-ui/react';

const InvoicePage: React.FC = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const status = useSelector((state: RootState) => state.invoices.status);
  const error = useSelector((state: RootState) => state.invoices.error);

  useEffect(() => {
    dispatch(fetchInvoicesAsync());
  }, [dispatch]);

  const handleCreate = (invoice: any) => {
    dispatch(createInvoiceAsync(invoice));
  };

  const handleUpdate = (invoice: any) => {
    dispatch(updateInvoiceAsync(invoice));
  };

  const handleDelete = (invoiceId: string) => {
    dispatch(deleteInvoiceAsync(invoiceId));
  };

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" color="brand.700">Invoices</Heading>
        {status === 'loading' && <Spinner size="xl" />}
        {status === 'failed' && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <InvoiceForm onSubmit={handleCreate} />
        <InvoiceList invoices={invoices} onUpdate={handleUpdate} onDelete={handleDelete} />
      </VStack>
    </Box>
  );
};

export default InvoicePage;
