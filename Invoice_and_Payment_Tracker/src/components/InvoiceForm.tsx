import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  Select,
} from "@chakra-ui/react";

interface InvoiceFormProps {
  onSubmit: (invoice: any) => void;
  invoice?: any; // Optional invoice prop for editing
  onCancelEdit?: () => void; // Optional function to cancel editing
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  onSubmit,
  invoice,
  onCancelEdit,
}) => {
  const [formState, setFormState] = useState({
    invoiceNumber: invoice?.invoiceNumber || "",
    date: invoice?.date || "",
    dueDate: invoice?.dueDate || "",
    customerId: invoice?.customerId || "",
    items: invoice?.items || [
      { description: "", quantity: 1, price: 0, tax: 0 },
    ],
    totalAmount: invoice?.totalAmount || 0,
    currency: invoice?.currency || "USD",
    status: invoice?.status || "unpaid",
    isRecurring: invoice?.isRecurring || false,
    recurringInterval: invoice?.recurringInterval || null,
  });

  useEffect(() => {
    calculateTotalAmount(); // Recalculate total amount whenever items change
  }, [formState.items]);

  useEffect(() => {
    // Update formState when invoice prop changes (for editing)
    if (invoice) {
      setFormState({
        invoiceNumber: invoice.invoiceNumber || "",
        date: invoice.date || "",
        dueDate: invoice.dueDate || "",
        customerId: invoice.customerId || "",
        items: invoice.items || [
          { description: "", quantity: 1, price: 0, tax: 0 },
        ],
        totalAmount: invoice.totalAmount || 0,
        currency: invoice.currency || "USD",
        status: invoice.status || "unpaid",
        isRecurring: invoice.isRecurring || false,
        recurringInterval: invoice.recurringInterval || null,
      });
    }
  }, [invoice]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const items = [...formState.items];
      items[index] = {
        ...items[index],
        [name]: name === "description" ? value : Number(value),
      };
      setFormState({ ...formState, items });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleAddItem = () => {
    setFormState({
      ...formState,
      items: [
        ...formState.items,
        { description: "", quantity: 1, price: 0, tax: 0 },
      ],
    });
  };

  const calculateTotalAmount = () => {
    const total = formState.items.reduce((acc, item) => {
      const itemTotal = item.quantity * item.price + item.tax;
      return acc + itemTotal;
    }, 0);
    setFormState({ ...formState, totalAmount: total });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState); // Submit the form state to parent component for processing
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      mb={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading as="h3" size="lg" mb={6} color="brand.700">
        {invoice ? "Edit Invoice" : "Create Invoice"}
      </Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Invoice Number</FormLabel>
          <Input
            name="invoiceNumber"
            value={formState.invoiceNumber}
            onChange={handleChange}
          />
        </FormControl>
        <HStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              name="dueDate"
              value={formState.dueDate}
              onChange={handleChange}
            />
          </FormControl>
        </HStack>
        <FormControl isRequired>
          <FormLabel>Customer ID</FormLabel>
          <Input
            name="customerId"
            value={formState.customerId}
            onChange={handleChange}
          />
        </FormControl>
        {formState.items.map((item, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            w="full"
            boxShadow="sm"
          >
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Item Description</FormLabel>
                <Textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleChange(e, index)}
                />
              </FormControl>
              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Tax</FormLabel>
                  <Input
                    type="number"
                    name="tax"
                    value={item.tax}
                    onChange={(e) => handleChange(e, index)}
                  />
                </FormControl>
              </HStack>
            </VStack>
          </Box>
        ))}
        <Button
          onClick={handleAddItem}
          colorScheme="blue"
          variant="outline"
          w="full"
        >
          Add Item
        </Button>
        <FormControl isRequired>
          <FormLabel>Total Amount</FormLabel>
          <Input
            type="number"
            name="totalAmount"
            value={formState.totalAmount.toFixed(2)}
            readOnly
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={formState.status}
            onChange={handleChange}
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </Select>
        </FormControl>
        {onCancelEdit && (
          <Button
            onClick={onCancelEdit}
            colorScheme="gray"
            w="full"
            variant="outline"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" colorScheme="blue" w="full">
          {invoice ? "Update" : "Submit"}
        </Button>
      </VStack>
    </Box>
  );
};

export default InvoiceForm;
