/**
 * India IT Salary Guide 2026 data.
 *
 * Ranges are annual CTC in LPA (Lakhs Per Annum) for Bangalore.
 * City multipliers adjust for other locations.
 */

export interface SalaryRole {
  role: string;
  category: string;
  junior: [number, number];    // 0-3 YOE
  mid: [number, number];       // 3-7 YOE
  senior: [number, number];    // 7-12 YOE
  lead: [number, number];      // 12+ YOE
  trending: 'up' | 'stable' | 'down';
  yoyChange: string;
}

export interface CityMultiplier {
  city: string;
  multiplier: number;
  label: string;
}

export const CATEGORIES = [
  'All',
  'Frontend',
  'Backend',
  'Full-Stack',
  'DevOps & Cloud',
  'Data & AI',
  'Mobile',
  'QA & Testing',
  'Leadership',
] as const;

export const CITIES: CityMultiplier[] = [
  { city: 'Bangalore', multiplier: 1.0, label: 'Baseline' },
  { city: 'Hyderabad', multiplier: 0.85, label: '15% lower' },
  { city: 'Pune', multiplier: 0.82, label: '18% lower' },
  { city: 'Chennai', multiplier: 0.78, label: '22% lower' },
  { city: 'NCR', multiplier: 0.92, label: '8% lower' },
];

