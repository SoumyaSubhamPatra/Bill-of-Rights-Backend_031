// src/pages/InvoicePage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SendInvoice from '../components/SendInvoice';

const InvoicePrint: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoiceAttachment, setInvoiceAttachment] = useState<File | null>(null);

  // Fetch or generate the invoice file based on `id`
  const fetchInvoiceAttachment = async () => {
    // Implement your logic to fetch or generate the invoice file
    // For demo purposes, we are setting a placeholder file
    const response = await fetch(`/api/invoice/${id}/pdf`);
    const blob = await response.blob();
    setInvoiceAttachment(new File([blob], `invoice_${id}.pdf`));
  };

  React.useEffect(() => {
    fetchInvoiceAttachment();
  }, [id]);

  return (
    <div>
      <h1>Invoice {id}</h1>
      {/* Render the invoice details here */}
      {invoiceAttachment && (
        <SendInvoice invoiceId={id} invoiceAttachment={invoiceAttachment} />
      )}
    </div>
  );
};

export default InvoicePrint;
