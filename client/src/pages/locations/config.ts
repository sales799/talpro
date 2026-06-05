import { LucideIcon, Building2, Landmark, Factory, Palmtree, Mountain, Globe2 } from 'lucide-react';

// Icon map for location pages (prevents importing entire lucide-react library)
export const locationIconMap: Record<string, LucideIcon> = {
  'Building2': Building2,
  'Landmark': Landmark,
  'Factory': Factory,
  'Palmtree': Palmtree,
  'Mountain': Mountain,
  'Globe2': Globe2,
};

// TypeScript interfaces for location configuration
export interface LocationHighlight {
  value: string;
  label: string;
}

export interface LocationConfig {
  title: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheading: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  highlights: LocationHighlight[];
  overview: string;
  topRoles: string[];
  topSkills: string[];
  gccPresence: string;
  avgSalaryRange: string;
  talproAdvantage: string[];
  faqs: { q: string; a: string }[];
  ctaText: string;
  icon: string;
}

export type LocationSlug = string;

export type LocationConfigMap = Record<string, LocationConfig>;

// Location configurations — IT staffing & recruitment focus
export const locationsConfig: LocationConfigMap = {
  'bengaluru': {
    title: 'IT Staffing in Bengaluru',
    shortName: 'Bengaluru',
    tagline: 'India\'s Silicon Valley — Talpro HQ',
    heroHeadline: 'IT Staffing & Tech Recruitment in Bengaluru',
    heroSubheading: 'Hire from India\'s deepest tech talent pool. Bengaluru has 450+ GCCs, 2M+ IT professionals and the highest density of product engineers in the country — and Talpro is headquartered right here.',
    metaTitle: 'IT Staffing Agency in Bengaluru | Tech Recruitment | Talpro',
    metaDescription: 'Leading IT staffing agency in Bengaluru. Hire pre-vetted software engineers, cloud architects, data scientists and DevOps specialists. 48-hour shortlists from India\'s Silicon Valley.',
    keywords: [
      'IT staffing Bengaluru',
      'tech recruitment Bengaluru',
      'software engineer hiring Bangalore',
      'IT staffing agency Bangalore',
      'contract staffing Bengaluru',
      'GCC hiring Bengaluru',
      'cloud engineer recruitment Bangalore',
      'data scientist staffing Bengaluru',
      'DevOps hiring Bangalore',
      'IT manpower Bengaluru',
      'staff augmentation Bangalore',
      'tech talent Bengaluru',
    ],
    highlights: [
      { value: '450+', label: 'Global Capability Centres' },
      { value: '2M+', label: 'IT Professionals' },
      { value: '₹14L', label: 'Avg Tech Salary' },
      { value: '35%', label: 'YoY Hiring Growth' },
    ],
    overview: 'Bengaluru is India\'s undisputed technology capital and the world\'s second-largest tech talent cluster after the San Francisco Bay Area. With over 450 Global Capability Centres, the city houses engineering operations for virtually every major technology company — from Google, Microsoft and Amazon to SAP, Bosch and Goldman Sachs. The concentration of product engineering, SaaS and deep-tech talent here is unmatched anywhere in Asia.\n\nFor IT staffing, Bengaluru presents both the largest opportunity and the fiercest competition. Engineers receive 3-5 competing offers on average, counter-offers are aggressive, and notice periods extend to 90 days at many large firms. A staffing partner with deep local networks, real-time compensation benchmarks and pre-built candidate relationships is essential — not optional.\n\nTalpro is headquartered in Bengaluru, giving us ground-level access to the talent ecosystem across Whitefield, Electronic City, Manyata Tech Park, Outer Ring Road and Koramangala. We maintain active relationships with over 15,000 tech professionals in the city and deliver shortlists within 48 hours for most roles.',
    topRoles: [
      'Full-Stack Product Engineers',
      'Cloud & Platform Architects (AWS/GCP/Azure)',
      'Data Engineers & ML Engineers',
      'SRE & DevOps Specialists',
      'Backend Engineers (Java, Go, Python)',
      'React/Angular Frontend Engineers',
      'Engineering Managers & Tech Leads',
      'Mobile Engineers (React Native, Flutter, iOS)',
      'Security Engineers & AppSec Specialists',
      'QA Automation Engineers (Selenium, Cypress)',
    ],
    topSkills: [
      'Java / Spring Boot',
      'Python / Django / FastAPI',
      'React / Next.js / TypeScript',
      'AWS / GCP / Azure',
      'Kubernetes / Docker / Terraform',
      'Kafka / Spark / Airflow',
      'PostgreSQL / MongoDB / Redis',
      'Go / Rust',
      'TensorFlow / PyTorch',
      'GraphQL / gRPC',
    ],
    gccPresence: 'Google, Microsoft, Amazon, SAP, Goldman Sachs, JP Morgan, Bosch, Cisco, VMware, Walmart Labs — Bengaluru has the highest GCC density in India with 450+ centres employing over 500,000 professionals.',
    avgSalaryRange: '₹8L - ₹55L',
    talproAdvantage: [
      'Headquartered in Bengaluru with direct access to talent across all tech corridors — Whitefield, ORR, Electronic City and Manyata',
      'Active database of 15,000+ pre-vetted Bengaluru-based tech professionals with real-time availability tracking',
      'Deep relationships with GCC and startup hiring managers enabling faster offer-to-joining conversions',
      'Real-time compensation benchmarking specific to Bengaluru micro-markets, reducing offer-rejection rates by 40%',
    ],
    faqs: [
      {
        q: 'What is the average time-to-hire for IT roles in Bengaluru?',
        a: 'The average time-to-hire for mid-level IT roles in Bengaluru is 35-45 days through traditional channels. Talpro reduces this to 15-20 days through pre-vetted talent pools and proactive candidate engagement, with initial shortlists delivered within 48 hours of requirement confirmation.',
      },
      {
        q: 'How does Talpro handle 90-day notice periods common in Bengaluru?',
        a: 'We maintain a pipeline of candidates already in their notice period or with negotiable notice terms. For critical roles, we help negotiate buyouts and early releases. Our pre-built talent pool means we can present candidates who are available within 15-30 days rather than waiting 90 days.',
      },
      {
        q: 'What IT salary ranges should I budget for in Bengaluru?',
        a: 'Bengaluru IT salaries range from ₹8L for junior developers to ₹55L+ for senior architects and engineering leaders. Mid-level full-stack engineers typically command ₹16-28L, while specialist roles like ML engineers or cloud architects range from ₹25-45L. Talpro provides role-specific benchmarks updated quarterly.',
      },
      {
        q: 'Does Talpro provide contract staffing in Bengaluru?',
        a: 'Yes, contract staffing is one of our core offerings in Bengaluru. We provide staff augmentation for project-based needs, GCC ramp-ups and peak workload periods. Contract engagements can be structured as time-and-materials, fixed-duration or contract-to-hire depending on your requirements.',
      },
      {
        q: 'Which tech hubs in Bengaluru does Talpro cover?',
        a: 'We cover all major tech corridors including Whitefield and ITPL, Outer Ring Road (Marathahalli to Sarjapur), Electronic City, Manyata Tech Park, Bagmane Tech Park, Koramangala, HSR Layout and Indiranagar. Our local presence means we understand commute preferences — a critical factor in candidate decisions.',
      },
    ],
    ctaText: 'Hire Tech Talent in Bengaluru',
    icon: 'Building2',
  },

  'hyderabad': {
    title: 'IT Staffing in Hyderabad',
    shortName: 'Hyderabad',
    tagline: 'HITEC City — GCC Powerhouse',
    heroHeadline: 'IT Staffing & Tech Recruitment in Hyderabad',
    heroSubheading: 'Tap into Hyderabad\'s booming tech ecosystem — home to Microsoft, Google, Amazon and 200+ GCCs. Hire cloud engineers, data scientists and enterprise architects from India\'s fastest-growing IT hub.',
    metaTitle: 'IT Staffing Agency in Hyderabad | Tech Recruitment | Talpro',
    metaDescription: 'Top IT staffing agency in Hyderabad. Hire cloud engineers, data scientists, Java developers and DevOps specialists. HITEC City and Gachibowli talent with 48-hour shortlists.',
    keywords: [
      'IT staffing Hyderabad',
      'tech recruitment Hyderabad',
      'software engineer hiring Hyderabad',
      'IT staffing agency HITEC City',
      'cloud engineer recruitment Hyderabad',
      'data scientist staffing Hyderabad',
      'GCC hiring Hyderabad',
      'contract staffing Hyderabad',
      'Java developer Hyderabad',
      'IT manpower Hyderabad',
      'staff augmentation Hyderabad',
      'pharma IT staffing Hyderabad',
    ],
    highlights: [
      { value: '200+', label: 'Global Capability Centres' },
      { value: '1.5M+', label: 'IT Professionals' },
      { value: '₹12L', label: 'Avg Tech Salary' },
      { value: '30%', label: 'YoY Hiring Growth' },
    ],
    overview: 'Hyderabad has emerged as India\'s second-most important technology hub, with HITEC City and Gachibowli forming one of Asia\'s densest enterprise-IT corridors. The city hosts 200+ Global Capability Centres including major engineering operations for Microsoft, Google, Amazon, Apple, Qualcomm and Uber. The Telangana government\'s proactive IT policies and infrastructure investment have made Hyderabad the fastest-growing tech destination in India.\n\nWhat distinguishes Hyderabad from other IT cities is its unique pharma-IT crossover. With India\'s largest pharmaceutical cluster co-located in the city, there is strong demand for engineers who understand life-sciences data, regulatory systems and clinical-trial platforms — alongside traditional enterprise software and cloud roles.\n\nHyderabad offers a compelling cost advantage over Bengaluru, with salaries averaging 15-20% lower for equivalent roles while maintaining comparable talent quality. This makes it a strategic location for GCC expansions and nearshore team builds. Talpro\'s Hyderabad practice focuses on HITEC City, Gachibowli, Madhapur, Nanakramguda and the emerging Kokapet-Financial District corridor.',
    topRoles: [
      'Cloud Engineers (AWS/Azure/GCP)',
      'Java & .NET Enterprise Developers',
      'Data Engineers & Analytics Specialists',
      'DevOps & SRE Engineers',
      'Pharma-IT & Life Sciences Developers',
      'Full-Stack Engineers (React + Java/Python)',
      'Salesforce & ServiceNow Consultants',
      'QA Automation Engineers',
      'Cybersecurity Analysts & Engineers',
      'SAP & ERP Specialists',
    ],
    topSkills: [
      'Java / Spring Boot / Microservices',
      'AWS / Azure / GCP',
      'Python / Data Engineering',
      '.NET / C#',
      'React / Angular / TypeScript',
      'Salesforce / ServiceNow',
      'Kubernetes / Docker / Jenkins',
      'Spark / Databricks / Snowflake',
      'SAP S/4HANA',
      'Selenium / Cypress / Playwright',
    ],
    gccPresence: 'Microsoft, Google, Amazon, Apple, Qualcomm, Uber, Meta, Deloitte, Wells Fargo, Bank of America — Hyderabad\'s GCC ecosystem is the fastest-growing in India, with major expansions from 2023 onwards.',
    avgSalaryRange: '₹7L - ₹45L',
    talproAdvantage: [
      'Deep talent network across HITEC City, Gachibowli, Madhapur and the Financial District corridor',
      'Specialised pharma-IT recruitment practice for life-sciences companies needing tech talent with domain context',
      'Cost-optimised staffing — Hyderabad salaries are 15-20% lower than Bengaluru with comparable quality',
      'Strong GCC ramp-up experience — proven track record of scaling teams from 5 to 50+ within a quarter',
    ],
    faqs: [
      {
        q: 'Why should I hire IT talent in Hyderabad instead of Bengaluru?',
        a: 'Hyderabad offers equivalent talent quality at 15-20% lower compensation levels, lower attrition rates, excellent infrastructure in HITEC City and Gachibowli, and a supportive state government. Many GCCs are choosing Hyderabad for new centre setups or expansions specifically for these cost and retention advantages.',
      },
      {
        q: 'What are the most in-demand IT roles in Hyderabad?',
        a: 'Cloud engineers (AWS/Azure), Java enterprise developers, data engineers, DevOps specialists and Salesforce consultants are consistently the hardest-to-fill roles. Pharma-IT crossover roles — engineers with life-sciences domain understanding — are a Hyderabad-specific demand driver.',
      },
      {
        q: 'Does Talpro support GCC team ramp-ups in Hyderabad?',
        a: 'Yes, GCC ramp-ups are a core specialty. We have scaled teams from founding engineers to 50+ member engineering organisations within a single quarter for multiple GCCs in HITEC City and Gachibowli. Our process includes compensation benchmarking, employer branding support and structured onboarding.',
      },
      {
        q: 'What is the typical notice period for IT professionals in Hyderabad?',
        a: 'Most large IT companies and GCCs in Hyderabad mandate 60-90 day notice periods. Startups and mid-size firms typically have 30-day periods. Talpro maintains a ready-to-join pipeline and helps negotiate early releases when faster joining is required.',
      },
      {
        q: 'Which areas in Hyderabad have the highest concentration of IT talent?',
        a: 'HITEC City, Gachibowli, Madhapur and Nanakramguda form the primary tech corridor. The Financial District (Kokapet-Narsingi) is emerging as a major new hub with several GCC campuses under construction. Kondapur and Kukatpally are key residential areas where IT professionals concentrate.',
      },
    ],
    ctaText: 'Hire Tech Talent in Hyderabad',
    icon: 'Landmark',
  },

  'pune': {
    title: 'IT Staffing in Pune',
    shortName: 'Pune',
    tagline: 'Engineering Culture Meets IT',
    heroHeadline: 'IT Staffing & Tech Recruitment in Pune',
    heroSubheading: 'Hire from Pune\'s strong engineering talent base — where automotive R&D meets modern software development. Access embedded systems, enterprise IT and product engineering talent across Hinjewadi, Kharadi and Magarpatta.',
    metaTitle: 'IT Staffing Agency in Pune | Tech Recruitment | Talpro',
    metaDescription: 'Expert IT staffing in Pune. Hire embedded systems engineers, full-stack developers, DevOps specialists and automotive-IT professionals. Hinjewadi and Kharadi talent networks.',
    keywords: [
      'IT staffing Pune',
      'tech recruitment Pune',
      'software engineer hiring Pune',
      'IT staffing agency Hinjewadi',
      'embedded systems hiring Pune',
      'automotive IT staffing Pune',
      'contract staffing Pune',
      'DevOps recruitment Pune',
      'full-stack developer Pune',
      'IT manpower Pune',
      'staff augmentation Pune',
      'Kharadi IT staffing',
    ],
    highlights: [
      { value: '150+', label: 'Global Capability Centres' },
      { value: '800K+', label: 'IT Professionals' },
      { value: '₹11L', label: 'Avg Tech Salary' },
      { value: '25%', label: 'YoY Hiring Growth' },
    ],
    overview: 'Pune has established itself as India\'s third-largest IT hub, with a distinctive character shaped by its strong engineering education ecosystem and deep automotive-manufacturing heritage. The city produces more engineering graduates per capita than any other Indian metro, creating a consistent pipeline of technically rigorous talent. Hinjewadi IT Park, Kharadi, Magarpatta and Talawade form the core tech corridors.\n\nPune\'s unique strength lies in the crossover between automotive R&D and modern software engineering. Companies like Volkswagen, Mercedes-Benz, Cummins and John Deere run major engineering centres here alongside pure-play IT firms. This creates a talent pool skilled in embedded systems, ADAS, IoT and industrial automation — capabilities increasingly in demand as every industry digitises.\n\nThe city offers a compelling balance of talent quality, cost efficiency and quality of life. IT salaries are 20-25% lower than Bengaluru, attrition rates are notably lower, and the city\'s compact geography means shorter commutes. Pune is particularly strong for mid-level engineering talent and has become a preferred location for offshore development centres and engineering service companies.',
    topRoles: [
      'Embedded Systems & Firmware Engineers',
      'Full-Stack Engineers (Java/React)',
      'Automotive Software Engineers (ADAS, AUTOSAR)',
      'DevOps & Cloud Infrastructure Engineers',
      'QA & Test Automation Specialists',
      'Data Engineers & BI Developers',
      'Python / Django Backend Engineers',
      'IoT & Industrial Automation Engineers',
      'Technical Project Managers',
      'UI/UX Engineers',
    ],
    topSkills: [
      'Java / Spring Boot',
      'Embedded C / C++ / AUTOSAR',
      'Python / Django / Flask',
      'React / Angular / TypeScript',
      'AWS / Azure',
      'MATLAB / Simulink',
      'Docker / Kubernetes / Jenkins',
      'Selenium / Appium / TestNG',
      'SQL / Power BI / Tableau',
      'ROS / RTOS / CAN protocols',
    ],
    gccPresence: 'Volkswagen, Mercedes-Benz, Cummins, Barclays, Credit Suisse (UBS), Persistent Systems, Syntel (Atos), John Deere — Pune\'s GCC mix uniquely blends automotive R&D with financial services and enterprise IT.',
    avgSalaryRange: '₹6L - ₹40L',
    talproAdvantage: [
      'Specialised embedded-systems and automotive-IT recruitment practice — rare among IT staffing agencies',
      'Strong network across Hinjewadi, Kharadi, Magarpatta and Talawade tech parks with pre-vetted local talent',
      'Access to Pune\'s engineering college pipeline (COEP, MIT, VIT, Symbiosis) for campus and early-career hiring',
      'Lower attrition rates than Bengaluru and Mumbai — Pune hires tend to stay 30% longer on average',
    ],
    faqs: [
      {
        q: 'What makes Pune different for IT staffing compared to Bengaluru?',
        a: 'Pune offers strong engineering talent at 20-25% lower salary levels, significantly lower attrition rates and a unique talent pool skilled in embedded systems, automotive software and industrial IoT. The city\'s compact size means commute is rarely a deal-breaker for candidates, unlike Bengaluru.',
      },
      {
        q: 'Can I find embedded systems and automotive IT talent in Pune?',
        a: 'Pune is India\'s best city for embedded-systems and automotive-IT recruitment. With major R&D centres for Volkswagen, Mercedes-Benz, Cummins and John Deere, plus engineering colleges specialising in automotive and electronics, Pune has the deepest talent pool for AUTOSAR, ADAS, firmware and IoT roles.',
      },
      {
        q: 'What IT salary ranges should I expect in Pune?',
        a: 'Junior developers start at ₹6-8L, mid-level full-stack engineers command ₹14-22L, and senior architects and engineering managers range from ₹28-40L. Embedded systems specialists and automotive software engineers typically command a 10-15% premium over equivalent pure-IT roles.',
      },
      {
        q: 'Which IT parks in Pune have the most tech companies?',
        a: 'Hinjewadi IT Park (Rajiv Gandhi Infotech Park) is the largest, hosting Infosys, Wipro, Cognizant and multiple GCCs. Kharadi (EON IT Park, World Trade Center) and Magarpatta City are the other major clusters. Talawade and Baner-Balewadi are emerging corridors with growing startup presence.',
      },
      {
        q: 'Does Talpro handle contract staffing for IT projects in Pune?',
        a: 'Yes, we provide contract staffing, staff augmentation and project-based team builds across Pune. Our contract model covers everything from individual specialist placements to fully managed engineering pods. We handle payroll, compliance and performance tracking for contract resources.',
      },
    ],
    ctaText: 'Hire Tech Talent in Pune',
    icon: 'Factory',
  },

  'chennai': {
    title: 'IT Staffing in Chennai',
    shortName: 'Chennai',
    tagline: 'Enterprise IT & Backend Backbone',
    heroHeadline: 'IT Staffing & Tech Recruitment in Chennai',
    heroSubheading: 'Hire from Chennai\'s deep enterprise-IT talent pool — strong in backend engineering, infrastructure and large-scale system delivery. Home to TCS, Cognizant, Infosys campuses and a growing GCC ecosystem.',
    metaTitle: 'IT Staffing Agency in Chennai | Tech Recruitment | Talpro',
    metaDescription: 'Trusted IT staffing agency in Chennai. Hire Java backend engineers, infrastructure specialists, QA leads and enterprise architects. OMR and Sholinganallur talent networks.',
    keywords: [
      'IT staffing Chennai',
      'tech recruitment Chennai',
      'software engineer hiring Chennai',
      'IT staffing agency OMR',
      'Java developer Chennai',
      'backend engineer staffing Chennai',
      'contract staffing Chennai',
      'infrastructure engineer Chennai',
      'IT manpower Chennai',
      'staff augmentation Chennai',
      'QA automation hiring Chennai',
      'enterprise IT staffing Chennai',
    ],
    highlights: [
      { value: '120+', label: 'Global Capability Centres' },
      { value: '1M+', label: 'IT Professionals' },
      { value: '₹10L', label: 'Avg Tech Salary' },
      { value: '22%', label: 'YoY Hiring Growth' },
    ],
    overview: 'Chennai is India\'s fourth-largest IT hub and the traditional stronghold of enterprise IT services. The city\'s IT Corridor along Old Mahabalipuram Road (OMR) — stretching from Perungudi through Sholinganallur to Siruseri — houses some of India\'s largest technology campuses. TCS, Cognizant, Infosys, HCL and Wipro have massive delivery centres here, creating a workforce deeply experienced in large-scale enterprise software delivery.\n\nChennai\'s talent pool is particularly strong in backend engineering, infrastructure, mainframe modernisation and quality assurance. The city has traditionally been the backbone of India\'s IT services export industry, and this translates into engineers who are disciplined, process-oriented and experienced in working with global enterprise clients. The growing GCC presence — with Caterpillar, BNY Mellon, Standard Chartered, PayPal and Zoho headquartered here — is shifting the talent mix toward product engineering.\n\nCost efficiency is a significant advantage — Chennai salaries are 25-30% lower than Bengaluru for equivalent roles. The city also benefits from strong engineering colleges (IIT Madras, Anna University, SRM, VIT Vellore nearby) that feed a consistent junior-talent pipeline. Talpro\'s Chennai practice covers the OMR corridor, Ambattur Industrial Estate, Guindy and the DLF IT Park in Porur.',
    topRoles: [
      'Java Backend Engineers (Spring Boot, Microservices)',
      'Infrastructure & Cloud Engineers',
      'QA Leads & Test Automation Architects',
      'Mainframe Modernisation Specialists',
      '.NET / C# Enterprise Developers',
      'Database Administrators (Oracle, SQL Server)',
      'DevOps Engineers (Jenkins, Ansible, Terraform)',
      'Business Analysts & Technical Architects',
      'SAP Functional & Basis Consultants',
      'Network & Security Engineers',
    ],
    topSkills: [
      'Java / J2EE / Spring Boot',
      '.NET / C# / ASP.NET',
      'Oracle / PL-SQL / SQL Server',
      'AWS / Azure / VMware',
      'Mainframe (COBOL, JCL, DB2)',
      'Selenium / UFT / JIRA',
      'Linux / Windows Server Administration',
      'Jenkins / Ansible / Terraform',
      'SAP ABAP / S4HANA',
      'Python / Shell Scripting',
    ],
    gccPresence: 'Caterpillar, BNY Mellon, Standard Chartered, PayPal, Zoho (HQ), Freshworks (HQ), Verizon, Cognizant (HQ), TCS (major campus) — Chennai blends IT services giants with growing product companies and GCCs.',
    avgSalaryRange: '₹6L - ₹38L',
    talproAdvantage: [
      'Strong network in the OMR IT Corridor — Perungudi, Sholinganallur, Navalur and Siruseri ITPL',
      'Specialised in enterprise-IT and mainframe-modernisation staffing that many agencies overlook',
      'Access to IIT Madras and Anna University talent pipeline for early-career and research-oriented roles',
      'Cost-optimised staffing — Chennai offers 25-30% savings over Bengaluru with strong delivery discipline',
    ],
    faqs: [
      {
        q: 'What types of IT roles are most in demand in Chennai?',
        a: 'Java backend engineers, infrastructure and cloud specialists, QA automation leads and mainframe modernisation experts are consistently in high demand. With growing GCC presence, product engineering roles (full-stack, data engineering, ML) are also increasing rapidly.',
      },
      {
        q: 'How does Chennai compare to Bengaluru for IT hiring costs?',
        a: 'Chennai offers 25-30% lower salaries than Bengaluru for equivalent skill levels. A mid-level Java developer commanding ₹18-22L in Bengaluru would typically be available at ₹14-17L in Chennai. Combined with lower attrition and real estate costs, the total cost advantage can reach 35%.',
      },
      {
        q: 'Is Chennai good for hiring backend and infrastructure engineers?',
        a: 'Chennai is arguably India\'s strongest city for backend and infrastructure talent. Decades of enterprise IT services delivery have created a deep pool of engineers experienced in large-scale distributed systems, database management, mainframe operations and infrastructure automation.',
      },
      {
        q: 'Where are the main IT hubs in Chennai?',
        a: 'The OMR (Old Mahabalipuram Road) IT Corridor is the primary hub, stretching from Perungudi through Sholinganallur to Siruseri ITPL. Other significant clusters include DLF IT Park in Porur/Mount Poonamallee, Ambattur Industrial Estate, Guindy and the emerging Pallavaram-Thoraipakkam stretch.',
      },
      {
        q: 'Does Talpro support mainframe modernisation staffing in Chennai?',
        a: 'Yes, mainframe modernisation is a Chennai-specific specialty for Talpro. We source COBOL/JCL engineers, mainframe-to-cloud migration specialists and developers experienced in re-platforming legacy systems. Chennai has one of India\'s largest mainframe talent pools due to decades of enterprise services delivery.',
      },
    ],
    ctaText: 'Hire Tech Talent in Chennai',
    icon: 'Palmtree',
  },

  'mumbai': {
    title: 'IT Staffing in Mumbai',
    shortName: 'Mumbai',
    tagline: 'BFSI Meets Fintech Innovation',
    heroHeadline: 'IT Staffing & Tech Recruitment in Mumbai',
    heroSubheading: 'Hire where finance meets technology. Mumbai\'s unique BFSI-IT crossover creates specialists in trading systems, payment platforms, regulatory tech and enterprise fintech — available nowhere else in India at this scale.',
    metaTitle: 'IT Staffing Agency in Mumbai | Tech Recruitment | Talpro',
    metaDescription: 'Leading IT staffing agency in Mumbai. Hire fintech engineers, BFSI technology specialists, full-stack developers and data scientists. BKC and Powai talent with 48-hour shortlists.',
    keywords: [
      'IT staffing Mumbai',
      'tech recruitment Mumbai',
      'fintech hiring Mumbai',
      'BFSI IT staffing Mumbai',
      'software engineer hiring Mumbai',
      'IT staffing agency BKC',
      'contract staffing Mumbai',
      'data scientist Mumbai',
      'trading systems developer Mumbai',
      'IT manpower Mumbai',
      'staff augmentation Mumbai',
      'payment engineer Mumbai',
    ],
    highlights: [
      { value: '100+', label: 'Global Capability Centres' },
      { value: '700K+', label: 'IT Professionals' },
      { value: '₹15L', label: 'Avg Tech Salary' },
      { value: '28%', label: 'YoY Hiring Growth' },
    ],
    overview: 'Mumbai is India\'s financial capital and the natural home of BFSI technology. The city houses the headquarters of every major Indian bank, the Bombay Stock Exchange, the National Stock Exchange and the Reserve Bank of India. This creates a uniquely dense ecosystem of fintech startups, banking technology teams and financial-services GCCs that need engineers who understand both code and capital markets.\n\nThe BKC (Bandra-Kurla Complex) corporate district, Powai tech hub, Andheri-Goregaon corridor and Navi Mumbai\'s Airoli-Ghansoli stretch form Mumbai\'s primary IT geography. Unlike Bengaluru\'s product-engineering focus, Mumbai\'s tech talent leans toward financial systems — trading platforms, payment gateways, risk engines, regulatory reporting and core banking.\n\nMumbai also has India\'s most vibrant startup ecosystem outside Bengaluru, particularly in fintech, insurtech and proptech. Companies like Razorpay, CRED, Zerodha, PhonePe and PolicyBazaar have significant Mumbai operations. Talpro\'s Mumbai practice specialises in the BFSI-IT intersection, sourcing engineers who combine technical depth with financial-domain understanding.',
    topRoles: [
      'Fintech & Payment Platform Engineers',
      'Trading Systems & Low-Latency Developers',
      'Data Scientists & Quant Developers',
      'Risk & Compliance Technology Engineers',
      'Full-Stack Engineers (Node.js/React)',
      'Core Banking & Integration Specialists',
      'Cloud & Infrastructure Architects',
      'Cybersecurity & InfoSec Specialists',
      'Product Managers (Fintech/BFSI)',
      'Blockchain & DeFi Engineers',
    ],
    topSkills: [
      'Java / C++ / Low-Latency Systems',
      'Python / R / Quantitative Modelling',
      'React / Node.js / TypeScript',
      'AWS / Azure / Hybrid Cloud',
      'Kafka / RabbitMQ / Event-Driven Architecture',
      'SQL / Oracle / Time-Series Databases',
      'Docker / Kubernetes / Microservices',
      'Solidity / Web3 / Blockchain',
      'Elasticsearch / Grafana / Monitoring',
      'FIX Protocol / Market Data APIs',
    ],
    gccPresence: 'JP Morgan (largest tech hub globally), Morgan Stanley, Barclays, Deutsche Bank, HSBC, Nomura, BlackRock — Mumbai has the highest concentration of banking and financial-services GCCs in India.',
    avgSalaryRange: '₹8L - ₹50L',
    talproAdvantage: [
      'Deep BFSI-IT specialisation — engineers who understand trading systems, regulatory frameworks and financial data are our core strength in Mumbai',
      'Strong relationships with fintech startups and banking GCCs across BKC, Powai, Goregaon and Navi Mumbai',
      'Compliance-aware hiring process aligned with RBI, SEBI and PCI-DSS requirements for financial technology roles',
      'Access to quantitative talent from IIT Bombay, NMIMS and Mumbai\'s business school ecosystem',
    ],
    faqs: [
      {
        q: 'Why choose Mumbai for fintech and BFSI IT staffing?',
        a: 'Mumbai is India\'s financial capital with the highest concentration of banks, NBFCs, stock exchanges and fintech companies. Engineers here develop domain expertise in payments, trading, risk and regulatory tech through proximity to financial institutions — expertise that is difficult to replicate in other cities.',
      },
      {
        q: 'What salary premiums should I expect for fintech roles in Mumbai?',
        a: 'Mumbai fintech and BFSI-IT roles command a 15-25% premium over equivalent non-domain roles. A mid-level Java developer might earn ₹16-20L, but a payment-platform engineer or trading-systems developer with domain experience will command ₹22-30L. Quant developers and low-latency specialists can reach ₹40-50L.',
      },
      {
        q: 'Can Talpro help hire trading systems and low-latency engineers in Mumbai?',
        a: 'Yes, trading systems and low-latency development is a Mumbai-specific niche we serve. We source C++/Java developers experienced in FIX protocol, market-data feeds, order-management systems and ultra-low-latency architecture for brokerages, exchanges and proprietary trading firms.',
      },
      {
        q: 'Which areas in Mumbai are IT hubs?',
        a: 'BKC (Bandra-Kurla Complex) is the premium corporate and fintech hub. Powai is the startup and tech centre. Andheri-Goregaon (Mindspace, Oberoi Garden City) houses mid-to-large IT companies. Navi Mumbai (Airoli, Ghansoli, Vashi) has IT parks with lower costs. Lower Parel and Worli also have significant fintech presence.',
      },
      {
        q: 'Does Talpro provide IT contract staffing in Mumbai?',
        a: 'Yes, contract staffing is significant in Mumbai due to project-based banking technology work. We provide contract engineers for core-banking migrations, regulatory-compliance projects, payment-platform builds and digital transformation initiatives. Typical engagements range from 6 to 18 months.',
      },
    ],
    ctaText: 'Hire Tech Talent in Mumbai',
    icon: 'Mountain',
  },

  'delhi-ncr': {
    title: 'IT Staffing in Delhi-NCR',
    shortName: 'Delhi-NCR',
    tagline: 'Startups, Enterprises & Government IT',
    heroHeadline: 'IT Staffing & Tech Recruitment in Delhi-NCR',
    heroSubheading: 'Hire across India\'s most diverse IT market — from Gurugram\'s enterprise campuses and Noida\'s IT parks to Delhi\'s government-tech ecosystem. Access startup engineers, enterprise architects and govtech specialists in one region.',
    metaTitle: 'IT Staffing Agency in Delhi-NCR | Tech Recruitment | Talpro',
    metaDescription: 'Expert IT staffing agency in Delhi-NCR. Hire full-stack developers, enterprise architects, startup engineers and govtech specialists across Gurugram, Noida and Delhi.',
    keywords: [
      'IT staffing Delhi NCR',
      'tech recruitment Gurugram',
      'software engineer hiring Noida',
      'IT staffing agency Gurgaon',
      'startup hiring Delhi',
      'enterprise IT staffing NCR',
      'contract staffing Delhi NCR',
      'govtech staffing Delhi',
      'full-stack developer Gurugram',
      'IT manpower Delhi',
      'staff augmentation Noida',
      'IT recruitment Gurgaon Noida',
    ],
    highlights: [
      { value: '180+', label: 'Global Capability Centres' },
      { value: '1.2M+', label: 'IT Professionals' },
      { value: '₹13L', label: 'Avg Tech Salary' },
      { value: '27%', label: 'YoY Hiring Growth' },
    ],
    overview: 'Delhi-NCR is India\'s second-largest IT employment market, spanning three distinct but interconnected tech ecosystems: Gurugram (Gurgaon) with its corporate campuses and GCCs, Noida-Greater Noida with IT parks and services companies, and Delhi proper with government-tech, media-tech and the startup ecosystem.\n\nGurugram is the enterprise heart of NCR, hosting GCCs for Google, Meta, Airtel, American Express, Genpact and dozens of Fortune 500 companies along Golf Course Road, Cyber City and Udyog Vihar. Noida\'s Sector 62, 125 and 135 house HCL, Samsung R&D and a dense cluster of mid-size IT companies. The region offers the widest variety of IT roles in India — from low-latency trading systems to government portal development.\n\nDelhi-NCR\'s unique advantage is its tri-city structure, which creates salary arbitrage opportunities. A role priced at ₹25L in Gurugram might be fillable at ₹18-20L in Noida with comparable talent. The region also benefits from proximity to central government, making it India\'s primary hub for govtech, defence-tech and public-sector IT projects. Talpro\'s NCR practice covers Cyber City and Golf Course Road in Gurugram, Sector 62-135 in Noida, and Connaught Place and Aerocity in Delhi.',
    topRoles: [
      'Full-Stack Engineers (MERN/MEAN Stack)',
      'Enterprise Architects & Solution Architects',
      'Frontend Engineers (React/Angular/Vue)',
      'Mobile App Developers (React Native, Flutter)',
      'Data Engineers & Analytics Managers',
      'DevOps & Cloud Engineers',
      'GovTech & e-Governance Developers',
      'Product Managers & Scrum Masters',
      'Salesforce & CRM Specialists',
      'AI/ML Engineers',
    ],
    topSkills: [
      'React / Next.js / TypeScript',
      'Node.js / Express / NestJS',
      'Python / Django / FastAPI',
      'AWS / Azure / GCP',
      'React Native / Flutter',
      'Java / Spring Boot',
      'MongoDB / PostgreSQL / Redis',
      'Docker / Kubernetes / CI-CD',
      'Salesforce / HubSpot / CRM',
      'TensorFlow / LangChain / GenAI',
    ],
    gccPresence: 'Google, Meta, American Express, Genpact (HQ), Airtel (HQ), Samsung R&D, HCL (HQ), Ericsson, Publicis Sapient, Adobe — Delhi-NCR has the most diverse industry mix among India\'s GCC hubs.',
    avgSalaryRange: '₹7L - ₹48L',
    talproAdvantage: [
      'Tri-city coverage across Gurugram, Noida and Delhi — giving access to the widest talent pool and salary-arbitrage opportunities in India',
      'Strong startup ecosystem connections — we recruit for funded Series A-C companies that need to scale engineering teams rapidly',
      'Government-tech and enterprise-IT specialisation for public-sector projects, defence-tech and large-scale digital transformation',
      'Dual-city candidate matching — we identify Noida-based talent for Gurugram roles (and vice versa) to expand the available pool by 40%',
    ],
    faqs: [
      {
        q: 'Should I hire in Gurugram or Noida for IT roles?',
        a: 'It depends on your budget and talent needs. Gurugram commands 15-20% higher salaries but offers proximity to corporate GCCs and premium office infrastructure. Noida provides better value with strong mid-level talent and large IT parks. Many companies maintain offices in both cities. Talpro can source across both regions regardless of your office location.',
      },
      {
        q: 'What is the startup hiring landscape like in Delhi-NCR?',
        a: 'Delhi-NCR has India\'s second-largest startup ecosystem with over 7,000 funded startups. The region is strong in consumer-internet, D2C, edtech and fintech. Startup engineering salaries are competitive with Bengaluru for senior roles but offer more affordable mid-level hiring. Talpro works with Series A through pre-IPO companies.',
      },
      {
        q: 'Can Talpro help with government IT and govtech staffing in Delhi?',
        a: 'Yes, Delhi\'s proximity to central government makes it the hub for govtech projects. We staff engineers for NIC, UIDAI ecosystem partners, DigiLocker integrations and state-level e-governance platforms. We also support defence-tech companies and government system integrators with cleared technical talent.',
      },
      {
        q: 'What are the main IT hubs in Delhi-NCR?',
        a: 'Gurugram: Cyber City (DLF), Golf Course Road, Udyog Vihar, Sector 44-48. Noida: Sector 62 (HCL campus), Sector 125-135 (IT parks), Greater Noida Expressway. Delhi: Connaught Place, Aerocity, Okhla NSEZ. Each hub has a distinct talent profile and salary band.',
      },
      {
        q: 'How does attrition in Delhi-NCR compare to Bengaluru?',
        a: 'Delhi-NCR attrition rates are 5-8% lower than Bengaluru for equivalent roles, particularly in Noida where lifestyle costs are lower and commute distances shorter. Gurugram attrition is closer to Bengaluru levels due to similar competitive dynamics. Talpro\'s retention-focused hiring process — including culture-fit assessment and compensation benchmarking — helps reduce early attrition by 30%.',
      },
    ],
    ctaText: 'Hire Tech Talent in Delhi-NCR',
    icon: 'Globe2',
  },
};

