const catalogueProjects = [
  ["Smart Campus Service Portal", "A unified portal where students can submit campus service requests, track progress, receive updates, and review resolutions.", "Web Applications"],
  ["Final-Year Project Collaboration Hub", "Helps student teams organise project tasks, milestones, shared resources, meeting notes, and supervisor feedback in one workspace.", "Web Applications"],
  ["Internship and Placement Management Portal", "Connects students, placement coordinators, and recruiters through opportunity listings, application tracking, eligibility checks, and interview schedules.", "Web Applications"],
  ["Local Service Booking and Management System", "Enables customers to discover service providers, request bookings, track appointments, and manage feedback and service history.", "Web Applications"],
  ["Student Marketplace for Notes and Resources", "A moderated platform for students to discover, share, request, and organise study resources by subject and course.", "Web Applications"],
  ["Research Team and Publication Tracker", "Helps academic teams manage research tasks, publication stages, contributor roles, deadlines, and document versions.", "Web Applications"],
  ["Event Registration and Volunteer Coordination System", "Supports event publishing, participant registration, volunteer assignments, attendance tracking, and post-event feedback.", "Web Applications"],
  ["Inventory and Maintenance Tracking Platform", "Tracks equipment, stock movement, maintenance requests, low-stock alerts, and asset history for small organisations.", "Web Applications"],
  ["Appointment and Queue Management System", "Allows organisations to offer time slots, manage virtual queues, send status updates, and review service demand.", "Web Applications"],
  ["Secure Complaint and Resolution Portal", "Provides a structured way to submit complaints, assign cases, monitor resolution status, and view anonymised service trends.", "Web Applications"],
  ["Freelance Project and Client Workspace", "Brings project briefs, milestones, file sharing, client approvals, and delivery status into one simple workspace.", "Web Applications"],
  ["Digital Certificate Verification Portal", "Allows authorised organisations to issue verifiable certificates and lets recipients validate certificate details through a public lookup.", "Web Applications"],
  ["Subscription and Expense Insights Dashboard", "Helps users organise recurring payments, record expenses, set budgets, and view spending patterns over time.", "Web Applications"],
  ["AI-Powered Resume and Job Matching System", "Compares a resume with a job description, highlights relevant experience and skill gaps, and suggests targeted improvements.", "AI-Powered Applications"],
  ["Intelligent Document Question-Answering System", "Lets users upload documents and ask questions, with answers grounded in the provided material and references to relevant sections.", "AI-Powered Applications"],
  ["Research Paper Insight and Summarisation Platform", "Summarises research papers, extracts objectives and findings, and helps users compare papers around a selected topic.", "AI-Powered Applications"],
  ["AI-Assisted Interview Practice Platform", "Creates role-specific practice questions, reviews written responses against clear criteria, and provides actionable feedback.", "AI-Powered Applications"],
  ["Customer Support Ticket Intelligence System", "Organises incoming support requests, suggests categories and priorities, and drafts response options for staff review.", "AI-Powered Applications"],
  ["AI-Powered Meeting Notes and Action Tracker", "Turns supplied meeting transcripts into summaries, decisions, action items, and follow-up lists that users can review and edit.", "AI-Powered Applications"],
  ["Personalised Learning Path Recommendation System", "Uses a learner's goals, current skills, and progress to suggest a structured sequence of learning resources and practice activities.", "AI-Powered Applications"],
  ["AI-Assisted Legal Document Explorer", "Summarises uploaded legal documents, identifies key clauses, and answers document-based questions while making clear that it is not legal advice.", "AI-Powered Applications"],
  ["Multilingual Public Information Assistant", "Helps users find and understand information from an approved knowledge base in supported languages, with links to source material.", "AI-Powered Applications"],
  ["AI-Powered Product Review Insights Dashboard", "Groups customer reviews into themes, summarises common praise and complaints, and tracks changes in feedback over time.", "AI-Powered Applications"],
  ["Smart Email and Message Drafting Workspace", "Helps users create, rewrite, and organise professional messages using configurable tone, purpose, and length controls.", "AI-Powered Applications"],
  ["AI-Based Academic Quiz and Assessment Builder", "Creates draft questions and answer explanations from supplied learning material, with instructor review before publication.", "AI-Powered Applications"],
  ["Visual Content Accessibility Assistant", "Generates draft image descriptions and accessibility text for user review, helping content publishers make visual material more accessible.", "AI-Powered Applications"],
  ["Knowledge-Base Assistant for Small Organisations", "Answers staff questions using approved internal documents and provides source references to help users verify responses.", "AI-Powered Applications"],
  ["Phishing Website Risk Detection System", "Analyses URL patterns and selected website characteristics to estimate phishing risk and explain the signals behind a prediction.", "Machine Learning & Computer Vision"],
  ["Network Intrusion Pattern Detection Dashboard", "Uses labelled network-traffic data to classify suspicious activity and visualise detected patterns for learning and analysis.", "Machine Learning & Computer Vision"],
  ["Plant Leaf Disease Classification System", "Classifies uploaded plant-leaf images into supported disease categories and presents confidence information with general care guidance.", "Machine Learning & Computer Vision"],
  ["Waste Image Classification and Segregation Assistant", "Classifies images into defined waste categories and provides disposal guidance based on the categories supported by the dataset.", "Machine Learning & Computer Vision"],
  ["Traffic Density Analysis and Incident Flagging System", "Analyses recorded traffic footage to estimate congestion and flag selected visible events for human review.", "Machine Learning & Computer Vision"],
  ["Energy Demand Forecasting Dashboard", "Uses historical consumption records to forecast demand, compare periods, and highlight unusual changes in usage.", "Machine Learning & Computer Vision"],
  ["Student Support Risk Insights System", "Analyses permitted academic indicators to identify patterns associated with students who may benefit from additional support.", "Machine Learning & Computer Vision"],
  ["Crop Yield Estimation and Planning Assistant", "Uses available crop, weather, and soil records to estimate yield and compare likely outcomes under different input conditions.", "Machine Learning & Computer Vision"],
  ["Customer Churn Prediction and Retention Insights", "Estimates which customers may be at risk of leaving and highlights relevant patterns to support targeted retention planning.", "Machine Learning & Computer Vision"],
  ["Medical Image Classification Support Tool", "Classifies images from a clearly defined, appropriately licensed dataset for educational research, with results presented as decision support rather than diagnosis.", "Machine Learning & Computer Vision"],
  ["Road Surface Damage Detection System", "Analyses road images to identify and classify visible surface damage, helping organise inspection and maintenance priorities.", "Machine Learning & Computer Vision"],
  ["Document Layout and Field Extraction System", "Detects and extracts selected fields from structured forms or scanned documents, with confidence indicators and manual correction options.", "Machine Learning & Computer Vision"],
].map(([title, description, category], index) => {
  const describedWorkflows = description
    .replace(/[.]$/, "")
    .split(/,\s*|\s+and\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return {
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    title,
    category,
    description,
    audience: "B.Tech final-year students and project teams",
    solution: description,
    features: describedWorkflows,
    fromCatalogue: true,
    accent: ["orange", "cream", "dark"][index % 3],
  };
});

export const projects = [
  {
    slug: "roomsync",
    title: "RoomSync",
    category: "Productivity",
    description:
      "A shared expense manager that helps roommates organize expenses, split costs, and track individual balances.",
    audience: "Students and shared households",
    problem: "Tracking who paid for shared expenses quickly becomes confusing.",
    solution:
      "A clear workspace for recording shared costs and understanding balances at a glance.",
    features: [
      "Shared expense tracking",
      "Automatic expense splitting",
      "Individual balance summaries",
      "Expense history",
      "Customizable categories",
    ],
    accent: "orange",
  },
  {
    slug: "bugbuddy",
    title: "BugBuddy",
    category: "Developer Tools",
    description:
      "A knowledge notebook for saving, organizing, searching, and reusing programming error solutions.",
    audience: "Beginner and self-taught developers",
    problem:
      "Useful debugging solutions are often scattered across notes, tabs, and messages.",
    solution:
      "A searchable personal library for recurring errors, fixes, and useful code notes.",
    features: [
      "Searchable solution notes",
      "Topic and error organization",
      "Reusable code snippets",
      "Tag-based browsing",
    ],
    accent: "cream",
  },
  {
    slug: "preptrack",
    title: "PrepTrack",
    category: "Education",
    description:
      "A study progress tracker for organizing subjects, monitoring topics, and identifying unfinished syllabus sections.",
    audience: "Students preparing for exams or courses",
    problem:
      "It is difficult to see overall study progress across many subjects and topics.",
    solution:
      "A practical planning dashboard that makes completed and remaining work visible.",
    features: [
      "Subject planning",
      "Topic completion tracking",
      "Weekly progress views",
      "Unfinished syllabus insights",
    ],
    accent: "dark",
  },
  {
    slug: "feedbackloop",
    title: "FeedbackLoop",
    category: "Productivity",
    description:
      "A platform for creating feedback forms and polls, collecting responses, and viewing summarized results.",
    audience: "Student teams, communities, and small groups",
    problem:
      "Collecting feedback and understanding patterns often requires several separate tools.",
    solution:
      "A focused workspace for gathering responses and reviewing useful summaries.",
    features: [
      "Custom forms and polls",
      "Simple response collection",
      "Result summaries",
      "Response overview",
    ],
    accent: "cream",
  },
  {
    slug: "api-playground",
    title: "API Playground",
    category: "Developer Tools",
    description:
      "A beginner-friendly interface for sending requests and inspecting structured responses.",
    audience: "Developers learning and testing API workflows",
    problem:
      "Many API tools are intimidating for beginners and hide useful learning context.",
    solution:
      "A clear request workspace that helps users understand API responses step by step.",
    features: [
      "Structured request builder",
      "Readable response views",
      "Request history",
      "Beginner-friendly controls",
    ],
    accent: "orange",
  },
  {
    slug: "skillswap",
    title: "SkillSwap",
    category: "Education",
    description:
      "Lets users offer skills, request peer support, arrange learning sessions, and build a verified record of completed exchanges.",
    audience: "Students seeking peer learning opportunities",
    problem:
      "Learners often struggle to find peers offering complementary skills.",
    solution:
      "A student-focused space for skill discovery, peer learning sessions, and a verified history of completed exchanges.",
    features: [
      "Offer skills and request peer support",
      "Arrange learning sessions",
      "Verified completed-exchange history",
    ],
    accent: "dark",
  },
  ...catalogueProjects,
];
