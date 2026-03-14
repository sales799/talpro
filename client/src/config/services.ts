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
  },

  // ── Niche Technology Specialization Pages ─────────────────────────
  {
    slug: "cloud-devops-staffing",
    name: "Cloud & DevOps Staffing",
    hero: {
      eyebrow: "Niche Expertise",
      title: "Cloud & DevOps\nStaffing",
      subtitle: "AWS, Azure, GCP architects, SREs, platform engineers and Kubernetes specialists — pre-vetted for production-grade infrastructure work.",
      ctaLabel: "Hire Cloud Talent"
    },
    seo: {
      title: "Cloud & DevOps Staffing India | AWS, Azure, GCP Engineers | TalPro",
      description: "Hire pre-vetted Cloud Architects, DevOps Engineers, SREs, and Platform Engineers across AWS, Azure, and GCP. 48-hour shortlists from India's specialist IT staffing firm.",
      keywords: ["cloud staffing India", "DevOps staffing", "AWS engineers India", "Azure staffing Bangalore", "GCP engineers hire", "SRE staffing", "Kubernetes engineers", "platform engineering staffing", "cloud architect hiring", "terraform engineers India"]
    },
    overview: "Cloud and DevOps talent is the backbone of modern engineering. TalPro's Cloud & DevOps practice sources infrastructure engineers who have designed, built and operated production systems — not just passed certification exams. Every candidate is assessed on real-world scenarios: incident response, capacity planning, cost optimization and security hardening.",
    highlights: [
      "Multi-cloud coverage: AWS, Azure, GCP and hybrid",
      "Hands-on labs and scenario-based technical assessments",
      "Certifications verified (AWS SA Pro, CKA, Azure Solutions Architect)",
      "Contract, permanent and dedicated DevOps pod models"
    ],
    capabilities: [
      {
        title: "Cloud Platforms",
        items: [
          "AWS (EC2, EKS, Lambda, RDS, S3, CloudFront)",
          "Azure (AKS, Functions, Cosmos DB, DevOps)",
          "GCP (GKE, Cloud Run, BigQuery, Vertex AI)",
          "Multi-cloud and hybrid architectures"
        ]
      },
      {
        title: "DevOps & Platform",
        items: [
          "Kubernetes, Helm, Istio, ArgoCD",
          "Terraform, Pulumi, CloudFormation (IaC)",
          "CI/CD: GitHub Actions, GitLab CI, Jenkins, CircleCI",
          "Observability: Datadog, Grafana, Prometheus, ELK",
          "Container security: Falco, Trivy, Snyk"
        ]
      },
      {
        title: "SRE & Reliability",
        items: [
          "Incident management and on-call design",
          "SLI/SLO/SLA frameworks",
          "Chaos engineering and disaster recovery",
          "Cost optimization and FinOps"
        ]
      }
    ],
    roles: [
      "Cloud Architect", "Senior Cloud Engineer", "DevOps Engineer", "SRE",
      "Platform Engineer", "Infrastructure Engineer", "Release Engineer",
      "FinOps Analyst", "Cloud Security Engineer", "Kubernetes Administrator"
    ],
    industries: ["SaaS", "FinTech", "E-commerce", "Healthcare", "GCC", "Gaming", "Logistics"],
    stats: [
      { value: "3 Clouds", label: "AWS, Azure, GCP" },
      { value: "Hands-on", label: "lab assessments" },
      { value: "48h", label: "first shortlist" }
    ],
    processSteps: defaultProcess,
    testimonial: {
      quote: "We needed 5 SREs who could handle our multi-region Kubernetes setup. TalPro's scenario-based screening filtered out certification-only candidates and gave us production-ready engineers.",
      author: "Arun T.",
      role: "Director of Platform Engineering",
      company: "Series C SaaS Company",
    },
    faqs: [
      { q: "What cloud platforms does TalPro staff for?", a: "We cover all three major cloud platforms — AWS, Azure, and GCP — as well as hybrid and multi-cloud environments. Our candidates are assessed on production-level experience, not just certifications." },
      { q: "How does TalPro assess DevOps and SRE candidates?", a: "We use scenario-based assessments: candidates work through real infrastructure problems including incident response, capacity planning, CI/CD pipeline design, and Kubernetes troubleshooting." },
      { q: "Can TalPro build a complete DevOps pod for my team?", a: "Yes. We offer dedicated DevOps pods — typically 3-5 engineers covering CI/CD, infrastructure, monitoring, and security — deployed as a self-managed unit for your projects." },
      { q: "What is the typical time to hire a Cloud Architect through TalPro?", a: "First shortlist within 48 hours. For senior roles like Cloud Architects, average time-to-offer is 2-3 weeks depending on your interview process." },
    ],
  },
  {
    slug: "data-ai-staffing",
    name: "Data & AI Staffing",
    hero: {
      eyebrow: "Niche Expertise",
      title: "Data & AI\nStaffing",
      subtitle: "Data engineers, ML engineers, data scientists and analytics leaders who build production pipelines, not just Jupyter notebooks.",
      ctaLabel: "Hire Data & AI Talent"
    },
    seo: {
      title: "Data & AI Staffing India | ML Engineers, Data Scientists | TalPro",
      description: "Hire pre-vetted Data Engineers, ML Engineers, Data Scientists, and Analytics Leaders. Production-focused assessment for India's top data talent.",
      keywords: ["data engineering staffing India", "ML engineer hiring", "data scientist staffing", "AI staffing India", "MLOps engineers", "data pipeline engineers", "analytics staffing Bangalore", "LLM engineers hire", "GenAI staffing"]
    },
    overview: "The data and AI talent market is noisy — everyone claims ML experience, but few have deployed models to production. TalPro's Data & AI practice screens for engineers who have built and maintained real data pipelines, trained and served ML models at scale, and understand the full MLOps lifecycle from experiment tracking to monitoring.",
    highlights: [
      "Production ML focus: model serving, A/B testing, monitoring",
      "Full data stack: Spark, Airflow, dbt, Snowflake, Databricks",
      "GenAI and LLM specialists (RAG, fine-tuning, prompt engineering)",
      "Domain-specific data talent for FinTech, Healthcare, E-commerce"
    ],
    capabilities: [
      {
        title: "Data Engineering",
        items: [
          "Apache Spark, Kafka, Flink (streaming)",
          "Airflow, Dagster, Prefect (orchestration)",
          "dbt, Snowflake, BigQuery, Redshift (warehousing)",
          "Data modelling and quality frameworks"
        ]
      },
      {
        title: "Machine Learning & AI",
        items: [
          "PyTorch, TensorFlow, scikit-learn",
          "MLOps: MLflow, Kubeflow, SageMaker, Vertex AI",
          "NLP, Computer Vision, Time Series",
          "GenAI: LLM fine-tuning, RAG architectures, LangChain",
          "Responsible AI and model governance"
        ]
      },
      {
        title: "Analytics & BI",
        items: [
          "Product analytics and experimentation",
          "BI tools: Looker, Tableau, Power BI, Metabase",
          "Customer data platforms and segmentation",
          "Revenue and marketing analytics"
        ]
      }
    ],
    roles: [
      "Data Engineer", "Senior Data Engineer", "ML Engineer", "Data Scientist",
      "MLOps Engineer", "Analytics Engineer", "BI Developer", "Head of Data",
      "GenAI Engineer", "NLP Engineer", "Computer Vision Engineer"
    ],
    industries: ["FinTech", "Healthcare", "E-commerce", "SaaS", "AdTech", "Gaming", "Logistics"],
    stats: [
      { value: "Production", label: "ML focus" },
      { value: "GenAI", label: "LLM specialists" },
      { value: "Full Stack", label: "data to deploy" }
    ],
    processSteps: defaultProcess,
    testimonial: {
      quote: "We needed ML engineers who could deploy models, not just build them in notebooks. TalPro's assessment caught the difference — every hire was production-ready from day one.",
      author: "Dr. Priya R.",
      role: "Head of AI",
      company: "Health-Tech Startup",
    },
    faqs: [
      { q: "What data and AI roles does TalPro staff?", a: "We place Data Engineers, ML Engineers, Data Scientists, MLOps Engineers, Analytics Engineers, GenAI/LLM Engineers, NLP specialists, and data leadership roles." },
      { q: "How does TalPro assess ML engineering candidates?", a: "We use a production-focused assessment: candidates work through real ML scenarios including feature engineering, model training, deployment pipelines, monitoring, and A/B testing — not just Kaggle competitions." },
      { q: "Can TalPro hire GenAI and LLM specialists?", a: "Yes. We have an active pipeline of engineers with hands-on experience in LLM fine-tuning, RAG architectures, LangChain/LlamaIndex, prompt engineering, and vector databases." },
      { q: "What industries does TalPro's data staffing cover?", a: "We serve FinTech (fraud models, risk scoring), Healthcare (diagnostic AI, clinical NLP), E-commerce (recommendations, search ranking), SaaS (product analytics), and more." },
    ],
  },
  {
    slug: "sap-enterprise-staffing",
    name: "SAP & Enterprise Staffing",
    hero: {
      eyebrow: "Niche Expertise",
      title: "SAP & Enterprise\nStaffing",
      subtitle: "SAP S/4HANA, Oracle, Salesforce and ServiceNow specialists — functional consultants, technical architects and project managers.",
      ctaLabel: "Hire SAP & Enterprise Talent"
    },
    seo: {
      title: "SAP Staffing India | S/4HANA, Oracle, Salesforce Consultants | TalPro",
      description: "Hire pre-vetted SAP S/4HANA consultants, Oracle specialists, Salesforce developers, and ServiceNow architects. Enterprise ERP staffing across India.",
      keywords: ["SAP staffing India", "S/4HANA consultants", "SAP FICO consultants Bangalore", "Oracle staffing", "Salesforce developers India", "ServiceNow staffing", "ERP staffing India", "SAP Basis administrators", "SAP ABAP developers"]
    },
    overview: "Enterprise ERP implementations are high-stakes, long-cycle engagements where a single bad hire can delay go-lives by months. TalPro's SAP & Enterprise practice maintains a curated pool of functional and technical consultants with verified project experience across S/4HANA migrations, greenfield implementations, and ongoing support.",
    highlights: [
      "SAP S/4HANA migration and greenfield specialists",
      "Functional + technical consultants across all SAP modules",
      "Oracle Cloud, Salesforce, and ServiceNow coverage",
      "Project-aligned staffing with milestone-based deployment"
    ],
    capabilities: [
      {
        title: "SAP Modules",
        items: [
          "SAP S/4HANA (Finance, Logistics, Manufacturing)",
          "SAP FICO, MM, SD, PP, QM, PM",
          "SAP SuccessFactors (HCM)",
          "SAP BW/4HANA, Analytics Cloud",
          "SAP Basis, ABAP, Fiori/UI5",
          "SAP Integration (CPI, PI/PO)"
        ]
      },
      {
        title: "Enterprise Platforms",
        items: [
          "Oracle Cloud ERP, HCM, SCM",
          "Salesforce (Sales Cloud, Service Cloud, CPQ, MuleSoft)",
          "ServiceNow (ITSM, ITOM, CSM, HRSD)",
          "Microsoft Dynamics 365"
        ]
      },
      {
        title: "Engagement Models",
        items: [
          "Implementation project staffing",
          "AMS (Application Management Services) teams",
          "Staff augmentation for go-live surges",
          "Independent consultants for advisory"
        ]
      }
    ],
    roles: [
      "SAP Functional Consultant", "SAP Technical Consultant", "SAP Architect",
      "SAP ABAP Developer", "SAP Basis Administrator", "SAP Project Manager",
      "Salesforce Developer", "Salesforce Architect", "ServiceNow Developer",
      "Oracle Functional Consultant", "ERP Program Manager"
    ],
    industries: ["Manufacturing", "BFSI", "Pharma", "Retail", "Oil & Gas", "FMCG", "Utilities"],
    stats: [
      { value: "S/4HANA", label: "migration experts" },
      { value: "All Modules", label: "FICO to BW" },
      { value: "Verified", label: "project experience" }
    ],
    processSteps: [
      "Requirement analysis: module, level, project phase",
      "Pool screening: verified SAP project experience",
      "Functional/technical assessment by SAP practitioners",
      "Shortlist with project history and certifications",
      "Offer, compliance and project onboarding",
      "Go-live support and post-implementation check-in"
    ],
    testimonial: {
      quote: "Our S/4HANA migration needed 12 consultants across FICO, MM, and Basis — all in 3 weeks. TalPro delivered every single one on time, with verified implementation experience.",
      author: "Ramesh N.",
      role: "IT Director",
      company: "Global Manufacturing Conglomerate",
    },
    faqs: [
      { q: "What SAP modules does TalPro staff for?", a: "We cover all major SAP modules: FICO, MM, SD, PP, QM, PM, SuccessFactors, BW/4HANA, ABAP, Basis, Fiori, and SAP Integration (CPI/PI/PO). We also staff for S/4HANA migration projects." },
      { q: "Does TalPro verify SAP consultants' project experience?", a: "Yes. Every SAP consultant is screened for verified project experience — we validate implementation history, go-live participation, and module-specific depth through practitioner-led assessments." },
      { q: "Can TalPro staff for SAP AMS (support) teams?", a: "Absolutely. We provide ongoing Application Management Services staffing for SAP landscapes — from L1/L2 support to enhancement and upgrade projects." },
      { q: "What enterprise platforms beyond SAP does TalPro cover?", a: "We also staff for Oracle Cloud ERP, Salesforce (Sales/Service/CPQ), ServiceNow (ITSM/CSM), and Microsoft Dynamics 365 across functional and technical roles." },
    ],
  },
  {
    slug: "cybersecurity-staffing",
    name: "Cybersecurity Staffing",
    hero: {
      eyebrow: "Niche Expertise",
      title: "Cybersecurity\nStaffing",
      subtitle: "AppSec, cloud security, SOC analysts, GRC specialists and CISOs — security professionals who protect, not just audit.",
      ctaLabel: "Hire Security Talent"
    },
    seo: {
      title: "Cybersecurity Staffing India | AppSec, Cloud Security, SOC | TalPro",
      description: "Hire pre-vetted cybersecurity professionals: AppSec engineers, Cloud Security architects, SOC analysts, and GRC specialists. India's specialist security staffing firm.",
      keywords: ["cybersecurity staffing India", "AppSec engineers hire", "cloud security staffing", "SOC analyst staffing", "CISO search India", "penetration testing staffing", "GRC staffing", "security engineer hiring Bangalore"]
    },
    overview: "Cybersecurity hiring is uniquely challenging: the global talent gap exceeds 3.5 million, certifications alone don't predict performance, and a bad security hire can cost millions. TalPro's Cybersecurity practice screens for engineers who have defended real systems — incident responders, threat hunters, and security architects with hands-on operational experience.",
    highlights: [
      "Offensive + defensive security talent",
      "Cloud-native security specialists (AWS, Azure, GCP)",
      "Compliance-aware: SOC2, ISO 27001, PCI-DSS, HIPAA",
      "CISO and security leadership executive search"
    ],
    capabilities: [
      {
        title: "Application Security",
        items: [
          "SAST/DAST/SCA tool implementation",
          "Secure SDLC integration",
          "API security and threat modelling",
          "Penetration testing and red teaming"
        ]
      },
      {
        title: "Cloud & Infrastructure Security",
        items: [
          "Cloud security posture management (CSPM)",
          "Container security (Kubernetes, Docker)",
          "Network security and zero-trust architecture",
          "IAM design and implementation"
        ]
      },
      {
        title: "GRC & Compliance",
        items: [
          "SOC 2 Type II audit preparation",
          "ISO 27001 implementation",
          "PCI-DSS compliance for FinTech",
          "DPDPA 2023 and GDPR readiness",
          "Risk assessment and vendor management"
        ]
      }
    ],
    roles: [
      "Application Security Engineer", "Cloud Security Architect", "SOC Analyst",
      "Penetration Tester", "Security Operations Lead", "GRC Analyst",
      "CISO", "VP Security", "DevSecOps Engineer", "Threat Intelligence Analyst"
    ],
    industries: ["FinTech", "Healthcare", "SaaS", "BFSI", "GCC", "E-commerce", "Government"],
    stats: [
      { value: "Offensive", label: "+ defensive" },
      { value: "Cloud-native", label: "security focus" },
      { value: "Compliance", label: "SOC2, ISO, PCI" }
    ],
    processSteps: [
      "Security role profiling and threat landscape mapping",
      "Candidate sourcing from security communities and events",
      "Hands-on security assessment (CTF, scenario-based)",
      "Background verification and clearance check",
      "Offer management and onboarding",
      "90-day performance and integration review"
    ],
    testimonial: {
      quote: "Hiring security talent is brutal — everyone has certifications but few have actually defended production systems. TalPro's CTF-style assessments identified real defenders, not paper tigers.",
      author: "Karthik V.",
      role: "CISO",
      company: "Digital Banking Platform",
    },
    faqs: [
      { q: "What cybersecurity roles does TalPro staff?", a: "We place AppSec engineers, Cloud Security architects, SOC analysts, penetration testers, GRC analysts, DevSecOps engineers, and security leadership (CISO, VP Security)." },
      { q: "How does TalPro assess cybersecurity candidates?", a: "Beyond certifications, we use scenario-based assessments: candidates work through real security challenges including incident response, vulnerability analysis, and architecture review." },
      { q: "Can TalPro help with SOC team build-outs?", a: "Yes. We've built complete SOC teams — L1/L2/L3 analysts, threat hunters, and SOC managers — for FinTech, healthcare, and enterprise clients." },
      { q: "Does TalPro handle CISO-level security leadership searches?", a: "Yes. Our executive search practice handles CISO, VP Security, and Head of InfoSec searches with a retained, confidential engagement model." },
    ],
  }
];

export const serviceMap = Object.fromEntries(
  services.map((s) => [s.slug, s] as const)
);
