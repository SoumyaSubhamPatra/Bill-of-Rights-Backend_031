// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Box, VStack, HStack, Text, Icon, useColorModeValue, Flex } from "@chakra-ui/react";
import { MdDashboard, MdReceipt, MdShoppingCart, MdPeople, MdSettings } from "react-icons/md";
import { motion } from "framer-motion";

const MotionHStack = motion(HStack);

const Sidebar: React.FC = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.700", "gray.200");
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  const sidebarItems = [
    { to: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/invoice", icon: MdReceipt, label: "Invoice" },
    { to: "/product", icon: MdShoppingCart, label: "Product" },
    { to: "/customer", icon: MdPeople, label: "Customer" },
    { to: "/system-users", icon: MdSettings, label: "System Users" },
  ];

  return (
    <Flex>
      <Box w="300px" h="100%" bg={bg} p={4} boxShadow="md" pos="absolute" left="0" top="60px">
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
      <Box ml="250px" p={8} flex="1">
        {/* The right-side content goes here */}
      </Box>
    </Flex>
  );
};

export default Sidebar;
