export type ServiceTestimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export type Service = {
  slug: string;
  name: string;
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
  overview: string;
  highlights: string[];
  capabilities: { title: string; items: string[] }[];
  roles: string[];
  industries: string[];
  stats?: { value: string; label: string }[];
  processSteps: string[];
  testimonial?: ServiceTestimonial;
  faqs?: { q: string; a: string }[];
};

const defaultProcess = [
  "Discovery: goals, roles, must‑haves & timelines",
  "Market search & targeted outreach",
  "TalPro screening: skills, scenario & culture fit",
  "Shortlist & interview coordination",
  "Offer, onboarding & compliance",
  "Post‑join follow‑up and ramp support"
];

export const services: Service[] = [
  {
    slug: "it-staffing",
    name: "IT Staffing",
    hero: {
      eyebrow: "Find People",
      title: "IT Staffing",
      subtitle:
        "On‑demand technologists across web, cloud, data, QA and security. Contract, C2H or permanent — vetted and ready.",
      ctaLabel: "Request IT Talent"
    },
    seo: {
      title: "IT Staffing | TalPro",
      description:
        "IT staffing for modern stacks—React, Node, Java, .NET, Python, Cloud/DevOps, Data & Security. Fast shortlists and rigorous screening.",
      keywords: ["IT staffing", "contract developers", "DevOps staffing", "cloud engineers"]
    },
    overview:
      "TalPro's IT Staffing practice connects engineering leaders with proven developers, cloud and data specialists. Recruiters partner with in‑house technologists to evaluate real skills so you only interview high‑signal candidates.",
    highlights: [
      "Shortlists typically within 48 hours for common roles",
      "Technical screening & code/work sample checks",
      "Flexible models: Contract, Contract‑to‑Hire, Permanent, Dedicated Pods",
      "Onboarding, compliance and replacement assurance handled by TalPro"
    ],
    capabilities: [
      {
        title: "Talent Models",
        items: [
          "Contract & Staff Augmentation",
          "Contract‑to‑Hire",
          "Permanent/Direct Hire",
          "Pods/Squads for projects",
          "SOW engagements"
        ]
      },
      {
        title: "Tech Coverage",
        items: [
          "Frontend: React, Angular, Vue",
          "Backend: Node, Java, .NET, Python, Go",
          "Mobile: iOS, Android, React Native, Flutter",
          "Cloud/DevOps: AWS, Azure, GCP, Kubernetes, Terraform",
          "Data: Engineering, Analytics, BI, ML/AI",
          "Cybersecurity & GRC",
          "ERP: SAP, Oracle"
        ]
      },
      {
        title: "Delivery & Governance",
        items: [
          "Targeted search & outreach",
          "Structured skill assessments",
          "Background checks & documentation",
          "Offer support & onboarding",
          "Service SLAs and reporting"
        ]
      }
    ],
    roles: [
      "Full‑Stack Engineer", "Frontend Engineer", "Backend Engineer", "Mobile Engineer",
      "QA/SDET", "Automation Engineer", "DevOps Engineer", "Cloud Engineer",
      "Data Engineer", "Data Analyst", "Data Scientist", "Solution Architect",
      "Security Engineer", "SRE", "Product Manager", "Scrum Master"
    ],
    industries: [
      "SaaS", "FinTech", "E‑commerce", "Healthcare", "Manufacturing",
      "Logistics", "Telecom", "EdTech", "Energy"
    ],
    stats: [
      { value: "48h", label: "typical shortlist" },
      { value: "1:1", label: "recruiter + tech screen" },
      { value: "Flexible", label: "contract to permanent" }
    ],
    processSteps: defaultProcess,
    testimonial: {
      quote: "TalPro delivered 12 senior engineers in 6 weeks when our internal team had been struggling for months. The quality of screening saved us countless interview hours.",
      author: "Rajesh K.",
      role: "VP Engineering",
      company: "Series B FinTech",
    },
    faqs: [
      { q: "How quickly can TalPro provide IT staffing candidates?", a: "We deliver a curated shortlist of pre-vetted IT professionals within 48 hours of receiving your requirements through our Talpro 48-Hour Match process." },
      { q: "What technologies do you specialize in for IT staffing?", a: "We cover the full modern stack — React, Node.js, Python, Java, .NET, Cloud/DevOps (AWS, Azure, GCP), Data Engineering, AI/ML, Cybersecurity, SAP, and Salesforce." },
      { q: "Do you offer contract, permanent, and contract-to-hire staffing?", a: "Yes. We provide all three models — contract staffing for project-based needs, permanent placements for long-term hires, and contract-to-hire for risk-free evaluation periods." },
      { q: "What is TalPro's screening process for IT candidates?", a: "Every candidate goes through a multi-layer screening: resume verification, technical assessment, behavioral interview, reference checks, and compliance validation before being presented to you." },
      { q: "Do you provide a replacement guarantee?", a: "Yes. All placements come with a replacement guarantee. If a candidate doesn't work out within the guarantee period, we provide a replacement at no additional cost." },
    ],
  },
  {
    slug: "engineering-staffing",
    name: "Engineering Staffing",
    hero: {
      eyebrow: "Find People",
      title: "Engineering Staffing",
      subtitle:
        "Core engineering talent for product development and manufacturing — mechanical, electrical, electronics & embedded.",
      ctaLabel: "Request Engineering Talent"
    },
    seo: {
      title: "Engineering Staffing | TalPro",
      description:
        "Mechanical, electrical, electronics, embedded and manufacturing talent. From design and analysis to plant operations.",
      keywords: ["engineering staffing", "mechanical engineers", "manufacturing staffing"]
    },
    overview:
      "We staff design, development and plant functions for industrial, automotive, aerospace, energy and devices companies. Our network covers CAD/CAE, embedded systems, quality & operations so you can scale projects without delays.",
    highlights: [
      "Design, analysis and validation expertise (CAD/CAE, FEA/CFD)",
      "Embedded systems, PCB, firmware and testing",
      "Manufacturing, process, quality and EHS roles",
      "On‑site, hybrid or remote models"
    ],
    capabilities: [
      {
        title: "Product Development",
        items: [
          "CAD/CAE, 3D modeling and drafting",
          "FEA/CFD analysis",
          "Prototyping & testing",
          "PLM/PDM support"
        ]
      },
      {
        title: "Embedded & Electronics",
        items: ["PCB design", "Firmware", "RTOS", "Verification & validation", "Hardware testing"]
      },
      {
        title: "Manufacturing & Operations",
        items: [
          "Manufacturing/Process Engineering",
          "Quality (QA/QC)", "Supplier Quality", "Industrial Engineering",
          "Maintenance, Utilities & EHS"
        ]
      }
    ],
    roles: [
      "Design Engineer", "CAD Engineer", "FEA Analyst", "CFD Analyst",
      "Embedded Engineer", "PCB Designer", "Firmware Engineer", "Hardware Test",
      "Manufacturing Engineer", "Process Engineer", "Quality Engineer",
      "Industrial Engineer", "Maintenance Engineer", "EHS Specialist"
    ],
    industries: ["Automotive", "Aerospace", "Industrial Equipment", "Energy", "Medical Devices", "Electronics"],
    stats: [
      { value: "End‑to‑End", label: "design → plant" },
      { value: "Vetted", label: "domain experts" },
      { value: "Flexible", label: "on‑site/remote" }
    ],
    processSteps: defaultProcess,
    testimonial: {
      quote: "Finding embedded systems engineers with automotive experience is incredibly hard. TalPro's domain knowledge made all the difference — they understood our requirements from day one.",
      author: "Meena S.",
      role: "Head of R&D",
      company: "Automotive Tier-1 Supplier",
    },
    faqs: [
      { q: "What types of engineering roles does TalPro staff?", a: "We staff mechanical, electrical, embedded systems, firmware, PCB design, manufacturing, process, quality, and industrial engineers across automotive, aerospace, and manufacturing sectors." },
      { q: "Can TalPro staff for both hardware and software engineering roles?", a: "Yes. We cover both hardware engineering (PCB, VLSI, embedded) and software engineering roles across the product development lifecycle." },
      { q: "Do you have experience staffing for GCCs in engineering?", a: "Absolutely. We've helped Fortune 500 companies build and scale their India GCC engineering teams from the ground up." },
    ],
  },
  {
    slug: "sales-staffing",
    name: "Sales Staffing",
    hero: {
      eyebrow: "Find People",
      title: "Sales Staffing",
      subtitle:
        "Revenue talent that ramps quickly — SDRs, AEs, Pre‑Sales, Channel and Customer Success across regions.",
      ctaLabel: "Request Sales Talent"
    },
    seo: {
      title: "Sales Staffing | TalPro",
      description:
        "Hire SDRs, AEs, Pre‑Sales, Channel and Customer Success. Scenario‑based assessments to predict quota performance.",
      keywords: ["sales hiring", "SDR staffing", "AE recruitment", "customer success hiring"]
    },
    overview:
      "TalPro builds sales teams for SaaS, manufacturing and services firms. We measure competencies that correlate with quota attainment — pipeline creation, discovery, negotiation and collaboration with delivery.",
    highlights: [
      "Role‑plays & scenario assessments",
      "Industry/domain matching for faster ramp",
      "Territory, inside, field and channel coverage",
      "Customer Success and Renewals hiring"
    ],
    capabilities: [
      {
        title: "Profiles",
        items: [
          "SDR/BDR", "Inside Sales", "Account Executive", "Territory/Regional Sales",
          "Channel/Alliances", "Pre‑Sales/Sales Engineering", "Customer Success/Renewals", "RevOps"
        ]
      },
      {
        title: "Enablement",
        items: [
          "Competency mapping", "Assessment design",
          "Comp plan alignment", "Interview kits and scorecards"
        ]
      }
    ],
    roles: [
      "SDR/BDR", "Account Executive", "Territory Manager", "Channel Manager",
      "Pre‑Sales Engineer", "Sales Engineer", "Customer Success Manager",
      "Renewals Specialist", "Sales Operations/RevOps"
    ],
    industries: ["SaaS", "Manufacturing", "FMCG", "Healthcare", "BFSI", "Telecom", "E‑commerce"],
    stats: [
      { value: "Role‑play", label: "assessment" },
      { value: "Ramp", label: "faster productivity" },
      { value: "Coverage", label: "inside/field/channel" }
    ],
    processSteps: defaultProcess,
    testimonial: {
      quote: "We needed 8 enterprise AEs who could sell to CTOs. TalPro's role-play assessments identified candidates who actually understood consultative selling — not just resume keywords.",
      author: "Vikram P.",
      role: "Sales Director",
      company: "Enterprise SaaS Company",
    },
    faqs: [
      { q: "What sales roles does TalPro staff?", a: "We place SDRs, Account Executives, Pre-Sales Consultants, Channel Managers, Sales Directors, and VP Sales across SaaS, fintech, and enterprise technology companies." },
      { q: "How does TalPro vet sales candidates?", a: "Beyond resume review, we assess quota attainment history, deal size experience, industry knowledge, and cultural fit through structured behavioral interviews." },
      { q: "Can you staff sales teams across multiple Indian cities?", a: "Yes. We have active candidate pools across Bangalore, Mumbai, Delhi-NCR, Hyderabad, Pune, and Chennai for sales roles." },
    ],
  },
  {
    slug: "direct-hiring-functions",
    name: "Direct Hiring – Functions",
    hero: {
      eyebrow: "Find People",
      title: "Direct Hiring – Functions",
      subtitle:
        "Permanent hiring for corporate and operational roles — Finance, HR, Marketing, Operations, Supply Chain, Legal and more.",
      ctaLabel: "Hire for Functional Roles"
    },
    seo: {
      title: "Direct Hiring – Functions | TalPro",
      description:
        "Permanent functional hiring: Finance, HR, Marketing, Operations, Supply Chain, Procurement, Legal & Compliance.",
      keywords: ["direct hiring", "functional roles", "finance recruitment", "HR hiring"]
    },
    overview:
      "When teams need steady leadership and continuity, we run a structured direct‑hire process: market mapping, competency interviews and rigorous reference checks. Expect shortlists aligned to capability, culture and growth stage.",
    highlights: [
      "Market maps with competitive intel",
      "Role‑specific competency interviews",
      "Behavioral & culture‑fit evaluation",
      "Structured references and offer support"
    ],
    capabilities: [
      {
        title: "Functions Covered",
        items: [
          "Finance (FP&A, Controllership, Audit)",
          "HR (TA, HRBP, L&D, Comp & Ben)",
          "Marketing (Brand, Growth, Product Marketing)",
          "Operations & Administration",
          "Supply Chain & Procurement",
          "Legal & Compliance"
        ]
      }
    ],
    roles: [
      "Finance Manager", "FP&A Lead", "Controller", "HR Business Partner",
      "TA Lead", "L&D Lead", "Brand Manager", "Growth Marketer",
      "Ops Manager", "Procurement Lead", "Legal Counsel", "Compliance Officer"
    ],
    industries: ["Technology", "Manufacturing", "BFSI", "Healthcare", "Retail & E‑commerce", "Energy"],
    stats: [
      { value: "Direct", label: "permanent hiring" },
      { value: "Mapped", label: "market coverage" },
      { value: "Structured", label: "references" }
    ],
    processSteps: defaultProcess,
    testimonial: {
      quote: "TalPro helped us build our India finance and HR team from scratch. Their competency-based approach gave us confidence in every hire.",
      author: "Anita D.",
      role: "Country Manager",
      company: "Global Manufacturing Firm",
    },
    faqs: [
      { q: "What non-IT functions does TalPro hire for?", a: "We hire for Finance, HR, Supply Chain, Procurement, Legal, Marketing, and General Management roles across industries." },
      { q: "How is direct hiring different from contract staffing?", a: "Direct hiring is permanent placement — we source, screen, and present candidates for full-time roles on your payroll. Contract staffing is for time-bound project needs." },
      { q: "What is TalPro's fee structure for direct hiring?", a: "We work on a success-based model — you pay only when a candidate joins. Fee is a percentage of annual CTC, with a replacement guarantee included." },
    ],
  },
  {
    slug: "direct-hiring-it",
    name: "Direct Hiring – IT",
    hero: {
      eyebrow: "Find People",
      title: "Direct Hiring – IT",
      subtitle:
        "Permanent technology hires from senior ICs to engineering leadership — architects, EMs, data leaders and more.",
      ctaLabel: "Hire Permanent IT"
    },
    seo: {
      title: "Direct Hiring – IT | TalPro",
      description:
        "Permanent IT hiring for architects, engineering managers, SRE, product & data leaders. Assessment‑driven and market mapped.",
      keywords: ["permanent IT hiring", "engineering manager recruitment", "architect hiring"]
    },
    overview:
      "For strategic technology roles we combine deep tech evaluation with market mapping. The outcome is a slate of leaders and senior ICs who raise the bar and stay.",
    highlights: [
      "Role scorecards aligned to outcomes",
      "Tech evaluation with take‑home or live problem‑solving",
      "Leadership & stakeholder references",
      "Offer strategy and closing support"
    ],
    capabilities: [
      {
        title: "Roles & Levels",
        items: [
          "Architects (Solution, Data, Security)",
          "Engineering Managers & Tech Leads",
          "SRE/Platform",
          "Product Managers & Product Owners",
          "QA Leadership",
          "Data Leaders (Head of Data, Analytics)"
        ]
      }
    ],
    roles: [
      "Solution Architect", "Data Architect", "Security Architect", "Engineering Manager",
      "Tech Lead", "SRE Lead", "Product Manager", "QA Manager", "Head of Data"
    ],
    industries: ["SaaS", "FinTech", "Healthcare", "Telecom", "E‑commerce", "Gaming"],
    stats: [
      { value: "Leaders", label: "and senior ICs" },
      { value: "Bar‑raiser", label: "evaluations" },
      { value: "Retention", label: "focused hiring" }
    ],
    processSteps: defaultProcess,
    testimonial: {
      quote: "We were looking for a principal architect who could also mentor the team. TalPro found someone who exceeded our expectations — the tech evaluation was thorough and saved us time.",
      author: "Sanjay M.",
      role: "CTO",
      company: "Healthcare SaaS Startup",
    },
    faqs: [
      { q: "What IT roles does TalPro place permanently?", a: "We place Software Engineers, Architects, Engineering Managers, CTOs, Data Scientists, Cloud Engineers, and Security professionals in permanent roles." },
      { q: "What is the typical timeline for direct IT hiring?", a: "First shortlist within 48 hours. Average time-to-offer is 2-4 weeks depending on role seniority and client interview process." },
      { q: "Do you handle offer negotiation and onboarding?", a: "Yes. Our engagement continues through offer management, compensation benchmarking, counter-offer handling, and the first 90 days of post-join support." },
    ],
  },
  {
    slug: "executive-search",
    name: "Executive Search",
    hero: {
      eyebrow: "Find People",
      title: "Executive Search",
      subtitle:
        "Confidential, research‑led searches for C‑suite and business leaders with measurable impact.",
      ctaLabel: "Start an Executive Search"
    },
    seo: {
      title: "Executive Search | TalPro",
      description:
        "Retained executive search for CXO and business leadership. Research‑driven process with discreet execution and calibration.",
      keywords: ["executive search", "CXO hiring", "leadership recruitment"]
    },
    overview:
      "We run retained, discreet searches across technology and business leadership. Our model blends rigorous research, stakeholder calibration and 360‑degree referencing to deliver leaders who move the needle.",
    highlights: [
      "Calibrated scorecards and success profiles",
      "Long‑list research and competitor mapping",
      "Confidential outreach and evaluation",
      "Offer strategy and leader assimilation support"
    ],
    capabilities: [
      {
        title: "Leadership Scope",
        items: [
          "CEO/COO/CFO/CTO/CPO/CISO",
          "Business Unit & Country Heads",
          "VP/Director level across functions",
          "Independent Board & Advisors"
        ]
      }
    ],
    roles: ["CEO", "COO", "CFO", "CTO", "CPO", "CISO", "VP Engineering", "VP Product", "BU Head"],
    industries: ["Technology", "Industrial", "BFSI", "Healthcare", "Consumer", "Energy"],
    stats: [
      { value: "Retained", label: "confidential search" },
      { value: "360°", label: "referencing" },
      { value: "Calibration", label: "with stakeholders" }
    ],
    processSteps: [
      "Stakeholder intake & success profile",
      "Market research & long‑list",
      "Confidential outreach & evaluation",
      "Shortlist calibration & interviews",
      "Offer design & close",
      "Onboarding & assimilation support"
    ],
    testimonial: {
      quote: "A confidential, sensitive CTO search completed in 4 weeks. TalPro's discretion and calibration with our board made a complex hire feel seamless.",
      author: "Board Member",
      role: "Nominations Committee",
      company: "PE-Backed Technology Firm",
    },
    faqs: [
      { q: "What executive-level roles does TalPro recruit for?", a: "We recruit CTOs, VPs of Engineering, CPOs, CISOs, CDOs, Engineering Directors, and other C-suite and VP-level technology leaders." },
      { q: "How is executive search different from regular recruitment?", a: "Executive search is a retained, confidential engagement with dedicated research, passive candidate outreach, and a thorough assessment process designed for leadership roles." },
      { q: "What industries do you serve for executive search?", a: "We serve SaaS, fintech, healthcare tech, e-commerce, manufacturing, and GCC organizations looking for senior technology leadership in India." },
    ],
  },
  {
    slug: "gcc-accelerator",
    name: "GCC Accelerator",
    hero: {
      eyebrow: "Scale in India",
      title: "GCC\nAccelerator",
      subtitle: "Set up and scale your India Global Capability Center — from entity formation to full team build-out. We handle compliance, hiring, and ramp so you focus on product.",
      ctaLabel: "Start Your GCC"
    },
    seo: {
      title: "GCC Accelerator — Build Your India Global Capability Center",
      description: "TalPro's GCC Accelerator helps global companies set up and scale India engineering centres. Entity formation, compliance, hiring, and ramp-up — all handled."
    },
    overview: "Global Capability Centers (GCCs) are the fastest-growing model for scaling tech teams in India. TalPro's GCC Accelerator handles the heavy lifting — entity setup, regulatory compliance, talent acquisition, and operational ramp — so you can go from decision to delivery in weeks, not quarters.",
    highlights: [
      "End-to-end GCC setup: entity, office, compliance, hiring",
      "Pre-vetted talent pipelines across 50+ tech stacks",
      "Indian labour law and statutory compliance handled",
      "Scalable — from 5-person pod to 500-person centre"
    ],
    capabilities: [
      {
        title: "GCC Services",
        items: [
          "Entity formation & legal structuring",
          "Office space sourcing & fit-out",
          "Statutory compliance (PF, ESI, PT, LWF)",
          "Full-stack hiring: IC to leadership",
          "Payroll, benefits & retention programs",
          "Ongoing operational support & scaling"
        ]
      }
    ],
    roles: ["Full-Stack Engineers", "DevOps/SRE", "Data Engineers", "QA Leads", "Engineering Managers", "Site Leads", "HR & Admin"],
    industries: ["Technology", "FinTech", "Healthcare", "E-commerce", "SaaS", "Manufacturing"],
    stats: [
      { value: "12 wks", label: "GCC launch timeline" },
      { value: "50+", label: "tech stacks covered" },
      { value: "100%", label: "compliance handled" }
    ],
    processSteps: [
      "Feasibility assessment & entity planning",
      "Legal structuring & registrations",
      "Office setup & infrastructure",
      "Leadership hiring & team build-out",
      "Payroll, compliance & benefits activation",
      "Ongoing scaling & operational support"
    ],
    testimonial: {
      quote: "From entity formation to our first 25 hires, TalPro accelerated our India GCC launch by at least a quarter. Their compliance handling alone was worth the partnership.",
      author: "David L.",
      role: "VP Global Engineering",
      company: "US-Based SaaS Unicorn",
    },
    faqs: [
      { q: "What is a GCC and how does TalPro help set one up?", a: "A GCC (Global Capability Center) is an offshore engineering center owned by a multinational company. TalPro helps with entity setup advisory, initial team hiring, ramp-up staffing, compliance, and ongoing talent management." },
      { q: "How quickly can TalPro ramp up a GCC team?", a: "We can staff the first 5-10 engineers within 4-6 weeks, and scale to 50+ within 3-6 months depending on role complexity and location preferences." },
      { q: "What locations in India does TalPro cover for GCC setup?", a: "We cover all major tech hubs — Bangalore, Hyderabad, Pune, Chennai, Delhi-NCR, and Mumbai — as well as emerging Tier-2 cities like Coimbatore and Jaipur." },
      { q: "Does TalPro handle GCC compliance and labour law requirements?", a: "Yes. We provide guidance on India Labour Codes 2025, DPDPA 2023, employee benefits compliance, and help you navigate entity registration and statutory requirements." },
    ],
  }
];

export const serviceMap = Object.fromEntries(
  services.map((s) => [s.slug, s] as const)
);
