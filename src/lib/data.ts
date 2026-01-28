export interface Role {
  id: string;
  title: string;
  workMode: "Onsite" | "Hybrid" | "Remote";
  salary?: string;
  category: "Engineering" | "Design" | "Product" | "Data" | "QA" | "Platform";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl: string;
}

export interface Company {
  id: string;
  name: string;
  location: string;
  description?: string;
  type: "Startup" | "Agency" | "Software House" | "Enterprise";
  roles: Role[];
}

export const companies: Company[] = [
  {
    id: "jabar-digital",
    name: "Jabar Digital Service",
    location: "Bandung, West Java",
    description: "Building digital public services for West Java's 50 million residents",
    type: "Enterprise",
    roles: [
      {
        id: "jds-fe-1",
        title: "Senior Frontend Engineer",
        workMode: "Hybrid",
        salary: "IDR 18-25 jt/bulan",
        category: "Engineering",
        summary: "Lead frontend development for citizen-facing digital services using React and Next.js.",
        responsibilities: [
          "Develop and maintain high-quality React applications",
          "Collaborate with design team to implement accessible interfaces",
          "Mentor junior developers and conduct code reviews",
          "Optimize application performance and bundle sizes"
        ],
        requirements: [
          "5+ years of frontend development experience",
          "Expert in React, TypeScript, and modern CSS",
          "Experience with accessibility standards (WCAG)",
          "Strong problem-solving and communication skills"
        ],
        applyUrl: "https://careers.jabarprov.go.id"
      },
      {
        id: "jds-be-1",
        title: "Backend Engineer",
        workMode: "Hybrid",
        salary: "IDR 15-22 jt/bulan",
        category: "Engineering",
        summary: "Build scalable APIs and microservices for government digital infrastructure.",
        responsibilities: [
          "Design and implement RESTful APIs",
          "Manage database schemas and migrations",
          "Ensure high availability of critical services",
          "Write comprehensive tests and documentation"
        ],
        requirements: [
          "3+ years of backend development experience",
          "Proficient in Go, Python, or Node.js",
          "Experience with PostgreSQL and Redis",
          "Understanding of DevOps practices"
        ],
        applyUrl: "https://careers.jabarprov.go.id"
      },
      {
        id: "jds-pm-1",
        title: "Product Manager",
        workMode: "Onsite",
        salary: "IDR 20-28 jt/bulan",
        category: "Product",
        summary: "Drive product strategy for public service applications serving millions of citizens.",
        responsibilities: [
          "Define product roadmap and prioritize features",
          "Conduct user research with diverse citizen groups",
          "Collaborate with engineering and design teams",
          "Measure product success through data-driven metrics"
        ],
        requirements: [
          "4+ years of product management experience",
          "Experience with B2C or government services",
          "Strong analytical and communication skills",
          "Ability to navigate complex stakeholder environments"
        ],
        applyUrl: "https://careers.jabarprov.go.id"
      }
    ]
  },
  {
    id: "bukalapak",
    name: "Bukalapak - Bandung Office",
    location: "Bandung, West Java",
    description: "Indonesia's leading e-commerce platform with engineering hub in Bandung",
    type: "Enterprise",
    roles: [
      {
        id: "bl-mobile-1",
        title: "Senior Mobile Engineer (Android)",
        workMode: "Hybrid",
        salary: "IDR 22-32 jt/bulan",
        category: "Engineering",
        summary: "Build features for Android app used by millions of Indonesian merchants.",
        responsibilities: [
          "Develop new features using Kotlin and Jetpack Compose",
          "Improve app performance and reduce crash rates",
          "Implement A/B testing for feature experiments",
          "Collaborate with cross-functional teams"
        ],
        requirements: [
          "5+ years Android development experience",
          "Expert in Kotlin, MVVM, and Clean Architecture",
          "Experience with large-scale consumer apps",
          "Published apps with 1M+ downloads preferred"
        ],
        applyUrl: "https://careers.bukalapak.com"
      },
      {
        id: "bl-data-1",
        title: "Data Engineer",
        workMode: "Remote",
        salary: "IDR 18-28 jt/bulan",
        category: "Data",
        summary: "Build data pipelines powering analytics for Indonesia's e-commerce ecosystem.",
        responsibilities: [
          "Design and maintain ETL pipelines",
          "Optimize data warehouse queries",
          "Build real-time streaming data systems",
          "Ensure data quality and governance"
        ],
        requirements: [
          "3+ years of data engineering experience",
          "Proficient in Python, SQL, and Spark",
          "Experience with Airflow and cloud platforms",
          "Understanding of data modeling best practices"
        ],
        applyUrl: "https://careers.bukalapak.com"
      }
    ]
  },
  {
    id: "vidio",
    name: "Vidio",
    location: "Bandung, West Java",
    description: "Indonesia's premier video streaming platform",
    type: "Enterprise",
    roles: [
      {
        id: "vidio-fe-1",
        title: "Frontend Engineer",
        workMode: "Hybrid",
        salary: "IDR 14-20 jt/bulan",
        category: "Engineering",
        summary: "Build engaging video player experiences for web and smart TV platforms.",
        responsibilities: [
          "Develop video player features and controls",
          "Optimize streaming performance across devices",
          "Implement DRM and content protection",
          "Create responsive layouts for various screens"
        ],
        requirements: [
          "3+ years frontend development",
          "Experience with video.js or similar players",
          "Strong JavaScript/TypeScript skills",
          "Understanding of streaming protocols (HLS, DASH)"
        ],
        applyUrl: "https://careers.vidio.com"
      }
    ]
  },
  {
    id: "doku",
    name: "DOKU",
    location: "Bandung, West Java",
    description: "Leading fintech company providing payment solutions since 2007",
    type: "Enterprise",
    roles: [
      {
        id: "doku-be-1",
        title: "Staff Backend Engineer",
        workMode: "Onsite",
        salary: "IDR 25-35 jt/bulan",
        category: "Engineering",
        summary: "Architect and build high-throughput payment processing systems.",
        responsibilities: [
          "Design distributed transaction systems",
          "Ensure PCI-DSS compliance in code",
          "Handle high-volume payment processing",
          "Lead technical design discussions"
        ],
        requirements: [
          "7+ years backend development",
          "Experience in fintech or payments industry",
          "Expert in Java or Go",
          "Strong understanding of distributed systems"
        ],
        applyUrl: "https://careers.doku.com"
      },
      {
        id: "doku-qa-1",
        title: "QA Engineer",
        workMode: "Hybrid",
        salary: "IDR 12-18 jt/bulan",
        category: "QA",
        summary: "Ensure quality of critical payment flows through automated testing.",
        responsibilities: [
          "Design and execute test plans",
          "Build automated test suites",
          "Perform security and performance testing",
          "Report and track defects to resolution"
        ],
        requirements: [
          "3+ years QA experience",
          "Experience with Selenium or Cypress",
          "Understanding of API testing tools",
          "Detail-oriented with strong documentation skills"
        ],
        applyUrl: "https://careers.doku.com"
      }
    ]
  },
  {
    id: "sagara-tech",
    name: "Sagara Technology",
    location: "Bandung, West Java",
    description: "Software house specializing in enterprise digital transformation",
    type: "Software House",
    roles: [
      {
        id: "sagara-fullstack-1",
        title: "Full Stack Developer",
        workMode: "Hybrid",
        salary: "IDR 10-16 jt/bulan",
        category: "Engineering",
        summary: "Build end-to-end solutions for enterprise clients across industries.",
        responsibilities: [
          "Develop full stack features using React and Node.js",
          "Work directly with clients to gather requirements",
          "Deploy and maintain production systems",
          "Participate in agile development process"
        ],
        requirements: [
          "2+ years full stack experience",
          "Proficient in React and Node.js",
          "Experience with cloud deployment",
          "Good communication skills"
        ],
        applyUrl: "https://sagara.id/careers"
      },
      {
        id: "sagara-ui-1",
        title: "UI/UX Designer",
        workMode: "Hybrid",
        salary: "IDR 8-14 jt/bulan",
        category: "Design",
        summary: "Design intuitive interfaces for enterprise software products.",
        responsibilities: [
          "Create wireframes and high-fidelity mockups",
          "Conduct user research and usability testing",
          "Build and maintain design systems",
          "Collaborate closely with developers"
        ],
        requirements: [
          "2+ years UI/UX design experience",
          "Proficient in Figma",
          "Portfolio demonstrating enterprise design work",
          "Understanding of design tokens and systems"
        ],
        applyUrl: "https://sagara.id/careers"
      }
    ]
  },
  {
    id: "xtremax",
    name: "Xtremax",
    location: "Bandung, West Java",
    description: "Digital agency building government and enterprise digital solutions",
    type: "Agency",
    roles: [
      {
        id: "xtremax-devops-1",
        title: "DevOps Engineer",
        workMode: "Hybrid",
        salary: "IDR 15-22 jt/bulan",
        category: "Platform",
        summary: "Manage cloud infrastructure for government and enterprise clients.",
        responsibilities: [
          "Design and maintain CI/CD pipelines",
          "Manage Kubernetes clusters",
          "Implement infrastructure as code",
          "Ensure security compliance"
        ],
        requirements: [
          "3+ years DevOps experience",
          "Expert in AWS or GCP",
          "Experience with Terraform and Kubernetes",
          "Understanding of security best practices"
        ],
        applyUrl: "https://xtremax.com/careers"
      }
    ]
  },
  {
    id: "flip-id",
    name: "Flip",
    location: "Bandung, West Java",
    description: "Making money transfers easy and affordable for all Indonesians",
    type: "Startup",
    roles: [
      {
        id: "flip-ios-1",
        title: "iOS Engineer",
        workMode: "Hybrid",
        salary: "IDR 18-26 jt/bulan",
        category: "Engineering",
        summary: "Build delightful mobile experiences for Flip's iOS app users.",
        responsibilities: [
          "Develop features using Swift and SwiftUI",
          "Implement smooth animations and transitions",
          "Integrate with payment and banking APIs",
          "Optimize app performance and battery usage"
        ],
        requirements: [
          "4+ years iOS development",
          "Expert in Swift and UIKit/SwiftUI",
          "Experience with fintech apps preferred",
          "Strong attention to UX details"
        ],
        applyUrl: "https://flip.id/karir"
      },
      {
        id: "flip-product-1",
        title: "Product Designer",
        workMode: "Hybrid",
        salary: "IDR 16-24 jt/bulan",
        category: "Design",
        summary: "Design simple and trustworthy experiences for financial products.",
        responsibilities: [
          "Design end-to-end user flows",
          "Create prototypes for user testing",
          "Maintain design system components",
          "Advocate for user needs in product decisions"
        ],
        requirements: [
          "3+ years product design experience",
          "Experience with mobile-first design",
          "Strong portfolio of shipped products",
          "Ability to simplify complex financial concepts"
        ],
        applyUrl: "https://flip.id/karir"
      }
    ]
  }
];

export const categories = ["Engineering", "Design", "Product", "Data", "QA", "Platform"] as const;
export const workModes = ["Onsite", "Hybrid", "Remote"] as const;
export const companyTypes = ["Startup", "Agency", "Software House", "Enterprise"] as const;
