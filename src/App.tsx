// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import AttainmintLanding from './pages/AttainmintLanding';
import BlockchainResume from './pages/BlockchainResume';
import Pricing from './pages/Pricing';
import ContactUs from './pages/ContactUs';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import PublicLayout from './components/PublicLayout';
import { useTheme } from './contexts/ThemeContext';
import './App.css';

function AppContent() {
  const { darkMode, toggleDarkMode } = useTheme();
  
  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in
    console.log('Google sign in clicked');
  };

  const handleMicrosoftSignIn = () => {
    // TODO: Implement Microsoft sign in
    console.log('Microsoft sign in clicked');
  };