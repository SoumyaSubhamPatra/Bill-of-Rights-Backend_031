// src/components/SendInvoice.tsx
import React, { useState } from 'react';
import { Box, Button, Input, Textarea, useToast } from '@chakra-ui/react';
import emailjs from 'emailjs-com';

const SendInvoice: React.FC = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const toast = useToast();

  const handleSend = async () => {
    if (!recipientEmail || !subject || !message || !attachment) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields and attach an invoice.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('to_email', recipientEmail);
      formData.append('subject', subject);
      formData.append('message', message);
      formData.append('attachment', attachment);

      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID');

      toast({
        title: 'Success',
        description: 'Invoice sent successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send invoice. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Input
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        mb={3}
      />
      <Input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        mb={3}
      />
      <Textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        mb={3}
      />
      <Input
        type="file"
        onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)}
        mb={3}
      />
      <Button onClick={handleSend} colorScheme="teal">
        Send Invoice
      </Button>
    </Box>
  );
};

export default SendInvoice;
