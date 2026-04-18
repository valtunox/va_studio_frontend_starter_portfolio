import { useState, useEffect, useCallback } from 'react'
import {
  Github, Linkedin, Mail, Menu, X, ExternalLink, ArrowRight, ArrowUpRight,
  Code2, Palette, Globe, Smartphone, Star, Download, MapPin, Calendar,
  Briefcase, GraduationCap, Award, ChevronRight, Twitter, Dribbble,
  Send, CheckCircle2, Sparkles, Brain, Layers, Monitor, Phone,
  Users, Coffee, GitBranch, Clock, Quote, ChevronLeft, AlertCircle,
  Youtube, Instagram, Rss, BookOpen, MessageCircle, Codepen, Search,
  Lightbulb, PenTool, Rocket, LifeBuoy, Plus, Minus, Check, Circle,
  TrendingUp, Sun, Moon
} from 'lucide-react'
import { useTheme, THEMES } from '@/context/ThemeContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const TYPING_TITLES = [
  'Full-Stack Engineer',
  'Cloud Architect',
  'UI/UX Enthusiast',
  'Open-Source Contributor',
]

const navTabs = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'blog', label: 'Blog' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

const PROJECT_CATEGORIES = ['All', 'Web', 'Mobile', 'AI/ML', 'Design']

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Building performant, scalable web applications with modern frameworks and best practices.' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Crafting intuitive, beautiful interfaces that delight users and drive engagement.' },
  { icon: Globe, title: 'Cloud & DevOps', desc: 'Deploying and managing infrastructure on AWS, GCP, and Azure with CI/CD pipelines.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform mobile development with React Native and Flutter.' },
]

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'Python / Django / FastAPI', level: 85 },
  { name: 'Go', level: 75 },
  { name: 'PostgreSQL / MongoDB', level: 82 },
  { name: 'AWS / Docker / K8s', level: 80 },
  { name: 'Tailwind / Figma', level: 92 },
  { name: 'GraphQL / REST', level: 87 },
  { name: 'CI/CD / Terraform', level: 78 },
  { name: 'React Native / Flutter', level: 73 },
  { name: 'TensorFlow / PyTorch', level: 65 },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'GraphQL',
  'Tailwind CSS', 'Figma', 'Git', 'CI/CD',
]

const projects = [
  { id: 1, title: 'FinTrack Dashboard', category: 'Web', desc: 'Real-time financial analytics platform with interactive charts, portfolio tracking, and AI-powered insights. Handles 2M+ data points with sub-200ms render times.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'], link: '#', github: '#', featured: true, year: '2025', role: 'Lead Engineer' },
  { id: 2, title: 'ShopFlow E-Commerce', category: 'Web', desc: 'Full-stack e-commerce platform serving 15K daily active users with real-time inventory, Stripe payment processing, and a comprehensive admin dashboard.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', tags: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'], link: '#', github: '#', featured: true, year: '2024', role: 'Full-Stack Developer' },
  { id: 3, title: 'CloudSync Platform', category: 'Web', desc: 'Enterprise file synchronization service with end-to-end encryption, team collaboration tools, and multi-region redundancy across 12 global data centers.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop', tags: ['Go', 'AWS S3', 'WebSocket', 'Docker'], link: '#', github: '#', featured: true, year: '2024', role: 'Backend Architect' },
  { id: 4, title: 'HealthPulse App', category: 'Mobile', desc: 'Mobile health tracking application integrating with Apple Watch and Fitbit, offering personalized AI-driven wellness recommendations for 50K+ users.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', tags: ['React Native', 'Firebase', 'ML Kit', 'HealthKit'], link: '#', github: '#', featured: false, year: '2023', role: 'Mobile Lead' },
  { id: 5, title: 'Neural Style Studio', category: 'AI/ML', desc: 'AI-powered creative tool that applies artistic style transfer to photographs in real-time using custom-trained neural networks with WebGPU acceleration.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', tags: ['Python', 'PyTorch', 'FastAPI', 'WebGPU'], link: '#', github: '#', featured: true, year: '2025', role: 'ML Engineer' },
  { id: 6, title: 'DevOps Pipeline Tool', category: 'Web', desc: 'Automated CI/CD pipeline builder with a visual workflow editor, multi-cloud deployment support, and integrated monitoring for engineering teams.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', tags: ['Go', 'Terraform', 'Kubernetes', 'gRPC'], link: '#', github: '#', featured: false, year: '2023', role: 'Platform Engineer' },
  { id: 7, title: 'Mosaic Design System', category: 'Design', desc: 'Comprehensive design system with 80+ accessible components, Figma token sync, dark mode support, and automated documentation generation.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', tags: ['React', 'Storybook', 'Figma', 'Tailwind'], link: '#', github: '#', featured: true, year: '2025', role: 'Design Engineer' },
  { id: 8, title: 'TravelMate Mobile', category: 'Mobile', desc: 'Cross-platform travel companion app with offline maps, real-time translation, and trip planning powered by LLM-based itinerary suggestions.', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop', tags: ['Flutter', 'Dart', 'Firebase', 'Maps API'], link: '#', github: '#', featured: false, year: '2024', role: 'Mobile Developer' },
]

const experience = [
  { role: 'Senior Full-Stack Engineer', company: 'TechCorp Inc.', period: '2023 – Present', desc: 'Leading a team of 8 engineers building a next-gen SaaS platform. Architected microservices handling 10M+ requests/day with 99.97% uptime.', type: 'work', logo: '🏢' },
  { role: 'Full-Stack Developer', company: 'StartupXYZ', period: '2021 – 2023', desc: 'Built the core product from 0 to 50K users. Implemented real-time collaboration, payment systems, and analytics pipelines.', type: 'work', logo: '🚀' },
  { role: 'Frontend Developer', company: 'DigitalAgency', period: '2019 – 2021', desc: 'Delivered 20+ client projects including e-commerce, SaaS dashboards, and marketing sites with a focus on performance and accessibility.', type: 'work', logo: '🎨' },
  { role: 'Junior Developer', company: 'WebCraft Studios', period: '2017 – 2019', desc: 'Started professional career building WordPress sites and small React SPAs. Learned client management, agile workflows, and production debugging.', type: 'work', logo: '💻' },
  { role: 'M.S. Computer Science', company: 'Stanford University', period: '2015 – 2017', desc: 'Focus on distributed systems and machine learning. Published 2 papers on scalable web architectures. GPA 3.9/4.0.', type: 'education', logo: '🎓' },
  { role: 'B.S. Software Engineering', company: 'UC Berkeley', period: '2011 – 2015', desc: 'Dean\'s List all semesters. Capstone project on real-time collaborative editing received Best Senior Thesis award.', type: 'education', logo: '🎓' },
]

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CTO, TechCorp', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', text: 'One of the most talented engineers I\'ve worked with. Consistently delivers exceptional quality and mentors the team brilliantly. Our platform stability improved 40% under his leadership.' },
  { name: 'David Park', role: 'Founder, StartupXYZ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', text: 'Transformed our product architecture and helped us scale from 0 to 50K users. A true full-stack powerhouse who thinks in systems, not just features.' },
  { name: 'Lisa Chen', role: 'Product Lead, DigitalAgency', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', text: 'Incredible attention to detail and a deep understanding of both design and engineering. Every project was delivered flawlessly and on time.' },
  { name: 'Marcus Rivera', role: 'VP Engineering, CloudNine', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', text: 'His cloud architecture expertise saved us $200K annually. He doesn\'t just write code — he solves business problems with elegant technical solutions.' },
  { name: 'Anika Patel', role: 'Design Director, Pixel&Co', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', text: 'Rare to find an engineer who truly understands design systems. John bridged our design-engineering gap and delivered a component library that our whole org adopted.' },
]

const stats = [
  { icon: Calendar, value: '7+', label: 'Years Experience' },
  { icon: Layers, value: '50+', label: 'Projects Completed' },
  { icon: Users, value: '30+', label: 'Happy Clients' },
  { icon: GitBranch, value: '2.8K', label: 'GitHub Stars' },
]

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
]