const makeLocation = (
  slug: string,
  shortName: string,
  tagline: string,
  highlights: LocationHighlight[],
  salary: string,
  corridors: string,
  specialties: string[],
  icon: string,
): [string, LocationConfig] => [
  slug,
  {
    title: `IT Staffing in ${shortName}`,
    shortName,
    tagline,
    heroHeadline: `IT Staffing & Tech Recruitment in ${shortName}`,
    heroSubheading: `Hire pre-vetted software, cloud, data and product talent in ${shortName}. Talpro localises every shortlist around ${corridors}, compensation bands, notice periods and candidate conversion signals.`,
    metaTitle: `IT Staffing Agency in ${shortName} | Tech Recruitment | Talpro`,
    metaDescription: `Hire technology talent in ${shortName} with Talpro's specialist IT staffing model. Role-specific screening, local salary calibration and 48-hour shortlists.`,
    keywords: [
      `IT staffing ${shortName}`,
      `tech recruitment ${shortName}`,
      `software engineer hiring ${shortName}`,
      `contract staffing ${shortName}`,
      `staff augmentation ${shortName}`,
      `GCC hiring ${shortName}`,
    ],
    highlights,
    overview: `${shortName} is an important Indian hiring market because employers can access strong technical talent without relying only on the most crowded national hubs. The market is shaped by ${corridors}, local compensation expectations, commute preferences, and the mix of startups, GCCs, services firms and domain-led enterprises operating in the region.\n\nTalpro treats ${shortName} as a specific search market rather than a generic location tag. Our recruiters map active candidates, passive talent, notice-period pools and compensation benchmarks for the roles clients actually need. For ${specialties.join(', ')} searches, that means screening for practical evidence, not just keyword overlap.\n\nThe biggest hiring risk in ${shortName} is usually conversion quality: candidates may look strong on paper but fail on joining timelines, salary expectation, relocation preference, or domain fit. Talpro reduces that risk by attaching context to every profile: why the candidate fits, where the gap sits, what salary band is realistic, and which interview question should validate the remaining doubt.`,
    topRoles: [
      'Full-Stack Engineers',
      'Backend Developers',
      'Frontend Engineers',
      'Cloud & DevOps Engineers',
      'Data Engineers',
      'QA Automation Engineers',
      'Product Managers',
      'Technical Leads',
      ...specialties,
    ],
    topSkills: [
      'React / TypeScript',
      'Node.js / Java / Python',
      'AWS / Azure / GCP',
      'Docker / Kubernetes',
      'PostgreSQL / MongoDB',
      'Selenium / Playwright',
      'Data Engineering',
      'Security & Compliance',
    ],
    gccPresence: `${shortName}'s market includes a mix of GCC teams, enterprise IT centres, funded startups, services firms and domain-led technology groups. Talpro maps the relevant corridor and hiring model before opening outreach.`,
    avgSalaryRange: salary,
    talproAdvantage: [
      `Localised sourcing for ${shortName} across ${corridors}`,
      'Role-specific technical and behavioural screening before shortlist',
      'Compensation and joining-risk notes attached to every candidate profile',
      'Support for contract, contract-to-hire, permanent and team-build hiring models',
    ],
    faqs: [
      {
        q: `How quickly can Talpro shortlist IT candidates in ${shortName}?`,
        a: `For common software, cloud, data and QA roles in ${shortName}, Talpro targets an initial curated shortlist within 48 hours after the hiring brief is calibrated.`,
      },
      {
        q: `Which roles are strongest in the ${shortName} market?`,
        a: `${shortName} is especially useful for ${specialties.join(', ')} along with full-stack, backend, frontend, DevOps, data and QA automation roles.`,
      },
      {
        q: `Does Talpro support contract staffing in ${shortName}?`,
        a: 'Yes. Talpro supports contract staffing, contract-to-hire, permanent hiring and dedicated pod models, with compliance and onboarding support built into the process.',
      },
    ],
    ctaText: `Hire Tech Talent in ${shortName}`,
    icon,
  },
];

