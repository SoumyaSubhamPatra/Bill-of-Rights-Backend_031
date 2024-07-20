import React, { useState } from "react";
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
import "./App.css"
// import InvoiceForm from "./components/InvoiceForm";
import InvoicePage from "./pages/InvoicePage";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import SendInvoice from "./components/SendInvoice";

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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    onLoginClose();
  };

  const handleSignUp = (token) => {
    setIsAuthenticated(true);
    onSignUpClose();
  };

  return (
    <div className="container">
      <ChakraProvider>
      <Router>
        <div className={darkMode ? "dark-theme" : ""}>
          {isAuthenticated ? (
            <>
              <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
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

        <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <LoginForm onLogin={handleLogin} onOpenSignUp={onSignUpOpen} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isSignUpOpen} onClose={onSignUpClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign Up</ModalHeader>
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
