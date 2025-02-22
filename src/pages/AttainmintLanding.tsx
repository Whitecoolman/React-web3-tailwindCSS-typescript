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
<section ref={demoSectionRef} className={`py-24 ${getSectionBg('accent')} overflow-hidden relative`}>
            {/* Add gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center mb-16">
                <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor('primary')}`}>
                  Watch Your Story <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">Build</span>
                </h2>
                <p className={`text-xl ${getTextColor('secondary')} max-w-3xl mx-auto`}>
                  See how your blockchain-verified resume builds itself with each achievement
                </p>
              </div>

              {/* Demo Content without window controls */}
              <div className={`
                relative rounded-2xl overflow-hidden shadow-2xl
                ${darkMode ? 'bg-gray-900/80 border border-gray-800' : 'bg-white/90 border border-gray-200'}
                backdrop-blur-sm
              `}>
                <div className="p-4 sm:p-6">
                  {/* Interactive steps content */}
                  <div className="max-w-4xl mx-auto">
                    {/* Building Message */}
                    {step > 0 && step < steps.length && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`
                          mb-6 p-3 sm:p-4 rounded-lg text-center
                          ${darkMode ? 'bg-teal-900/20 text-teal-200' : 'bg-teal-50 text-teal-700'}
                          backdrop-blur-sm
                        `}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span className="text-sm sm:text-base">{steps[step - 1].buildMessage}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Steps Container */}
                    <motion.div
                      animate={{
                        opacity: 1,
                        filter: 'blur(0px)',
                        scale: 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute left-6 sm:left-16 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500/20 to-purple-500/20">
                          <motion.div
                            className="absolute top-0 w-full bg-gradient-to-b from-teal-500 to-purple-500"
                            initial={{ height: "0%" }}
                            animate={{ height: `${(step / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>

                        {/* Steps */}
                        {steps.map((s, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                              opacity: step >= index ? 1 : 0.5,
                              x: step >= index ? 0 : -50
                            }}
                            className={`flex items-start gap-3 sm:gap-8 mb-8 sm:mb-12 ${
                              step >= index ? getTextColor('primary') : getTextColor('muted')
                            }`}
                          >
                            <div className={`
                              relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
                              transition-colors duration-200 flex-shrink-0
                              ${step >= index 
                                ? "bg-gradient-to-r from-teal-500 to-purple-500" 
                                : darkMode ? "bg-gray-800" : "bg-gray-200"}
                            `}>
                              <div className="w-4 h-4 sm:w-6 sm:h-6">
                                {s.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">{s.title}</h3>
                              <p className={`${getTextColor('muted')} text-sm sm:text-base`}>{s.description}</p>
                              {step >= index && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex items-center gap-2 mt-2 sm:mt-3"
                                >
                                  <div className={`
                                    flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm
                                    ${darkMode ? 'bg-teal-900/20 text-teal-200' : 'bg-teal-50 text-teal-700'}
                                  `}>
                                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>{s.achievement}</span>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sample Resume Section */}
          <section className={`py-24 ${getSectionBg('primary')} relative`}>
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
                    <Shield className="w-5 h-5" />
                    Blockchain-Anchored Resume
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor('primary')}`}>
                    Your <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">Verified</span> Sales History
                  </h2>
                  <p className={`text-xl ${getTextColor('secondary')} max-w-3xl mx-auto mb-8`}>
                    Every achievement is verified and recorded on the blockchain, creating an immutable and portable record of your success. 
                    Perfect for showcasing your track record to hiring managers and building long-term career value.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {[
                      {
                        icon: Shield,
                        title: "Verified Proof",
                        description: "Blockchain-backed metrics"
                      },
                      {
                        icon: Target,
                        title: "Industry Rankings",
                        description: "Compare with peers"
                      },
                      {
                        icon: Eye,
                        title: "Privacy First",
                        description: "You control sharing"
                      },
                      {
                        icon: TrendingUp,
                        title: "Career Growth",
                        description: "Track your progress"
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
                </motion.div>
              </div>
              <div className={`
                relative rounded-2xl overflow-hidden shadow-2xl
                ${darkMode ? 'bg-gray-900/80 border border-gray-800' : 'bg-white/90 border border-gray-200'}
                backdrop-blur-sm
              `}>
                {/* Demo Header with window controls */}
                <div className={`
                  px-6 py-4 border-b
                  ${darkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50/50 border-gray-200/50'}
                  backdrop-blur-sm
                `}>
                  {/* Window Controls */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Invitation Banner */}
                <div className={`
                  px-6 py-3 border-b flex items-center justify-between
                  ${darkMode 
                    ? 'bg-teal-900/30 border-teal-800/50 text-teal-100' 
                    : 'bg-teal-50/80 border-teal-100 text-teal-800'}
                  backdrop-blur-sm
                `}>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">You've been invited to view Sarah's Sales Resume</span>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm
                    ${darkMode ? 'bg-teal-800/50 text-teal-200' : 'bg-teal-100/50 text-teal-700'}
                  `}>
                    View Only
                  </div>
                </div>

                <div className="p-6">
                  {/* Sample resume content */}
                  <BlockchainResume darkMode={darkMode} />
                </div>
              </div>
            </div>
          </section>

          {/* Benefits for Everyone Section */}
          <section className={`py-24 relative`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none"></div>
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
                    ${darkMode ? 'bg-teal-900/50 text-teal-200' : 'bg-teal-50 text-teal-800'}
                    backdrop-blur-sm
                  `}>
                    <Users className="w-5 h-5" />
                    Who's it for?
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor('primary')}`}>
                    Benefits for
                    <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent"> Every Role</span>
                  </h2>
                  <p className={`text-xl mb-8 leading-relaxed ${getTextColor('secondary')}`}>
                    From individual contributors to enterprise organizations, Attainmint delivers value through verified excellence and blockchain transparency.
                  </p>
                </motion.div>
              </div>

              {/* Core Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-8 rounded-xl border relative overflow-hidden
                      backdrop-blur-sm shadow-lg transition-all duration-200
                      ${darkMode
                        ? 'bg-gray-900/20 border-white/10 hover:bg-gray-900/30'
                        : 'bg-white/20 border-gray-200/20 hover:bg-white/30'}
                    `}
                  >
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10">
                      <div className={`
                        w-12 h-12 rounded-lg mb-6 flex items-center justify-center
                        ${darkMode ? 'bg-teal-900/50' : 'bg-teal-50/50'}
                      `}>
                        <benefit.icon className="w-6 h-6 text-teal-500" />
                      </div>
                      <h3 className={`text-xl font-bold mb-4 ${getTextColor('primary')}`}>
                        {benefit.title}
                      </h3>
                      <p className={`${getTextColor('secondary')} leading-relaxed text-sm`}>
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Role-Based Benefits */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {userTypes.map((type, index) => (
                  <motion.div
                    key={type.type}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-8 rounded-xl border relative overflow-hidden
                      backdrop-blur-md shadow-lg
                      ${darkMode
                        ? 'bg-gray-900/30 border-white/20 hover:bg-gray-900/40'
                        : 'bg-white/30 border-gray-200/30 hover:bg-white/40'}
                    `}
                  >
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10">
                      <div className="flex items-start">
                        <type.icon className="w-8 h-8 text-teal-400 dark:text-teal-300 mb-4" />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 text-left ${getTextColor('primary')}`}>
                        {type.type}
                      </h3>
                      <p className={`text-sm mb-6 text-left ${getTextColor('secondary')}`}>
                        {type.description}
                      </p>
                      <ul className="space-y-2">
                        {type.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              benefit.isPremium 
                                ? 'text-purple-500 dark:text-purple-400'
                                : 'text-teal-500 dark:text-teal-400'
                            }`} />
                            <span className={`${getTextColor('muted')} text-sm text-left`}>
                              {benefit.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 mb-8">
                <button
                  onClick={() => handleGetStarted()}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 
                    hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-lg 
                    shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  Find Your Perfect Plan
                </button>
              </div>
            </div>
              </section>
    <section className={`py-24 ${getSectionBg('secondary')} relative border-t-4 border-b-4 ${darkMode ? 'border-indigo-900/30' : 'border-indigo-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className={`
                  inline-flex items-center gap-2 px-6 py-2 rounded-full text-base font-semibold mb-8
                  ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-50 text-purple-800'}
                `}>
                  <Star className="w-5 h-5" />
                  Premium Features
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColor('primary')}`}>
                  Advanced Tools for Every Role
                </h2>
                <p className={`text-xl ${getTextColor('muted')} max-w-3xl mx-auto mb-6`}>
                  As AI agents take on more autonomous sales actions, it's crucial that these actions are auditable and verified.
                  Our platform ensures complete transparency and verification of both human and AI-driven activities.
                </p>
                <p className={`text-lg ${getTextColor('muted')} max-w-3xl mx-auto mb-12`}>
                  Every AI interaction, recommendation, and automated action is blockchain-verified and traceable,
                  helping you build trust in an AI-augmented sales environment.
                </p>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-16">
                  <button
                    onClick={() => setActiveTab('sales')}
                    className={`
                      px-6 py-3 rounded-lg font-semibold transition-all duration-200
                      ${activeTab === 'sales' 
                        ? (darkMode 
                            ? 'bg-purple-900/80 text-purple-100' 
                            : 'bg-purple-100 text-purple-900')
                        : (darkMode
                            ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                            : 'bg-gray-100/50 text-gray-600 hover:bg-gray-100')}
                    `}
                  >
                    Sales Command Center
                  </button>
                  <button
                    onClick={() => setActiveTab('hiring')}
                    className={`
                      px-6 py-3 rounded-lg font-semibold transition-all duration-200
                      ${activeTab === 'hiring' 
                        ? (darkMode 
                            ? 'bg-purple-900/80 text-purple-100' 
                            : 'bg-purple-100 text-purple-900')
                        : (darkMode
                            ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                            : 'bg-gray-100/50 text-gray-600 hover:bg-gray-100')}
                    `}
                  >
                    Hiring & Talent Acquisition
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* Sales Command Center Features */}
                {activeTab === 'sales' && (
                  <motion.div
                    key="sales"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    {salesCommandFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          p-8 rounded-xl border transition-all duration-200
                          backdrop-blur-md shadow-lg
                          ${darkMode
                            ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80' 
                            : 'bg-white/70 border-gray-200/30 hover:shadow-xl hover:bg-white/80'}
                        `}
                      >
                        <feature.icon className="w-10 h-10 text-purple-400 dark:text-purple-300 mb-6 drop-shadow-md" />
                        <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} drop-shadow-sm`}>
                          {feature.title}
                        </h3>
                        <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} text-lg mb-6 leading-relaxed drop-shadow-sm`}>
                          {feature.description}
                        </p>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {feature.stats.map((stat, idx) => (
                            <div key={idx} className={`
                              p-4 rounded-lg
                              ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'}
                            `}>
                              <div className={`text-2xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                                {stat.value}
                              </div>
                              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Features List */}
                        <ul className="space-y-3">
                          {feature.features.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-left`}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Hiring Manager Features */}
                {activeTab === 'hiring' && (
                  <motion.div
                    key="hiring"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {hiringFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          p-8 rounded-xl border transition-all duration-200
                          backdrop-blur-md shadow-lg
                          ${darkMode
                            ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80' 
                            : 'bg-white/70 border-gray-200/30 hover:shadow-xl hover:bg-white/80'}
                        `}
                      >
                        <feature.icon className="w-10 h-10 text-purple-400 dark:text-purple-300 mb-6 drop-shadow-md" />
                        <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} drop-shadow-sm`}>
                          {feature.title}
                        </h3>
                        <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} text-lg mb-6 leading-relaxed drop-shadow-sm`}>
                          {feature.description}
                        </p>
                        <ul className="space-y-3">
                          {feature.features.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-left`}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="text-center mt-12 mb-8">
                <button
                  onClick={() => handleGetStarted('professional')}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                    hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg 
                    shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  Unlock Premium Features
                </button>
              </div>
            </div>
              </section>
              
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-24">
                {[
                  {
                    icon: Shield,
                    title: "Verified Excellence",
                    description: "Multi-layer verification"
                  },
                  {
                    icon: Target,
                    title: "Professional Growth",
                    description: "Personal & team success"
                  },
                  {
                    icon: CheckCircle,
                    title: "Blockchain Backed",
                    description: "Immutable achievements"
                  },
                  {
                    icon: Coins,
                    title: "MINT Rewards",
                    description: "Earn as you achieve"
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
            </div>
          </section>

          {/* Main Features */}
          {mainFeatures.map((feature, index) => (
            <section 
              key={feature.id}
              className={`py-24 ${index % 2 === 0 ? getSectionBg('primary') : getSectionBg('accent')}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`
                  flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                  items-center gap-12
                `}>
                  <div className="lg:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className={`w-12 h-12 text-${feature.color}-400 mb-6 drop-shadow-lg`} />
                      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}>
                        {feature.title}
                      </h2>
                      <p className={`text-xl mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold drop-shadow-sm`}>
                        {feature.subtitle}
                      </p>
                      <p className={`mb-8 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed drop-shadow-sm`}>
                        {feature.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {feature.stats.map((stat, idx) => (
                          <div key={idx} className={`
                            p-4 rounded-lg border transition-all duration-200
                            backdrop-blur-md shadow-lg
                            ${darkMode
                              ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80'
                              : 'bg-white/70 border-gray-200/30 hover:shadow-xl hover:bg-white/80'}
                          `}>
                            <dt className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</dt>
                            <dd className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</dd>
                          </div>
                        ))}
                      </div>

                      {feature.tradingLink && (
                        <div className="mb-8">
                          <a
                            href={feature.tradingLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                              inline-flex items-center gap-3 px-6 py-3 rounded-xl
                              transition-all duration-200
                              ${darkMode 
                                ? 'bg-gray-800/70 hover:bg-gray-800/90 text-white' 
                                : 'bg-white/70 hover:bg-white/90 text-gray-900'}
                              shadow-lg hover:shadow-2xl backdrop-blur-sm
                            `}
                          >
                            <img 
                              src={feature.tradingLink.logo} 
                              alt="pump.fun logo" 
                              className="h-6 w-auto"
                            />
                            <span className="font-medium">Trade on pump.fun</span>
                            <ArrowUpRight className="w-4 h-4 opacity-70" />
                          </a>
                        </div>
                      )}

                      {/* Benefits List */}
                      <ul className="space-y-4">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                            <span className={darkMode ? 'text-gray-200' : 'text-gray-700'}>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Chart Section */}
                  <div className="lg:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.id === "smart-prospecting" && (
                        <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-teal-500/10 to-emerald-500/10 backdrop-blur shadow-xl">
                          <TokenChart />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Testimonials */}
          <section className={`py-20 ${getSectionBg('secondary')}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColor('primary')}`}>
                  Trusted by Sales Professionals
                </h2>
                <p className={`text-xl ${getTextColor('muted')}`}>
                  See how verified achievements and AI transparency are transforming sales careers
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-6 rounded-xl border transition-all duration-200
                      ${darkMode 
                        ? 'bg-gradient-to-b from-indigo-900/20 to-emerald-900/20 border-white/10 hover:bg-white/5' 
                        : 'bg-white/10 border-gray-200/30 shadow-sm hover:bg-white/20'}
                    `}
                  >
                    <div className="flex flex-col h-full">
                      <p className={`italic mb-6 flex-grow ${getTextColor('secondary')}`}>
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <div className={`font-medium ${getTextColor('primary')}`}>
                          {testimonial.author}
                        </div>
                        <div className={`text-sm ${getTextColor('muted')}`}>
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
<section className={`py-20 ${getSectionBg('accent')}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColor('primary')}`}>
                  Common Questions
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    q: "How do I get started?",
                    a: "Start with 2-minute quarterly updates of your basic sales numbers. No company approval needed. You can add more verification layers like documents, peer endorsements, and company integrations over time."
                  },
                  {
                    q: "What kind of proof can I add?",
                    a: "Start with standard documents like W2s, offer letters, and pay stubs. Add peer endorsements from colleagues with verified corporate emails. When your company joins, unlock automatic verification through CRM and payroll systems."
                  },
                  {
                    q: "Do I need my company's approval?",
                    a: "No. You can start building your track record immediately without company participation. While companies can optionally join to enable additional verifications, many professionals start with self-reporting and individual verifications."
                  },
                  {
                    q: "Why start with self-reporting?",
                    a: "Self-reporting creates a timestamped record of your achievements as they happen, which is far more reliable than reconstructing your history later. Each entry is blockchain-verified for when it was recorded, adding credibility to your claims."
                  },
                  {
                    q: "How do hiring managers verify my data?",
                    a: "Each achievement shows its verification level - from self-reported to fully system-verified. Hiring managers can see exactly how each metric was verified, making your track record more credible than traditional resumes."
                  },
                  {
                    q: "What about sensitive data?",
                    a: "We never store sensitive documents - only verification proofs go on the blockchain. When you upload documents like W2s or pay stubs, we verify the key data points, automatically redact sensitive information, and only store the verified metrics. Original documents are immediately discarded after verification."
                  },
                  {
                    q: "Can I compare against others?",
                    a: "Yes! See how you rank against other sales professionals in your industry. Access benchmarking data for compensation, performance, and success patterns - perfect for negotiations and career planning."
                  },
                  {
                    q: "What happens when I change jobs?",
                    a: "Your verified track record stays with you. Start building it at your current job, and keep adding to it throughout your career. It's your professional asset that grows stronger over time."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`
                      p-6 rounded-xl border transition-all duration-200
                      backdrop-blur-md shadow-lg
                      ${darkMode
                        ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80'
                        : 'bg-white/70 border-gray-200/30 shadow-sm hover:bg-white/80'}
                    `}
                  >
                    <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} drop-shadow-sm`}>
                      {faq.q}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} leading-relaxed drop-shadow-sm`}>
                      {faq.a}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          
          {/* Integration Section - Made More Distinct */}
          <section className={`py-24 ${getSectionBg('primary')} relative border-t-4 border-b-4 ${darkMode ? 'border-teal-900/30' : 'border-teal-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none"></div>
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
                    <Layers className="w-5 h-5" />
                    Seamless Integration Hub
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor('primary')}`}>
                    Connect Your Entire
                    <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent"> Sales Stack</span>
                  </h2>
                  <p className={`text-xl mb-8 leading-relaxed ${getTextColor('secondary')}`}>
                    Unify your workflow with native integrations to leading platforms. 
                    Access our database of 45M+ companies and 250M+ contacts seamlessly.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative mb-16"
              >
                <div className={`
                  absolute inset-0 rounded-3xl
                  ${darkMode 
                    ? 'bg-gradient-to-b from-teal-900/10 to-emerald-900/10' 
                    : 'bg-gradient-to-b from-teal-500/5 to-emerald-500/5'}
                `} />
                <IntegrationAnimation />
              </motion.div>

              {/* Integration features grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Sales Tools",
                    description: "Connect your CRM (Salesforce, HubSpot) and outbound platforms (Outreach, SalesLoft) to automatically verify deals and activity.",
                    icon: Layers,
                    integrations: ["Salesforce", "HubSpot", "Outreach", "SalesLoft"]
                  },
                  {
                    title: "HR Systems",
                    description: "Link payroll and HR platforms to verify compensation, commissions, and performance reviews.",
                    icon: Database,
                    integrations: ["ADP", "Workday", "SuccessFactors", "BambooHR"]
                  },
                  {
                    title: "Professional Networks",
                    description: "Connect professional networks and achievement platforms to import awards and certifications.",
                    icon: Users,
                    integrations: ["LinkedIn", "Credly", "Sales Certifications", "Industry Awards"]
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex flex-col p-6 rounded-xl 
                      backdrop-blur-sm border transition-all duration-200
                      ${darkMode 
                        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                        : 'bg-white/20 border-gray-200/30 hover:bg-white/30'}
                    `}
                  >
                    <div className={`
                      p-3 rounded-full mb-4 w-fit
                      ${darkMode ? 'bg-teal-900/50' : 'bg-teal-50/50'}
                    `}>
                      <feature.icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${getTextColor('primary')}`}>
                      {feature.title}
                    </h3>
                    <p className={`${getTextColor('muted')} mb-4`}>
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {feature.integrations.map((integration, idx) => (
                        <span key={idx} className={`
                          px-3 py-1 rounded-full text-sm
                          ${darkMode 
                            ? 'bg-teal-900/30 text-teal-300' 
                            : 'bg-teal-50 text-teal-700'}
                        `}>
                          {integration}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12 mb-8">
                <button
                  onClick={() => handleGetStarted('enterprise')}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 
                    hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-lg 
                    shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Enterprise Solutions
                </button>
              </div>
            </div>
          </section>


          {/* Final CTA */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4">
                  <div className={`
                rounded-2xl p-12 relative overflow-hidden
                ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'}
                backdrop-blur-md border border-gray-200/30 dark:border-white/10
              `}>
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                    Stand Out in the AI Era
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    As AI transforms the sales landscape, your proven track record becomes more valuable than ever. 
                    Start building your verified sales history today and showcase the human excellence that AI can't replicate.
                  </p>
                  <button
                    onClick={() => handleGetStarted()}
                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 
                      hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-lg 
                      shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                  >
                    Begin Your Success Story
                  </button>
                    </div>
              </div>
            </div>
          </section>

          {/* AI Verification Section */}
          <section className={`py-24 ${getSectionBg('secondary')} relative border-t-4 border-b-4 ${darkMode ? 'border-purple-900/30' : 'border-purple-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-4xl mx-auto"
                >
                  <div className={`
                    inline-flex items-center gap-2 px-6 py-2 rounded-full text-base font-semibold mb-8
                    ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-50 text-purple-800'}
                  `}>
                    <Bot className="w-5 h-5" />
                    AI Agent Verification
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getTextColor('primary')}`}>
                    Trust and Verify
                    <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-teal-500 bg-clip-text text-transparent"> AI-Driven Sales</span>
                  </h2>
                  <p className={`text-xl mb-6 leading-relaxed ${getTextColor('secondary')}`}>
                    As AI agents revolutionize sales by taking over prospecting, outreach, and SDR functions, 
                    it's crucial to maintain transparency and accountability. Just like with documents, we never store sensitive AI data - only verified proofs.
                  </p>
                  <p className={`text-lg mb-12 ${getTextColor('muted')}`}>
                    Attainmint provides complete visibility and blockchain verification of AI agent activities,
                    ensuring you always know what actions are being taken on your behalf.
                  </p>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Brain,
                    title: "AI Agent Actions",
                    description: "Every autonomous action taken by AI agents is logged, verified, and traceable. From prospect identification to outreach attempts, maintain full visibility of your AI workforce.",
                    features: ["Action logging", "Real-time monitoring", "Performance tracking"]
                  },
                  {
                    icon: Shield,
                    title: "Verification Layer",
                    description: "Blockchain-backed verification ensures AI actions are immutable and auditable. Build trust with prospects by showing transparent, verified AI interactions.",
                    features: ["Blockchain verification", "Audit trails", "Compliance records"]
                  },
                  {
                    icon: Target,
                    title: "Human Oversight",
                    description: "Set boundaries and maintain control over AI activities. Review autonomous actions, adjust permissions, and ensure AI agents align with your sales strategy.",
                    features: ["Permission controls", "Activity reviews", "Strategy alignment"]
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-8 rounded-xl border relative overflow-hidden
                      backdrop-blur-md shadow-lg
                      ${darkMode 
                        ? 'bg-gray-900/70 border-white/20 hover:bg-gray-900/80'
                        : 'bg-white/70 border-gray-200/30 hover:bg-white/80'}
                    `}
                  >
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10">
                      <item.icon className="w-10 h-10 text-purple-400 dark:text-purple-300 mb-6" />
                      <h3 className={`text-xl font-bold mb-4 ${getTextColor('primary')}`}>
                        {item.title}
                    </h3>
                      <p className={`${getTextColor('secondary')} mb-6`}>
                        {item.description}
                      </p>
                      <ul className="space-y-3">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                            <span className={`${getTextColor('muted')}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12 mb-8">
                  <button 
                  onClick={() => handleGetStarted('professional')}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-teal-600 
                    hover:from-purple-700 hover:to-teal-700 text-white font-semibold text-lg 
                    shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                >
                  Learn About AI Verification
                  </button>
                </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}