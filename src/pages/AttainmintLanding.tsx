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

const TokenChart = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-teal-500/10 to-emerald-500/10 backdrop-blur shadow-xl">
      <iframe
        title="MINT Token Chart"
        src="https://dexscreener.com/solana/6bmxm9pzqkra4n3itdgtkmtjc55dsjv7dwqg525mh81c?embed=1&theme=dark&trades=1"
        className="w-full h-full border-0"
      />
    </div>
  );
};

export default function LandingPage({ onOpenWaitlistSignup }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';
  const tokenData = useTokenData();
  const [isPortalHovered, setIsPortalHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('sales');
  const [step, setStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const benefits: Benefit[] = [
    {
      icon: Clock,
      title: "Universal Rankings",
      description: "See how your sales team stacks up against the industry. Access verified performance data across organizations."
    },
    {
      icon: Shield,
      title: "Market Insights",
      description: "Get real benchmarking data on sales performance, compensation, and success patterns across companies."
    },
    {
      icon: Target,
      title: "Talent Intelligence",
      description: "Identify top performers, track industry trends, and make data-driven decisions with verified sales metrics."
    },
    {
      icon: Users,
      title: "Success Patterns",
      description: "Understand what drives success across organizations. Learn from verified top performers in your industry."
    }
  ];

  const salesCommandFeatures: AIFeature[] = [
    {
      icon: Bot,
      title: "AI-Powered Action Center",
      description: "Scroll through a personalized feed of prioritized actions, enriched contacts, and opportunities. AI agents analyze your data 24/7, suggest next steps, and help you take action directly from the feed.",
      stats: [
        { label: "Time Saved Daily", value: "3.5 hrs" },
        { label: "Action Rate", value: "+72%" }
      ],
      features: [
        "Smart feed prioritization",
        "One-click actions from feed",
        "Real-time contact enrichment",
        "AI agent assistance"
      ]
    },
    {
      icon: Brain,
      title: "AI Sales Agents",
      description: "Your 24/7 sales team that works while you sleep. Every AI action is blockchain-verified and auditable. AI agents continuously enrich your contacts, analyze patterns, and provide real-time guidance with complete transparency.",
      stats: [
        { label: "Response Rate", value: "+85%" },
        { label: "Verified Actions", value: "100%" }
      ],
      features: [
        "Blockchain-verified AI actions",
        "Auditable automation trail",
        "Transparent decision logs",
        "Real-time verification"
      ]
    },
    {
      icon: Target,
      title: "Social-Style Action Feed",
      description: "A familiar social media-style interface that makes sales actions intuitive. Scroll through prioritized opportunities, take action directly, and get AI assistance at every step.",
      stats: [
        { label: "Database Size", value: "45M+" },
        { label: "Contacts", value: "250M+" }
      ],
      features: [
        "Social-style scroll interface",
        "Prioritized opportunities",
        "Direct action capabilities",
        "Continuous AI assistance"
      ]
    },
    {
      icon: MessageSquare,
      title: "24/7 Sales Assistant",
      description: "Get real-time help with emails, calls, and meetings as you work. AI agents analyze conversations, suggest responses, and help you close more deals.",
      stats: [
        { label: "Availability", value: "24/7" },
        { label: "Success Rate", value: "+68%" }
      ],
      features: [
        "Real-time conversation analysis",
        "Smart response suggestions",
        "Deal coaching",
        "Performance insights"
      ]
    }
  ];

  const hiringFeatures: HiringFeature[] = [
    {
      title: "Candidate Verification Portal",
      description: "Instantly verify sales achievements with blockchain-backed proof and multi-layer validation",
      icon: Shield,
      features: [
        "One-click blockchain verification",
        "Multi-source validation checks",
        "Historical performance tracking",
        "Verification audit trails"
      ]
    },
    {
      title: "Advanced Analytics Dashboard",
      description: "Compare candidates with powerful analytics and data visualization tools",
      icon: BarChart3,
      features: [
        "Side-by-side metric comparison",
        "Performance trend analysis",
        "Industry benchmarking",
        "Custom scoring models"
      ]
    },
    {
      title: "Talent Pipeline Management",
      description: "Streamline your hiring workflow with automated candidate tracking and assessment",
      icon: Users,
      features: [
        "Automated candidate scoring",
        "Team collaboration tools",
        "Interview scheduling",
        "Assessment templates"
      ]
    }
  ];

  const mainFeatures: Feature[] = [
    {
      id: "individual-tracking",
      title: "Personal Sales History",
      subtitle: "Your Career Story, Your Control",
      description: "Build your sales track record in just 2 minutes per quarter. Start with basic numbers, then add verification layers as you grow. Perfect for job changes, reviews, and proving your long-term impact - no company participation needed.",
      icon: Target,
      benefits: [
        "2-minute quarterly updates",
        "Track deals and quota attainment",
        "Add proof points over time",
        "Follows your entire career"
      ],
      color: "teal",
      stats: [
        { label: "Time Per Quarter", value: "2 min" },
        { label: "Success Rate", value: "98%" }
      ]
    },
    {
      id: "progressive-trust",
      title: "Progressive Trust Building",
      subtitle: "From Basic to Bulletproof",
      description: "Start with simple self-reporting and build credibility over time. Each verification layer strengthens your profile - from document uploads to peer endorsements, manager verification, and system integrations.",
      icon: Shield,
      benefits: [
        "Multiple verification types",
        "Upload standard documents",
        "Get peer endorsements",
        "Connect company systems"
      ],
      color: "teal",
      stats: [
        { label: "Free Verifications", value: "6+" },
        { label: "Premium Layers", value: "5+" }
      ]
    },
    {
      id: "blockchain-resume",
      title: "Universal Sales Rankings",
      subtitle: "See Where You Stand",
      description: "Compare your performance against top sales professionals across organizations. Access industry benchmarks, compensation data, and success patterns. Perfect for negotiations and career planning.",
      icon: Briefcase,
      benefits: [
        "Cross-company benchmarks",
        "Verification proofs on-chain",
        "Success pattern analysis",
        "Performance percentiles"
      ],
      color: "teal",
      stats: [
        { label: "Data Points", value: "45M+" },
        { label: "Companies", value: "10K+" }
      ]
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      subtitle: "You Control Your Data",
      description: "We never store sensitive documents - only verification proofs go on the blockchain. Documents like W2s and pay stubs are verified, then immediately discarded. You control what metrics to share and with whom.",
      icon: Lock,
      benefits: [
        "Automatic data redaction",
        "Documents never stored",
        "Verification proofs only",
        "GDPR compliant"
      ],
      color: "teal",
      stats: [
        { label: "Data Control", value: "100%" },
        { label: "Privacy First", value: "Always" }
      ]
    }
  ];