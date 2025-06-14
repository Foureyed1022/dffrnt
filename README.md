# DFFRNT - Creative Marketing Agency Website

## Overview

DFFRNT is a modern, responsive marketing website for a creative agency based in Lilongwe, Malawi. The site showcases the agency's services, portfolio, team, and brand identity through an engaging, interactive web experience. Built with React and featuring smooth animations, the website demonstrates the agency's commitment to innovative digital solutions.

## Features

### Core Functionality
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Interactive Hero Section** - Dynamic particle animation background with canvas
- **Service Showcase** - Comprehensive overview of agency services with animated cards
- **Portfolio Gallery** - Filterable project showcase with detailed case studies
- **Team Profiles** - Interactive team member cards with modal details
- **Client Testimonials** - Social proof section with customer feedback
- **Contact Integration** - Contact form with Google Maps integration
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions

### Technical Features
- **Single Page Application (SPA)** - React Router for seamless navigation
- **Performance Optimized** - Lazy loading and optimized assets
- **SEO Friendly** - Proper meta tags and semantic HTML structure
- **Accessibility** - WCAG compliant design patterns
- **Modern UI/UX** - Clean, professional design with consistent branding

## Tech Stack

### Frontend
- **React 18.3.1** - Component-based UI library
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router DOM 6.18.0** - Client-side routing
- **Framer Motion 10.12.16** - Animation library
- **TailwindCSS 3.4.1** - Utility-first CSS framework

### UI Components & Icons
- **Lucide React 0.344.0** - Modern icon library
- **React Intersection Observer 9.5.2** - Scroll-based animations

### 3D Graphics (Optional Enhancement)
- **Three.js 0.153.0** - 3D graphics library
- **React Three Fiber 8.13.4** - React renderer for Three.js
- **React Three Drei 9.77.0** - Useful helpers for R3F

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dffrnt-website.git
   cd dffrnt-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── home/            # Home page specific components
│   │   ├── Hero.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── TeamSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   └── ContactSection.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/              # Generic UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Container.tsx
│       ├── Logo.tsx
│       ├── Section.tsx
│       ├── SectionTitle.tsx
│       └── Badge.tsx
├── data/                # Static data and content
│   ├── services.ts
│   ├── portfolio.ts
│   ├── team.ts
│   └── testimonials.ts
├── pages/               # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── PortfolioDetail.tsx
│   ├── Team.tsx
│   └── Contact.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## Usage

### Navigation
- Use the header navigation to access different sections
- Mobile-responsive hamburger menu for smaller screens
- Smooth scrolling between sections on the home page

### Portfolio Filtering
- Click category buttons to filter portfolio items
- Click on any portfolio item to view detailed case study
- Use the back button to return to the portfolio overview

### Team Interaction
- Scroll horizontally through team member cards
- Click on any team member to view their detailed profile
- Close modal by clicking outside or using the X button

### Contact Form
- Fill out the contact form to send inquiries
- View office location on the integrated Google Maps
- Access contact information and social media links

## Development Workflow

### Phase 1: Planning & Design (Week 1)
- ✅ Brand identity and color scheme definition
- ✅ Wireframing and UI/UX design
- ✅ Component architecture planning
- ✅ Technology stack selection

### Phase 2: Foundation Setup (Week 1)
- ✅ Project initialization with Vite + React + TypeScript
- ✅ TailwindCSS configuration and custom theme setup
- ✅ Folder structure and component organization
- ✅ Routing setup with React Router

### Phase 3: Core Development (Week 2-3)
- ✅ Header and navigation implementation
- ✅ Hero section with particle animation
- ✅ Service cards with hover animations
- ✅ Portfolio gallery with filtering
- ✅ Team section with modal interactions
- ✅ Contact form and map integration

### Phase 4: Enhancement & Polish (Week 3-4)
- ✅ Framer Motion animations implementation
- ✅ Responsive design optimization
- ✅ Performance optimization
- ✅ SEO and accessibility improvements
- ✅ Cross-browser testing

### Phase 5: Deployment (Week 4)
- ✅ Production build optimization
- ✅ Netlify deployment configuration
- ✅ Domain setup and SSL configuration
- ✅ Performance monitoring setup

## Environment Variables

This project currently doesn't require any environment variables for basic functionality. However, if you plan to integrate additional services, you may need:

```env
# Optional: Analytics tracking
VITE_GA_TRACKING_ID=your_google_analytics_id

# Optional: Contact form backend
VITE_CONTACT_API_URL=your_contact_form_endpoint

# Optional: CMS integration
VITE_CMS_API_KEY=your_cms_api_key
```

## Known Issues / Limitations

### Current Limitations
- Contact form is currently frontend-only (no backend integration)
- Portfolio images are placeholder images from Pexels
- No content management system integration
- Limited SEO optimization for individual portfolio pages

### Technical Debt
- Some components could be further modularized
- Animation performance could be optimized for lower-end devices
- Image optimization and lazy loading could be enhanced

### Browser Compatibility
- Tested on modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Internet Explorer not supported
- Some animations may be reduced on devices with limited processing power

## Contributing Guidelines

We welcome contributions to improve the DFFRNT website! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards
- Follow the existing TypeScript and React patterns
- Use meaningful component and variable names
- Maintain consistent code formatting with ESLint
- Write responsive, accessible code
- Test your changes across different screen sizes

### Pull Request Process
- Ensure your code passes all linting checks
- Update documentation if you're changing functionality
- Provide a clear description of your changes
- Include screenshots for UI changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements / Credits

### Libraries & Frameworks
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library

### Design Resources
- [Pexels](https://www.pexels.com/) - Stock photography
- [Google Fonts](https://fonts.google.com/) - Typography (Inter & Montserrat)
- [Unsplash](https://unsplash.com/) - Additional imagery

### Development Tools
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [ESLint](https://eslint.org/) - Code linting
- [Netlify](https://www.netlify.com/) - Deployment platform

### Inspiration
- Modern agency websites and design trends
- Malawian cultural elements and local business needs
- Contemporary web animation and interaction patterns

---

**Live Site:** [https://cozy-semifreddo-7ad620.netlify.app](https://cozy-semifreddo-7ad620.netlify.app)

**Built with ❤️ by the DFFRNT Team in Lilongwe, Malawi**