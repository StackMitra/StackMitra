import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Search,
  Send,
} from "lucide-react";
import { projects } from "./data/projects";
import { services } from "./data/services";

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};
function InstagramMark({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Logo({ symbol = false }) {
  return (
    <Link
      to="/"
      className={`logo${symbol ? " logo--symbol" : ""}`}
      aria-label="StackMitra home"
    >
      <img
        src={
          symbol
            ? "/images/stackmitra-symbol.png"
            : "/images/stackmitra-logo.png"
        }
        alt={
          symbol
            ? "StackMitra circular symbol"
            : "StackMitra — Projects Made Simple"
        }
      />
      {symbol && (
        <span className="logo-wordmark">
          <span>Stack</span>
          <span>Mitra</span>
        </span>
      )}
    </Link>
  );
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Projects", "/projects"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <motion.header
        className={`nav${scrolled ? " nav--scrolled" : ""}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="nav-inner">
          <Logo symbol />
          <nav className="desktop-nav">
            {links.map(([n, p]) => (
              <NavLink key={p} to={p} end={p === "/"}>
                {({ isActive }) => (
                  <>
                    {n}
                    {isActive && (
                      <motion.span
                        className="nav-active-line"
                        layoutId="nav-active-line"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-cta" to="/contact">
            Start a Project <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {links.map(([n, p]) => (
              <Link key={p} to={p} onClick={() => setOpen(false)}>
                {n}
                <ArrowRight size={16} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Student-focused technology for practical ideas, useful applications,
            and simpler project delivery.
          </p>
        </div>
        <div className="footer-links">
          <b>Explore</b>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-links">
          <b>Start here</b>
          <Link to="/contact">Discuss an idea</Link>
          <Link to="/projects">Browse projects</Link>
          <a
            className="social-link"
            href="https://www.instagram.com/stackmitra/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramMark size={16} /> <span>@stackmitra</span>
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} StackMitra</span>
        <span>PROJECTS MADE SIMPLE</span>
      </div>
    </footer>
  );
}
function PageHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className={`page-heading ${dark ? "page-heading--dark" : ""}`}>
      <div className="container">
        <span>{eyebrow}</span>
        <motion.h1 {...reveal}>{title}</motion.h1>
        {description && <motion.p {...reveal}>{description}</motion.p>}
      </div>
    </div>
  );
}
function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25 }}
    >
      <div className="visual-shape" />
      <motion.div
        className="hero-grid-accent"
        aria-hidden="true"
        animate={reduce ? {} : { y: [0, -5, 0], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-window"
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="window-bar">
          <i />
          <i />
          <i />
          <span>Project workspace</span>
        </div>
        <div className="mock-shell">
          <aside>
            <b>S</b>
            <span />
            <span />
            <span />
          </aside>
          <div className="mock-main">
            <div className="mock-title">
              <div>
                <small>Project overview</small>
                <b>Build dashboard</b>
              </div>
              <em>72%</em>
            </div>
            <div className="mock-metrics">
              <div>
                <small>Progress</small>
                <b>68%</b>
                <i>
                  <span />
                </i>
              </div>
              <div>
                <small>Tasks</small>
                <b>18</b>
                <i>
                  <span />
                </i>
              </div>
            </div>
            <div className="mock-list">
              {["Interface design", "Core workflow", "Final review"].map(
                (x, i) => (
                  <motion.div
                    key={x}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.38, delay: 0.55 + i * 0.12 }}
                  >
                    <Check size={12} />
                    <span>{x}</span>
                    <small>{["Complete", "In progress", "Next"][i]}</small>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="float-tag float-tag--one"
        initial={{ opacity: 0, x: -14 }}
        animate={reduce ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: [0, 7, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ✓ <span>Idea refined</span>
      </motion.div>
      <motion.div
        className="float-tag float-tag--two"
        initial={{ opacity: 0, x: 14 }}
        animate={reduce ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
      >
        <b>&lt;/&gt;</b>
        <span>Ready to build</span>
      </motion.div>
    </motion.div>
  );
}
function Home() {
  return (
    <>
      <section className="home-hero">
        <motion.div
          className="hero-light hero-light--one"
          aria-hidden="true"
          animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-light hero-light--two"
          aria-hidden="true"
          animate={{ x: [0, -14, 0], y: [0, 12, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="hero-ribbon" aria-hidden="true" />
        <div className="container hero-layout">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="eyebrow">YOUR IDEAS, OUR NEXT PROJECT</span>
            <h1>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                Your Ideas.
              </motion.span>
              <br />
              <motion.em
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28 }}
              >
                Built Into Reality.
              </motion.em>
            </h1>
            <p>
              From practical student projects to custom digital applications,
              StackMitra helps turn ideas into useful software experiences.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" to="/projects">
                Explore Projects <ArrowRight size={18} />
              </Link>
              <Link className="button button--ghost" to="/services">
                Our Services <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
          <HeroVisual />
        </div>
      </section>
      <section className="intro section">
        <div className="container intro-grid">
          <motion.div {...reveal}>
            <span className="section-label">A PRACTICAL PARTNER</span>
            <h2>Technology should make ideas possible.</h2>
          </motion.div>
          <motion.div {...reveal}>
            <p>
              StackMitra helps students, project teams, and customers turn
              project ideas into practical applications through development,
              customization, and technical assistance.
            </p>
            <Link className="inline-link" to="/about">
              More about StackMitra <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
      <section className="section selected">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">SELECTED PROJECTS</span>
              <h2>Built around real needs.</h2>
            </div>
            <Link className="inline-link" to="/projects">
              View all projects <ArrowRight size={16} />
            </Link>
          </div>
          <ProjectGrid items={projects.slice(0, 3)} preview />
        </div>
      </section>
      <section className="section services-preview">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">WHAT WE DO</span>
              <h2>From first idea to working application.</h2>
            </div>
            <Link className="inline-link" to="/services">
              Explore services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="service-preview-grid">
            {services.slice(0, 3).map((s, i) => (
              <motion.article key={s.slug} {...reveal}>
                <span>0{i + 1}</span>
                <ArrowRight />
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <section className="section process">
        <div className="container">
          <span className="section-label">HOW IT WORKS</span>
          <h2>Simple from start to finish.</h2>
          <div className="process-grid">
            {[
              ["01", "Choose a Project", "Find a concept that fits your goal."],
              [
                "02",
                "Discuss Requirements",
                "Share your features, scope, and expectations.",
              ],
              [
                "03",
                "Customize Features",
                "Shape the solution around your practical needs.",
              ],
              [
                "04",
                "Receive Your Project",
                "Move forward with the agreed application and guidance.",
              ],
            ].map((x, i) => (
              <motion.div className="process-card" key={x[0]} {...reveal}>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="final-cta">
        <div className="container">
          <div>
            <span>READY WHEN YOU ARE</span>
            <h2>Have a Project Idea in Mind?</h2>
            <p>
              Let's discuss your requirements and find the right solution for
              your project.
            </p>
          </div>
          <div className="final-cta-actions">
            <Link className="button button--light" to="/contact">
              Start a Project <ArrowUpRight size={18} />
            </Link>
            <a
              className="final-cta-social"
              href="https://www.instagram.com/stackmitra/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramMark size={16} /> Follow @stackmitra
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
function ProjectPreview({ project }) {
  return (
    <div className={`project-preview project-preview--${project.accent}`}>
      <div className="project-ui">
        <div className="project-ui-head">
          <b>{project.title}</b>
          <span>Overview</span>
        </div>
        {project.slug === "roomsync" ? (
          <>
            <div className="balance">
              <small>Shared balance</small>
              <strong>₹1,840</strong>
            </div>
            <div className="ui-list">
              <span />
              <div>
                <b>Groceries</b>
                <small>Shared expense</small>
              </div>
              <strong>₹640</strong>
            </div>
            <div className="ui-list">
              <span />
              <div>
                <b>Electricity</b>
                <small>Monthly bill</small>
              </div>
              <strong>₹1,200</strong>
            </div>
          </>
        ) : (
          <>
            <div className="preview-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="preview-lines">
              <span />
              <span />
              <span />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function ProjectCard({ project, preview = false, index = 0 }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ y: -7, transition: { duration: 0.22 } }}
      whileTap={{ scale: 0.99 }}
    >
      <ProjectPreview project={project} />
      <div className="project-card-body">
        <span>{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul>
          {project.features.slice(0, 3).map((f) => (
            <li key={f}>
              <Check size={13} />
              {f}
            </li>
          ))}
        </ul>
        <div className="card-actions">
          <Link className="inline-link" to={`/projects/${project.slug}`}>
            View Details <ArrowRight size={15} />
          </Link>
          <Link
            className="request-link"
            to="/contact"
            state={{ project: project.title }}
          >
            Request
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
function ProjectGrid({ items, preview = false }) {
  return (
    <div className="project-grid">
      {items.map((p, index) => (
        <ProjectCard key={p.slug} project={p} preview={preview} index={index} />
      ))}
    </div>
  );
}
function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered = projects.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      `${p.title} ${p.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="PROJECT CATALOGUE"
        title="Explore Our Projects"
        description="Discover practical project ideas designed to solve real problems. Find a project that matches your interests and customize it to your requirements."
      />
      <section className="section">
        <div className="container">
          <div className="project-tools">
            <label>
              <Search size={17} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects"
                aria-label="Search projects"
              />
            </label>
            <div className="filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={category === c ? "active" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {filtered.length ? (
            <motion.div layout>
              <ProjectGrid items={filtered} />
            </motion.div>
          ) : (
            <div className="empty-state">
              <Search />
              <h2>No matching projects</h2>
              <p>Try another search or category.</p>
              <button
                className="button button--primary"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project)
    return (
      <NotFound
        title="Project not found"
        message="This project may have moved or may not be available."
      />
    );
  return (
    <>
      <PageHeading
        eyebrow={project.category}
        title={project.title}
        description={project.description}
      />
      <section className="section detail-section">
        <div className="container detail-grid">
          <ProjectPreview project={project} />
          <motion.div className="detail-copy" {...reveal}>
            <span className="section-label">PROPOSED SOLUTION</span>
            <h2>{project.solution}</h2>
            {!project.fromCatalogue && (
              <div className="detail-blocks">
                <article>
                  <span>Problem</span>
                  <p>{project.problem}</p>
                </article>
                <article>
                  <span>Intended audience</span>
                  <p>{project.audience}</p>
                </article>
              </div>
            )}
            <Link
              className="button button--primary"
              to="/contact"
              state={{ project: project.title }}
            >
              Request This Project <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>
      <section className="section detail-features">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">APPLICATION OVERVIEW</span>
              <h2>
                {project.fromCatalogue
                  ? "Scope described in the catalogue."
                  : "Key features and possibilities."}
              </h2>
            </div>
          </div>
          <div className="feature-grid">
            {project.features.map((f, i) => (
              <motion.article key={f} {...reveal}>
                <span>0{i + 1}</span>
                <h3>{f}</h3>
              </motion.article>
            ))}
          </div>
          <div className="customization">
            <div>
              <span>MAKE IT YOURS</span>
              <h3>Customize the scope.</h3>
            </div>
            <p>
              Features, interface details, and workflows can be discussed and
              adapted to your requirements before development begins.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-label">RELATED PROJECTS</span>
              <h2>More possibilities.</h2>
            </div>
          </div>
          <ProjectGrid
            items={projects.filter((p) => p.slug !== project.slug).slice(0, 3)}
          />
        </div>
      </section>
    </>
  );
}
function Services() {
  return (
    <>
      <PageHeading
        eyebrow="OUR SERVICES"
        title="The Right Support for Your Next Project"
        description="Whether you are starting with an idea or improving an existing application, we can help you move forward."
      />
      <section className="section">
        <div className="container service-grid">
          {services.map((s, i) => (
            <motion.article
              className="service-card"
              key={s.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -7, transition: { duration: 0.22 } }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="service-card-icon">
                <ArrowRight />
              </div>
              <span>0{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.description}</p>
              <div className="benefit">{s.benefit}</div>
              <Link
                className="inline-link"
                to="/contact"
                state={{ service: s.title }}
              >
                Discuss This Service <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
function About() {
  return (
    <>
      <PageHeading
        eyebrow="ABOUT STACKMITRA"
        title="Projects Made Simple."
        description="A student-focused technology partner built around practical ideas, clear communication, and useful software."
      />
      <section className="section">
        <div className="container about-grid">
          <motion.div {...reveal}>
            <span className="section-label">WHO WE ARE</span>
            <h2>Approachable technology for real project needs.</h2>
          </motion.div>
          <motion.div className="about-text" {...reveal}>
            <p>
              StackMitra is a student-focused technology startup created by
              three friends with an interest in turning practical ideas into
              useful applications.
            </p>
            <p>
              We help students, project teams, and customers move forward
              through development, customization, debugging, and technical
              assistance.
            </p>
            <p>
              Our approach is simple: understand the requirements, define a
              sensible scope, communicate clearly, and build something that can
              be demonstrated and improved.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="about-values">
        <div className="container">
          <motion.div
            className="brand-ribbon"
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0.8 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              animate={{ x: [0, 18, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.i
              animate={{ x: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
        <div className="container">
          <div className="value-grid">
            {[
              [
                "01",
                "Practical",
                "Useful solutions focused on customer needs.",
              ],
              [
                "02",
                "Understandable",
                "Clear scope, communication, and application choices.",
              ],
              [
                "03",
                "Collaborative",
                "Requirements and progress discussed throughout the project.",
              ],
            ].map((v) => (
              <motion.article key={v[0]} {...reveal}>
                <span>{v[0]}</span>
                <h3>{v[1]}</h3>
                <p>{v[2]}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
function Contact() {
  const location = useLocation();
  const state = location.state || {};
  const [form, setForm] = useState({
    name: "",
    email: "",
    selection: state.project || state.service || "",
    description: "",
    budget: "",
    deadline: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const submitting = useRef(false);
  const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
    setStatus((current) => current === "loading" ? current : "idle");
  };
  const submit = async (e) => {
    e.preventDefault();
    if (submitting.current || status === "loading") return;
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      er.email = "Enter a valid email address.";
    if (!form.selection) er.selection = "Choose a project or service.";
    if (!form.description.trim())
      er.description = "Tell us briefly about your project.";
    if (Object.keys(er).length) {
      setErrors(er);
      return;
    }
    if (!contactEndpoint) {
      setStatus("unconfigured");
      return;
    }
    submitting.current = true;
    setStatus("loading");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Contact endpoint returned an error.");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  };
  return (
    <>
      <PageHeading
        eyebrow="PROJECT ENQUIRY"
        title="Let's Build Something Useful."
        description="Tell us what you have in mind. Share your project idea, required features, or the support you need."
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <motion.div className="contact-intro" {...reveal}>
            <span className="section-label">START A CONVERSATION</span>
            <h2>
              Share the idea.
              <br />
              We'll discuss the next step.
            </h2>
            <p>
              Use the form to give us enough context to understand your
              requirements.
            </p>
            <div className="contact-promise">
              <Check />
              <span>
                <b>Clear project discussion</b>
                <small>Requirements, scope, and a practical approach.</small>
              </span>
            </div>
            <motion.div className="social-connect" {...reveal}>
              <span className="section-label">LET'S CONNECT ON INSTAGRAM</span>
              <p>Follow @stackmitra for project ideas, updates, and more.</p>
              <a
                className="social-follow"
                href="https://www.instagram.com/stackmitra/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramMark size={17} /> Follow @stackmitra <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </motion.div>
          <motion.form
            className="contact-form"
            onSubmit={submit}
            noValidate
            {...reveal}
          >
            <div className="form-row">
              <label>
                Name <span>*</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <small>{errors.name}</small>}
              </label>
              <label>
                Email address <span>*</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <small>{errors.email}</small>}
              </label>
            </div>
            <label>
              Project or service selection <span>*</span>
              <div className="select-wrap">
                <select
                  name="selection"
                  value={form.selection}
                  onChange={update}
                  required
                  aria-invalid={Boolean(errors.selection)}
                >
                  <option value="">Choose an option</option>
                  <optgroup label="Projects">
                    {projects.map((p) => (
                      <option key={p.slug}>{p.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Services">
                    {services.map((s) => (
                      <option key={s.slug}>{s.title}</option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown />
              </div>
              {errors.selection && <small>{errors.selection}</small>}
            </label>
            <label>
              Project description <span>*</span>
              <textarea
                name="description"
                value={form.description}
                onChange={update}
                placeholder="What are you planning to build or improve?"
                required
                aria-invalid={Boolean(errors.description)}
              />{" "}
              {errors.description && <small>{errors.description}</small>}
            </label>
            <div className="form-row">
              <label>
                Budget range <small>(optional)</small>
                <div className="select-wrap">
                  <select name="budget" value={form.budget} onChange={update}>
                    <option value="">Select range</option>
                    <option>Under ₹10,000</option>
                    <option>₹10,000–₹25,000</option>
                    <option>₹25,000–₹50,000</option>
                    <option>₹50,000+</option>
                    <option>Not sure yet</option>
                  </select>
                  <ChevronDown />
                </div>
              </label>
              <label>
                Expected deadline <small>(optional)</small>
                <input
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={update}
                />
              </label>
            </div>
            {status === "unconfigured" && (
              <div className="form-error" role="alert">
                The enquiry form is not set up yet. Please contact us on Instagram
                for now.
              </div>
            )}
            {status === "error" && (
              <div className="form-error" role="alert">
                We could not send your enquiry. Please try again or contact us on
                Instagram.
              </div>
            )}
            {status === "success" && (
              <div className="form-success" role="status">
                Thanks. Your enquiry has been sent successfully.
              </div>
            )}
            <p className="form-privacy">
              Your details will be sent to our enquiry service so we can respond
              to your request.
            </p>
            <button
              className="button button--primary submit-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting…" : "Send Project Details"}
              <Send size={17} />
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
function NotFound({
  title = "Page not found",
  message = "The page you are looking for is unavailable.",
}) {
  return (
    <section className="not-found">
      <div className="container">
        <span>404</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link className="button button--primary" to="/">
          Back to Home <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}
function RoutedSite() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.2 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let observer;
    const timer = window.setTimeout(() => {
      const items = document.querySelectorAll(
        "main p, footer p, main .project-card, main .service-card, main .service-preview-grid article, main .process-card, main .feature-grid article, main .value-grid article, main .detail-blocks article, main .section-head",
      );
      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.scrollVisible = "true";
          observer.unobserve(entry.target);
        }),
        { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
      );
      items.forEach((item, index) => {
        item.style.setProperty("--scroll-delay", `${Math.min(index % 5, 4) * 65}ms`);
        observer.observe(item);
      });
    }, 250);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [location.key]);
  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <ScrollTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <RoutedSite />
    </BrowserRouter>
  );
}
