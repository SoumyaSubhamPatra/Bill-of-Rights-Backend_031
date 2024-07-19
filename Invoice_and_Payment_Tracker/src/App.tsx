import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, useDisclosure, Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Product from "./components/Product";
import Customer from "./components/Customer";
import SystemUsers from "./components/SystemUsers";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePage from "./pages/InvoicePage";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./styles/styles.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      onLoginClose();
    }
  }, [onLoginClose]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    onLoginClose();
  };

  const handleSignUp = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    onSignUpClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    onLoginOpen(); // Open the login modal when logging out
  };

  return (
    <ChakraProvider>
      <Router>
        <div className={darkMode ? "dark-theme" : ""}>
          <Navbar
            toggleTheme={toggleTheme}
            darkMode={darkMode}
            isAuthenticated={isAuthenticated}
            onLoginOpen={onLoginOpen}
            handleLogout={handleLogout}
          />
          {isAuthenticated ? (
            <>
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/invoice" element={<InvoiceForm />} />
                  <Route path="/" element={<InvoicePage />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/customer" element={<Customer />} />
                  <Route path="/system-users" element={<SystemUsers />} />
                  <Route path="/" element={<Dashboard />} />
                </Routes>
              </div>
            </>
          ) : null}

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
        </div>
      </Router>
    </ChakraProvider>
  );
};

export default App;
