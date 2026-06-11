import { useState, useEffect } from "react";
import {
  Mail, ExternalLink, MapPin,
  GraduationCap, Briefcase, FlaskConical, ArrowRight,
  Code2, Eye, MessageSquare, Cpu, Database, Settings2,
} from "lucide-react";
import { FaGithub,FaLinkedin } from "react-icons/fa";

/* ─── Design Tokens ─────────────────────────────────────────── */
const T = {
  bg:           "#FFFFFF",
  bgAlt:        "#F8FAFC",
  bgDark:       "#0F172A",
  text:         "#0F172A",
  muted:        "#64748B",
  accent:       "#0891B2",
  border:       "#E2E8F0",
  tagBg:        "#F1F5F9",
  green:        "#16A34A",
  greenBg:      "#F0FDF4",
  greenBorder:  "#BBF7D0",
  cyanLight:    "#67E8F9",
};

/* ─── Global CSS ─────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .nav-link {
    color: #64748B; text-decoration: none; font-size: 14px;
    font-weight: 500; transition: color .2s;
  }
  .nav-link:hover { color: #0F172A; }

  .nav-cta {
    background: #0F172A; color: #fff; padding: 8px 20px;
    border-radius: 6px; font-size: 14px; font-weight: 500;
    text-decoration: none; transition: background .2s;
  }
  .nav-cta:hover { background: #0891B2; }

  .btn-primary {
    background: #0F172A; color: #fff; padding: 12px 28px;
    border-radius: 8px; font-size: 15px; font-weight: 600;
    text-decoration: none; border: none; cursor: pointer;
    font-family: inherit; transition: background .2s; display: inline-block;
  }
  .btn-primary:hover { background: #0891B2; }

  .btn-secondary {
    background: transparent; color: #0F172A; padding: 12px 28px;
    border-radius: 8px; border: 1.5px solid #E2E8F0; font-size: 15px;
    font-weight: 600; text-decoration: none; cursor: pointer;
    font-family: inherit; transition: border-color .2s; display: inline-block;
  }
  .btn-secondary:hover { border-color: #0F172A; }

  .skill-card {
    background: #fff; border: 1px solid #E2E8F0; border-radius: 12px;
    padding: 28px; transition: box-shadow .2s, border-color .2s;
  }
  .skill-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,.08); border-color: #CBD5E1; }

  .project-card {
    background: #fff; border: 1px solid #E2E8F0; border-radius: 12px;
    padding: 32px; display: flex; flex-direction: column;
    transition: box-shadow .2s, border-color .2s;
  }
  .project-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,.08); border-color: #CBD5E1; }

  .project-link {
    font-size: 13px; font-weight: 600; color: #0891B2;
    text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
  }
  .project-link:hover { text-decoration: underline; }

  .timeline-item {
    display: grid; grid-template-columns: 200px 1fr; gap: 40px;
    padding: 28px 0; border-bottom: 1px solid #E2E8F0; align-items: start;
  }
  .timeline-item:last-child { border-bottom: none; }

  .contact-btn-solid {
    padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600;
    background: #fff; color: #0F172A; font-family: inherit; cursor: pointer;
    border: none; text-decoration: none; display: inline-flex;
    align-items: center; gap: 8px; transition: background .2s, color .2s;
  }
  .contact-btn-solid:hover { background: #0891B2; color: #fff; }

  .contact-btn-ghost {
    padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600;
    background: transparent; color: rgba(255,255,255,.6);
    border: 1.5px solid rgba(255,255,255,.18); font-family: inherit;
    cursor: pointer; text-decoration: none; display: inline-flex;
    align-items: center; gap: 8px; transition: border-color .2s, color .2s;
  }
  .contact-btn-ghost:hover { border-color: rgba(255,255,255,.5); color: #fff; }

  .footer-link {
    font-size: 13px; color: #64748B; text-decoration: none; transition: color .2s;
  }
  .footer-link:hover { color: #0F172A; }

  .pulse-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #16A34A; animation: pulse 2s infinite;
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
  }}>{children}</p>
);

const SectionTitle = ({ children, style = {} }) => (
  <h2 style={{
    fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700,
    color: T.text, letterSpacing: "-0.02em", ...style,
  }}>{children}</h2>
);

const Tag = ({ children, dark = false }) => (
  <span style={{
    background: dark ? "rgba(255,255,255,.08)" : T.tagBg,
    color: dark ? "rgba(255,255,255,.5)" : T.text,
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
      background: scrolled ? "rgba(255,255,255,.96)" : "#fff",
      backdropFilter: "blur(8px)", borderBottom: `1px solid ${T.border}`,
      padding: "0 48px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="#home" style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 18, color: T.text, textDecoration: "none",
      }}>
        Alex<span style={{ color: T.accent }}>.</span>
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
    { value: "5+",    label: "Years Experience"     },
    { value: "30+",   label: "ML Projects Deployed" },
    { value: "12",    label: "Publications"          },
    { value: "98.4%", label: "Best Model Accuracy"  },
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
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 700,
        lineHeight: 1.05, letterSpacing: "-0.03em",
        color: T.text, marginBottom: 24,
      }}>
        Alex Chen.<br />
        <span style={{ color: T.accent }}>AI / ML</span> Developer.
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
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 36,
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
    { icon: <MapPin size={15} />,         label: "Location",          value: "San Francisco, CA"                        },
    { icon: <GraduationCap size={15} />,  label: "Education",         value: "M.S. Computer Science, Stanford"          },
    { icon: <Briefcase size={15} />,      label: "Currently",         value: "Senior ML Engineer at TechCorp"           },
    { icon: <FlaskConical size={15} />,   label: "Research Interests",value: "Efficient fine-tuning, multimodal, RLHF"  },
    { icon: <Mail size={15} />,           label: "Email",             value: "alex@alexchen.dev"                        },
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
          <div style={{ fontSize: 16, color: T.muted, lineHeight: 1.8 }}>
            <p>
              I'm a <strong style={{ color: T.text, fontWeight: 600 }}>Machine Learning
              Engineer</strong> with a background in computer science and applied
              mathematics. I specialise in building end-to-end ML systems — from data
              ingestion and feature engineering to model training, evaluation, and
              production deployment.
            </p>
            <p style={{ marginTop: 16 }}>
              My core focus areas include{" "}
              <strong style={{ color: T.text, fontWeight: 600 }}>NLP, computer vision,
              and recommendation systems</strong>. I've shipped models processing
              millions of data points daily for enterprise clients, with a relentless
              focus on explainability, performance, and scalability.
            </p>
            <p style={{ marginTop: 16 }}>
              When not building models, I contribute to open-source ML tooling and
              write technical deep-dives on efficient fine-tuning, distributed
              training, and inference optimisation.
            </p>
          </div>

          {/* Detail cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {details.map(d => (
              <div key={d.label} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{
                  width: 36, height: 36, background: "#fff",
                  border: `1px solid ${T.border}`, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, color: T.accent,
                }}>{d.icon}</div>
                <div>
                  <div style={{ fontSize: 12, color: T.muted, fontWeight: 500, marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{d.value}</div>
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
  const groups = [
    { icon: <Cpu size={19} />,          title: "Machine Learning",  tags: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "JAX", "Keras"]         },
    { icon: <MessageSquare size={19} />,title: "NLP & LLMs",        tags: ["Transformers", "HuggingFace", "LangChain", "LoRA / QLoRA", "RLHF", "RAG"]  },
    { icon: <Eye size={19} />,          title: "Computer Vision",   tags: ["OpenCV", "YOLO", "ResNet", "ViT", "SAM", "Diffusion"]                      },
    { icon: <Settings2 size={19} />,    title: "MLOps & Infra",     tags: ["MLflow", "Kubeflow", "Docker", "Kubernetes", "Airflow", "DVC"]              },
    { icon: <Database size={19} />,     title: "Data & Cloud",      tags: ["AWS SageMaker", "GCP Vertex", "Spark", "BigQuery", "Snowflake", "dbt"]      },
    { icon: <Code2 size={19} />,        title: "Languages",         tags: ["Python", "SQL", "Rust", "C++", "Bash", "Linux"]                            },
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
                fontFamily: "'Space Grotesk', sans-serif",
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
      num: "02", title: "Document Intelligence Platform",
      desc: "End-to-end RAG system for enterprise document Q&A, combining a fine-tuned LLM with dense retrieval over 500 K+ internal documents.",
      stack: ["LangChain", "FAISS", "LLaMA"],
    },
    {
      num: "03", title: "Medical Image Segmentation",
      desc: "ViT-based segmentation model on chest X-rays for automated anomaly detection, achieving radiologist-level accuracy in clinical trials.",
      stack: ["PyTorch", "ViT", "DICOM"],
    },
  ];

  return (
    <div id="projects" style={{
      background: T.bgAlt,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div className="section-pad" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", marginBottom: 48,
        }}>
          <div>
            <Label>Projects</Label>
            <SectionTitle>Selected Work</SectionTitle>
          </div>
          <a href="#" className="project-link">
            All Projects <ArrowRight size={13} />
          </a>
        </div>

        <div className="projects-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24,
        }}>
          {/* ── Featured card ── */}
          <div className="featured-span" style={{
            gridColumn: "span 2", background: T.bgDark,
            borderRadius: 12, padding: 40,
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: "rgba(255,255,255,.28)", marginBottom: 18,
            }}>01 / Featured</p>

            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 28,
              fontWeight: 700, color: "#fff", marginBottom: 12,
            }}>Real-Time Fraud Detection Engine</h3>

            <p style={{
              fontSize: 15, color: "rgba(255,255,255,.55)",
              lineHeight: 1.7, maxWidth: 600, marginBottom: 32,
            }}>
              Production-grade ML pipeline processing 2 M+ transactions per hour for
              a fintech platform. Built an ensemble of gradient boosting and neural
              models with sub-10 ms inference latency, integrated directly into the
              payments API.
            </p>

            {/* Metrics */}
            <div style={{ display: "flex", gap: 36, marginBottom: 28 }}>
              {[{ v: "99.1%", l: "Precision" }, { v: "2 M+", l: "TXN / Hour" }, { v: "8 ms", l: "P99 Latency" }].map(m => (
                <div key={m.l}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 28,
                    fontWeight: 700, color: T.cyanLight, lineHeight: 1,
                  }}>{m.v}</div>
                  <div style={{
                    fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 500,
                    textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 5,
                  }}>{m.l}</div>
                </div>
              ))}
            </div>

            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.1)", flexWrap: "wrap", gap: 12,
            }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["PyTorch", "XGBoost", "Kafka", "Redis", "FastAPI"].map(t => <Tag key={t} dark>{t}</Tag>)}
              </div>
              <a href="#" style={{
                fontSize: 13, fontWeight: 600, color: T.cyanLight,
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                View Case Study <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* ── Smaller cards ── */}
          {secondary.map(p => (
            <div key={p.num} className="project-card">
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: T.muted, marginBottom: 14,
              }}>{p.num}</p>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 19, fontWeight: 700, color: T.text, marginBottom: 10,
              }}>{p.title}</h3>
              <p style={{
                fontSize: 14, color: T.muted, lineHeight: 1.7,
                marginBottom: 20, flexGrow: 1,
              }}>{p.desc}</p>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                paddingTop: 20, borderTop: `1px solid ${T.border}`, marginTop: "auto", flexWrap: "wrap", gap: 10,
              }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.stack.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                <a href="#" className="project-link">View <ArrowRight size={13} /></a>
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
      date: "2022 — Present", company: "TechCorp AI",
      role: "Senior Machine Learning Engineer",
      desc: "Led the ML platform team, building the core infrastructure that powers all production models across the company.",
      wins: [
        "Reduced model deployment time from 2 weeks to 4 hours with a self-serve MLOps platform",
        "Trained and shipped a 7 B-parameter LLM fine-tuned on proprietary data using QLoRA",
        "Improved recommendation CTR by 18% through a new two-tower retrieval architecture",
      ],
    },
    {
      date: "2020 — 2022", company: "DataMind Labs",
      role: "Machine Learning Engineer",
      desc: "Developed ML models for customer churn prediction and demand forecasting at scale.",
      wins: [
        "Built a real-time churn prediction system processing 500 K users daily — reduced churn by 12%",
        "Automated feature engineering pipelines with Spark, cutting data prep time by 60%",
      ],
    },
    {
      date: "2019 — 2020", company: "Stanford AI Lab",
      role: "Research Assistant",
      desc: "Research on efficient transformer architectures under Prof. Manning. Co-authored 3 papers on model compression and knowledge distillation.",
      wins: [
        "Proposed a novel pruning strategy reducing BERT size by 40% with < 2% accuracy loss",
        "Published at NeurIPS 2020 and ACL 2021",
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
                fontFamily: "'Space Grotesk', sans-serif",
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
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            color: "rgba(255,255,255,.28)", letterSpacing: "0.12em",
            textTransform: "uppercase", marginBottom: 16,
          }}>Currently available</p>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 44,
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
            <a href="mailto:alex@alexchen.dev" className="contact-btn-solid">
              <Mail size={15} /> Send Email
            </a>
            <a href="#" className="contact-btn-ghost">
              <FaGithub/>
            </a>
            <a href="#" className="contact-btn-ghost">
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
  return (
    <footer className="section-pad" style={{
      padding: "28px 48px", borderTop: `1px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      maxWidth: 1100, margin: "0 auto", flexWrap: "wrap", gap: 12,
    }}>
      <p style={{ fontSize: 13, color: T.muted }}>© 2025 Alex Chen. Built with precision.</p>
      <div style={{ display: "flex", gap: 24 }}>
        {["Resume", "GitHub", "LinkedIn", "Twitter"].map(l => (
          <a key={l} href="#" className="footer-link">{l}</a>
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