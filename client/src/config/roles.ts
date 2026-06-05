export type RoleCategory =
  | "Frontend"
  | "Backend"
  | "Full-Stack"
  | "DevOps & Cloud"
  | "Data & AI"
  | "Mobile"
  | "QA & Testing"
  | "Security"
  | "Enterprise"
  | "Leadership";

export interface RoleConfig {
  slug: string;
  name: string;
  category: RoleCategory;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  skills: string[];
  blurb: string;
  assessment: string;
  demandSignal: string;
  salaryBand: string;
  priorityLongtail?: boolean;
}

const role = (
  slug: string,
  name: string,
  category: RoleCategory,
  skills: string[],
  blurb: string,
  assessment: string,
  demandSignal: string,
  salaryBand: string,
  priorityLongtail = false,
): RoleConfig => ({
  slug,
  name,
  category,
  seo: {
    title: `Hire ${name} in India | Vetted ${category} Talent | TalPro`,
    description: `Hire pre-vetted ${name.toLowerCase()} talent in India. TalPro screens for ${skills.slice(0, 3).join(", ")} and delivers high-signal shortlists for contract, C2H, and permanent roles.`,
    keywords: [
      `hire ${name.toLowerCase()}`,
      `${name.toLowerCase()} staffing India`,
      `${name.toLowerCase()} recruitment`,
      `${category.toLowerCase()} staffing`,
      "TalPro IT staffing",
    ],
  },
  skills,
  blurb,
  assessment,
  demandSignal,
  salaryBand,
  priorityLongtail,
});

