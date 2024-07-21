import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, useDisclosure, Box, Button } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Product from "./components/Product";
import Customer from "./components/Customer";
import SystemUsers from "./components/SystemUsers";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import "./styles/styles.css";
import "./App.css";
import InvoicePage from "./pages/InvoicePage";
import SendInvoice from "./components/SendInvoice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
} from "@chakra-ui/react";
import logo from "./assets/Logos.png"; // Make sure the path to your logo is correct

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  useEffect(() => {
    // Check localStorage for authentication token
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    onLoginClose();
  };

  const handleSignUp = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    onSignUpClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <div className="container">
      <ChakraProvider>
        <Router>
          <div className={darkMode ? "dark-theme" : ""}>
            {isAuthenticated ? (
              <>
                <Navbar
                  toggleTheme={toggleTheme}
                  darkMode={darkMode}
                  onLogout={handleLogout}
                />
                <Sidebar />
                <div className="content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/invoice" element={<InvoicePage />} />
                    <Route path="/invoicepage" element={<InvoicePage />} />
                    <Route path="send-invoice" element={<SendInvoice />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/system-users" element={<SystemUsers />} />
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
                </div>
              </>
            ) : (
              <Box textAlign="center" mt={10}>
                <Button onClick={onLoginOpen}>Login</Button>
              </Box>
            )}
          </div>

          <Modal isOpen={isLoginOpen} onClose={onLoginClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box display="flex" alignItems="center">
                  <Image
                    src={logo}
                    alt="Payment Tracker Logo"
                    boxSize="40px"
                    mr={2}
                  />
                  <Text fontSize="xl">Payment Tracker</Text>
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <LoginForm
                  onLogin={handleLogin}
                  onOpenSignUp={() => {
                    onSignUpOpen();
                    onLoginClose();
                  }}
                />
              </ModalBody>
            </ModalContent>
          </Modal>

          <Modal isOpen={isSignUpOpen} onClose={onSignUpClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box display="flex" alignItems="center">
                  <Image
                    src={logo}
                    alt="Payment Tracker Logo"
                    boxSize="40px"
                    mr={2}
                  />
                  <Text fontSize="xl">Payment Tracker</Text>
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SignUpForm onSignUp={handleSignUp} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Router>
      </ChakraProvider>
    </div>
  );
};

export default App;
