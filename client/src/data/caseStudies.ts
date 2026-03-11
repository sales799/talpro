export const caseStudiesData = [
  {
    id: 1,
    title: 'E-Commerce Platform Transformation',
    client: 'Global Retail Corp',
    category: 'E-commerce',
    description: 'Complete platform redesign and modernization that increased online sales by 300% and improved user experience across all touchpoints.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
    metrics: [
      { label: 'Sales Increase', value: '300%' },
      { label: 'Page Load Time', value: '65% faster' },
      { label: 'Conversion Rate', value: '+45%' }
    ],
    duration: '8 months',
    teamSize: 12,
    challenge: 'Global Retail Corp was struggling with an outdated e-commerce platform that couldn\'t handle peak traffic loads, had poor mobile responsiveness, and provided a subpar user experience. The existing system was built on legacy technology and required frequent manual interventions.',
    solution: 'We designed and developed a completely new e-commerce platform using modern technologies. The solution included a responsive frontend built with React, a scalable Node.js backend, cloud infrastructure on AWS, and a robust PostgreSQL database. We implemented advanced caching, CDN integration, and mobile-first design principles.',
    results: [
      'Increased online sales by 300% within 6 months of launch',
      'Reduced page load times by 65% across all devices',
      'Improved conversion rates by 45% through better UX',
      'Achieved 99.9% uptime during peak shopping seasons',
      'Reduced customer support tickets by 40%'
    ],
    testimonial: {
      quote: 'Talpro transformed our entire e-commerce operation. The new platform not only handles our traffic beautifully but has directly contributed to a 300% increase in online sales. Their team\'s expertise and dedication were exceptional.',
      author: 'Sarah Johnson',
      position: 'CTO, Global Retail Corp',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    mediaAssets: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
        caption: 'Modern e-commerce dashboard interface'
      },
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
        caption: 'Real-time analytics and reporting'
      },
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1556742212-5b321f3c261b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
        caption: 'Mobile-responsive product pages'
      }
    ],
    videoDemo: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'Healthcare Mobile App',
    client: 'MediCare Solutions',
    category: 'Healthcare',
    description: 'Smart scheduling system and patient management app that reduced wait times by 70% and improved patient satisfaction scores.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['React Native', 'Python', 'MongoDB', 'Azure'],
    metrics: [
      { label: 'Wait Time Reduction', value: '70%' },
      { label: 'Patient Satisfaction', value: '+85%' },
      { label: 'App Downloads', value: '50K+' }
    ],
    duration: '6 months',
    teamSize: 8,
    challenge: 'MediCare Solutions faced significant challenges with patient scheduling inefficiencies, long wait times, and poor communication between patients and healthcare providers. Their manual scheduling system was causing frustration for both patients and staff.',
    solution: 'We developed a comprehensive mobile application using React Native for cross-platform compatibility. The app featured intelligent scheduling algorithms, real-time notifications, patient portal functionality, and integration with existing healthcare systems using Python backends and MongoDB for flexible data management.',
    results: [
      'Reduced average wait times by 70% through smart scheduling',
      'Increased patient satisfaction scores by 85%',
      'Achieved 50,000+ app downloads within first year',
      'Improved staff productivity by 40%',
      'Reduced no-show appointments by 55%'
    ],
    testimonial: {
      quote: 'The mobile app developed by Talpro has revolutionized our patient care delivery. Our patients love the convenience, and we\'ve seen dramatic improvements in efficiency and satisfaction.',
      author: 'Dr. Michael Chen',
      position: 'Medical Director, MediCare Solutions'
    }
  },
  {
    id: 3,
    title: 'AI Analytics Platform',
    client: 'FinTech Innovations',
    category: 'Finance',
    description: '5x improvement in decision-making speed with AI-powered insights platform for real-time financial analysis and risk assessment.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['Python', 'TensorFlow', 'React', 'AWS SageMaker'],
    metrics: [
      { label: 'Decision Speed', value: '5x faster' },
      { label: 'Risk Detection', value: '+90%' },
      { label: 'Cost Savings', value: '$2M annually' }
    ],
    duration: '10 months',
    teamSize: 15,
    challenge: 'FinTech Innovations needed to process vast amounts of financial data in real-time to make critical investment decisions. Their existing systems were slow, prone to errors, and couldn\'t provide the sophisticated analytics needed for competitive advantage.',
    solution: 'We built an AI-powered analytics platform using machine learning models with TensorFlow, deployed on AWS SageMaker for scalability. The platform features real-time data processing, predictive analytics, risk assessment algorithms, and an intuitive React-based dashboard for decision makers.',
    results: [
      'Accelerated decision-making process by 5x',
      'Improved risk detection accuracy by 90%',
      'Generated $2M in annual cost savings',
      'Reduced manual analysis time by 80%',
      'Increased portfolio performance by 25%'
    ],
    testimonial: {
      quote: 'Talpro\'s AI platform has given us a significant competitive edge. We can now make data-driven decisions in minutes instead of hours, and our risk management has never been better.',
      author: 'Jennifer Liu',
      position: 'Chief Data Officer, FinTech Innovations'
    }
  },
  {
    id: 4,
    title: 'Educational Learning Management System',
    client: 'EduTech Academy',
    category: 'Education',
    description: 'Comprehensive LMS with AI-powered personalized learning paths that improved student engagement by 200% and completion rates by 85%.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['Vue.js', 'Django', 'PostgreSQL', 'ML algorithms'],
    metrics: [
      { label: 'Student Engagement', value: '+200%' },
      { label: 'Completion Rate', value: '+85%' },
      { label: 'Active Users', value: '100K+' }
    ],
    duration: '7 months',
    teamSize: 10
  },
  {
    id: 5,
    title: 'Smart Manufacturing System',
    client: 'Industrial Solutions Inc',
    category: 'Manufacturing',
    description: 'IoT-enabled predictive maintenance system that reduced equipment downtime by 60% and increased overall equipment effectiveness.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['IoT sensors', 'Python', 'InfluxDB', 'Grafana'],
    metrics: [
      { label: 'Downtime Reduction', value: '60%' },
      { label: 'Maintenance Costs', value: '-40%' },
      { label: 'OEE Improvement', value: '+35%' }
    ],
    duration: '9 months',
    teamSize: 12
  },
  {
    id: 6,
    title: 'Banking Digital Transformation',
    client: 'Community Bank',
    category: 'Finance',
    description: 'Complete digital banking platform with mobile-first design that increased customer satisfaction by 95% and digital adoption by 80%.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    technologies: ['Angular', 'Spring Boot', 'Oracle', 'Kubernetes'],
    metrics: [
      { label: 'Customer Satisfaction', value: '+95%' },
      { label: 'Digital Adoption', value: '+80%' },
      { label: 'Transaction Volume', value: '+150%' }
    ],
    duration: '12 months',
    teamSize: 18
  }
];