export const salaryData: SalaryRole[] = [
  // Frontend
  {
    role: 'React Developer',
    category: 'Frontend',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 35],
    lead: [32, 50],
    trending: 'stable',
    yoyChange: '+3%',
  },
  {
    role: 'Angular Developer',
    category: 'Frontend',
    junior: [4, 9],
    mid: [10, 18],
    senior: [18, 30],
    lead: [28, 45],
    trending: 'stable',
    yoyChange: '+1%',
  },
  {
    role: 'UI/UX Engineer',
    category: 'Frontend',
    junior: [4, 8],
    mid: [10, 16],
    senior: [16, 28],
    lead: [25, 40],
    trending: 'up',
    yoyChange: '+8%',
  },

  // Backend
  {
    role: 'Java Developer',
    category: 'Backend',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 35],
    lead: [30, 50],
    trending: 'stable',
    yoyChange: '+2%',
  },
  {
    role: 'Node.js Developer',
    category: 'Backend',
    junior: [5, 9],
    mid: [11, 18],
    senior: [18, 32],
    lead: [28, 48],
    trending: 'stable',
    yoyChange: '+4%',
  },
  {
    role: 'Python Developer',
    category: 'Backend',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 35],
    lead: [30, 52],
    trending: 'up',
    yoyChange: '+7%',
  },
  {
    role: 'Go Developer',
    category: 'Backend',
    junior: [7, 12],
    mid: [14, 24],
    senior: [24, 40],
    lead: [35, 55],
    trending: 'up',
    yoyChange: '+15%',
  },
  {
    role: 'Rust Developer',
    category: 'Backend',
    junior: [8, 14],
    mid: [16, 28],
    senior: [28, 45],
    lead: [40, 60],
    trending: 'up',
    yoyChange: '+22%',
  },

  // Full-Stack
  {
    role: 'Full-Stack Engineer (React + Node)',
    category: 'Full-Stack',
    junior: [6, 10],
    mid: [12, 22],
    senior: [22, 38],
    lead: [35, 55],
    trending: 'stable',
    yoyChange: '+4%',
  },
  {
    role: 'Full-Stack Engineer (Java)',
    category: 'Full-Stack',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 35],
    lead: [30, 50],
    trending: 'stable',
    yoyChange: '+2%',
  },

  // DevOps & Cloud
  {
    role: 'DevOps Engineer',
    category: 'DevOps & Cloud',
    junior: [6, 11],
    mid: [14, 22],
    senior: [22, 38],
    lead: [35, 55],
    trending: 'up',
    yoyChange: '+10%',
  },
  {
    role: 'Platform Engineer',
    category: 'DevOps & Cloud',
    junior: [8, 14],
    mid: [16, 26],
    senior: [26, 42],
    lead: [38, 60],
    trending: 'up',
    yoyChange: '+18%',
  },
  {
    role: 'Cloud Architect (AWS/Azure/GCP)',
    category: 'DevOps & Cloud',
    junior: [8, 14],
    mid: [18, 28],
    senior: [28, 48],
    lead: [42, 70],
    trending: 'up',
    yoyChange: '+12%',
  },
  {
    role: 'SRE',
    category: 'DevOps & Cloud',
    junior: [7, 12],
    mid: [15, 24],
    senior: [24, 40],
    lead: [36, 58],
    trending: 'up',
    yoyChange: '+14%',
  },

  // Data & AI
  {
    role: 'Data Engineer',
    category: 'Data & AI',
    junior: [6, 12],
    mid: [14, 24],
    senior: [24, 40],
    lead: [36, 58],
    trending: 'up',
    yoyChange: '+10%',
  },
  {
    role: 'Data Scientist',
    category: 'Data & AI',
    junior: [6, 12],
    mid: [14, 25],
    senior: [25, 42],
    lead: [38, 60],
    trending: 'up',
    yoyChange: '+8%',
  },
  {
    role: 'AI/ML Engineer',
    category: 'Data & AI',
    junior: [8, 15],
    mid: [18, 30],
    senior: [30, 50],
    lead: [45, 75],
    trending: 'up',
    yoyChange: '+22%',
  },
  {
    role: 'MLOps Engineer',
    category: 'Data & AI',
    junior: [8, 14],
    mid: [16, 28],
    senior: [28, 45],
    lead: [40, 62],
    trending: 'up',
    yoyChange: '+20%',
  },

  // Mobile
  {
    role: 'React Native Developer',
    category: 'Mobile',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 34],
    lead: [30, 50],
    trending: 'stable',
    yoyChange: '+5%',
  },
  {
    role: 'iOS Developer (Swift)',
    category: 'Mobile',
    junior: [6, 11],
    mid: [13, 22],
    senior: [22, 38],
    lead: [34, 55],
    trending: 'stable',
    yoyChange: '+4%',
  },
  {
    role: 'Android Developer (Kotlin)',
    category: 'Mobile',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 35],
    lead: [30, 50],
    trending: 'stable',
    yoyChange: '+3%',
  },
  {
    role: 'Flutter Developer',
    category: 'Mobile',
    junior: [5, 9],
    mid: [11, 18],
    senior: [18, 30],
    lead: [26, 45],
    trending: 'up',
    yoyChange: '+10%',
  },

  // QA & Testing
  {
    role: 'QA Automation Engineer',
    category: 'QA & Testing',
    junior: [4, 8],
    mid: [9, 16],
    senior: [16, 28],
    lead: [25, 42],
    trending: 'stable',
    yoyChange: '+3%',
  },
  {
    role: 'SDET',
    category: 'QA & Testing',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 34],
    lead: [30, 48],
    trending: 'up',
    yoyChange: '+8%',
  },
  {
    role: 'Performance Engineer',
    category: 'QA & Testing',
    junior: [5, 10],
    mid: [12, 20],
    senior: [20, 35],
    lead: [30, 50],
    trending: 'up',
    yoyChange: '+6%',
  },

  // Leadership
  {
    role: 'Engineering Manager',
    category: 'Leadership',
    junior: [20, 30],
    mid: [30, 45],
    senior: [45, 65],
    lead: [60, 90],
    trending: 'up',
    yoyChange: '+8%',
  },
  {
    role: 'VP of Engineering',
    category: 'Leadership',
    junior: [40, 55],
    mid: [55, 80],
    senior: [80, 120],
    lead: [100, 160],
    trending: 'up',
    yoyChange: '+10%',
  },
  {
    role: 'CTO',
    category: 'Leadership',
    junior: [50, 70],
    mid: [70, 100],
    senior: [100, 150],
    lead: [120, 200],
    trending: 'up',
    yoyChange: '+12%',
  },
];

export const TRENDS = [
  {
    title: 'Fastest Growing Roles',
    items: ['AI/ML Engineer (+22%)', 'Rust Developer (+22%)', 'MLOps Engineer (+20%)', 'Platform Engineer (+18%)'],
  },
  {
    title: 'Highest Paying (Senior)',
    items: ['CTO (₹1-1.5 Cr)', 'VP Engineering (₹80L-1.2 Cr)', 'AI/ML Engineer (₹30-50 LPA)', 'Cloud Architect (₹28-48 LPA)'],
  },
  {
    title: 'Most In-Demand',
    items: ['Full-Stack (React + Node)', 'DevOps / Platform Engineering', 'Data Engineering', 'AI/ML Engineering'],
  },
];