const socialPlatforms = [
  { icon: Github,         handle: '@johndoe',       platform: 'GitHub',        followers: '12.4K', accent: 'text-white',    bg: 'from-slate-600 to-slate-800',  href: '#' },
  { icon: Linkedin,       handle: '/in/johndoe',    platform: 'LinkedIn',      followers: '8.2K',  accent: 'text-sky-300',  bg: 'from-sky-600 to-blue-700',     href: '#' },
  { icon: Twitter,        handle: '@johndoe',       platform: 'X / Twitter',   followers: '24.1K', accent: 'text-sky-200',  bg: 'from-sky-500 to-cyan-600',     href: '#' },
  { icon: Youtube,        handle: '@johndoe',       platform: 'YouTube',       followers: '6.8K',  accent: 'text-red-300',  bg: 'from-red-600 to-rose-700',     href: '#' },
  { icon: Instagram,      handle: '@johndoe.dev',   platform: 'Instagram',     followers: '3.4K',  accent: 'text-pink-300', bg: 'from-fuchsia-600 to-pink-600', href: '#' },
  { icon: BookOpen,       handle: '@johndoe',       platform: 'Medium',        followers: '5.1K',  accent: 'text-emerald-300', bg: 'from-emerald-600 to-teal-700', href: '#' },
  { icon: Rss,            handle: '@johndoe',       platform: 'Dev.to',        followers: '2.7K',  accent: 'text-indigo-300', bg: 'from-indigo-600 to-violet-700', href: '#' },
  { icon: MessageCircle,  handle: 'johndoe#1234',   platform: 'Discord',       followers: '1.9K',  accent: 'text-indigo-200', bg: 'from-violet-600 to-indigo-700', href: '#' },
  { icon: Dribbble,       handle: '@johndoe',       platform: 'Dribbble',      followers: '4.0K',  accent: 'text-pink-200',    bg: 'from-pink-500 to-rose-600',    href: '#' },
  { icon: Codepen,        handle: '@johndoe',       platform: 'CodePen',       followers: '1.2K',  accent: 'text-amber-200',   bg: 'from-amber-500 to-orange-600', href: '#' },
]

const clientBrands = [
  { name: 'STRIPE',    style: 'font-bold italic tracking-tight' },
  { name: 'NOTION',    style: 'font-black tracking-widest' },
  { name: 'LINEAR',    style: 'font-semibold tracking-wide' },
  { name: 'VERCEL',    style: 'font-black tracking-tighter uppercase' },
  { name: 'Figma',     style: 'font-extrabold italic' },
  { name: 'GITHUB',    style: 'font-bold uppercase tracking-[0.2em]' },
  { name: 'shadcn/ui', style: 'font-mono font-semibold lowercase' },
  { name: 'SUPABASE',  style: 'font-bold tracking-wide' },
]

