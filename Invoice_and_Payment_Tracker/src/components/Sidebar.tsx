import React from "react";
import { Link } from "react-router-dom";
import { Box, VStack, HStack, Text, Icon, useColorModeValue, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, IconButton } from "@chakra-ui/react";
import { MdDashboard, MdReceipt, MdShoppingCart, MdPeople, MdSettings, MdSend, MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import logo from '../assets/Logos.png'; // Make sure to replace this with the actual path to your logo image
import "../styles/styles.css";

const MotionHStack = motion(HStack);

const Sidebar: React.FC = () => {
  const bg = useColorModeValue("black", "black"); // Updated background color to black
  const color = useColorModeValue("gray.200", "gray.200");
  const hoverBg = useColorModeValue("gray.700", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sidebarItems = [
    { to: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/invoice", icon: MdReceipt, label: "Invoice" },
    { to: "/send-invoice", icon: MdSend, label: "Send Invoice" }, // Added Send Invoice item
    { to: "/product", icon: MdShoppingCart, label: "Product" },
    { to: "/customer", icon: MdPeople, label: "Customer" },
    { to: "/system-users", icon: MdSettings, label: "System Users" },
  ];

  return (
    <Flex>
      <IconButton
        aria-label="Open menu"
        icon={<MdMenu />}
        display={{ base: "block", md: "none" }}
        pos="fixed"
        top="1rem"
        left="1rem"
        onClick={onOpen}
        zIndex={10}
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg={bg}>
            <DrawerCloseButton color={color} />
            <VStack align="start" spacing={4} p={4} mt="4rem">
              {sidebarItems.map((item) => (
                <Link to={item.to} key={item.to} style={{ width: '100%' }} onClick={onClose}>
                  <MotionHStack
                    w="full"
                    p={3}
                    borderRadius="md"
                    _hover={{ bg: hoverBg, transform: "scale(1.05)", boxShadow: "lg" }}
                    transition="background-color 0.3s, transform 0.3s, box-shadow 0.3s"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon as={item.icon} boxSize={5} color={color} />
                    <Text fontSize="lg" fontWeight="medium" color={color}>
                      {item.label}
                    </Text>
                  </MotionHStack>
                </Link>
              ))}
            </VStack>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Box
        display={{ base: "none", md: "block" }}
        w="300px"
        h="100%"
        bg={bg}
        p={4}
        boxShadow="md"
        pos="fixed"
        left="0"
        top="0"
      >
        <Box mb={4} textAlign="center">
          {/* <img src={logo} alt="Payment Tracker Logo" className="logo-image" style={{ maxWidth: '5rem', height:'5rem', margin: '0 auto' }} /> */}
          <Text fontSize="xl" fontWeight="bold" color={color}>Payment Tracker</Text>
        </Box>
        <VStack align="start" spacing={4}>
          {sidebarItems.map((item) => (
            <Link to={item.to} key={item.to} style={{ width: '100%' }}>
              <MotionHStack
                w="full"
                p={3}
                borderRadius="md"
                _hover={{ bg: hoverBg, transform: "scale(1.05)", boxShadow: "lg" }}
                transition="background-color 0.3s, transform 0.3s, box-shadow 0.3s"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
              >
                <Icon as={item.icon} boxSize={5} color={color} />
                <Text fontSize="lg" fontWeight="medium" color={color}>
                  {item.label}
                </Text>
              </MotionHStack>
            </Link>
          ))}
        </VStack>
      </Box>

      <Box ml={{ base: 0, md: "300px" }} p={8} w="full">
        {/* The right-side content goes here */}
      </Box>
    </Flex>
  );
};

export default Sidebar;