Object.assign(locationsConfig, Object.fromEntries([
  makeLocation('gurgaon', 'Gurgaon', 'Enterprise GCC and SaaS Hiring', [
    { value: '250+', label: 'Enterprise Tech Teams' },
    { value: '900K+', label: 'NCR Tech Pool Access' },
    { value: '₹14L', label: 'Avg Tech Salary' },
    { value: '28%', label: 'YoY Hiring Growth' },
  ], '₹8L - ₹52L', 'Cyber City, Golf Course Road, Udyog Vihar, Sohna Road and nearby Delhi-NCR talent catchments', ['Enterprise Architects', 'SaaS Engineers', 'Salesforce Developers'], 'Building2'),
  makeLocation('noida', 'Noida', 'Value-Optimised NCR Tech Talent', [
    { value: '180+', label: 'IT Parks & Centres' },
    { value: '650K+', label: 'Regional Tech Pool' },
    { value: '₹11L', label: 'Avg Tech Salary' },
    { value: '24%', label: 'YoY Hiring Growth' },
  ], '₹6L - ₹42L', 'Sector 62, Sector 125, Sector 135, Greater Noida Expressway and Delhi-NCR residential clusters', ['Java Developers', 'QA Automation Engineers', 'Mobile App Developers'], 'Globe2'),
  makeLocation('kolkata', 'Kolkata', 'Eastern India Technology Hiring', [
    { value: '90+', label: 'IT & Services Centres' },
    { value: '350K+', label: 'Tech Professionals' },
    { value: '₹8L', label: 'Avg Tech Salary' },
    { value: '18%', label: 'YoY Hiring Growth' },
  ], '₹4L - ₹32L', 'Salt Lake Sector V, New Town, Rajarhat and eastern India talent networks', ['Backend Developers', 'ERP Consultants', 'Support Engineers'], 'Landmark'),
  makeLocation('ahmedabad', 'Ahmedabad', 'SaaS, Manufacturing and FinTech Hiring', [
    { value: '120+', label: 'Tech Employers' },
    { value: '280K+', label: 'Digital Talent Pool' },
    { value: '₹9L', label: 'Avg Tech Salary' },
    { value: '22%', label: 'YoY Hiring Growth' },
  ], '₹5L - ₹36L', 'SG Highway, GIFT City, Prahladnagar, Gandhinagar and Gujarat startup corridors', ['FinTech Developers', 'SAP Consultants', 'Cloud Engineers'], 'Factory'),
  makeLocation('coimbatore', 'Coimbatore', 'Engineering, SaaS and Manufacturing Tech', [
    { value: '70+', label: 'Product & IT Firms' },
    { value: '180K+', label: 'Tech Professionals' },
    { value: '₹8L', label: 'Avg Tech Salary' },
    { value: '20%', label: 'YoY Hiring Growth' },
  ], '₹4L - ₹30L', 'Saravanampatti, Peelamedu, Tidel Park and western Tamil Nadu engineering networks', ['Embedded Engineers', 'Full-Stack Engineers', 'Manufacturing IT Specialists'], 'Factory'),
  makeLocation('kochi', 'Kochi', 'Kerala Product and Services Talent', [
    { value: '80+', label: 'IT Park Employers' },
    { value: '210K+', label: 'Regional Tech Pool' },
    { value: '₹8L', label: 'Avg Tech Salary' },
    { value: '21%', label: 'YoY Hiring Growth' },
  ], '₹4L - ₹32L', 'Infopark, SmartCity, Kakkanad and Kerala remote/hybrid talent networks', ['PHP Developers', 'Mobile Developers', 'Cloud Support Engineers'], 'Palmtree'),
  makeLocation('indore', 'Indore', 'Central India Scale-Up Talent', [
    { value: '60+', label: 'Tech Employers' },
    { value: '160K+', label: 'Regional Tech Pool' },
    { value: '₹7L', label: 'Avg Tech Salary' },
    { value: '23%', label: 'YoY Hiring Growth' },
  ], '₹4L - ₹28L', 'Vijay Nagar, Super Corridor, IT Park and central India engineering colleges', ['MERN Developers', 'QA Engineers', 'Data Analysts'], 'Globe2'),
  makeLocation('jaipur', 'Jaipur', 'North-West India Digital Talent', [
    { value: '65+', label: 'Tech Employers' },
    { value: '150K+', label: 'Regional Tech Pool' },
    { value: '₹7L', label: 'Avg Tech Salary' },
    { value: '19%', label: 'YoY Hiring Growth' },
  ], '₹4L - ₹30L', 'Sitapura, Malviya Nagar, Mansarovar, Ajmer Road and Rajasthan startup networks', ['Frontend Engineers', 'PHP/Laravel Developers', 'E-commerce Engineers'], 'Mountain'),
]));

// Export individual configurations for easier access
export const bengaluruConfig = locationsConfig['bengaluru'];
export const hyderabadConfig = locationsConfig['hyderabad'];
export const puneConfig = locationsConfig['pune'];
export const chennaiConfig = locationsConfig['chennai'];
export const mumbaiConfig = locationsConfig['mumbai'];
export const delhiNcrConfig = locationsConfig['delhi-ncr'];

// Helper function to get location config by slug
export const getLocationConfig = (slug: LocationSlug): LocationConfig | undefined => {
  return locationsConfig[slug];
};

// Helper function to get all location slugs
export const getLocationSlugs = (): LocationSlug[] => {
  return Object.keys(locationsConfig) as LocationSlug[];
};

// Helper function to get all locations for navigation
export const getLocationsForNavigation = () => {
  return Object.entries(locationsConfig).map(([slug, config]) => ({
    slug: slug as LocationSlug,
    title: config.title,
    shortName: config.shortName,
    icon: config.icon,
    tagline: config.tagline,
  }));
};