const processSteps = [
  { icon: Search,    title: 'Discovery',    desc: 'Deep-dive into goals, users, and constraints. Output: a crisp one-pager with risks and success metrics.',  duration: '3–5 days' },
  { icon: Lightbulb, title: 'Strategy',     desc: 'Scope the MVP, pick the stack, and de-risk the unknowns. Output: a prioritized plan and architecture sketch.', duration: '4–7 days' },
  { icon: PenTool,   title: 'Design',       desc: 'Wireframes then pixel-perfect UI in Figma. Output: an interactive prototype and a design system.',         duration: '1–2 weeks' },
  { icon: Code2,     title: 'Build',        desc: 'Ship in short iterations with weekly demos. Output: production-grade code with tests and CI/CD.',         duration: '3–8 weeks' },
  { icon: Rocket,    title: 'Launch',       desc: 'Harden, load-test, and deploy with observability in place. Output: live product with dashboards.',        duration: '1 week' },
  { icon: LifeBuoy,  title: 'Support',      desc: 'Retainer for iteration, analytics reviews, and on-call. Output: monthly report and roadmap tune-ups.',    duration: 'Ongoing' },
]

const pricingPackages = [
  {
    name: 'Consulting',
    tagline: 'One-off sessions',
    price: '$180',
    unit: '/ hour',
    description: 'Architecture reviews, code audits, or a workshop. Great when you need a second brain for a hard call.',
    features: ['60–90 min deep-dive calls', 'Written follow-up with action items', 'Async Slack for one week', 'Pay as you go, no minimum'],
    cta: 'Book a call',
    highlighted: false,
  },
  {
    name: 'Project',
    tagline: 'Fixed scope, fixed price',
    price: '$12K',
    unit: '+ / project',
    description: 'From landing pages to full-stack apps. You get strategy, design, and engineering in one thread.',
    features: ['Discovery & scoping included', 'Weekly Loom demos', 'Dedicated Figma & GitHub repo', 'Two weeks post-launch support', '30-day bug-fix guarantee'],
    cta: 'Start a project',
    highlighted: true,
  },
  {
    name: 'Retainer',
    tagline: 'Part-time, long-term',
    price: '$8K',
    unit: '/ month',
    description: 'Embedded engineering for teams that need senior firepower without a full-time hire.',
    features: ['~20 hours / week of focused work', 'Weekly planning + standups', 'On-call for incidents', 'Priority over project work', 'Quarterly roadmap reviews'],
    cta: 'Chat about fit',
    highlighted: false,
  },
]

const blogPosts = [
  {
    id: 1,
    title: 'Rendering 2M data points in the browser without tanking the main thread',
    excerpt: 'How I rebuilt FinTrack\'s chart layer with WebWorkers, virtualization, and WebGL to keep interactions under 16ms.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    date: 'Mar 14, 2026',
    readTime: '9 min read',
    tags: ['Performance', 'WebGL', 'React'],
    href: '#',
  },
  {
    id: 2,
    title: 'A pragmatic guide to LLM prompt caching in production',
    excerpt: 'Why I stopped chasing benchmarks and started measuring dollars — a cost-first framework for adding caching to your AI apps.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    date: 'Feb 28, 2026',
    readTime: '12 min read',
    tags: ['AI', 'LLMs', 'Cost'],
    href: '#',
  },
  {
    id: 3,
    title: 'Terraform modules I actually re-use (and the ones I deleted)',
    excerpt: 'Seven years of infra-as-code distilled into a short list of patterns that scale — and an honest list of the anti-patterns I regret.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    date: 'Feb 06, 2026',
    readTime: '7 min read',
    tags: ['DevOps', 'Terraform', 'AWS'],
    href: '#',
  },
  {
    id: 4,
    title: 'Design systems are products — treat them that way',
    excerpt: 'Mosaic shipped to 40+ teams. Here\'s what I learned about versioning, support, and saying "no" to 90% of requests.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    date: 'Jan 18, 2026',
    readTime: '6 min read',
    tags: ['Design Systems', 'Product'],
    href: '#',
  },
]

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Small marketing sites land in 2–3 weeks. Full-stack apps with auth, payments, and an admin panel are usually 6–10 weeks. I\'ll always give a firm estimate after discovery — and I\'ll tell you if it feels off.',
  },
  {
    q: 'Do you work with existing codebases?',
    a: 'Yes. I\'ve inherited everything from clean Next.js repos to legacy Rails monoliths. I start with a short audit so we share the same mental model before anyone touches production.',
  },
  {
    q: 'Can you work with my designer / agency?',
    a: 'Absolutely. I regularly embed with design teams and other agencies. I\'m comfortable with Figma handoff, design reviews, and picking up partial work without drama.',
  },
  {
    q: 'What\'s your stack?',
    a: 'For new products: TypeScript, React/Next.js, Node or Go on the backend, Postgres, and Vercel or AWS. For ML: Python with FastAPI. I\'ll match your stack if you have one — I\'m not dogmatic.',
  },
  {
    q: 'Do you sign NDAs and offer IP transfer?',
    a: 'Yes to both. Standard mutual NDA is fine, and full IP transfers on the final invoice for all project work. No open-source encumbrance unless we agree upfront.',
  },
  {
    q: 'What about support after launch?',
    a: 'Every project includes two weeks of bug-fix support. For ongoing work I offer monthly retainers (see Pricing) or hourly consulting — whichever fits your cadence.',
  },
]

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useTypingEffect(strings, typingSpeed = 80, deletingSpeed = 40, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[index]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIndex((c) => c + 1)
        }
      } else {
        setDisplay(current.slice(0, charIndex))
        if (charIndex === 0) {
          setDeleting(false)
          setIndex((i) => (i + 1) % strings.length)
        } else {
          setCharIndex((c) => c - 1)
        }
      }
    }, deleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, index, strings, typingSpeed, deletingSpeed, pause])

  return display
}

