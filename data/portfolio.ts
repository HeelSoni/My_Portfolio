export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'AI' | 'Data' | 'Full-Stack' | 'Web';
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  isCaseStudy?: boolean;
  featured?: boolean;
  stats?: string;
  imageAlt?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  iconName: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  tech: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  details: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
}

export interface AchievementItem {
  title: string;
  organization?: string;
  date?: string;
  type: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Heel Soni",
    role: "AI/ML Developer | Data Analyst | Full-Stack Engineer",
    heroHeading: "I turn raw data into intelligent products.",
    location: "Anand, Gujarat, India",
    email: "heelsoni01@gmail.com",
    linkedin: "https://linkedin.com/in/heelsoni",
    linkedinDisplay: "linkedin.com/in/heelsoni",
    github: "https://github.com/HeelSoni",
    githubDisplay: "github.com/HeelSoni",
    resumeUrl: "/resume",
    photoUrl: "/heel_photo.png",
    currentStatus: "Open to internships, junior roles, and freelance work",
    aboutBio:
      "Final-year B.Tech IT student (CGPA 8.90, A.D. Patel Institute of Technology, 2023-2027) who builds intelligent applications by combining React/Next.js frontends, FastAPI backends, and AI/ML (LLMs, Scikit-Learn, NLP). Strong in data cleaning, EDA, and dashboards with Excel, SQL, Python and Power BI. Open to internships, junior roles, and freelance work."
  },

  stats: [
    { label: "Projects Completed", value: 5, suffix: "+", detail: "End-to-end full-stack & AI/ML systems" },
    { label: "Academic CGPA", value: 8.90, isDecimal: true, detail: "A.D. Patel Institute of Technology" },
    { label: "Industry Certifications", value: 5, suffix: "", detail: "IBM, Google, freeCodeCamp" },
    { label: "Internship Completed", value: 1, suffix: "", detail: "Data Analyst at Codec Technologies" }
  ],

  experience: [
    {
      role: "Data Analyst Intern",
      company: "Codec Technologies India",
      location: "Remote",
      period: "May 2026 – Jun 2026",
      points: [
        "Cleaned and preprocessed raw datasets to prepare them for rigorous analysis and predictive modeling.",
        "Ran exploratory data analysis (EDA) to uncover hidden patterns that supported strategic decision-making.",
        "Used Power BI and Excel for analysis and interactive dashboard visualization."
      ],
      tech: ["Python", "Power BI", "Excel", "EDA", "Data Cleaning"]
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "A.D. Patel Institute of Technology, Karamsad, Gujarat",
      period: "2023 – 2027 (Final Year)",
      score: "CGPA 8.90 (till 6th semester)",
      details: "Specializing in Intelligent Systems, Cloud Architectures, Data Science, and Distributed Databases."
    }
  ] as EducationItem[],

  projects: [
    {
      id: "pitch-iq",
      title: "PitchIQ",
      subtitle: "AI-Powered Financial Analytics Platform",
      description:
        "AI-powered financial analytics over 780+ startup pitches, with Recharts dashboards, 'Startup Battles' comparison, and an SQL-backed local AI analyst chatbot.",
      category: "AI",
      tech: ["React", "TypeScript", "FastAPI", "Python", "SQL", "Hugging Face", "Recharts"],
      liveUrl: "https://pitch-iq-one.vercel.app",
      githubUrl: "https://github.com/HeelSoni/PitchIQ",
      featured: true,
      stats: "780+ startup pitches analyzed"
    },
    {
      id: "paper-pilot",
      title: "PaperPilot",
      subtitle: "AI Research Assistant for arXiv",
      description:
        "Semantic search over arXiv (results in under 3 seconds), BART summaries, 5 structured insights per paper, Chat with Paper, and citation graph.",
      category: "AI",
      tech: ["React", "FastAPI", "HuggingFace", "BART", "SQLite", "arXiv API"],
      liveUrl: "https://paper-pilot-five.vercel.app",
      githubUrl: "https://github.com/HeelSoni/PaperPilot",
      featured: true,
      stats: "<3s semantic retrieval"
    },
    {
      id: "insight-ai",
      title: "Insight AI",
      subtitle: "Autonomous Data Analysis Engine",
      description:
        "Auto-cleans CSVs, finds patterns (correlation, K-Means, Apriori), writes natural-language hypotheses, and includes a Random Forest What-If simulator.",
      category: "Data",
      tech: ["Python", "Streamlit", "Scikit-Learn", "Plotly", "Random Forest"],
      liveUrl: "https://insight-ai-fvkhsfa9hpzefqfxaamacw.streamlit.app/",
      githubUrl: "https://github.com/HeelSoni/Insight-AI",
      featured: true,
      stats: "Multi-engine pattern detection"
    },
    {
      id: "heelthy",
      title: "Heelthy",
      subtitle: "3D Interactive Nutrition Experience",
      description:
        "3D interactive food experience with scrollytelling, high-performance visual aesthetics, and React Three Fiber navigation.",
      category: "Web",
      tech: ["React 19", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion"],
      liveUrl: "https://heelthy.vercel.app",
      githubUrl: "https://github.com/HeelSoni/heelthy",
      featured: false,
      stats: "60 FPS 3D interactive viewport"
    },
    {
      id: "velvet-pores",
      title: "Velvet Pores",
      subtitle: "Responsive Skincare Brand Platform",
      description:
        "Responsive skincare brand landing page crafted with modern visual hierarchy and fluid layouts.",
      category: "Web",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      liveUrl: "https://velvet-pores-website.vercel.app",
      githubUrl: "https://github.com/HeelSoni/velvet-pores-website",
      featured: false,
      stats: "100% responsive fluid UI"
    },
    {
      id: "hr-attrition",
      title: "HR Attrition Analysis",
      subtitle: "Enterprise Workforce Retention Case Study",
      description:
        "Cleaned a 1,400-employee dataset, built pivot tables and charts across department, age, and salary band, identifying 3 key retention levers.",
      category: "Data",
      tech: ["Microsoft Excel", "Pivot Tables", "EDA", "Data Modeling"],
      isCaseStudy: true,
      featured: false,
      stats: "1,400 employees analyzed"
    }
  ] as Project[],

  githubRepositories: [
    {
      name: "spam-classifier-ml",
      description: "Machine learning classifier for detecting SMS and email spam with high precision.",
      url: "https://github.com/HeelSoni/spam-classifier-ml",
      tags: ["Python", "NLP", "Scikit-Learn"]
    },
    {
      name: "mnist-digit-classifier",
      description: "Neural network model for recognizing handwritten numerical digits from the MNIST dataset.",
      url: "https://github.com/HeelSoni/mnist-digit-classifier",
      tags: ["Python", "Deep Learning", "NumPy"]
    }
  ],

  skillCategories: [
    {
      title: "Programming",
      iconName: "Code",
      skills: ["Python", "SQL", "JavaScript", "TypeScript", "HTML", "CSS"]
    },
    {
      title: "Data Analysis",
      iconName: "Activity",
      skills: ["Pandas", "NumPy", "EDA", "Feature Engineering", "Trend Analysis", "KPI Reporting"]
    },
    {
      title: "Visualization",
      iconName: "BarChart3",
      skills: ["Power BI", "Tableau", "Excel", "Matplotlib", "Seaborn", "Plotly", "Recharts"]
    },
    {
      title: "AI & Machine Learning",
      iconName: "Cpu",
      skills: ["Scikit-Learn", "Regression", "Classification", "K-Means", "Random Forest", "NLP", "HuggingFace", "LLM apps"]
    },
    {
      title: "Backend & Full-Stack",
      iconName: "Server",
      skills: ["FastAPI", "Streamlit", "REST APIs", "React", "Next.js"]
    },
    {
      title: "Databases",
      iconName: "Database",
      skills: ["MySQL", "SQL Server", "PostgreSQL", "SQLite"]
    },
    {
      title: "Tools & DevOps",
      iconName: "Wrench",
      skills: ["Git", "GitHub", "Jupyter", "Power Query", "Vercel", "Railway"]
    }
  ] as SkillCategory[],

  marqueeSkills: [
    "Python", "FastAPI", "React", "Next.js", "TypeScript", "Power BI", "Scikit-Learn",
    "SQL", "Hugging Face", "Pandas", "NumPy", "Plotly", "Tableau", "PostgreSQL",
    "Tailwind CSS", "Three.js", "Framer Motion", "Excel Advanced", "Streamlit", "Docker"
  ],

  certifications: [
    {
      title: "Data Analysis Using Python",
      issuer: "IBM",
      date: "Apr 2026"
    },
    {
      title: "Data Visualization V8 (approx. 300 hours)",
      issuer: "freeCodeCamp",
      date: "Apr 2026"
    },
    {
      title: "Google Data Analytics Certificate",
      issuer: "Google",
      date: "May 2026"
    },
    {
      title: "Data Analytics Bootcamp",
      issuer: "Alex the Analyst",
      date: "May 2026"
    },
    {
      title: "Data Privacy Fundamentals",
      issuer: "IBM",
      date: "Apr 2026"
    }
  ] as CertificationItem[],

  achievements: [
    {
      title: "Women Who Master Hackathon",
      organization: "Aspire For Her",
      date: "Jul 2026",
      type: "Hackathon Participant",
      description: "Collaborated on solving impactful technology challenges during an intensive competitive sprint."
    },
    {
      title: "Smart India Hackathon (SIH 2025)",
      organization: "A.D. Patel Institute of Technology",
      date: "Sep 2025",
      type: "Internal Round Qualifier",
      description: "Developed innovative algorithmic solutions tackling national public utility and operational bottlenecks."
    },
    {
      title: "15-Day SQL Challenge",
      organization: "HackerRank",
      type: "Competitive Challenge",
      description: "Mastered complex relational queries, recursive CTEs, window functions, and database schema optimizations."
    },
    {
      title: "Tech & Analytics Club",
      organization: "ADIT College",
      type: "Active Core Member",
      description: "Organized data workshops, coding sessions, and peer mentorship on emerging AI and data analytics paradigms."
    }
  ] as AchievementItem[]
};
