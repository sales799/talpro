import { LucideIcon, CreditCard, Monitor, Heart, ShoppingCart, GraduationCap, Building2 } from 'lucide-react';

// Icon map for industry pages (prevents importing entire lucide-react library)
export const industryIconMap: Record<string, LucideIcon> = {
  'CreditCard': CreditCard,
  'Monitor': Monitor,
  'Heart': Heart,
  'ShoppingCart': ShoppingCart,
  'GraduationCap': GraduationCap,
  'Building2': Building2,
};

// TypeScript interfaces for industry configuration
export interface Challenge {
  id: string;
  title: string;
  description: string;
}

export interface Solution {
  id: string;
  module: string;
  title: string;
  description: string;
  challengeIds: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface IndustryConfig {
  title: string;
  shortName: string; // Short name for navigation display
  heroHeadline: string;
  heroSubheading: string;
  metaDescription: string;
  challenges: Challenge[];
  solutions: Solution[];
  services: Service[];
  relatedCaseStudyIds: number[];
  userGuideTitle: string;
  userGuideContent: string;
  ctaText: string;
  icon: string; // Lucide icon name
  tagline: string; // New tagline field for mega menu
}

export type IndustrySlug = 'fintech-financial-services' | 'media-entertainment-technology' | 'healthcare-medical-technology' | 'ecommerce-retail-solutions' | 'education-edtech-solutions';

export type IndustryConfigMap = Record<IndustrySlug, IndustryConfig>;

// Industry configurations
export const industriesConfig: IndustryConfigMap = {
  'fintech-financial-services': {
    title: 'FinTech & Financial Services',
    shortName: 'FinTech',
    tagline: 'Secure. Scalable. Financial Tech',
    heroHeadline: 'Cutting-Edge Technology Solutions for FinTech & Financial Services',
    heroSubheading: 'Build secure, scalable, and compliant financial technology solutions with TalPro Solutions\' expert development team.',
    metaDescription: 'Transform your financial services with TalPro Solutions. Build secure, scalable fintech platforms with compliance-first architecture and cutting-edge technology.',
    challenges: [
      {
        id: 'security-compliance',
        title: 'Security & Regulatory Compliance',
        description: 'Financial applications require bank-grade security measures and must comply with strict regulatory frameworks across multiple jurisdictions.'
      },
      {
        id: 'scalability-performance',
        title: 'High-Performance Scalability',
        description: 'Financial systems must handle millions of transactions with millisecond response times while maintaining 99.9% uptime.'
      },
      {
        id: 'user-experience',
        title: 'Seamless User Experience',
        description: 'Modern consumers expect intuitive, fast, and reliable financial applications that work flawlessly across all devices.'
      },
      {
        id: 'integration-apis',
        title: 'Complex System Integration',
        description: 'Fintech solutions require seamless integration with banks, payment processors, and regulatory reporting systems.'
      },
      {
        id: 'data-analytics-risk',
        title: 'Data Analytics & Risk Management',
        description: 'Financial institutions need sophisticated analytics for risk assessment, credit scoring, and regulatory reporting while maintaining data privacy.'
      },
      {
        id: 'fraud-detection',
        title: 'Real-time Fraud Detection',
        description: 'Advanced fraud prevention systems with machine learning algorithms to detect suspicious activities and protect against financial crimes in real-time.'
      }
    ],
    solutions: [
      {
        id: 'secure-architecture',
        module: 'Security Architecture',
        title: 'Bank-Grade Security Implementation',
        description: 'Multi-layered security architecture with encryption, fraud detection, and compliance monitoring built-in.',
        challengeIds: ['security-compliance', 'integration-apis', 'fraud-detection']
      },
      {
        id: 'scalable-backend',
        module: 'Scalable Backend Systems',
        title: 'High-Performance Financial Backend',
        description: 'Microservices architecture designed for high-frequency trading and real-time transaction processing.',
        challengeIds: ['scalability-performance', 'integration-apis']
      },
      {
        id: 'mobile-web-apps',
        module: 'Frontend Development',
        title: 'Intuitive Financial Applications',
        description: 'User-friendly mobile and web applications with real-time data visualization and seamless UX.',
        challengeIds: ['user-experience', 'scalability-performance']
      },
      {
        id: 'api-integrations',
        module: 'API & Integration Services',
        title: 'Financial API Ecosystem',
        description: 'Comprehensive API development and third-party integrations for payments, banking, and compliance.',
        challengeIds: ['integration-apis', 'security-compliance', 'data-analytics-risk']
      }
    ],
    services: [
      {
        id: 'fintech-consulting',
        title: 'FinTech Strategy Consulting',
        description: 'Expert guidance on fintech architecture, regulatory compliance, and market entry strategies for African markets.'
      },
      {
        id: 'payment-solutions',
        title: 'Payment Platform Development',
        description: 'End-to-end payment processing solutions with multi-currency support and mobile money integration.'
      },
      {
        id: 'blockchain-crypto',
        title: 'Blockchain & Crypto Solutions',
        description: 'Secure blockchain applications, smart contracts, and cryptocurrency exchange development services.'
      },
      {
        id: 'compliance-audit',
        title: 'Compliance & Security Audit',
        description: 'Comprehensive security audits and compliance assessments to ensure regulatory adherence and risk mitigation.'
      }
    ],
    relatedCaseStudyIds: [1, 3],
    userGuideTitle: 'Building Secure FinTech Solutions: A Developer\'s Guide',
    userGuideContent: 'Learn how to build secure, scalable fintech applications with our comprehensive guide covering security best practices, regulatory compliance, and performance optimization techniques.',
    ctaText: 'Build Your FinTech Solution',
    icon: 'CreditCard'
  },

  'media-entertainment-technology': {
    title: 'Media & Entertainment Technology',
    shortName: 'Media',
    tagline: 'Digital Experiences, Delivered Fast',
    heroHeadline: 'Next-Generation Media & Entertainment Technology Solutions',
    heroSubheading: 'Create immersive digital experiences and scalable content platforms with TalPro Solutions\' cutting-edge media technology expertise.',
    metaDescription: 'Transform media and entertainment with TalPro Solutions. Build streaming platforms, content management systems, and immersive digital experiences.',
    challenges: [
      {
        id: 'content-delivery',
        title: 'Global Content Delivery',
        description: 'Delivering high-quality video and audio content to millions of users worldwide with minimal latency and buffering.'
      },
      {
        id: 'content-management',
        title: 'Digital Content Management',
        description: 'Managing vast libraries of digital content with metadata, rights management, and multi-format distribution capabilities.'
      },
      {
        id: 'user-engagement',
        title: 'Audience Engagement',
        description: 'Creating personalized, interactive experiences that keep audiences engaged across multiple platforms and devices.'
      },
      {
        id: 'monetization',
        title: 'Revenue Optimization',
        description: 'Implementing flexible monetization models including subscriptions, advertising, and pay-per-view systems.'
      },
      {
        id: 'content-security-drm',
        title: 'Content Security & DRM',
        description: 'Protecting valuable digital content with advanced DRM systems, watermarking, and anti-piracy measures to prevent unauthorized access and distribution.'
      },
      {
        id: 'live-streaming',
        title: 'Live Streaming & Broadcasting',
        description: 'Delivering real-time video content with ultra-low latency, interactive features, and seamless multi-platform broadcasting capabilities.'
      }
    ],
    solutions: [
      {
        id: 'streaming-platform',
        module: 'Streaming Technology',
        title: 'High-Performance Streaming Platform',
        description: 'Scalable video streaming infrastructure with adaptive bitrate and global CDN integration.',
        challengeIds: ['content-delivery', 'user-engagement', 'live-streaming']
      },
      {
        id: 'cms-platform',
        module: 'Content Management',
        title: 'Advanced Content Management System',
        description: 'Comprehensive CMS for media assets with workflow automation and multi-channel distribution.',
        challengeIds: ['content-management', 'monetization', 'content-security-drm']
      },
      {
        id: 'mobile-apps',
        module: 'Mobile Applications',
        title: 'Cross-Platform Media Apps',
        description: 'Native and cross-platform mobile applications with offline viewing and social features.',
        challengeIds: ['user-engagement', 'content-delivery']
      },
      {
        id: 'analytics-ai',
        module: 'AI & Analytics',
        title: 'Content Intelligence & Analytics',
        description: 'AI-powered content recommendations, audience analytics, and automated content tagging.',
        challengeIds: ['user-engagement', 'monetization']
      }
    ],
    services: [
      {
        id: 'platform-development',
        title: 'Streaming Platform Development',
        description: 'End-to-end development of video streaming platforms with live streaming, VOD, and interactive features.'
      },
      {
        id: 'content-strategy',
        title: 'Digital Content Strategy',
        description: 'Strategic consulting for content digitization, distribution strategies, and audience development.'
      },
      {
        id: 'ar-vr-solutions',
        title: 'AR/VR Experience Development',
        description: 'Immersive augmented and virtual reality experiences for entertainment and marketing applications.'
      },
      {
        id: 'performance-optimization',
        title: 'Media Performance Optimization',
        description: 'Technical optimization services for faster loading times, better streaming quality, and enhanced user experience.'
      }
    ],
    relatedCaseStudyIds: [2, 4],
    userGuideTitle: 'Building Modern Media Platforms: Technology & Strategy Guide',
    userGuideContent: 'Discover how to create engaging media and entertainment platforms with our guide covering streaming technology, content management, and audience engagement strategies.',
    ctaText: 'Create Your Media Platform',
    icon: 'Monitor'
  },

  'healthcare-medical-technology': {
    title: 'Healthcare & Medical Technology',
    shortName: 'Healthcare',
    tagline: 'Smart Tech. Better Care',
    heroHeadline: 'Revolutionary Healthcare & Medical Technology Solutions',
    heroSubheading: 'Improve patient outcomes and streamline healthcare operations with TalPro Solutions\' specialized medical technology expertise.',
    metaDescription: 'Transform healthcare with TalPro Solutions. Build secure medical applications, telemedicine platforms, and healthcare management systems.',
    challenges: [
      {
        id: 'data-privacy',
        title: 'Patient Data Privacy & Security',
        description: 'Healthcare applications must comply with HIPAA and other medical data privacy regulations while ensuring secure data transmission.'
      },
      {
        id: 'interoperability',
        title: 'System Interoperability',
        description: 'Medical systems need to integrate with existing hospital infrastructure, EMRs, and medical devices seamlessly.'
      },
      {
        id: 'accessibility',
        title: 'Healthcare Accessibility',
        description: 'Making healthcare services accessible to remote and underserved populations through technology solutions.'
      },
      {
        id: 'workflow-efficiency',
        title: 'Clinical Workflow Optimization',
        description: 'Streamlining clinical processes to reduce administrative burden and improve patient care efficiency.'
      },
      {
        id: 'telemedicine-remote-care',
        title: 'Telemedicine & Remote Care',
        description: 'Enabling comprehensive remote healthcare delivery with secure video consultations, remote monitoring, and virtual patient management capabilities.'
      },
      {
        id: 'medical-ai-diagnostics',
        title: 'Medical AI & Diagnostics',
        description: 'Implementing AI-powered diagnostic tools, clinical decision support systems, and predictive analytics to enhance medical accuracy and patient outcomes.'
      }
    ],
    solutions: [
      {
        id: 'telemedicine-platform',
        module: 'Telemedicine Solutions',
        title: 'Comprehensive Telemedicine Platform',
        description: 'HIPAA-compliant video consultation platform with patient records integration and prescription management.',
        challengeIds: ['accessibility', 'data-privacy', 'telemedicine-remote-care']
      },
      {
        id: 'ehr-systems',
        module: 'Electronic Health Records',
        title: 'Modern EHR & Practice Management',
        description: 'Cloud-based electronic health records system with appointment scheduling and billing integration.',
        challengeIds: ['interoperability', 'workflow-efficiency']
      },
      {
        id: 'mobile-health',
        module: 'Mobile Health Apps',
        title: 'Patient Engagement Apps',
        description: 'Mobile applications for patient monitoring, medication reminders, and health tracking.',
        challengeIds: ['accessibility', 'workflow-efficiency']
      },
      {
        id: 'ai-diagnostics',
        module: 'AI & Machine Learning',
        title: 'AI-Powered Diagnostic Tools',
        description: 'Machine learning solutions for medical imaging analysis and clinical decision support.',
        challengeIds: ['workflow-efficiency', 'interoperability', 'medical-ai-diagnostics']
      }
    ],
    services: [
      {
        id: 'healthcare-consulting',
        title: 'Healthcare IT Consulting',
        description: 'Strategic guidance for healthcare digital transformation and technology adoption in medical practices.'
      },
      {
        id: 'compliance-security',
        title: 'Medical Compliance & Security',
        description: 'HIPAA compliance implementation, security audits, and medical data protection services.'
      },
      {
        id: 'integration-services',
        title: 'Medical System Integration',
        description: 'Integration services for EMRs, medical devices, and laboratory systems with existing healthcare infrastructure.'
      },
      {
        id: 'training-support',
        title: 'Healthcare Technology Training',
        description: 'Comprehensive training programs for healthcare staff on new medical technologies and systems.'
      }
    ],
    relatedCaseStudyIds: [3, 5],
    userGuideTitle: 'Digital Health Transformation: A Guide for Healthcare Providers',
    userGuideContent: 'Learn how to implement digital health solutions that improve patient care and operational efficiency while maintaining compliance and security.',
    ctaText: 'Modernize Your Healthcare Practice',
    icon: 'Heart'
  },

  'ecommerce-retail-solutions': {
    title: 'E-commerce & Retail Solutions',
    shortName: 'E-commerce',
    tagline: 'Tech That Powers Checkout',
    heroHeadline: 'Advanced E-commerce & Retail Technology Solutions',
    heroSubheading: 'Build powerful online stores and retail platforms that drive sales and enhance customer experiences with TalPro Solutions.',
    metaDescription: 'Boost your retail business with TalPro Solutions. Create high-converting e-commerce platforms, inventory management systems, and omnichannel experiences.',
    challenges: [
      {
        id: 'conversion-optimization',
        title: 'Conversion Rate Optimization',
        description: 'Maximizing online sales through optimized user experience, fast loading times, and streamlined checkout processes.'
      },
      {
        id: 'inventory-management',
        title: 'Multi-Channel Inventory Management',
        description: 'Managing inventory across online stores, physical locations, and marketplaces with real-time synchronization.'
      },
      {
        id: 'payment-processing',
        title: 'Secure Payment Processing',
        description: 'Implementing secure, fast payment processing with support for multiple payment methods and currencies.'
      },
      {
        id: 'customer-experience',
        title: 'Personalized Customer Experience',
        description: 'Creating personalized shopping experiences with product recommendations and targeted marketing campaigns.'
      },
      {
        id: 'mobile-commerce',
        title: 'Mobile Commerce Optimization',
        description: 'Optimizing retail platforms for mobile devices with responsive design, mobile payments, and app-based shopping experiences.'
      },
      {
        id: 'supply-chain-logistics',
        title: 'Supply Chain & Logistics',
        description: 'Streamlining supply chain operations with automated logistics, order fulfillment, and real-time tracking capabilities.'
      }
    ],
    solutions: [
      {
        id: 'ecommerce-platform',
        module: 'E-commerce Platform',
        title: 'Custom E-commerce Solution',
        description: 'Scalable e-commerce platform with advanced features like product configurators and subscription management.',
        challengeIds: ['conversion-optimization', 'payment-processing']
      },
      {
        id: 'mobile-commerce',
        module: 'Mobile Commerce',
        title: 'Mobile Shopping Applications',
        description: 'Native and progressive web apps optimized for mobile shopping with push notifications and offline browsing.',
        challengeIds: ['customer-experience', 'conversion-optimization', 'mobile-commerce']
      },
      {
        id: 'inventory-system',
        module: 'Inventory Management',
        title: 'Integrated Inventory System',
        description: 'Comprehensive inventory management with automated reordering and multi-location tracking.',
        challengeIds: ['inventory-management', 'supply-chain-logistics']
      },
      {
        id: 'analytics-personalization',
        module: 'Analytics & AI',
        title: 'Customer Intelligence Platform',
        description: 'AI-powered analytics for customer behavior analysis, personalized recommendations, and sales forecasting.',
        challengeIds: ['customer-experience', 'inventory-management']
      }
    ],
    services: [
      {
        id: 'ecommerce-development',
        title: 'E-commerce Development',
        description: 'Full-stack e-commerce development with custom features, payment gateway integration, and performance optimization.'
      },
      {
        id: 'marketplace-integration',
        title: 'Marketplace Integration',
        description: 'Integration with major marketplaces like Amazon, eBay, and local African e-commerce platforms.'
      },
      {
        id: 'conversion-optimization',
        title: 'Conversion Rate Optimization',
        description: 'Data-driven optimization services to improve conversion rates, reduce cart abandonment, and increase average order value.'
      },
      {
        id: 'omnichannel-solutions',
        title: 'Omnichannel Retail Solutions',
        description: 'Unified retail experience across online and offline channels with inventory synchronization and customer data unification.'
      }
    ],
    relatedCaseStudyIds: [1, 2],
    userGuideTitle: 'E-commerce Success: Building High-Converting Online Stores',
    userGuideContent: 'Master the art of e-commerce with our comprehensive guide covering platform selection, conversion optimization, and customer acquisition strategies.',
    ctaText: 'Launch Your Online Store',
    icon: 'ShoppingCart'
  },

  'education-edtech-solutions': {
    title: 'Education & EdTech Solutions',
    shortName: 'Education',
    tagline: 'Code for Future Learning',
    heroHeadline: 'Innovative Education & EdTech Technology Solutions',
    heroSubheading: 'Transform learning experiences and educational outcomes with TalPro Solutions\' advanced educational technology platforms.',
    metaDescription: 'Revolutionize education with TalPro Solutions. Build learning management systems, educational apps, and interactive learning platforms.',
    challenges: [
      {
        id: 'engagement-retention',
        title: 'Student Engagement & Retention',
        description: 'Creating interactive and engaging learning experiences that keep students motivated and reduce dropout rates.'
      },
      {
        id: 'personalized-learning',
        title: 'Personalized Learning Paths',
        description: 'Adapting educational content and pace to individual student needs, learning styles, and progress levels.'
      },
      {
        id: 'accessibility-inclusion',
        title: 'Educational Accessibility',
        description: 'Making quality education accessible to students with disabilities and those in remote or underserved areas.'
      },
      {
        id: 'assessment-analytics',
        title: 'Assessment & Analytics',
        description: 'Implementing effective assessment methods and learning analytics to track student progress and educational outcomes.'
      },
      {
        id: 'teacher-training-support',
        title: 'Teacher Training & Support',
        description: 'Providing comprehensive training and ongoing support for educators to effectively integrate technology into their teaching methodologies.'
      },
      {
        id: 'infrastructure-integration',
        title: 'Infrastructure & Technology Integration',
        description: 'Ensuring reliable technology infrastructure and seamless integration with existing educational systems and administrative processes.'
      }
    ],
    solutions: [
      {
        id: 'lms-platform',
        module: 'Learning Management System',
        title: 'Comprehensive LMS Platform',
        description: 'Feature-rich learning management system with course authoring, student tracking, and collaboration tools.',
        challengeIds: ['engagement-retention', 'assessment-analytics', 'infrastructure-integration']
      },
      {
        id: 'mobile-learning',
        module: 'Mobile Learning Apps',
        title: 'Interactive Mobile Learning',
        description: 'Engaging mobile applications with offline learning capabilities and gamification elements.',
        challengeIds: ['accessibility-inclusion', 'engagement-retention']
      },
      {
        id: 'adaptive-learning',
        module: 'AI-Powered Learning',
        title: 'Adaptive Learning Technology',
        description: 'AI-driven personalized learning experiences that adapt to student performance and learning preferences.',
        challengeIds: ['personalized-learning', 'assessment-analytics']
      },
      {
        id: 'virtual-classroom',
        module: 'Virtual Classroom',
        title: 'Interactive Virtual Learning Environment',
        description: 'Real-time virtual classroom with video conferencing, whiteboard, and collaborative learning tools.',
        challengeIds: ['accessibility-inclusion', 'engagement-retention', 'teacher-training-support']
      }
    ],
    services: [
      {
        id: 'edtech-development',
        title: 'EdTech Platform Development',
        description: 'Custom educational platform development with learning analytics, student management, and content delivery systems.'
      },
      {
        id: 'content-digitization',
        title: 'Educational Content Digitization',
        description: 'Converting traditional educational materials into interactive digital content with multimedia and assessments.'
      },
      {
        id: 'learning-analytics',
        title: 'Learning Analytics Implementation',
        description: 'Advanced analytics solutions for tracking student performance, engagement, and educational effectiveness.'
      },
      {
        id: 'accessibility-compliance',
        title: 'Educational Accessibility Services',
        description: 'Making educational platforms compliant with accessibility standards and inclusive for all learners.'
      }
    ],
    relatedCaseStudyIds: [4, 6],
    userGuideTitle: 'Building Effective EdTech Solutions: A Complete Guide',
    userGuideContent: 'Discover how to create impactful educational technology solutions that improve learning outcomes and student engagement.',
    ctaText: 'Innovate Education Technology',
    icon: 'GraduationCap'
  }
};

// Export individual configurations for easier access
export const fintechConfig = industriesConfig['fintech-financial-services'];
export const mediaConfig = industriesConfig['media-entertainment-technology'];
export const healthcareConfig = industriesConfig['healthcare-medical-technology'];
export const ecommerceConfig = industriesConfig['ecommerce-retail-solutions'];
export const educationConfig = industriesConfig['education-edtech-solutions'];

// Helper function to get industry config by slug
export const getIndustryConfig = (slug: IndustrySlug): IndustryConfig | undefined => {
  return industriesConfig[slug];
};

// Helper function to get all industry slugs
export const getIndustrySlugs = (): IndustrySlug[] => {
  return Object.keys(industriesConfig) as IndustrySlug[];
};

// Helper function to get all industries for navigation
export const getIndustriesForNavigation = () => {
  return Object.entries(industriesConfig).map(([slug, config]) => ({
    slug: slug as IndustrySlug,
    title: config.title,
    shortName: config.shortName,
    icon: config.icon,
    tagline: config.tagline
  }));
};