export const roles: RoleConfig[] = [
  role("react-developer", "React Developer", "Frontend", ["React", "TypeScript", "Next.js", "Redux", "Testing Library"], "Product teams hire React developers when front-end velocity, maintainability, and conversion quality all matter at once.", "Component architecture review, state-management scenario, accessibility pass, and production debugging exercise.", "High demand across SaaS, fintech, e-commerce, and GCC product teams.", "₹5L-₹50L", true),
  role("angular-developer", "Angular Developer", "Frontend", ["Angular", "TypeScript", "RxJS", "NgRx", "Jasmine"], "Enterprise teams rely on Angular developers for governed front-end platforms with predictable release discipline.", "Module design, reactive forms, RxJS reasoning, and migration planning from older Angular versions.", "Strong demand in BFSI, healthcare, telecom, and enterprise GCCs.", "₹4L-₹45L", true),
  role("vue-developer", "Vue Developer", "Frontend", ["Vue", "Nuxt", "Pinia", "TypeScript", "Vitest"], "Vue developers help teams ship lightweight, maintainable interfaces without sacrificing modern engineering standards.", "Composition API review, reusable component build, routing/data-flow exercise, and test coverage check.", "Growing demand in SaaS dashboards, marketplaces, and content platforms.", "₹4L-₹38L"),
  role("frontend-engineer", "Frontend Engineer", "Frontend", ["JavaScript", "TypeScript", "React", "Performance", "Accessibility"], "Frontend engineers own the user-facing quality layer: speed, clarity, accessibility, and reliable interaction patterns.", "UI implementation exercise, Core Web Vitals review, cross-browser debugging, and design-system judgement.", "Persistent demand across product engineering and digital transformation teams.", "₹5L-₹48L", true),
  role("node-js-developer", "Node.js Developer", "Backend", ["Node.js", "Express", "NestJS", "PostgreSQL", "API Design"], "Node.js developers are a practical fit for API platforms, BFF layers, real-time systems, and fast-moving SaaS products.", "API design task, async failure handling, database query review, and observability scenario.", "High demand in SaaS, fintech, logistics, and marketplace engineering.", "₹5L-₹48L", true),
  role("java-developer", "Java Developer", "Backend", ["Java", "Spring Boot", "Microservices", "Kafka", "SQL"], "Java developers remain central to enterprise platforms where scale, compliance, and long-lived maintainability matter.", "Spring Boot service design, concurrency reasoning, integration testing, and production incident walkthrough.", "High demand in BFSI, telecom, healthcare, and large GCCs.", "₹5L-₹50L", true),
  role("python-developer", "Python Developer", "Backend", ["Python", "FastAPI", "Django", "Airflow", "PostgreSQL"], "Python developers bridge backend APIs, automation, data workflows, and AI-enabled product features.", "API build, data pipeline reasoning, typing/test review, and performance profiling discussion.", "High demand across data platforms, AI products, SaaS, and automation teams.", "₹5L-₹52L", true),
  role("dotnet-developer", ".NET Developer", "Backend", [".NET", "C#", "ASP.NET Core", "Azure", "SQL Server"], ".NET developers support enterprise modernization, cloud migration, and secure internal business platforms.", "API and domain modelling exercise, Azure deployment review, and legacy-to-modern migration scenario.", "Strong demand in BFSI, healthcare, manufacturing, and Microsoft-stack GCCs.", "₹5L-₹48L"),
  role("go-developer", "Go Developer", "Backend", ["Go", "gRPC", "Kubernetes", "PostgreSQL", "Distributed Systems"], "Go developers are prized for platform services, cloud infrastructure, high-concurrency APIs, and developer tooling.", "Concurrency exercise, service boundary design, profiling review, and reliability incident simulation.", "Rising demand in infrastructure SaaS, fintech platforms, and cloud-native teams.", "₹7L-₹55L", true),
  role("php-developer", "PHP Developer", "Backend", ["PHP", "Laravel", "Symfony", "MySQL", "API Integration"], "PHP developers help teams modernize commerce, CMS, marketplace, and business-workflow platforms cost-effectively.", "Legacy refactor review, Laravel module build, SQL tuning, and secure payment-flow reasoning.", "Stable demand in e-commerce, media, and SMB SaaS modernization.", "₹3L-₹35L"),
  role("full-stack-engineer", "Full-Stack Engineer", "Full-Stack", ["React", "Node.js", "TypeScript", "PostgreSQL", "Cloud"], "Full-stack engineers reduce handoff friction when teams need one person to own product slices end to end.", "Feature-slice build, API contract review, test coverage discussion, and deployment-readiness check.", "Very high demand across startups, SaaS, GCC innovation pods, and internal tools.", "₹6L-₹55L", true),
  role("backend-engineer", "Backend Engineer", "Backend", ["API Design", "SQL", "Distributed Systems", "Caching", "Observability"], "Backend engineers carry the reliability, data integrity, and business-rule layer behind customer-facing products.", "System design exercise, database modelling, error-handling review, and production observability walkthrough.", "High demand across regulated and high-scale software teams.", "₹5L-₹52L", true),
  role("ios-developer", "iOS Developer", "Mobile", ["Swift", "SwiftUI", "UIKit", "App Store", "Core Data"], "iOS developers are critical when mobile quality, release discipline, and platform-native user experience drive retention.", "Swift architecture review, offline-state scenario, crash triage, and App Store release discussion.", "Strong demand in fintech, commerce, health, and consumer SaaS.", "₹6L-₹55L"),
  role("android-developer", "Android Developer", "Mobile", ["Kotlin", "Jetpack Compose", "Android SDK", "Room", "Play Store"], "Android developers help reach India's broadest user base while keeping performance stable across diverse devices.", "Kotlin feature task, lifecycle debugging, offline sync scenario, and Play Store readiness review.", "Strong demand in consumer apps, logistics, fintech, and field-force platforms.", "₹5L-₹50L"),
  role("flutter-developer", "Flutter Developer", "Mobile", ["Flutter", "Dart", "Firebase", "State Management", "Mobile CI"], "Flutter developers suit teams that need polished cross-platform apps without building two separate native teams.", "Widget architecture review, state-management exercise, performance pass, and release pipeline discussion.", "Rising demand among startups, SMB products, and internal mobile tools.", "₹5L-₹45L"),
  role("react-native-developer", "React Native Developer", "Mobile", ["React Native", "TypeScript", "Expo", "Native Modules", "Mobile Testing"], "React Native developers let JavaScript-heavy teams ship mobile apps while preserving access to native capabilities.", "Navigation/state task, bridge/native module discussion, crash triage, and app performance review.", "Stable demand in SaaS mobile companions, commerce, and marketplace apps.", "₹5L-₹50L"),
  role("devops-engineer", "DevOps Engineer", "DevOps & Cloud", ["CI/CD", "Docker", "Kubernetes", "Terraform", "Monitoring"], "DevOps engineers shorten release cycles while improving operational confidence and incident response.", "Pipeline review, infrastructure-as-code task, monitoring design, and rollback scenario.", "Very high demand in SaaS, fintech, GCC platform teams, and cloud migrations.", "₹6L-₹55L", true),
  role("aws-cloud-engineer", "AWS Cloud Engineer", "DevOps & Cloud", ["AWS", "Terraform", "EKS", "Lambda", "CloudWatch"], "AWS cloud engineers build and operate scalable workloads with cost, security, and reliability in view.", "Landing-zone review, IAM scenario, Terraform module task, and cost-optimization exercise.", "High demand in cloud migration, platform engineering, and SaaS scale-up teams.", "₹7L-₹60L", true),
  role("azure-cloud-engineer", "Azure Cloud Engineer", "DevOps & Cloud", ["Azure", "AKS", "Functions", "Entra ID", "DevOps"], "Azure cloud engineers are essential for Microsoft-stack enterprises and GCC modernization programs.", "Azure architecture review, identity/IAM scenario, deployment pipeline design, and observability check.", "Strong demand in BFSI, healthcare, manufacturing, and enterprise GCCs.", "₹7L-₹58L"),
  role("gcp-cloud-engineer", "GCP Cloud Engineer", "DevOps & Cloud", ["GCP", "GKE", "BigQuery", "Cloud Run", "Terraform"], "GCP cloud engineers support data-heavy products, analytics platforms, and modern container workloads.", "GKE deployment review, BigQuery cost scenario, Terraform task, and reliability exercise.", "Rising demand in analytics, media, retail, and AI-enabled SaaS.", "₹7L-₹58L"),
  role("kubernetes-sre-engineer", "Kubernetes SRE Engineer", "DevOps & Cloud", ["Kubernetes", "SRE", "Prometheus", "Grafana", "Incident Response"], "Kubernetes SRE engineers keep distributed platforms resilient when product teams scale beyond simple deployments.", "Incident postmortem, SLO design, cluster troubleshooting, and capacity planning scenario.", "High demand in scale-ups, fintech, SaaS, and platform teams.", "₹8L-₹62L", true),
  role("data-engineer", "Data Engineer", "Data & AI", ["Spark", "Airflow", "SQL", "Snowflake", "Databricks"], "Data engineers turn raw operational events into reliable datasets that analytics and AI teams can trust.", "Pipeline design, data quality scenario, SQL optimization, and orchestration failure drill.", "Very high demand across fintech, retail, SaaS, healthcare, and GCC analytics teams.", "₹6L-₹58L", true),
  role("ml-ai-engineer", "ML/AI Engineer", "Data & AI", ["Python", "PyTorch", "LLMs", "MLOps", "Vector Databases"], "ML/AI engineers help product teams move from experiments to governed AI features that survive production use.", "Model evaluation review, retrieval workflow design, MLOps scenario, and failure-mode analysis.", "Fastest-growing demand across AI products, automation, and enterprise innovation teams.", "₹8L-₹75L", true),
  role("data-scientist", "Data Scientist", "Data & AI", ["Python", "Statistics", "Experimentation", "Forecasting", "SQL"], "Data scientists help leaders convert messy product, customer, and operational signals into better decisions.", "Experiment design, model interpretation, SQL analysis, and stakeholder storytelling exercise.", "Strong demand in fintech, SaaS, retail, healthcare, and marketplace teams.", "₹6L-₹60L"),
  role("qa-automation-engineer", "QA Automation Engineer", "QA & Testing", ["Selenium", "Cypress", "Playwright", "API Testing", "CI"], "QA automation engineers protect release speed by catching regressions before customers do.", "Test strategy review, flaky-test debugging, API automation task, and CI integration scenario.", "Stable demand wherever product teams ship frequently.", "₹4L-₹42L"),
  role("sdet", "SDET", "QA & Testing", ["Java", "TypeScript", "Automation Frameworks", "Performance Testing", "CI"], "SDETs combine software engineering discipline with test strategy for complex, high-change systems.", "Framework design, contract testing, production bug reproduction, and quality metrics discussion.", "High demand in SaaS, BFSI, commerce, and enterprise platforms.", "₹5L-₹48L", true),
  role("embedded-engineer", "Embedded Engineer", "Enterprise", ["C", "C++", "RTOS", "Firmware", "Hardware Debugging"], "Embedded engineers connect software quality with hardware constraints in automotive, industrial, and IoT products.", "Firmware debugging, memory/performance scenario, protocol review, and hardware-interface reasoning.", "Strong demand in automotive, manufacturing, devices, and industrial IoT.", "₹5L-₹45L"),
  role("salesforce-developer", "Salesforce Developer", "Enterprise", ["Apex", "Lightning", "Salesforce APIs", "Flow", "CRM"], "Salesforce developers help revenue, service, and operations teams customize CRM workflows without fragile workarounds.", "Apex trigger review, integration scenario, Flow governance check, and release strategy.", "Strong demand in SaaS, BFSI, telecom, and enterprise transformation.", "₹5L-₹48L"),
  role("sap-consultant", "SAP Consultant", "Enterprise", ["SAP S/4HANA", "ABAP", "Fiori", "MM", "SD"], "SAP consultants support ERP transformation where domain knowledge and implementation discipline are equally important.", "Module scenario, integration mapping, cutover-risk discussion, and stakeholder-fit interview.", "Stable demand in manufacturing, retail, logistics, and large enterprises.", "₹6L-₹60L"),
  role("cybersecurity-engineer", "Cybersecurity Engineer", "Security", ["AppSec", "Cloud Security", "SIEM", "Incident Response", "GRC"], "Cybersecurity engineers reduce business risk by strengthening systems, processes, and incident readiness.", "Threat-modelling scenario, vulnerability triage, cloud posture review, and incident response drill.", "High demand in fintech, healthcare, SaaS, GCCs, and regulated enterprises.", "₹6L-₹65L", true),
  role("solution-architect", "Solution Architect", "Leadership", ["Architecture", "Cloud", "Integration", "Security", "Stakeholder Management"], "Solution architects turn business constraints into buildable systems and help teams avoid expensive rework.", "Architecture review, trade-off memo, integration map, and executive communication exercise.", "High demand in GCCs, enterprise transformation, and complex SaaS programs.", "₹18L-₹90L"),
  role("product-manager", "Product Manager", "Leadership", ["Roadmapping", "Discovery", "Analytics", "Stakeholder Management", "Delivery"], "Product managers align customer problems, engineering capacity, and measurable business outcomes.", "Product case, prioritization trade-off, metrics review, and stakeholder simulation.", "Consistent demand in SaaS, fintech, commerce, and GCC product teams.", "₹12L-₹75L"),
  role("scrum-master", "Scrum Master", "Leadership", ["Agile", "Delivery Governance", "Risk Management", "Jira", "Team Facilitation"], "Scrum masters help cross-functional delivery teams remove blockers, clarify commitments, and improve predictability.", "Delivery-health review, retrospective facilitation scenario, and stakeholder escalation exercise.", "Stable demand in enterprise product and transformation programs.", "₹8L-₹45L"),
  role("engineering-manager", "Engineering Manager", "Leadership", ["People Management", "Delivery", "Architecture", "Hiring", "Coaching"], "Engineering managers keep teams healthy while translating strategy into reliable execution.", "People scenario, delivery-risk review, hiring bar discussion, and technical leadership case.", "High demand in scale-ups, SaaS, GCCs, and modernization teams.", "₹20L-₹90L"),
  role("technical-lead", "Technical Lead", "Leadership", ["System Design", "Code Review", "Mentoring", "Delivery", "Architecture"], "Technical leads raise engineering standards while keeping squads moving through practical technical decisions.", "Design review, code-quality assessment, mentoring scenario, and delivery trade-off discussion.", "High demand in product squads, GCC pods, and platform teams.", "₹15L-₹75L"),
];

export const roleMap = Object.fromEntries(roles.map((item) => [item.slug, item] as const));

export const getRoleSlugs = () => roles.map((item) => item.slug);

export const priorityRoleSlugs = roles
  .filter((item) => item.priorityLongtail)
  .map((item) => item.slug);
