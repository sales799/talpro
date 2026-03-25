-- Cycle 1: Create persistent jobs table
-- Replaces the broken PyjamaHR scraper with DB-managed jobs

CREATE TABLE IF NOT EXISTS jobs (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department VARCHAR(100),
  location TEXT NOT NULL DEFAULT 'India',
  employment_type VARCHAR(20) NOT NULL DEFAULT 'full-time'
    CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level VARCHAR(20)
    CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency VARCHAR(3) DEFAULT 'INR',
  remote BOOLEAN DEFAULT false,
  application_url TEXT,
  posted_date TIMESTAMP DEFAULT NOW(),
  updated_date TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  -- SEO fields
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  -- Source tracking
  source VARCHAR(50) DEFAULT 'manual', -- 'manual', 'pyjamahr', 'api'
  external_id VARCHAR(100), -- PyjamaHR job ID etc.
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Index for active jobs listing
CREATE INDEX idx_jobs_active ON jobs (is_active, posted_date DESC);
CREATE INDEX idx_jobs_department ON jobs (department) WHERE is_active = true;
CREATE INDEX idx_jobs_location ON jobs (location) WHERE is_active = true;
CREATE INDEX idx_jobs_slug ON jobs (slug);

-- Seed with current TalPro active roles
INSERT INTO jobs (title, slug, department, location, employment_type, experience_level, description, requirements, benefits, application_url, is_active) VALUES
(
  'Sr. Azure DevOps Engineer',
  'sr-azure-devops-engineer-contract',
  'Cloud & DevOps',
  'Bangalore, Karnataka',
  'contract',
  'senior',
  'Design and maintain CI/CD pipelines, Azure Kubernetes Service clusters, and infrastructure-as-code using Terraform. GCC client, hybrid model. 6-month engagement with extension potential.',
  ARRAY['Azure DevOps', 'Kubernetes', 'Terraform', 'CI/CD', '8-12 years experience'],
  ARRAY['Contract staffing via Talpro', 'Hybrid work', 'GCC client', 'Competitive day rate'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
),
(
  'Python Full-Stack Developer',
  'python-fullstack-developer',
  'Engineering',
  'Hyderabad, Telangana',
  'full-time',
  'mid',
  'Build and maintain full-stack applications using Python (FastAPI/Django) and React/Next.js. Work with data pipelines and cloud services. Product company, fully remote option.',
  ARRAY['Python', 'FastAPI or Django', 'React/Next.js', 'PostgreSQL', '4-7 years experience'],
  ARRAY['Full-time permanent', 'Remote-first', 'Product company', 'ESOPs', 'Health insurance'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
),
(
  'SAP S/4HANA Functional Consultant',
  'sap-s4hana-functional-consultant',
  'SAP & Enterprise',
  'Pune, Maharashtra',
  'full-time',
  'senior',
  'Lead SAP S/4HANA implementation projects covering MM, SD, and FICO modules. Work with a Tier-1 manufacturing client on their digital transformation.',
  ARRAY['SAP S/4HANA', 'MM/SD/FICO', 'Implementation experience', 'Blueprint workshops', '8-15 years experience'],
  ARRAY['Permanent role', 'Hybrid (3 days office)', 'Manufacturing GCC', 'Performance bonus'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
),
(
  'Data Engineer — Databricks & Spark',
  'data-engineer-databricks-spark',
  'Data & AI',
  'Bangalore, Karnataka',
  'full-time',
  'mid',
  'Design and optimize data pipelines on Databricks and Apache Spark. Build lakehouse architectures for a fintech GCC processing 2M+ daily transactions.',
  ARRAY['Databricks', 'Apache Spark', 'Python/Scala', 'Delta Lake', 'SQL', '5-9 years experience'],
  ARRAY['Fintech GCC', 'Hybrid model', 'Health + life insurance', 'Annual bonus'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
),
(
  'Cybersecurity Analyst — SOC L2',
  'cybersecurity-analyst-soc-l2',
  'Cybersecurity',
  'Chennai, Tamil Nadu',
  'full-time',
  'mid',
  'Monitor and respond to security incidents using SIEM tools. Perform threat hunting and vulnerability assessments. Rotational shifts in a 24/7 SOC.',
  ARRAY['SIEM (Splunk/QRadar)', 'Incident Response', 'Threat Hunting', 'CEH/CompTIA Security+', '3-6 years experience'],
  ARRAY['Permanent role', 'Shift allowance', 'Certification sponsorship', 'Career path to L3'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
),
(
  'Salesforce Commerce Cloud Developer',
  'salesforce-commerce-cloud-developer',
  'Salesforce',
  'Mumbai, Maharashtra',
  'full-time',
  'senior',
  'Build and customize Salesforce Commerce Cloud (B2C) storefronts. Integrate payment gateways and OMS systems for a retail client.',
  ARRAY['SFCC B2C Commerce', 'SFRA', 'JavaScript/ISML', 'REST APIs', '6-10 years experience'],
  ARRAY['Retail GCC', 'Hybrid work', 'Salesforce certification support', 'Annual bonus'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
),
(
  'Talent Acquisition Manager',
  'talent-acquisition-manager',
  'HR & Operations',
  'Delhi NCR',
  'full-time',
  'senior',
  'Lead a team of 5 recruiters. Own the full-cycle hiring process for IT roles across GCC and product company clients. Build employer branding initiatives.',
  ARRAY['IT Recruitment', 'Team Leadership', 'ATS Management', 'Employer Branding', '7-12 years experience'],
  ARRAY['Leadership role', 'Performance incentives', 'Health insurance', 'Flexible hours'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
),
(
  'Network Security Engineer',
  'network-security-engineer',
  'IT Infrastructure',
  'Hyderabad, Telangana',
  'contract',
  'mid',
  'Design and implement network security solutions including firewalls, IDS/IPS, and VPN infrastructure. Support a banking client''s zero-trust migration.',
  ARRAY['Cisco/Palo Alto Firewalls', 'Network Security', 'Zero Trust Architecture', 'CCNP Security', '4-8 years experience'],
  ARRAY['Banking client', '6-month contract', 'Hybrid model', 'Competitive day rate'],
  'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF',
  true
);
