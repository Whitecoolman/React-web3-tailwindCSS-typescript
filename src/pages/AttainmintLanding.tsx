import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Shield, Brain, Target, 
  CheckCircle, MessageSquare, FileText,
  BarChart3, Users, Sparkles, Layers,
  LineChart, Trophy, Clock, ArrowUpRight,
  Bot, Mail, Phone, Coins, Briefcase,
  Star, Search, Zap, RefreshCw, Play, Pause,
  Search as MagnifyingGlass, Share, Lock, User, UserCheck, Database, Building, UserPlus, Link, Award, TrendingUp, Eye
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import IntegrationAnimation from '../components/IntegrationAnimation';
import logo from '../assets/logo_icon.png';
import backgroundImage from '../assets/updated_background_transparent.png';
import networkCanopy from '../assets/network_canopy.webm';
import dataTree from '../assets/data_tree2.webp';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import pumpfunLogo from '../assets/pumpfun_logo.webp';
import { useTokenData } from '../hooks/useTokenData';
import BlockchainResume from './BlockchainResume';
import fallingLeaves from '../assets/falling_leaves2.webm';

interface LandingPageProps {
  onOpenWaitlistSignup: () => void;
}

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
  color: string;
  stats: Array<{ label: string; value: string }>;
  tradingLink?: {
    url: string;
    logo: string;
    chart?: string;
  };
}

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface AIFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  features: string[];
}

interface HiringFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}

interface FAQ {
  q: string;
  a: string;
}

// Declare TradingView types
declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => any;
    };
  }
}