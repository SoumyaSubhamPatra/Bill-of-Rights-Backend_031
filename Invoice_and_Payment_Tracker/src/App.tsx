import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  ChakraProvider,
  useDisclosure,
  Box,
  Button,
  Image,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
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
import logo from "./assets/Logos.png"; // Ensure the path to your logo is correct

const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

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
    } else {
      onLoginOpen(); // Open login modal if not authenticated
    }
  }, [onLoginOpen]);

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
      onLoginOpen(); // Ensure login modal is open if not authenticated
    }
  }, [isAuthenticated, onLoginOpen]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  };

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    onLoginClose();
    navigate("/dashboard"); // Redirect to dashboard or another protected route
  };

  const handleSignUp = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    onSignUpClose();
    navigate("/dashboard"); // Redirect to dashboard or another protected route
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    onLoginOpen(); // Open the login modal after logging out
    navigate("/"); // Redirect to login page
  };

  return (
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
              <Route path="/send-invoice" element={<SendInvoice />} />
              <Route path="/product" element={<Product />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/system-users" element={<SystemUsers />} />
              <Route path="/" element={<Dashboard />} />{" "}
              {/* Redirect to Dashboard or another route */}
            </Routes>
          </div>
        </>
      ) : (
        // Ensure modals are displayed when not authenticated
        <Box textAlign="center" mt={10}>
          {/* Login modal will open automatically */}
        </Box>
      )}

      <Modal isOpen={isLoginOpen} onClose={onLoginClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{ minHeight: "70vh" }}>
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
            <LoginForm onLogin={handleLogin} onOpenSignUp={onSignUpOpen} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSignUpOpen} onClose={onSignUpClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{ minHeight: "70vh" }}>
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
    </div>
  );
};

const App = () => (
  <ChakraProvider>
    <Router>
      <AppContent />
    </Router>
  </ChakraProvider>
);

export default App;
