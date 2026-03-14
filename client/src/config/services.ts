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
    processSteps: defaultProcess
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
    processSteps: defaultProcess
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
    processSteps: defaultProcess
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
    processSteps: defaultProcess
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
    processSteps: defaultProcess
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
    ]
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
    ]
  }
];

export const serviceMap = Object.fromEntries(
  services.map((s) => [s.slug, s] as const)
);
