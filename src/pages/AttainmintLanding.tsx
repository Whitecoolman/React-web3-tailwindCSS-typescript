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

  const howItWorks = [
    {
      step: 1,
      title: "2-Minute Start",
      description: "Begin with just basic numbers - deals closed and quota. Takes 2 minutes to log your first quarter. Later, connect your tools to automate everything.",
      icon: Clock,
      details: [
        "2-minute initial setup",
        "Basic numbers only",
        "Optional automation later",
        "Mobile-friendly"
      ]
    },
    {
      step: 2,
      title: "Simple Verification",
      description: "Verify your corporate email address to establish company affiliation. Then strengthen your profile with standard documents like W2s and offer letters.",
      icon: Shield,
      details: [
        "Secure email verification",
        "Standard document proof",
        "Verification proofs on-chain",
        "Privacy controls"
      ]
    },
    {
      step: 3,
      title: "Lifetime Value",
      description: "Your verified sales history becomes a powerful asset that moves with your career. Perfect for job searches, reviews, and proving your long-term impact.",
      icon: CheckCircle,
      details: [
        "Complete history ready",
        "Follows your career",
        "Instant verification",
        "Privacy controls"
      ]
    }
  ];

  // Add verification levels explanation
  const verificationLevels = [
    {
      level: 1,
      title: "Self-Reported",
      description: "Just log basic numbers like deals closed and quota. Takes 2 minutes to update each quarter - no complex data entry needed. Each entry is timestamped on the blockchain.",
      icon: FileText,
      badge: "Free",
      color: "emerald",
      subBadge: "Basic",
      tags: ["Free Forever", "2-Min Updates"]
    },
    {
      level: 2,
      title: "Work Email",
      description: "Verify your corporate email address to establish company affiliation. Simple, secure process with no inbox access needed.",
      icon: Mail,
      badge: "Free",
      color: "emerald",
      subBadge: "Email Verified",
      tags: ["Free Forever", "Secure"]
    },
    {
      level: 3,
      title: "Document Proof",
      description: "Verify past compensation and roles through standard documents (W2s, offer letters, pay stubs). We extract only the key data points and create blockchain verification proofs - the original documents are never stored or retained.",
      icon: FileText,
      badge: "Free",
      color: "emerald",
      subBadge: "Doc Verified",
      tags: ["Free Forever", "Privacy First"]
    },
    {
      level: 4,
      title: "LinkedIn Profile",
      description: "Connect your LinkedIn to add social credibility. Verify your work history, role changes, and professional network automatically.",
      icon: Link,
      badge: "Free",
      color: "emerald",
      subBadge: "Profile Verified",
      tags: ["Free Forever", "Social Proof"]
    },
    {
      level: 5,
      title: "Peer Endorsements",
      description: "Get backup from colleagues with verified work emails from your company. They confirm specific achievements they witnessed firsthand.",
      icon: Users,
      badge: "Free",
      color: "emerald",
      subBadge: "Peer Verified",
      tags: ["Free Forever", "Team Backup"]
    },
    {
      level: 6,
      title: "Achievement Badges",
      description: "Upload certificates for President's Club, sales competitions, training programs. Build a complete picture of your sales expertise.",
      icon: Award,
      badge: "Free",
      color: "emerald",
      subBadge: "Award Verified",
      tags: ["Free Forever", "Recognition Proof"]
    },
    {
      level: 7,
      title: "Manager Verification",
      description: "When your company joins, managers can verify your achievements through their corporate account. Perfect for validating quarterly performance.",
      icon: UserCheck,
      badge: "Company",
      color: "indigo",
      subBadge: "Manager Verified",
      tags: ["Company Enabled", "High Trust"]
    },
    {
      level: 8,
      title: "Activity Tracking",
      description: "Connect your outbound tools (Outreach, SalesLoft, etc.) to verify prospecting activity. Prove your hustle with verified outbound metrics.",
      icon: Target,
      badge: "Company",
      color: "indigo",
      subBadge: "Activity Verified",
      tags: ["Company Enabled", "Real-time"]
    },
    {
      level: 9,
      title: "CRM Integration",
      description: "Connect your company's CRM to automatically verify deals, pipeline, and quota attainment. Customer data stays private - only your metrics sync.",
      icon: Database,
      badge: "Company",
      color: "indigo",
      subBadge: "Auto Verified",
      tags: ["Company Enabled", "Deal Proof"]
    },
    {
      level: 10,
      title: "Payroll Integration",
      description: "Connect to company payroll systems (ADP, etc.) to verify OTE, commissions, and bonuses. All compensation data is encrypted and private.",
      icon: Coins,
      badge: "Company",
      color: "indigo",
      subBadge: "Comp Verified",
      tags: ["Company Enabled", "Commission Proof"]
    },
    {
      level: 11,
      title: "Performance Reviews",
      description: "Sync your official performance review data to verify rankings, improvement, and achievements. All feedback remains private and secure.",
      icon: TrendingUp,
      badge: "Company",
      color: "indigo",
      subBadge: "Review Verified",
      tags: ["Company Enabled", "Growth Proof"]
    }
  ];

  const userTypes = [
    {
      type: "Sales Professionals",
      icon: User,
      description: "Build your verified track record and stand out in a competitive market.",
      benefits: [
        { text: "2-minute quarterly updates", isPremium: false },
        { text: "Compare against top performers", isPremium: false },
        { text: "Track your career progression", isPremium: false },
        { text: "Showcase verified achievements", isPremium: false },
        { text: "Automatic CRM verification", isPremium: true },
        { text: "Compensation benchmarking", isPremium: true }
      ]
    },
    {
      type: "Sales Leaders",
      icon: Users,
      description: "Discover industry patterns and identify winning strategies across organizations.",
      benefits: [
        { text: "Universal sales leaderboard", isPremium: true },
        { text: "Success pattern analysis", isPremium: true },
        { text: "Team performance optimization", isPremium: true },
        { text: "Identify top talent early", isPremium: true },
        { text: "Industry-wide benchmarking", isPremium: true },
        { text: "Retention risk indicators", isPremium: true }
      ]
    },
    {
      type: "Hiring Teams",
      icon: UserPlus,
      description: "Make data-driven hiring decisions with verified performance history.",
      benefits: [
        { text: "Verify past performance", isPremium: false },
        { text: "Predict future success", isPremium: false },
        { text: "Compare candidate metrics", isPremium: false },
        { text: "Role fit assessment", isPremium: true },
        { text: "Team dynamic analysis", isPremium: true },
        { text: "Skill gap identification", isPremium: true }
      ]
    },
    {
      type: "Organizations",
      icon: Building,
      description: "Transform your sales organization with data-driven insights and benchmarking.",
      benefits: [
        { text: "Cross-industry comparisons", isPremium: true },
        { text: "Identify winning patterns", isPremium: true },
        { text: "Optimize compensation plans", isPremium: true },
        { text: "Improve hiring accuracy", isPremium: true },
        { text: "Reduce turnover risk", isPremium: true },
        { text: "Strategic talent planning", isPremium: true }
      ]
    }
  ];

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/get-csrf-token', {
          withCredentials: true,
        });
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        setError('Failed to get CSRF token.');
      }
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 0);
  }, [location]);

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Increase speed slightly to 50%
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/signup_to_waitlist', 
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error: any) {
      console.error('There was an error submitting the form!', error);
      setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTextColor = (type: 'primary' | 'secondary' | 'muted') => {
    switch(type) {
      case 'primary':
        return darkMode ? 'text-white' : 'text-gray-900';
      case 'secondary':
        return darkMode ? 'text-gray-200' : 'text-gray-800';
      case 'muted':
        return darkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getSectionBg = (type: 'primary' | 'secondary' | 'accent') => {
    switch(type) {
      case 'primary':
        return darkMode ? 'bg-gray-900' : 'bg-white';
      case 'secondary':
        return darkMode ? 'bg-gray-800/50' : 'bg-gray-50';
      case 'accent':
        return darkMode ? 'bg-black/30' : 'bg-gray-100';
    }
  };

  const renderFeature = (feature: Feature) => (
    <div key={feature.id} className="relative space-y-6">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${feature.color === 'teal' ? 'bg-teal-500/10' : ''}`}>
          <feature.icon className="w-6 h-6 text-teal-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-2xl font-semibold ${getTextColor('primary')}`}>
            {feature.title}
          </h3>
          <p className={`mt-1 text-lg ${getTextColor('secondary')}`}>
            {feature.subtitle}
          </p>
          <p className={`mt-4 ${getTextColor('muted')}`}>
            {feature.description}
          </p>
          
          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {feature.stats.map((stat, index) => (
              <div key={index} className={`p-4 rounded-lg ${getSectionBg('accent')}`}>
                <dt className={`text-sm ${getTextColor('muted')}`}>{stat.label}</dt>
                <dd className={`mt-1 text-2xl font-semibold ${getTextColor('primary')}`}>{stat.value}</dd>
              </div>
            ))}
          </div>

          {/* Benefits List */}
          <ul className="mt-6 space-y-4">
            {feature.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className={getTextColor('secondary')}>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Trading Link */}
          {feature.tradingLink && (
            <div className="mt-6">
              <a
                href={feature.tradingLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
              >
                <img src={feature.tradingLink.logo} alt="Trading Platform" className="w-6 h-6" />
                <span>Trade on pump.fun</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Chart Section */}
      {feature.id === "smart-prospecting" && (
        <div className="mt-6">
          <TokenChart />
        </div>
      )}
    </div>
  );

  const faqSections = [
    {
      title: "Getting Started",
      questions: [
        {
          q: "Do I need my company's approval to use this?",
          a: "No. You can sign up with any email address and start tracking your sales metrics immediately. While corporate integration is available, it's completely optional. Many users start with self-reported data and add verifications over time."
        },
        {
          q: "What if my company uses restricted CRM systems?",
          a: "No problem! You can manually log your deals and achievements, or connect your CRM. Many sales professionals start with manual tracking and add integrations later when possible."
        },
        {
          q: "Is there a free plan?",
          a: "Yes! Individual sales professionals can sign up and use core features completely free. This includes manual tracking, blockchain verification, and basic profile sharing."
        }
      ]
    },
    {
      title: "Verification & Trust",
      questions: [
        {
          q: "How does verification work?",
          a: "We offer multiple layers of verification. Start with self-reported metrics (anchored on the blockchain for immutability). Then optionally add manager endorsements, peer verifications, or connect your personal CRM for automatic verification. Each verification layer adds more credibility to your profile."
        },
        {
          q: "How do you prevent fake endorsements?",
          a: "Each endorsement is tied to a verified blockchain identity. Managers and peers must prove their role/relationship before their endorsements are counted. Our system also detects suspicious patterns and requires additional verification for high-value claims."
        },
        {
          q: "What makes this more trustworthy than LinkedIn?",
          a: "Unlike traditional platforms where anyone can claim anything, our blockchain-based system ensures that once metrics are recorded, they cannot be altered. Each verification layer adds cryptographic proof, and hiring managers can independently verify the authenticity of claims."
        }
      ]
    },
    {
      title: "Privacy & Security",
      questions: [
        {
          q: "Is my data private and secure?",
          a: "Absolutely. Your data is encrypted and private by default. You control what metrics to share and with whom. While achievement proofs are stored on the blockchain, sensitive details (like client names) remain private and off-chain."
        },
        {
          q: "Can my current employer see my profile?",
          a: "You have complete control over your profile visibility. You can keep it private, share selectively with specific hiring managers, or make certain achievements public while keeping others private."
        },
        {
          q: "What happens if I change jobs?",
          a: "Your verified achievements stay with you! Since they're anchored on the blockchain and can be independently verified, you maintain your track record even when changing employers."
        }
      ]
    },
    {
      title: "For Hiring Managers",
      questions: [
        {
          q: "What can hiring managers see?",
          a: "Hiring managers see your verified sales metrics, including quota attainment, deal sizes, and performance trends. Each metric shows its verification level (self-reported, manager-endorsed, CRM-verified, etc.). They can also verify the authenticity of your data directly on the blockchain."
        },
        {
          q: "How do I verify candidate claims?",
          a: "Each achievement includes a blockchain verification link. Click it to see the original recording date, verification layers, and cryptographic proof. No technical knowledge needed—we make verification simple and instant."
        },
        {
          q: "Can I compare candidates?",
          a: "Yes! Our hiring manager portal lets you compare verified metrics across candidates, filter by achievement types, and see detailed verification levels for each claim. This makes screening more efficient and reliable."
        }
      ]
    }
  ];

  const handleGetStarted = (plan?: string) => {
    // First scroll to top of current page
    window.scrollTo(0, 0);

    // Then navigate to the appropriate page
    if (plan === 'professional') {
      navigate('/pricing?plan=professional');
    } else if (plan === 'enterprise') {
      navigate('/contact_us');
    } else {
      navigate('/signup');
    }
  };

  // Update the steps array with better messaging about building your story
  const steps = [
    {
      title: "Quick Start",
      description: "Begin with basic numbers - just log your deals and quota attainment. Takes 2 minutes to start building your verified history.",
      icon: <FileText className="w-6 h-6" />,
      achievement: "First Quarter Logged",
      buildMessage: "Starting your sales history..."
    },
    {
      title: "Add Proof",
      description: "Upload standard documents like W2s, offer letters, and pay stubs. Each proof point strengthens your track record's credibility.",
      icon: <Shield className="w-6 h-6" />,
      achievement: "Multiple Verifications Added",
      buildMessage: "Adding verification layers..."
    },
    {
      title: "Get Backup",
      description: "Colleagues with verified corporate emails confirm your achievements. Their endorsements add social proof to your track record.",
      icon: <Users className="w-6 h-6" />,
      achievement: "Peer Endorsements Secured",
      buildMessage: "Building social proof..."
    },
    {
      title: "Show Growth",
      description: "Your history shows consistent quota achievement and deal success. Perfect for proving your long-term sales impact.",
      icon: <TrendingUp className="w-6 h-6" />,
      achievement: "Consistent 120%+ Performance",
      buildMessage: "Tracking performance trends..."
    },
    {
      title: "Automate Updates",
      description: "Once your company joins, connect CRM and payroll systems to automatically verify new achievements in real-time.",
      icon: <RefreshCw className="w-6 h-6" />,
      achievement: "Real-time Verification Active",
      buildMessage: "Enabling automatic updates..."
    }
  ];

  const demoSectionRef = useRef<HTMLDivElement>(null);

  // Add intersection observer hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && step === 0) {
          setStep(1); // Start the demo when section comes into view
        }
      },
      { threshold: 0.3 } // Start when 30% of the section is visible
    );

    if (demoSectionRef.current) {
      observer.observe(demoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update testimonials
  const testimonials = [
    {
      quote: "Finally, a way to own my sales track record. Started with basic quarterly updates, added my W2s and offer letters, then got peer endorsements. Now I have a complete history that moves with my career.",
      author: "David Chen",
      role: "Enterprise Sales Director",
      company: "Previously at Oracle, now at Salesforce"
    },
    {
      quote: "The universal rankings are game-changing. I can see exactly how I stack up against other AEs in my industry, which was invaluable during my recent job search and salary negotiations.",
      author: "Sarah Martinez",
      role: "Account Executive",
      company: "Series B Startup"
    },
    {
      quote: "As a sales leader, the benchmarking data is incredible. I can see industry patterns, identify top performers, and make better hiring decisions based on verified performance data.",
      author: "Michael Kim",
      role: "VP of Sales",
      company: "Growth-stage SaaS"
    }
  ];

  return (
    <>
      {/* Pause Button */}
      {isLandingPage && (
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`
            fixed top-4 right-4 z-50 p-2 rounded-full
            backdrop-blur-sm transition-all duration-200
            ${darkMode 
              ? 'bg-white/10 hover:bg-white/20 text-white' 
              : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'}
          `}
          aria-label={isPaused ? 'Play animations' : 'Pause animations'}
        >
          {isPaused ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Play className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Pause className="w-5 h-5" />
            </motion.div>
          )}
        </button>
      )}

      {/* Background Image with Data Tree */}
      <div 
        className={`
          fixed inset-0 w-full h-full bg-center bg-cover bg-no-repeat
          ${darkMode ? 'opacity-50' : 'opacity-30'}
        `}
        style={{
          backgroundImage: `url(${dataTree})`,
          zIndex: 0
        }}
      />
    
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 1 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`
            w-full h-full object-cover scale-125 opacity-60
            ${darkMode ? '' : 'opacity-40'}
          `}
          style={{ mixBlendMode: darkMode ? 'overlay' : 'color-burn' }}
        >
          <source src={fallingLeaves} type="video/webm" />
        </video>
      </div>
      
      {/* Main Content */}
      <div 
        className={`
          relative z-10 min-h-screen w-full
          font-inter transition-all duration-200
          ${darkMode ? 'text-white' : 'text-gray-900'}
        `}
      >
        <div className="min-h-screen overflow-auto">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16">
            {/* Dark overlay for better text legibility */}
            <div className={`
              absolute inset-0
              ${darkMode 
                ? 'bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70' 
                : 'bg-gradient-to-b from-white/30 via-white/20 to-white/30'}
            `} />
            
            {/* Accent gradient */}
            <div className={`absolute inset-0 ${
              darkMode 
                ? 'bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_50%)]' 
                : 'bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_50%)]'
            }`} />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-8"
              >
                <div 
                  className="w-[200px] h-[200px] pointer-events-auto perspective-1000"
                  onMouseEnter={() => setIsPortalHovered(true)}
                  onMouseLeave={() => setIsPortalHovered(false)}
                >
                  <motion.div 
                    className="relative w-full h-full group cursor-pointer"
                    animate={{
                      scale: isPortalHovered ? 1.1 : 1,
                      rotateX: isPortalHovered ? 5 : 0,
                      rotateY: isPortalHovered ? -5 : 0,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateX: 5,
                      rotateY: -5,
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    {/* Portal depth effect */}
                    <div className={`
                      absolute inset-0 rounded-full 
                      bg-gradient-to-b from-teal-500/5 via-emerald-500/5 to-teal-500/10
                      transform -translate-z-12 scale-95
                      transition-all duration-500
                      ${isPortalHovered ? 'opacity-100 blur-lg' : 'opacity-0 blur-md'}
                    `} />

                    {/* Outer glow with depth */}
                    <div className={`
                      absolute inset-0 rounded-full 
                      bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 
                      blur-lg scale-110 transform
                      transition-all duration-500 ease-out
                      ${isPortalHovered ? 'opacity-80 -translate-z-8' : 'opacity-20 translate-z-0'}
                    `} />
                    
                    {/* Animated rings with depth */}
                    <div className={`
                      absolute inset-0 rounded-full border-2 border-teal-500/20 
                      animate-[spin_8s_linear_infinite] transform
                      transition-all duration-500
                      ${isPortalHovered ? 'opacity-80 -translate-z-4 border-teal-400/30' : 'opacity-20'}
                    `} />
                    <div className={`
                      absolute inset-0 rounded-full border-2 border-emerald-500/10 
                      animate-[spin_12s_linear_infinite_reverse] transform
                      transition-all duration-500
                      ${isPortalHovered ? 'opacity-80 -translate-z-2 border-emerald-400/20' : 'opacity-20'}
                    `} />
                    
                    {/* Video container with perspective transform */}
                    <div className={`
                      absolute inset-0 rounded-full overflow-hidden 
                      border-4 border-teal-500/20 backdrop-blur-[2px]
                      transition-all duration-500 transform
                      ${isPortalHovered ? 
                        'border-teal-400/30 shadow-lg shadow-teal-500/10 translate-z-4 scale-105 ring-2 ring-teal-500/20 ring-offset-2 ring-offset-teal-500/10' : 
                        'scale-100'
                      }
                    `}>
                      {/* Network Canopy Video */}
                      <div className={`
                        transition-all duration-500 transform
                        ${isPortalHovered ? 'opacity-80 scale-110 translate-z-6' : 'opacity-0 scale-90'}
                      `}>
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className={`
                            w-full h-full object-cover scale-150
                          `}
                          style={{ mixBlendMode: 'screen' }}
                        >
                          <source src={networkCanopy} type="video/webm" />
                        </video>
                      </div>
    
    <div className={`
                        absolute inset-0 flex items-center justify-center
                        transition-all duration-300 transform
                        ${isPortalHovered ? 'opacity-20 scale-95' : 'opacity-70 scale-100'}
                      `}>
                        {/* Centered logo */}
                        <img 
                          src={logo} 
                          alt="Attainmint Logo" 
                          className="absolute w-20 h-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                  inline-flex items-center gap-2 px-6 py-2 rounded-full text-base font-semibold mb-8
                  ${darkMode 
                    ? 'bg-teal-900/90 text-teal-100 backdrop-blur-md shadow-lg' 
                    : 'bg-teal-50/95 text-teal-900 backdrop-blur-md shadow-md'}
                `}
              >
                <Shield className="w-5 h-5" />
                Your Verified Sales Legacy
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 
                  max-w-4xl mx-auto leading-[1.2] tracking-tight
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
              >
                Build Your{" "}
                <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-500 
                  bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  Verified Sales History
                </span>{" "}
                on the Blockchain
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed 
                  font-medium tracking-tight backdrop-blur-[2px]
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
              >
                Keep your sales achievements at your fingertips - forever. Just 2 minutes each quarter to maintain 
                your complete track record. Your data stays with you even when you change companies.
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  {
                    icon: Clock,
                    title: "2 Min Updates",
                    description: "Quick quarterly check-ins"
                  },
                  {
                    icon: Target,
                    title: "Always Ready",
                    description: "No scrambling for data"
                  },
                  {
                    icon: Shield,
                    title: "Your Record",
                    description: "Moves with your career"
                  },
                  {
                    icon: CheckCircle,
                    title: "Future Proof",
                    description: "Access anytime, anywhere"
                  }
                ].map((benefit) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg border
                      backdrop-blur-md transition-all duration-200 shadow-lg
                      ${darkMode 
                        ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                        : 'bg-white/20 border-gray-200/30 hover:bg-white/25'}
                    `}
                  >
                    <benefit.icon className="w-5 h-5 text-teal-500" />
                    <div className="text-left">
                      <div className={`font-semibold ${getTextColor('primary')} drop-shadow-sm`}>
                        {benefit.title}
                      </div>
                      <div className={`text-sm ${getTextColor('secondary')} drop-shadow-sm`}>
                        {benefit.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <section className={`py-24 ${getSectionBg('primary')} relative border-t-4 border-b-4 ${darkMode ? 'border-emerald-900/30' : 'border-emerald-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto"
                >
                  <div className={`
                    inline-flex items-center gap-2 px-6 py-2 rounded-full text-base font-semibold mb-8
                    ${darkMode ? 'bg-teal-900/50 text-teal-200' : 'bg-teal-50 text-teal-800'}
                  `}>
                    <Target className="w-5 h-5" />
                    Simple Process
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor('primary')}`}>
                    How It
                    <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent"> Works</span>
                    </h2>
                  <p className={`text-xl mb-8 leading-relaxed ${getTextColor('secondary')}`}>
                    Start building your verified sales history in minutes—no corporate approval needed.
                    You're in control of your data and verification layers.
                    </p>
                </motion.div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {howItWorks.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                      p-6 rounded-xl border relative
                      backdrop-blur-md shadow-lg
                          ${darkMode
                            ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80' 
                        : 'bg-white/70 border-gray-200/30 hover:bg-white/80'}
                        `}
                      >
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                    <step.icon className="w-8 h-8 text-teal-400 dark:text-teal-300 mb-4" />
                    <h3 className={`text-xl font-bold mb-3 ${getTextColor('primary')}`}>
                          {step.title}
                        </h3>
                    <p className={`${getTextColor('secondary')} mb-4`}>
                          {step.description}
                        </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-1" />
                          <span className={`${getTextColor('muted')} text-sm text-left`}>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                      </motion.div>
                    ))}
                  </div>

              {/* Additional Info Box */}
              <div className={`
                mt-12 p-6 rounded-xl border
                ${darkMode
                  ? 'bg-gray-800/50 border-white/10'
                  : 'bg-white/50 border-gray-200/30'}
                backdrop-blur-sm shadow-lg
                max-w-3xl mx-auto text-center
              `}>
                <h4 className={`text-lg font-semibold mb-2 ${getTextColor('primary')}`}>
                  What About Company Integration?
                </h4>
                <p className={`${getTextColor('secondary')}`}>
                  While companies can optionally integrate with our platform to provide additional verification,
                  you don't need to wait for them. Start building your verified sales history today and add
                  more verification layers as they become available.
                </p>
              </div>
              <div className="text-center mt-12 mb-8">
                <button
                  onClick={() => handleGetStarted('enterprise')}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 
                    hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg 
                    shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  Get Started Now
                </button>
                  </div>
                </div>
              </section>
<section className={`py-24 ${getSectionBg('secondary')} relative border-t-4 border-b-4 ${darkMode ? 'border-purple-900/30' : 'border-purple-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mx-auto"
                >
                  <div className={`
                    inline-flex items-center gap-2 px-6 py-2 rounded-full text-base font-semibold mb-8
                    ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-50 text-purple-800'}
                  `}>
                    <Shield className="w-5 h-5" />
                    Progressive Trust Building
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor('primary')}`}>
                    Multiple Layers of
                    <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-teal-500 bg-clip-text text-transparent"> Verification</span>
                  </h2>
                  <p className={`text-xl mb-8 leading-relaxed ${getTextColor('secondary')}`}>
                    Start with free verifications and add premium layers as you grow.
                    Each level strengthens your credibility.
                  </p>
                </motion.div>
              </div>

              {/* Free Verifications */}
              <div className="mb-12">
                <h3 className={`text-2xl font-bold mb-6 ${getTextColor('primary')} text-center`}>
                  Free Verifications
                  <span className={`ml-2 px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-teal-900/50 text-teal-200' : 'bg-teal-50 text-teal-800'}`}>
                    Available to Everyone
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verificationLevels
                    .filter(level => level.badge === 'Free')
                    .map((level, index) => (
                      <motion.div
                        key={level.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          p-6 rounded-xl border relative
                          backdrop-blur-md shadow-lg
                          ${darkMode
                            ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80'
                            : 'bg-white/70 border-gray-200/30 hover:bg-white/80'}
                        `}
                      >
                        <div className={`
                          absolute -top-3 -right-3 px-3 py-1 rounded-full text-sm font-semibold
                          shadow-lg backdrop-blur-sm
                          ${darkMode ? 'bg-teal-900/90 text-teal-100' : 'bg-teal-100 text-teal-900'}
                        `}>
                          Free
                        </div>
                        <div className={`absolute -top-3 left-3 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                          {level.subBadge}
                        </div>
                        <level.icon className={`w-8 h-8 text-teal-400 dark:text-teal-300 mb-4 mt-2`} />
                        <h3 className={`text-lg font-bold mb-2 ${getTextColor('primary')}`}>
                          {level.title}
                        </h3>
                        <p className={`${getTextColor('secondary')} text-sm`}>
                          {level.description}
                        </p>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Premium Verifications */}
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${getTextColor('primary')} text-center`}>
                  Premium Verifications
                  <span className={`ml-2 px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-50 text-purple-800'}`}>
                    Enhanced Trust
                  </span>
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {verificationLevels
                    .filter(level => level.badge !== 'Free')
                    .map((level, index) => (
                      <motion.div
                        key={level.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          p-6 rounded-xl border relative
                          backdrop-blur-md shadow-lg
                          ${darkMode
                            ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80'
                            : 'bg-white/70 border-gray-200/30 hover:bg-white/80'}
                        `}
                      >
                        <div className={`
                          absolute -top-3 -right-3 px-3 py-1 rounded-full text-sm font-semibold
                          shadow-lg backdrop-blur-sm
                          ${level.badge === 'Enterprise'
                            ? (darkMode ? 'bg-rose-900/90 text-rose-100' : 'bg-rose-100 text-rose-900')
                            : (darkMode ? 'bg-indigo-900/90 text-indigo-100' : 'bg-indigo-100 text-indigo-900')
                          }
                        `}>
                          {level.badge}
                        </div>
                        <div className={`absolute -top-3 left-3 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                          {level.subBadge}
                        </div>
                        <level.icon className={`w-8 h-8 mb-4 mt-2
                          ${level.badge === 'Enterprise' 
                            ? 'text-rose-400 dark:text-rose-300'
                            : 'text-indigo-400 dark:text-indigo-300'
                          }
                        `} />
                        <h3 className={`text-lg font-bold mb-2 ${getTextColor('primary')}`}>
                          {level.title}
                        </h3>
                        <p className={`${getTextColor('secondary')} text-sm`}>
                          {level.description}
                        </p>
                      </motion.div>
                    ))}
                </div>
              </div>

              <div className="text-center mt-12 mb-8">
                <button
                  onClick={() => handleGetStarted('professional')}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-teal-600 
                    hover:from-purple-700 hover:to-teal-700 text-white font-semibold text-lg 
                    shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  Start Your Trust Journey
                </button>
              </div>
            </div>
          </section>
