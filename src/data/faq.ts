import { FAQItem } from '../types/chat';

export const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What services does DFFRNT offer?',
    answer: 'We offer comprehensive digital marketing services including graphic design, web development, digital marketing, brand strategy, video production, and UI/UX design. Our team specializes in creating innovative solutions that help brands stand out in the digital landscape.',
    category: 'Services',
    keywords: ['services', 'what do you do', 'offerings', 'capabilities'],
    helpful: 45,
    notHelpful: 2
  },
  {
    id: '2',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while comprehensive branding projects can take 6-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
    category: 'Process',
    keywords: ['timeline', 'how long', 'duration', 'time', 'project length'],
    helpful: 38,
    notHelpful: 1
  },
  {
    id: '3',
    question: 'What are your pricing models?',
    answer: 'We offer flexible pricing models including project-based pricing, monthly retainers, and hourly rates depending on your needs. Each project is unique, so we provide custom quotes after understanding your specific requirements. Contact us for a free consultation and quote.',
    category: 'Pricing',
    keywords: ['price', 'cost', 'pricing', 'how much', 'budget', 'rates'],
    helpful: 52,
    notHelpful: 3
  },
  {
    id: '4',
    question: 'Do you work with international clients?',
    answer: 'Yes! While we\'re based in Lilongwe, Malawi, we work with clients globally. We use modern communication tools and project management systems to ensure seamless collaboration regardless of location and time zones.',
    category: 'General',
    keywords: ['international', 'global', 'remote', 'worldwide', 'location'],
    helpful: 29,
    notHelpful: 0
  },
  {
    id: '5',
    question: 'What makes DFFRNT different from other agencies?',
    answer: 'Our "different thinking" approach combines strategic insights with creative innovation. We don\'t just create beautiful designs – we develop solutions that drive real business results. Our team brings diverse expertise and a deep understanding of both local and global markets.',
    category: 'About',
    keywords: ['different', 'unique', 'why choose', 'advantage', 'special'],
    helpful: 41,
    notHelpful: 1
  },
  {
    id: '6',
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Absolutely! We offer various support packages including website maintenance, content updates, performance monitoring, and technical support. We believe in building long-term partnerships with our clients.',
    category: 'Support',
    keywords: ['support', 'maintenance', 'ongoing', 'after', 'help'],
    helpful: 35,
    notHelpful: 2
  },
  {
    id: '7',
    question: 'Can you help with social media marketing?',
    answer: 'Yes, social media marketing is one of our core services. We create comprehensive social media strategies, manage your accounts, create engaging content, run targeted ad campaigns, and provide detailed analytics to track performance.',
    category: 'Digital Marketing',
    keywords: ['social media', 'facebook', 'instagram', 'twitter', 'marketing'],
    helpful: 33,
    notHelpful: 1
  },
  {
    id: '8',
    question: 'What information do you need to start a project?',
    answer: 'To get started, we need to understand your business goals, target audience, budget range, timeline, and any specific requirements. We\'ll schedule a consultation call to discuss your project in detail and provide a customized proposal.',
    category: 'Process',
    keywords: ['start', 'begin', 'requirements', 'information needed', 'consultation'],
    helpful: 27,
    notHelpful: 0
  }
];

export const faqCategories = [
  'All',
  'Services',
  'Process',
  'Pricing',
  'General',
  'About',
  'Support',
  'Digital Marketing'
];