import { SiteConfig, Service, TeamMember, Review, WorkflowStep, NewsArticle, ProductionServiceCard } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Yearbook Company",
  description: "A creative digital yearbook company based in Salatiga, Indonesia.",
  url: "https://yearbook.com",
  ogImage: "https://yearbook.com/og.jpg",
  links: {
    twitter: "https://twitter.com/yearbook",
    github: "https://github.com/yearbook",
  },
};

export const services: Service[] = [
  {
    id: "1",
    title: "Digital Yearbooks",
    description: "Interactive and creative digital yearbooks for schools and organizations.",
    icon: "book",
  },
  {
    id: "2",
    title: "Photography",
    description: "Professional photography services for events and portraits.",
    icon: "camera",
  },
];

export const team: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Founder & CEO",
    image: "/images/team/john.jpg",
    bio: "Passionate about capturing memories.",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    author: "Jane Smith",
    role: "Principal, High School",
    content: "The best yearbook we've ever had!",
    rating: 5,
  },
];

export const workflow: WorkflowStep[] = [
  {
    id: "1",
    step: 1,
    title: "Consultation",
    description: "We discuss your vision and requirements.",
  },
  {
    id: "2",
    step: 2,
    title: "Photography & Design",
    description: "We capture photos and design the yearbook layout.",
  },
  {
    id: "3",
    step: 3,
    title: "Review & Print",
    description: "You review the digital copy before we print or publish online.",
  },
];

export const news: NewsArticle[] = [
  {
    id: "1",
    title: "Launching our new Digital Yearbook Platform",
    date: "2024-05-01",
    excerpt: "We are excited to announce our new interactive platform...",
    slug: "launching-digital-yearbook",
    image: "/images/news/launch.jpg",
  },
];

export const productionServices: ProductionServiceCard[] = [
  {
    id: 1,
    title: "Drone Shoot",
    subtitle: "Film Angkatan",
    gradient: "from-[#667eea] to-[#764ba2]",
    overlayTitle: "Sesi Drone Shoot / Formasi Angkatan",
    overlaySubtitle: "Aerial Photography",
  },
  {
    id: 2,
    title: "GM Hub Creative",
    subtitle: "Digital Yearbook",
    gradient: "from-[#e6005c] to-[#ff4081]",
    overlayTitle: "Creative Digital / Yearbook",
    overlaySubtitle: "Interactive Design",
  },
  {
    id: 3,
    title: "Augmented Reality",
    subtitle: "Video BTS",
    gradient: "from-[#4facfe] to-[#00f2fe]",
    overlayTitle: "Augmented / Reality",
    overlaySubtitle: "AR Experience",
  },
  {
    id: 4,
    title: "Exclusive Yearbook",
    subtitle: "Creative Design",
    gradient: "from-[#43e97b] to-[#38f9d7]",
    overlayTitle: "Exclusive / Yearbook",
    overlaySubtitle: "Hardbox Packaging · 3D Tunnel Acrylic",
  },
  {
    id: 5,
    title: "Film Angkatan",
    subtitle: "Creative Concept",
    gradient: "from-[#fa709a] to-[#fee140]",
    overlayTitle: "Film / Angkatan",
    overlaySubtitle: "Cinematic Production",
  },
  {
    id: 6,
    title: "Malam Keakraban",
    subtitle: "Farewell Moment",
    gradient: "from-[#a18cd1] to-[#fbc2eb]",
    overlayTitle: "Makrab / Angkatan",
    overlaySubtitle: "Event Documentation",
  },
];
