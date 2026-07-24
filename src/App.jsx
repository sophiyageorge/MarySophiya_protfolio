import { useState, useEffect } from "react";
import {
  Mail, ExternalLink, MapPin,
  GraduationCap, Briefcase, FlaskConical, ArrowRight,
  Code2, Eye, MessageSquare, Cpu, Database, Settings2,BarChart3,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* ─── Design Tokens (Cyberpunk AI Lab Theme) ────────────────── */
const T = {
  bg:           "#08090A",   // Deep Void Black
  bgAlt:        "#0F1115",   // Dark Slate
  bgCard:       "#111316",   // Elevated Surface
  bgDark:       "#000000",   // Pure Black for Contrast
  text:         "#E8E8E8",   // Bone White
  muted:        "#8A9BAA",   // Muted Blue-Gray
  accent:       "#00E5B8",   // Neon Mint/Teal
  border:       "#232A31",   // Subtle Cyber Border
  tagBg:        "rgba(0, 229, 184, 0.08)",
  green:        "#00E5B8",
  greenBg:      "rgba(0, 229, 184, 0.1)",
  greenBorder:  "rgba(0, 229, 184, 0.3)",
  cyanLight:    "#00E5B8",
};

/* ─── Global CSS ─────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  
  body {
    background-color: #08090A;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #08090A; }
  ::-webkit-scrollbar-thumb { background: #232A31; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #00E5B8; }

  .nav-link {
    color: #8A9BAA; text-decoration: none; font-size: 14px;
    font-weight: 500; transition: color .2s; font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { color: #00E5B8; }

  .nav-cta {
    background: transparent; color: #00E5B8; padding: 8px 20px;
    border-radius: 6px; font-size: 14px; font-weight: 600;
    text-decoration: none; transition: all .2s; border: 1px solid #00E5B8;
    font-family: 'Inter', sans-serif;
  }
  .nav-cta:hover { background: #00E5B8; color: #08090A; box-shadow: 0 0 15px rgba(0, 229, 184, 0.3); }

  .btn-primary {
    background: #00E5B8; color: #08090A; padding: 12px 28px;
    border-radius: 8px; font-size: 15px; font-weight: 700;
    text-decoration: none; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; transition: all .2s; display: inline-block;
  }
  .btn-primary:hover { box-shadow: 0 0 20px rgba(0, 229, 184, 0.4); transform: translateY(-1px); }

  .btn-secondary {
    background: transparent; color: #E8E8E8; padding: 12px 28px;
    border-radius: 8px; border: 1.5px solid #232A31; font-size: 15px;
    font-weight: 600; text-decoration: none; cursor: pointer;
    font-family: 'Inter', sans-serif; transition: all .2s; display: inline-block;
  }
  .btn-secondary:hover { border-color: #00E5B8; color: #00E5B8; box-shadow: 0 0 15px rgba(0, 229, 184, 0.1); }

  .skill-card {
    background: #111316; border: 1px solid #232A31; border-radius: 12px;
    padding: 28px; transition: all .2s;
  }
  .skill-card:hover { box-shadow: 0 0 20px rgba(0, 229, 184, 0.08); border-color: #00E5B8; }

  .project-card {
    background: #111316; border: 1px solid #232A31; border-radius: 12px;
    padding: 32px; display: flex; flex-direction: column;
    transition: all .2s;
  }
  .project-card:hover { box-shadow: 0 0 20px rgba(0, 229, 184, 0.08); border-color: #00E5B8; }

  .project-link {
    font-size: 13px; font-weight: 600; color: #00E5B8;
    text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
    transition: filter .2s;
  }
  .project-link:hover { text-decoration: underline; filter: brightness(1.2); }

  .timeline-item {
    display: grid; grid-template-columns: 200px 1fr; gap: 40px;
    padding: 28px 0; border-bottom: 1px solid #232A31; align-items: start;
  }
  .timeline-item:last-child { border-bottom: none; }

  .contact-btn-solid {
    padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 700;
    background: #00E5B8; color: #08090A; font-family: 'Inter', sans-serif; cursor: pointer;
    border: none; text-decoration: none; display: inline-flex;
    align-items: center; gap: 8px; transition: all .2s;
  }
  .contact-btn-solid:hover { box-shadow: 0 0 20px rgba(0, 229, 184, 0.4); transform: translateY(-2px); }

  .contact-btn-ghost {
    padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600;
    background: transparent; color: rgba(255,255,255,.8);
    border: 1.5px solid rgba(255,255,255,.18); font-family: 'Inter', sans-serif;
    cursor: pointer; text-decoration: none; display: inline-flex;
    align-items: center; gap: 8px; transition: all .2s;
  }
  .contact-btn-ghost:hover { border-color: #00E5B8; color: #00E5B8; box-shadow: 0 0 15px rgba(0, 229, 184, 0.1); }

  .footer-link {
    font-size: 13px; color: #8A9BAA; text-decoration: none; transition: color .2s;
  }
  .footer-link:hover { color: #00E5B8; }

  .pulse-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #00E5B8; box-shadow: 0 0 8px #00E5B8; animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:.35 } }

  @media (max-width: 768px) {
    .desktop-nav   { display: none !important; }
    .hero-grid     { flex-direction: column !important; }
    .two-col       { grid-template-columns: 1fr !important; gap: 40px !important; }
    .three-col     { grid-template-columns: 1fr !important; }
    .projects-grid { grid-template-columns: 1fr !important; }
    .featured-span { grid-column: span 1 !important; }
    .timeline-item { grid-template-columns: 1fr !important; gap: 6px !important; }
    .hero-stats    { flex-wrap: wrap; gap: 24px !important; }
    .contact-inner { padding: 48px 28px !important; }
    .section-pad   { padding-left: 24px !important; padding-right: 24px !important; }
  }
`;

/* ─── Tiny reusable atoms ────────────────────────────────────── */
const Label = ({ children }) => (
  <p style={{
    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500,
    color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12,
    display: 'flex', alignItems: 'center', gap: '8px'
  }}>
    <span style={{ width: '20px', height: '1px', background: T.accent, display: 'inline-block' }}></span>
    {children}
  </p>
);

const SectionTitle = ({ children, style = {} }) => (
  <h2 style={{
    fontFamily: "'Chakra Petch', sans-serif", fontSize: 36, fontWeight: 700,
    color: T.text, letterSpacing: "-0.02em", ...style,
  }}>{children}</h2>
);

const Tag = ({ children, dark = false }) => (
  <span style={{
    background: dark ? "rgba(255,255,255,.08)" : T.tagBg,
    color: dark ? "rgba(255,255,255,.6)" : T.accent,
    fontSize: 12, fontWeight: 500, padding: "4px 10px",
    borderRadius: 6, fontFamily: "'JetBrains Mono', monospace",
  }}>{children}</span>
);

/* ─── Nav ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(8,9,10,.85)" : "transparent",
      backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}`,
      padding: "0 48px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="#home" style={{
        fontFamily: "'Chakra Petch', sans-serif", fontWeight: 700,
        fontSize: 18, color: T.text, textDecoration: "none",
      }}>
        Sophiya<span style={{ color: T.accent }}>.</span>
      </a>

      <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["About", "Skills", "Projects", "Experience"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
        ))}
        <a href="#contact" className="nav-cta">Get in Touch</a>
      </div>
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
 const stats = [
  { value: "5+", label: "Years in Software Development" },
  { value: "2+", label: "Years in AI & Data Science" },
  { value: "10+", label: "AI & ML Projects" },
  { value: "6+", label: "AI Agents & LLM Applications" },
];

  return (
    <section id="home" className="section-pad" style={{
      minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "80px 48px",
      maxWidth: 1100, margin: "0 auto",
    }}>
      {/* Status pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: T.greenBg, border: `1px solid ${T.greenBorder}`,
        padding: "6px 14px", borderRadius: 100, fontSize: 13,
        fontWeight: 500, color: T.green, marginBottom: 32, width: "fit-content",
      }}>
        <span className="pulse-dot" />
        Available for new opportunities
      </div>

      <h1 style={{
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 700,
        lineHeight: 1.05, letterSpacing: "-0.03em",
        color: T.text, marginBottom: 24,
      }}>
        Mary Sophiya.<br />
        <span style={{ color: T.accent, textShadow: '0 0 20px rgba(0, 229, 184, 0.4)' }}>AI / ML</span> Developer.
      </h1>

      <p style={{
        fontSize: 18, color: T.muted, maxWidth: 560,
        lineHeight: 1.7, marginBottom: 40,
      }}>
        I build machine learning systems that turn complex data into reliable
        decisions. Specializing in production-grade models, deep learning
        architectures, and MLOps pipelines.
      </p>

      <div style={{ display: "flex", gap: 16, marginBottom: 64 }}>
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#contact"  className="btn-secondary">Contact Me</a>
      </div>

      {/* Stats row */}
      <div className="hero-stats" style={{
        display: "flex", gap: 48, paddingTop: 40,
        borderTop: `1px solid ${T.border}`,
      }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{
              fontFamily: "'Chakra Petch', sans-serif", fontSize: 36,
              fontWeight: 700, color: T.text, lineHeight: 1, marginBottom: 4,
            }}>{s.value}</div>
            <div style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function About() {
  const details = [
    { icon: <MapPin size={15} />,         label: "Location",          value: "Dubai, UAE"                        },
    { icon: <GraduationCap size={15} />,  label: "Education",         value: "Computer Science and Engineering BTech | Governemnt Engineering College, Palakkad" },
    { icon: <Briefcase size={15} />,      label: "Currently",         value: "AI/ML Engineer"       },
   {
  icon: <FlaskConical size={15} />,
  label: "Research Interests",
  value: "Agentic AI, Large Language Models (LLMs), RAG, Multi-Agent Systems, MLOps"
},
    { icon: <Mail size={15} />,           label: "Email",             value: "mrsophiya@gmail.com"                        },
  ];

  return (
    <div id="about" style={{
      background: T.bgAlt,
      borderTop: `1px solid ${T.border}`,
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div className="section-pad" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
        <Label>About</Label>
        <SectionTitle>Engineer. Researcher. Builder.</SectionTitle>

        <div className="two-col" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 80, marginTop: 40,
        }}>
          {/* Bio */}
         
      <div
  style={{
    fontSize: 16,
    color: T.muted,
    lineHeight: 1.9,
    textAlign: "justify",
    maxWidth: "800px",
    margin: "0 auto",
  }}
>
  <p style={{ marginBottom: 20 }}>
    I'm an <strong style={{ color: T.text, fontWeight: 600 }}>AI/ML Engineer</strong> with
    <strong style={{ color: T.text, fontWeight: 600 }}> 5 years of software development experience</strong>
    and <strong style={{ color: T.text, fontWeight: 600 }}>2 years of hands-on expertise in Artificial Intelligence, Machine Learning, and Data Science</strong>.
    I specialize in designing and building end-to-end AI-powered applications, from data processing and model development to deploying scalable, production-ready intelligent systems.
  </p>

  <p>
    My expertise includes
    <strong style={{ color: T.text, fontWeight: 600 }}>
      {" "}Machine Learning, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG),
      Agentic AI, Multi-Agent Systems, NLP, Recommendation Systems, and MLOps
    </strong>.
    I have experience developing AI agents, workflow automation solutions, intelligent APIs,
    ETL pipelines, and cloud-native applications using technologies such as Python, FastAPI,
    LangChain, LangGraph, Docker, Kubernetes, Airflow, and modern cloud platforms.
  </p>
</div>

          {/* Detail cards */}
        
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  {details.map((d) => (
    <div
      key={d.label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          background: T.bgCard,
          border: `1px solid ${T.border}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: T.accent,
        }}
      >
        {d.icon}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 1fr",
          alignItems: "center",
          width: "100%",
          columnGap: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: T.muted,
            fontWeight: 500,
          }}
        >
          {d.label}
        </div>

        <div
          style={{
            fontSize: 14,
            color: T.text,
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          {d.value}
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Skills ─────────────────────────────────────────────────── */
function Skills() {
  // const groups = [
  //   { icon: <Cpu size={19} />,          title: "Machine Learning",  tags: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "JAX", "Keras"]         },
  //   { icon: <MessageSquare size={19} />,title: "NLP & LLMs",        tags: ["Transformers", "HuggingFace", "LangChain", "LoRA / QLoRA", "RLHF", "RAG"]  },
  //   { icon: <Eye size={19} />,          title: "Computer Vision",   tags: ["OpenCV", "YOLO", "ResNet", "ViT", "SAM", "Diffusion"]                      },
  //   { icon: <Settings2 size={19} />,    title: "MLOps & Infra",     tags: ["MLflow", "Kubeflow", "Docker", "Kubernetes", "Airflow", "DVC"]              },
  //   { icon: <Database size={19} />,     title: "Data & Cloud",      tags: ["AWS SageMaker", "GCP Vertex", "Spark", "BigQuery", "Snowflake", "dbt"]      },
  //   { icon: <Code2 size={19} />,        title: "Languages",         tags: ["Python", "SQL", "Rust", "C++", "Bash", "Linux"]                            },
  // ];
  const groups = [
  {
    icon: <Cpu size={19} />,
    title: "Machine Learning & AI",
    tags: [
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Regression",
      "Classification",
      "Clustering",
      "Time Series",
      "NLP"
    ]
  },
  {
    icon: <MessageSquare size={19} />,
    title: "LLMs & Agentic AI",
    tags: [
      "LangChain",
      "LangGraph",
      "MCP",
      "RAG",
      "AI Agents",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "Hugging Face"
    ]
  },
  {
    icon: <Settings2 size={19} />,
    title: "Backend & MLOps",
    tags: [
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Apache Airflow",
      "CI/CD",
      "REST APIs",
      "Microservices",
      "ML Pipelines"
    ]
  },
  {
    icon: <Database size={19} />,
    title: "Data Engineering & Cloud",
    tags: [
      "Python",
      "SQL",
      "PySpark",
      "ETL Pipelines",
      "Azure",
      "AWS",
      "GCP",
      "MySQL"
    ]
  },
  {
    icon: <BarChart3 size={19} />,
    title: "Data Visualization",
    tags: [
      "Power BI",
      "Power BI Service",
      "Tableau",
      "DAX",
      "Matplotlib",
      "Plotly"
    ]
  },
  {
    icon: <Code2 size={19} />,
    title: "Programming & Tools",
    tags: [
      "Python",
      "SQL",
      "Git",
      "GitHub",
      "Linux",
      "VS Code",
      "Jupyter",
      "Postman"
    ]
  }
];

  return (
    <section id="skills" className="section-pad" style={{
      padding: "96px 48px", maxWidth: 1100, margin: "0 auto",
    }}>
      <Label>Technical Skills</Label>
      <SectionTitle>What I Work With</SectionTitle>

      <div className="three-col" style={{
        display: "grid", gridTemplateColumns: "repeat(3,1fr)",
        gap: 24, marginTop: 48,
      }}>
        {groups.map(g => (
          <div key={g.title} className="skill-card">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, background: T.bgAlt,
                border: `1px solid ${T.border}`, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.accent,
              }}>{g.icon}</div>
              <h3 style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: 15, fontWeight: 600, color: T.text,
              }}>{g.title}</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Projects ───────────────────────────────────────────────── */
function Projects() {
  const secondary = [
  {
    num: "02",
    title: "Alma – Multi-Agent Lifestyle Assistant",
    desc: "AI-powered multi-agent lifestyle assistant that coordinates specialized agents for nutrition, exercise, mental health, journaling, and habit tracking using LangGraph and LLM-based reasoning.",
    stack: ["Python", "FastAPI", "LangGraph", "Groq LLM"],
    image: "/screenshots/alma.png",
    link: "https://github.com/sophiyageorge/Alma-An-AI-powered-multi-agent-life-guardian-system",
  },
  {
    num: "03",
    title: "Reliance Stock Market Analysis & Automated Data Pipeline",
    desc: "End-to-end ETL pipeline that automates stock data ingestion, transformation, storage, and Power BI visualization using Airflow on Azure with Azure MySQL.",
    stack: ["Python", "Airflow", "Azure", "Power BI"],
    image: "/screenshots/powerbi.png",
    link: "https://github.com/sophiyageorge/Reliance-Stock-Analysis-Pipeline",
  },
  {
    num: "04",
    title: "KuttiZBot – Legal Education Chatbot",
    desc: "RAG-powered conversational AI that educates children about legal rights and safety using semantic document retrieval and an offline LLM pipeline.",
    stack: ["Streamlit", "LangChain", "FAISS", "LlamaCpp"],
    image: "/screenshots/kuttizbot.png",
    link: "https://github.com/sophiyageorge/KuttizBot---AI-Chatbot-for-Children-s-Law-Awareness",
  },
  {
    num: "05",
    title: "Stock Market Analysis & RAG Chat Assistant",
    desc: "Interactive Streamlit application combining real-time Yahoo Finance data with Retrieval-Augmented Generation for contextual financial insights and conversational analytics.",
    stack: ["Python", "Streamlit", "FAISS", "Groq API"],
    image: "/screenshots/stockwise.png",
    link: "https://github.com/sophiyageorge/stockwise",
  },
  {
    num: "06",
    title: "Agentic AI Workflow System",
    desc: "MCP-based multi-tool AI orchestration platform that classifies user intent and dynamically routes requests to specialized AI services using FastAPI and asynchronous workflows.",
    stack: ["Python", "FastAPI", "MCP", "Machine Learning"],
    image: "/screenshots/agentic_ai.png",
    link: "https://github.com/sophiyageorge/agenticai",
  },
];

  return (
    <div id="projects" style={{ background: T.bgAlt, borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", marginBottom: 56,
        }}>
          <div>
            <Label>Projects</Label>
            <SectionTitle>Selected Work</SectionTitle>
          </div>
          <a href="#projects" className="project-link">
  All Projects <ArrowRight size={13} />
</a>
        </div>

        {/* ── Featured Card ── */}
        <div style={{
          borderRadius: 16,
          overflow: "hidden",
          background: T.bgDark,
          border: `1px solid rgba(0, 229, 184, 0.15)`,
          marginBottom: 24,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}>

          {/* Left: Info */}
          <div style={{
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: T.cyanLight,
                marginBottom: 20,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}>
                01 / Featured
              </p>

              <h3 style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 14,
                lineHeight: 1.3,
              }}>
                Alma – Multi-Agent Lifestyle Assistant
              </h3>

              <p style={{
                fontSize: 14,
                color: "rgba(255,255,255,.5)",
                lineHeight: 1.75,
                marginBottom: 32,
              }}>
                AI-powered multi-agent system for personalized life guidance,
                coordinating specialized agents for nutrition, exercise, mental health,
                journaling, and habit tracking using LangGraph and LLM-based reasoning.
              </p>

              {/* Metrics */}
              <div style={{ display: "flex", gap: 28, marginBottom: 32 }}>
                {[
                  { v: "4", l: "AI Agents" },
                  { v: "LangGraph", l: "Orchestration" },
                  { v: "Groq", l: "LLM Backend" },
                ].map(m => (
                  <div key={m.l}>
                    <div style={{
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontSize: 26,
                      fontWeight: 700,
                      color: T.cyanLight,
                      lineHeight: 1,
                    }}>
                      {m.v}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,.3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginTop: 5,
                    }}>
                      {m.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Python", "FastAPI", "LangGraph", "Groq LLM"].map(t => (
                  <Tag key={t} dark>{t}</Tag>
                ))}
              </div>

              <a href="https://alma-an-ai-powered-multi-agent-life.vercel.app/" style={{
                fontSize: 13,
                fontWeight: 600,
                color: T.cyanLight,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}>
                View Project <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Right: Screenshot */}
          <div style={{
            position: "relative",
            background: "rgba(0,0,0,0.3)",
            minHeight: 380,
            overflow: "hidden",
          }}>
            <img
              src="/screenshots/alma.png"
              alt="Alma Multi-Agent System"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top left",
                display: "block",
                opacity: 0.8,
                transition: "opacity 0.3s, transform 0.4s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = "0.8";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />

            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #000000 0%, transparent 50%)",
              pointerEvents: "none",
            }} />

            <div style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(0, 229, 184, 0.3)",
              backdropFilter: "blur(8px)",
              borderRadius: 20,
              padding: "5px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#00E5B8",
                boxShadow: "0 0 8px #00E5B8",
                display: "inline-block",
              }} />
              <span style={{ fontSize: 11, color: "#fff", fontWeight: 500 }}>
                Live
              </span>
            </div>
          </div>
        </div>
        
        {/* ── Smaller Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          {secondary.map(p => (
            <div key={p.num} style={{
              borderRadius: 14,
              overflow: "hidden",
              background: T.bgCard,
              border: `1px solid ${T.border}`,
              display: "flex",
              flexDirection: "column",
              transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = T.accent;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,229,184,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Screenshot Area */}
              <div style={{
                position: "relative",
                height: 200,
                background: "rgba(0,0,0,0.2)",
                overflow: "hidden",
              }}>
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />

                {/* Bottom fade */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: 60,
                  background: `linear-gradient(to top, ${T.bgCard}, transparent)`,
                  pointerEvents: "none",
                }} />

                {/* Number badge */}
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11, color: "rgba(255,255,255,0.6)",
                  background: "rgba(0,0,0,0.65)",
                  backdropFilter: "blur(6px)",
                  padding: "3px 9px", borderRadius: 6,
                }}>
                  {p.num}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <h3 style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 10,
                }}>{p.title}</h3>

                <p style={{
                  fontSize: 13.5, color: T.muted, lineHeight: 1.7,
                  marginBottom: 20, flexGrow: 1,
                }}>{p.desc}</p>

                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 16,
                  borderTop: `1px solid ${T.border}`,
                  flexWrap: "wrap", gap: 10,
                }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.stack.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                  <a href={p.link} className="project-link">
                    View <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Experience ─────────────────────────────────────────────── */
function Experience() {
  const jobs = [
    {
      date: "2024 — 2026", company: "Brototype",
      role: "Professional Training – Data Science",
      desc: "Completed an intensive, industry-oriented Data Science and AI training program covering the full AI lifecycle, from programming fundamentals to advanced AI, Data Engineering, MLOps, LLMs, RAG, Agentic AI, and Cloud technologies.",

      wins: [
        "Built and deployed multiple production-ready AI and data-driven applications using Python, FastAPI, LangChain, Airflow, Azure, FAISS, Streamlit, Power BI, and modern software engineering practices",
        "Received continuous mentorship, technical reviews, and project guidance from industry experts through hands-on projects and real-world case studies",
        "Recognized as Best Performer for two consecutive months for outstanding project execution, technical growth, and consistent performance throughout the program",
      ],
    },
    {
      date: "Nov 2021 — Jan 2023",
      company: "Freelance",
      role: "Freelance Web Developer",
      desc: "Developed responsive web applications from Figma designs, managing the complete software development lifecycle from UI implementation to deployment while collaborating directly with clients.",
      wins: [
        "Delivered custom web applications by translating Figma designs into responsive, production-ready interfaces",
        "Managed end-to-end project execution, strengthening client communication, problem-solving, and project management skills",
      ],
    },
    {
      date: "Feb 2020 — Aug 2020",
      company: "Manappuram Comptech and Consultants Ltd",
      role: "Angular Developer",
      desc: "Contributed to the development and maintenance of enterprise financial web applications using Angular, REST APIs, and Git in an Agile development environment.",
      wins: [
        "Built and enhanced application modules with Angular, improving usability and maintainability",
        "Integrated backend APIs and collaborated with cross-functional teams using Git and Agile practices",
      ],
    },
    {
      date: "Feb 2018 — May 2019",
      company: "Flemming Embedded and Software Solutions",
      role: "Junior Java Developer",
      desc: "Developed full-stack enterprise applications using Java technologies while integrating databases, backend services, and hardware interfaces for real-world business solutions.",
      wins: [
        "Built backend modules using Java, JSP, Spring Boot, MySQL, PostgreSQL, and REST APIs",
        "Implemented secure data handling, real-time hardware-software integration, and scalable application features",
      ],
    },
    {
      date: "Oct 2017 — Jan 2018",
      company: "Flemming Embedded and Software Solutions",
      role: "Java Developer Intern",
      desc: "Completed a Java development internship, gaining hands-on experience in software development, database integration, and enterprise application development while working with experienced engineers.",
      wins: [
        "Developed and tested Java-based application modules using Core Java, JSP, SQL, and object-oriented programming principles",
        "Recognized for high performance, quick learning, and consistently delivering assigned tasks within project deadlines",
      ],
    },
  ];

  return (
    <section id="experience" className="section-pad" style={{
      padding: "96px 48px", maxWidth: 1100, margin: "0 auto",
    }}>
      <Label>Experience</Label>
      <SectionTitle>Work History</SectionTitle>

      <div style={{ marginTop: 48 }}>
        {jobs.map((j, i) => (
          <div key={i} className="timeline-item">
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: T.muted, fontWeight: 500,
              }}>{j.date}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.accent, marginTop: 4 }}>{j.company}</div>
            </div>
            <div>
              <h3 style={{
                fontFamily: "'Chakra Petch', sans-serif",
                fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 8,
              }}>{j.role}</h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7, marginBottom: 12 }}>{j.desc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {j.wins.map((w, k) => (
                  <li key={k} style={{ fontSize: 13, color: T.muted, paddingLeft: 20, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: T.accent, fontWeight: 700 }}>—</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */
function Contact() {
  return (
    <div id="contact" style={{
      background: T.bgAlt,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div className="section-pad" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
        <Label>Contact</Label>
        <SectionTitle>Let's Build Something</SectionTitle>

        <div className="contact-inner" style={{
          background: T.bgDark, borderRadius: 16,
          padding: "72px 64px", textAlign: "center", marginTop: 48,
          border: "1px solid rgba(0, 229, 184, 0.15)"
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: "rgba(0, 229, 184, 0.6)", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 16,
          }}>Currently available</p>

          <h2 style={{
            fontFamily: "'Chakra Petch', sans-serif", fontSize: 44,
            fontWeight: 700, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em",
          }}>Open to opportunities</h2>

          <p style={{
            fontSize: 16, color: "rgba(255,255,255,.48)",
            maxWidth: 420, margin: "0 auto 36px",
          }}>
            Whether it's a full-time role, research collaboration, or
            consulting engagement — let's talk.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:mrsophiy@gmail.com" className="contact-btn-solid">
              <Mail size={15} /> Send Email
            </a>
            <a href="https://github.com/sophiyageorge" className="contact-btn-ghost">
              <FaGithub/>
            </a>
            <a href="https://www.linkedin.com/in/marysophiya/" className="contact-btn-ghost">
              <FaLinkedin/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const links = [
  {
    name: "Resume",
    url: "https://drive.google.com/file/d/1eILJiZJ3Z8BkpToXfpp8x_1q_uYpscHm/view?usp=sharing",
  },
  {
    name: "GitHub",
    url: "https://github.com/sophiyageorge",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/marysophiya/",
  },
];

  return (
    <footer className="section-pad" style={{
      padding: "28px 48px", borderTop: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      maxWidth: 1100, margin: "0 auto", flexWrap: "wrap", gap: 12,
    }}>
      <p style={{ fontSize: 13, color: T.muted }}>© 2026 Mary Sophiya. Built with precision.</p>
      <div style={{ display: "flex", gap: 24 }}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
           {link.name}
         </a>
       ))}
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function Portfolio() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: T.bg, color: T.text }}>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