/* ------------------------------------------------------------------ */
/*  STYLES (injected once)                                             */
/* ------------------------------------------------------------------ */

const inlineStyles = `
@keyframes stagger-in {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
@keyframes testimonial-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.stagger-children > * {
  opacity: 0;
  animation: stagger-in 0.5s ease-out forwards;
}
.stagger-children > *:nth-child(1) { animation-delay: 0.05s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.10s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.15s; }
.stagger-children > *:nth-child(4) { animation-delay: 0.20s; }
.stagger-children > *:nth-child(5) { animation-delay: 0.25s; }
.stagger-children > *:nth-child(6) { animation-delay: 0.30s; }
.stagger-children > *:nth-child(7) { animation-delay: 0.35s; }
.stagger-children > *:nth-child(8) { animation-delay: 0.40s; }
.glass-card {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.06);
}
.glass-card:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(139,92,246,0.25);
}
.gradient-mesh {
  background:
    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(124,58,237,0.18), transparent),
    radial-gradient(ellipse 60% 80% at 80% 70%, rgba(217,70,239,0.12), transparent),
    radial-gradient(ellipse 50% 50% at 50% 50%, rgba(236,72,153,0.06), transparent);
  animation: gradient-shift 12s ease-in-out infinite;
  background-size: 200% 200%;
}
.testimonial-track {
  animation: testimonial-scroll 30s linear infinite;
}
.testimonial-track:hover { animation-play-state: paused; }
`

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('about')
  const [projectFilter, setProjectFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const [contactSent, setContactSent] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [formValues, setFormValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [openFaq, setOpenFaq] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('idle')
  const [themePickerOpen, setThemePickerOpen] = useState(false)
  const { theme, setTheme, isDark, toggleDark } = useTheme()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterStatus('error')
      return
    }
    setNewsletterStatus('success')
    setNewsletterEmail('')
    setTimeout(() => setNewsletterStatus('idle'), 4000)
  }

  const typedTitle = useTypingEffect(TYPING_TITLES)

  const filteredProjects = projectFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === projectFilter)

  const validateForm = useCallback(() => {
    const errors = {}
    if (!formValues.name.trim()) errors.name = 'Name is required'
    if (!formValues.email.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) errors.email = 'Invalid email address'
    if (!formValues.message.trim()) errors.message = 'Message is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formValues])

  const handleSubmit = () => {
    if (validateForm()) setContactSent(true)
  }

  const updateField = (field, value) => {
    setFormValues((v) => ({ ...v, [field]: value }))
    if (formErrors[field]) setFormErrors((e) => ({ ...e, [field]: undefined }))
  }

  const isMidnight = theme === 'midnight'
  const rootBg = isDark
    ? (isMidnight ? 'bg-black text-white' : 'bg-slate-950 text-white')
    : 'bg-white text-slate-900'
  const navBg = isDark
    ? (isMidnight ? 'bg-black/90 border-white/5' : 'bg-slate-950/80 border-white/5')
    : 'bg-white/80 border-slate-900/10'
  const surfaceMuted = isDark ? 'text-slate-400' : 'text-slate-600'
  const surfaceDim = isDark ? 'text-slate-500' : 'text-slate-500'
  const hairline = isDark ? 'border-white/5' : 'border-slate-900/10'

  return (
    <div className={`min-h-screen ${rootBg} font-sans transition-colors duration-300`}>
      <style>{inlineStyles}</style>

      {/* ---- Navigation ---- */}
      <nav className={`fixed w-full top-0 z-50 backdrop-blur-xl border-b ${navBg}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold font-display flex items-center">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-2))' }}>JD</span>
            <span className={`${isDark ? 'text-white/60' : 'text-slate-500'} font-normal ml-1`}>portfolio</span>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            <Tabs
              tabs={navTabs}
              active={activeTab}
              onChange={setActiveTab}
              className={isDark ? 'bg-white/[0.04] border border-white/5' : 'bg-slate-900/5 border border-slate-900/10'}
            />
          </div>
          <div className="hidden md:flex items-center gap-2">
            {/* Theme quick-picker */}
            <div className="relative">
              <button
                onClick={() => setThemePickerOpen((o) => !o)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${isDark ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5' : 'border-slate-900/10 text-slate-600 hover:text-slate-900 hover:bg-slate-900/5'}`}
                aria-label="Theme color"
              >
                <Palette className="w-4 h-4" />
              </button>
              {themePickerOpen && (
                <div className={`absolute right-0 top-11 p-3 rounded-2xl shadow-2xl min-w-[220px] border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-900/10'}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${surfaceDim}`}>Accent</p>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {Object.entries(THEMES).map(([key, t]) => (
                      <button
                        key={key}
                        onClick={() => { setTheme(key); setThemePickerOpen(false) }}
                        className={`aspect-square rounded-lg border-2 transition-all flex items-center justify-center ${theme === key ? (isDark ? 'border-white' : 'border-slate-900') : 'border-transparent'}`}
                        style={{ backgroundColor: t.color }}
                        title={t.label}
                      >
                        {theme === key && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={toggleDark}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isDark ? 'hover:bg-white/5 text-slate-200' : 'hover:bg-slate-900/5 text-slate-700'}`}
                  >
                    <span className="flex items-center gap-2">
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      {isDark ? 'Light mode' : 'Dark mode'}
                    </span>
                    <span className={`text-xs ${surfaceDim}`}>{isDark ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              )}
            </div>
            <Button size="sm" className="rounded-full px-5 text-white shadow-lg" style={{ backgroundColor: 'var(--accent-color)' }}>
              <Download className="w-3.5 h-3.5 mr-1.5" /> Resume
            </Button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`lg:hidden p-2 ${surfaceMuted} ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className={`lg:hidden px-6 pb-6 space-y-1 border-t ${hairline}`}>
            {navTabs.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false) }} className={`block w-full text-left py-3 transition-colors ${activeTab === tab.id ? (isDark ? 'text-white' : 'text-slate-900') : `${surfaceMuted} ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}`}>
                {tab.label}
              </button>
            ))}
            <div className={`flex items-center gap-2 pt-3 border-t ${hairline}`}>
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${theme === key ? (isDark ? 'border-white' : 'border-slate-900') : 'border-transparent'}`}
                  style={{ backgroundColor: t.color }}
                  title={t.label}
                />
              ))}
              <button onClick={toggleDark} className={`ml-auto p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-900/5'}`}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ---- Hero with gradient mesh + typing effect ---- */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-8">
                <Sparkles className="w-4 h-4" /> Available for freelance work
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-4">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  John Doe
                </span>
              </h1>
              <div className="h-10 mb-6">
                <span className="text-xl md:text-2xl text-slate-400 font-mono">
                  {typedTitle}<span className="animate-pulse text-violet-400">|</span>
                </span>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                Senior Full-Stack Engineer crafting exceptional digital experiences. I turn complex problems into elegant, performant solutions.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Button size="lg" onClick={() => setActiveTab('projects')} className="bg-violet-600 hover:bg-violet-700 rounded-full px-8 h-12 shadow-lg shadow-violet-600/25">
                  View My Work <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('contact')} className="rounded-full px-8 h-12 border-white/10 text-white hover:bg-white/5">
                  Get in Touch
                </Button>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all" aria-label={label}>
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 blur-3xl opacity-30 animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="John Doe" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2 glass-card rounded-xl shadow-xl">
                  <p className="text-sm font-semibold">7+ Years</p>
                  <p className="text-xs text-slate-400">Experience</p>
                </div>
                <div className="absolute -top-4 -left-4 px-4 py-2 glass-card rounded-xl shadow-xl">
                  <p className="text-sm font-semibold">50+ Projects</p>
                  <p className="text-xs text-slate-400">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Clients / Brands strip ---- */}
      <section className={`py-8 border-b ${hairline}`}>
        <div className="max-w-6xl mx-auto px-6">
          <p className={`text-center text-xs uppercase tracking-[0.25em] ${surfaceDim} mb-6`}>Trusted by teams at</p>
          <div className={`flex flex-wrap justify-center items-center gap-x-10 gap-y-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {clientBrands.map((b) => (
              <span
                key={b.name}
                className={`${b.style} text-base sm:text-lg select-none transition-colors ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-600'}`}
              >
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Stats Bar ---- */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <p className="text-3xl font-bold font-display">{value}</p>
                <p className="text-sm text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Tab Content Sections ---- */}
      <div className="max-w-6xl mx-auto px-6">

        {/* == ABOUT == */}
        <TabContent id="about" active={activeTab} className="py-24">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">What I Do</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Services & Expertise</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">I specialize in building end-to-end digital products, from concept and design through to deployment and scaling.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {services.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="glass-card transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="font-semibold font-display text-lg mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonial Carousel */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Testimonials</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">What People Say</h2>
            </div>
            <div className="overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="flex testimonial-track" style={{ width: `${testimonials.length * 2 * 380}px` }}>
                {[...testimonials, ...testimonials].map((t, i) => (
                  <div key={`${t.name}-${i}`} className="flex-shrink-0 w-[360px] mx-2.5">
                    <Card className="glass-card h-full transition-all duration-300">
                      <CardContent className="p-6">
                        <Quote className="w-8 h-8 text-violet-500/30 mb-3" />
                        <div className="flex gap-1 mb-3">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-5 text-sm">"{t.text}"</p>
                        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-sm">{t.name}</p>
                            <p className="text-xs text-slate-400">{t.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabContent>

        {/* == PROJECTS == */}
        <TabContent id="projects" active={activeTab} className="py-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Selected Work</h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${projectFilter === cat ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="glass-card overflow-hidden group transition-all duration-300 cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                      View Details <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-slate-900/80 backdrop-blur text-xs">{project.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold font-display text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-violet-300 border-violet-500/20 text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Layers className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p>No projects in this category yet.</p>
            </div>
          )}
        </TabContent>

        {/* == Project Detail Modal == */}
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <div className="relative max-w-2xl w-full glass-card rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 backdrop-blur text-white hover:bg-slate-900/80 transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <Badge className="mb-2 bg-violet-600">{selectedProject.category}</Badge>
                  <h3 className="text-2xl font-bold font-display">{selectedProject.title}</h3>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-slate-300 leading-relaxed">{selectedProject.desc}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Role</p>
                    <p className="font-medium">{selectedProject.role}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Year</p>
                    <p className="font-medium">{selectedProject.year}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-500 text-sm mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-violet-500/10 text-violet-300">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2 border-t border-white/5">
                  <Button asChild className="bg-violet-600 hover:bg-violet-700 rounded-full flex-1">
                    <a href={selectedProject.link}><ExternalLink className="w-4 h-4 mr-2" /> Live Demo</a>
                  </Button>
                  <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full flex-1">
                    <a href={selectedProject.github}><Github className="w-4 h-4 mr-2" /> Source Code</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* == SKILLS == */}
        <TabContent id="skills" active={activeTab} className="py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">My Skills</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-8">Technical Proficiency</h2>
              <div className="space-y-5">
                {skills.map(({ name, level }) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{name}</span>
                      <span className="text-slate-400">{level}%</span>
                    </div>
                    <Progress value={level} color="bg-gradient-to-r from-violet-500 to-fuchsia-500" size="md" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Tech Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-8">Tools I Use</h2>
              <div className="flex flex-wrap gap-3 stagger-children">
                {techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 glass-card rounded-xl text-sm text-slate-300 transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 border border-violet-500/10">
                <div className="grid grid-cols-3 gap-6 text-center">
                  {stats.slice(0, 3).map(({ value, label }) => (
                    <div key={label}>
                      <p className="text-3xl font-bold font-display">{value}</p>
                      <p className="text-sm text-slate-400 mt-1">{label.split(' ').pop()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold font-display mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" /> Currently Exploring
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Rust / WASM', level: 35 },
                    { name: 'LLM Fine-tuning', level: 42 },
                    { name: 'WebGPU / 3D on the Web', level: 28 },
                  ].map(({ name, level }) => (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">{name}</span>
                        <Badge variant="outline" className="text-xs text-amber-400 border-amber-500/20">Learning</Badge>
                      </div>
                      <Progress value={level} color="bg-gradient-to-r from-amber-500 to-orange-500" size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 rounded-full px-8 w-full sm:w-auto shadow-lg shadow-violet-600/25">
                  <Download className="w-4 h-4 mr-2" /> Download Resume (PDF)
                </Button>
              </div>
            </div>
          </div>
        </TabContent>

        {/* == EXPERIENCE == */}
        <TabContent id="experience" active={activeTab} className="py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Background</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Experience & Education</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['AWS Certified Solutions Architect', 'Google Cloud Professional', 'Meta Front End Developer'].map((cert) => (
                <Badge key={cert} variant="outline" className="text-sm px-4 py-1.5 border-violet-500/20 text-violet-300 gap-1.5">
                  <Award className="w-3.5 h-3.5" /> {cert}
                </Badge>
              ))}
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-8 stagger-children">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-20">
                    <div className={`absolute left-[18px] top-6 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center text-xs ${exp.type === 'work' ? 'bg-violet-600 border-violet-400' : 'bg-fuchsia-600 border-fuchsia-400'}`}>
                      <span>{exp.logo}</span>
                    </div>
                    <div className="glass-card p-6 rounded-xl transition-all duration-300">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-slate-400 border-white/10 text-xs">{exp.period}</Badge>
                        {exp.type === 'work'
                          ? <Briefcase className="w-4 h-4 text-violet-400" />
                          : <GraduationCap className="w-4 h-4 text-fuchsia-400" />
                        }
                      </div>
                      <h3 className="font-semibold font-display text-lg">{exp.role}</h3>
                      <p className="text-violet-400 text-sm mb-2">{exp.company}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabContent>

        {/* == PROCESS == */}
        <TabContent id="process" active={activeTab} className="py-24">
          <div className="text-center mb-16">
            <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>How I Work</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">From idea to launch</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${surfaceMuted}`}>
              A repeatable, six-step process refined over 50+ shipped projects. Every phase has a concrete output so you always know what you&apos;re paying for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {processSteps.map(({ icon: Icon, title, desc, duration }, i) => (
              <Card key={title} className="glass-card transition-all duration-300 group relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent-color) 15%, transparent)' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
                    </div>
                    <span className={`text-5xl font-black font-display opacity-[0.06] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-semibold font-display text-lg mb-2">{title}</h3>
                  <p className={`text-sm leading-relaxed mb-4 ${surfaceMuted}`}>{desc}</p>
                  <div className={`flex items-center gap-2 text-xs pt-3 border-t ${hairline}`}>
                    <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-color)' }} />
                    <span className={surfaceDim}>{duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabContent>

        {/* == PRICING == */}
        <TabContent id="pricing" active={activeTab} className="py-24">
          <div className="text-center mb-16">
            <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>Engagement Models</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Simple, transparent pricing</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${surfaceMuted}`}>
              Three ways to work together. All prices are starting points — final numbers come after we scope together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPackages.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? 'glass-card scale-[1.02] shadow-2xl'
                    : 'glass-card'
                }`}
                style={plan.highlighted ? { borderColor: 'var(--accent-color)' } : {}}
              >
                {plan.highlighted && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-2))' }}
                  />
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold font-display text-xl">{plan.name}</h3>
                    {plan.highlighted && (
                      <Badge
                        className="text-white border-0"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      >
                        Most popular
                      </Badge>
                    )}
                  </div>
                  <p className={`text-xs uppercase tracking-wider ${surfaceDim} mb-4`}>{plan.tagline}</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold font-display">{plan.price}</span>
                    <span className={`text-sm ${surfaceMuted}`}>{plan.unit}</span>
                  </div>
                  <p className={`text-sm leading-relaxed mb-6 ${surfaceMuted}`}>{plan.description}</p>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-color)' }} />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-xl ${plan.highlighted ? 'text-white shadow-lg' : ''}`}
                    style={plan.highlighted ? { backgroundColor: 'var(--accent-color)' } : {}}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    onClick={() => setActiveTab('contact')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className={`mt-12 max-w-3xl mx-auto text-center text-sm ${surfaceMuted}`}>
            <p>Need something custom? <button onClick={() => setActiveTab('contact')} className="underline decoration-dotted hover:no-underline" style={{ color: 'var(--accent-color)' }}>Let&apos;s chat</button> — I also work on equity, revenue share, and nonprofit rates case by case.</p>
          </div>
        </TabContent>

        {/* == BLOG == */}
        <TabContent id="blog" active={activeTab} className="py-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>Writing</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Notes from the trenches</h2>
              <p className={`mt-3 ${surfaceMuted}`}>Long-form posts about the hard problems I&apos;ve actually shipped against.</p>
            </div>
            <Button variant="outline" className={`rounded-full ${isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-300 hover:bg-slate-100'}`}>
              <Rss className="w-4 h-4 mr-2" /> RSS feed
            </Button>
          </div>

          {/* Featured post */}
          <Card className="glass-card overflow-hidden mb-8 group cursor-pointer">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <Badge className="text-white border-0" style={{ backgroundColor: 'var(--accent-color)' }}>Featured</Badge>
                </div>
              </div>
              <CardContent className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                <div className={`flex items-center gap-3 text-xs ${surfaceDim} mb-3`}>
                  <span>{blogPosts[0].date}</span>
                  <span>&middot;</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <h3 className="font-bold font-display text-2xl md:text-3xl mb-3 group-hover:text-[var(--accent-color)] transition-colors">
                  {blogPosts[0].title}
                </h3>
                <p className={`${surfaceMuted} leading-relaxed mb-5`}>{blogPosts[0].excerpt}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {blogPosts[0].tags.map((t) => (
                    <Badge key={t} variant="outline" className={isDark ? 'border-white/10 text-slate-300' : 'border-slate-300 text-slate-600'}>{t}</Badge>
                  ))}
                </div>
                <a href={blogPosts[0].href} className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--accent-color)' }}>
                  Read the post <ArrowUpRight className="w-4 h-4" />
                </a>
              </CardContent>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="glass-card overflow-hidden group cursor-pointer transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <CardContent className="p-5">
                  <div className={`flex items-center gap-2 text-xs ${surfaceDim} mb-2`}>
                    <span>{post.date}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold font-display text-lg mb-2 line-clamp-2 group-hover:text-[var(--accent-color)] transition-colors">
                    {post.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${surfaceMuted}`}>{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <Badge key={t} variant="outline" className={`text-xs ${isDark ? 'border-white/10 text-slate-400' : 'border-slate-300 text-slate-500'}`}>{t}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabContent>

        {/* == FAQ == */}
        <TabContent id="faq" active={activeTab} className="py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>Questions</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Frequently asked</h2>
              <p className={`mt-4 ${surfaceMuted}`}>Short answers to what most people ask before we start working together.</p>
            </div>

            <div className="space-y-3">
              {faqs.map((f, i) => {
                const open = openFaq === i
                return (
                  <div
                    key={f.q}
                    className={`glass-card rounded-xl overflow-hidden transition-all ${open ? 'shadow-lg' : ''}`}
                    style={open ? { borderColor: 'var(--accent-color)' } : {}}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                      aria-expanded={open}
                    >
                      <span className="font-medium font-display">{f.q}</span>
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform ${open ? 'rotate-45' : ''}`}
                        style={{ backgroundColor: open ? 'var(--accent-color)' : 'color-mix(in srgb, var(--accent-color) 15%, transparent)', color: open ? '#fff' : 'var(--accent-color)' }}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <p className={`px-5 pb-5 text-sm leading-relaxed ${surfaceMuted}`}>{f.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={`mt-10 p-6 rounded-2xl text-center glass-card`}>
              <p className="text-sm mb-3">Still have questions?</p>
              <Button
                onClick={() => setActiveTab('contact')}
                className="rounded-full text-white shadow-lg"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                Get in touch <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </TabContent>

        {/* == CONTACT == */}
        <TabContent id="contact" active={activeTab} className="py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Let's Work Together</h2>
              <p className="text-slate-400 mt-4 max-w-lg mx-auto">Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.</p>
            </div>
            <Card className="glass-card max-w-2xl mx-auto">
              <CardContent className="p-8">
                {contactSent ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    <Button onClick={() => { setContactSent(false); setFormValues({ name: '', email: '', subject: '', message: '' }) }} variant="outline" className="mt-6 border-white/10 text-white hover:bg-white/5 rounded-full">
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm text-slate-400 mb-1.5 block">Name *</label>
                        <Input
                          placeholder="John Smith"
                          value={formValues.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${formErrors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                        {formErrors.name && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.name}</p>}
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-1.5 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formValues.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`bg-white/5 border-white/10 text-white placeholder:text-slate-500 ${formErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                        {formErrors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Subject</label>
                      <Input
                        placeholder="Project inquiry"
                        value={formValues.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Message *</label>
                      <textarea
                        rows={5}
                        placeholder="Tell me about your project..."
                        value={formValues.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className={`flex w-full rounded-md border bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${formErrors.message ? 'border-red-500 focus-visible:ring-red-500' : 'border-white/10'}`}
                      />
                      {formErrors.message && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{formErrors.message}</p>}
                    </div>
                    <Button onClick={handleSubmit} className="w-full bg-violet-600 hover:bg-violet-700 h-12 rounded-xl">
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick info cards */}
            <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="glass-card rounded-xl p-4 text-center">
                <Mail className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-0.5">Email</p>
                <p className="text-sm font-medium">hello@johndoe.dev</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <MapPin className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-0.5">Location</p>
                <p className="text-sm font-medium">San Francisco, CA</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-0.5">Availability</p>
                <p className="text-sm font-medium">2-3 week lead</p>
              </div>
            </div>

            {/* Social Wall */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--accent-color)' }}>Social Wall</span>
                <h3 className="text-2xl font-bold font-display mt-2">Follow along</h3>
                <p className={`text-sm mt-2 ${surfaceMuted}`}>40K+ followers across ten platforms — pick your favorite.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {socialPlatforms.map(({ icon: Icon, handle, platform, followers, bg, href }) => (
                  <a
                    key={platform}
                    href={href}
                    className="group relative glass-card rounded-xl p-4 transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative flex items-start justify-between mb-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${bg} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <ArrowUpRight className={`w-4 h-4 ${surfaceDim} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <p className="relative font-semibold font-display text-sm">{platform}</p>
                    <p className={`relative text-xs ${surfaceDim} mb-2 truncate`}>{handle}</p>
                    <div className={`relative flex items-center gap-1 text-xs ${surfaceMuted}`}>
                      <TrendingUp className="w-3 h-3" />
                      <span>{followers} followers</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter signup */}
            <div
              className="mt-16 rounded-2xl p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 12%, transparent), color-mix(in srgb, var(--accent-color-2) 10%, transparent))' }}
            >
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ backgroundColor: 'var(--accent-color)' }} />
              <div className="relative max-w-xl mx-auto text-center">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent-color) 20%, transparent)' }}
                >
                  <Mail className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">Get the monthly deep-dive</h3>
                <p className={`text-sm mb-6 ${surfaceMuted}`}>
                  One long post per month on performance, AI, or platform engineering — written for senior engineers. No fluff, unsubscribe anytime.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={newsletterEmail}
                    onChange={(e) => { setNewsletterEmail(e.target.value); if (newsletterStatus !== 'idle') setNewsletterStatus('idle') }}
                    required
                    className={isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500' : 'bg-white border-slate-200'}
                  />
                  <Button type="submit" className="rounded-xl text-white shadow-lg flex-shrink-0" style={{ backgroundColor: 'var(--accent-color)' }}>
                    Subscribe <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
                {newsletterStatus === 'success' && (
                  <p className="text-sm mt-3 flex items-center justify-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> You&apos;re in. Check your inbox to confirm.
                  </p>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-sm mt-3 flex items-center justify-center gap-1.5 text-red-400">
                    <AlertCircle className="w-4 h-4" /> Please enter a valid email address.
                  </p>
                )}
                <p className={`text-xs mt-4 ${surfaceDim}`}>Join 3,200+ engineers reading every issue.</p>
              </div>
            </div>
          </div>
        </TabContent>
      </div>

      {/* ---- Footer ---- */}
      <footer className={`pt-16 pb-8 border-t ${hairline}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <a href="#" className="text-2xl font-bold font-display inline-flex items-center">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, var(--accent-color), var(--accent-color-2))' }}>JD</span>
                <span className={`${isDark ? 'text-white/60' : 'text-slate-500'} font-normal ml-1`}>portfolio</span>
              </a>
              <p className={`text-sm mt-3 max-w-sm ${surfaceMuted} leading-relaxed`}>
                Senior full-stack engineer building performant, beautiful products. Available for freelance work and consulting worldwide.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-5">
                {socialPlatforms.slice(0, 6).map(({ icon: Icon, label, platform, href, bg }) => (
                  <a
                    key={platform}
                    href={href}
                    aria-label={platform}
                    className="group w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.05)' }}
                  >
                    <Icon className={`w-4 h-4 ${surfaceMuted} group-hover:text-white transition-colors`} />
                    <span className={`absolute inset-0 rounded-lg bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`text-xs uppercase tracking-wider font-semibold mb-3 ${surfaceDim}`}>Navigate</h4>
              <ul className="space-y-2">
                {navTabs.map((t) => (
                  <li key={t.id}>
                    <button onClick={() => setActiveTab(t.id)} className={`text-sm ${surfaceMuted} ${isDark ? 'hover:text-white' : 'hover:text-slate-900'} transition-colors`}>
                      {t.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`text-xs uppercase tracking-wider font-semibold mb-3 ${surfaceDim}`}>Legal</h4>
              <ul className="space-y-2 mb-4">
                {['Privacy', 'Terms', 'Cookies', 'Colophon'].map((l) => (
                  <li key={l}><a href="#" className={`text-sm ${surfaceMuted} ${isDark ? 'hover:text-white' : 'hover:text-slate-900'} transition-colors`}>{l}</a></li>
                ))}
              </ul>
              <div className={`text-xs ${surfaceDim} flex items-center gap-1.5`}>
                <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
          <div className={`pt-6 border-t ${hairline} flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${surfaceDim}`}>
            <p>&copy; {new Date().getFullYear()} John Doe. Built with care in San Francisco.</p>
            <div className="flex items-center gap-3">
              <span>Theme: <span className="font-medium" style={{ color: 'var(--accent-color)' }}>{THEMES[theme]?.label}</span></span>
              <span>&middot;</span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`${isDark ? 'hover:text-white' : 'hover:text-slate-900'} transition-colors`}>
                Back to top &uarr;
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ---- ThemeSwitcher ---- */}
      <ThemeSwitcher position="bottom-right" />
    </div>
  )
}

export default App
