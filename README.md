# Ashkon Abazary - Portfolio

A modern, interactive portfolio website showcasing my projects, skills, and professional experience. Built with Next.js 15, React, and Three.js for stunning 3D visuals and animations.

![Portfolio Preview](public/assets/akon.jpg)

## 🚀 Tech Stack

### Core
- **Next.js 15** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### 3D & Animation
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Framer Motion** - Animation library

### Tools & Deployment
- **ESLint** - Code linting
- **Vercel** - Deployment platform

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aabazary/akonPortfolio.git
   cd akonPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
akonPortfolio/
├── public/
│   └── assets/
│       ├── icons/           # Technology icons
│       ├── projects/        # Project screenshots
│       ├── credentials/     # Certificates and credentials
│       └── data/
│           ├── projects.json
│           └── technologies.json
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AboutSection.tsx
│   │   ├── AnimatedName.tsx
│   │   ├── BouncingBalls.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FullScreenProjectCard.tsx
│   │   ├── HeroSection.tsx
│   │   ├── OtherProjectCard.tsx
│   │   ├── PhysicsBallPit.tsx
│   │   ├── ProjectActionButton.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ScrollIndicator.tsx
│   │   ├── TechnologyBadge.tsx
│   │   └── TypewriterText.tsx
│   └── styles/
│       └── theme.css
└── package.json
```

## 🎨 Key Components

### HeroSection
Landing page with animated name, typewriter effect, and interactive 3D ball pit background.

### AboutSection
Biography, credentials carousel, and technology stack display with expandable bio.

### ProjectsSection
- **Featured Projects**: First 5 projects with full-screen cards
- **Other Projects**: Remaining projects in a responsive grid
- Viewport-height based sizing for optimal display

### ContactSection
Email copy functionality, social links (GitHub, LinkedIn), and interactive bouncing balls background.

### Reusable Components
- **ProjectActionButton**: Customizable buttons for project links
- **TechnologyBadge**: Display technology icons with labels
- **FullScreenProjectCard**: Large format project showcase
- **OtherProjectCard**: Compact project card for grid layout

## 📝 Customization

### Contact Information
Edit `src/components/ContactSection.tsx`:
```typescript
const CONTACT_INFO = {
  email: 'your.email@example.com',
  location: 'Your City, State',
  socials: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
  },
  tagline: 'Your custom tagline here!',
};
```

### Projects
Edit `public/assets/data/projects.json`:
```json
{
  "id": 1,
  "img": "/assets/projects/your-project.jpg",
  "title": "Your Project Name",
  "desc": "Project description",
  "github_link": "https://github.com/...",
  "live_link": "https://...",
  "technologies": [
    "/assets/icons/react.svg",
    "/assets/icons/nodejs.svg"
  ]
}
```

### Technologies
Edit `public/assets/data/technologies.json`:
```json
{
  "name": "Technology Name",
  "icon": "/assets/icons/technology.svg"
}
```


## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: 1024px - 1280px (3 columns)
- **Extra Large**: > 1280px (4 columns for project grids)

## 🎯 Performance Optimizations

- Image optimization with Next.js Image component
- Dynamic imports for heavy 3D components
- Viewport-based rendering with Framer Motion
- CSS-in-JS with Tailwind for minimal bundle size
- React 19 compiler optimizations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

**Ashkon Abazary**

- Portfolio: [akonabazary.com](https://akonabazary.com)
- Email: aabazary@gmail.com
- GitHub: [@aabazary](https://github.com/aabazary)
- LinkedIn: [Ashkon Abazary](https://www.linkedin.com/in/ashkon-abazary/)


**Built with ❤️ by Ashkon Abazary**
