# 🚀 Heel Soni — Modern 3D Developer Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-ff0055?style=for-the-badge&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<br />

**A cutting-edge, interactive 3D developer portfolio showcasing AI/ML engineering, Data Analytics, and Full-Stack development projects.**

[Explore Live Demo](https://paper-pilot-five.vercel.app/) · [Report Bug](https://github.com/HeelSoni/My_Portfolio/issues) · [Request Feature](https://github.com/HeelSoni/My_Portfolio/issues)

</div>

---

## ✨ Features

- 🌌 **Interactive 3D WebGL Canvas**: Built using **Three.js** and **React Three Fiber**, featuring dynamic particle constellations and smooth lighting effects.
- 🎴 **3D Tilt & Parallax Cards**: Interactive mouse-tracking 3D tilt effects with dynamic specular glare on all project and skill cards.
- 📄 **Interactive In-Browser Resume Viewer**: Embedded PDF resume viewer with direct PDF view/download buttons and full experience summary.
- ⚡ **Seamless Contact System**: Full-stack contact form powered by Next.js App Router API endpoints with Nodemailer integration.
- 🎨 **Dark Cyberpunk / Sci-Fi Glassmorphism Aesthetic**: Custom-tailored dark theme with cyan/indigo neon accents, noise texture overlays, and custom cursor animations.
- 📱 **Fully Responsive**: Optimized for ultra-wide displays, laptops, tablets, and mobile devices.
- 🔍 **SEO & Performance Tuned**: OpenGraph meta tags, robots.txt, sitemap.xml, and dynamic font optimization.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), Glassmorphism, CSS Custom Properties |
| **3D & Canvas** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/), Lenis Smooth Scroll |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend & Email** | Next.js Server Route Handlers, [Nodemailer](https://nodemailer.com/) |

---

## 📂 Project Structure

```text
heel_portfolio/
├── app/
│   ├── api/
│   │   └── contact/         # Contact form API route (Nodemailer)
│   ├── resume/              # Interactive resume page & PDF viewer
│   ├── globals.css          # Core design system tokens & animations
│   ├── layout.tsx           # Root layout with providers & metadata
│   ├── page.tsx             # Main landing page
│   ├── robots.ts            # SEO Robots configuration
│   └── sitemap.ts           # Dynamic sitemap generator
├── components/
│   ├── canvas/              # 3D Three.js canvas & WebGL shaders
│   │   ├── DataConstellation.tsx
│   │   ├── HeroScene.tsx
│   │   └── HeroFallbackCanvas.tsx
│   ├── providers/           # Smooth scroll & theme providers
│   ├── sections/            # Portfolio sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── JourneySection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── Achievements.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   └── ui/                  # Reusable UI components
│       ├── CustomCursor.tsx
│       ├── MagneticButton.tsx
│       ├── Navbar.tsx
│       ├── SectionHeader.tsx
│       ├── TechMarquee.tsx
│       └── TiltCard.tsx
├── data/
│   └── portfolio.ts         # Centralized portfolio data & content
└── public/
    ├── Heel_Soni_Resume.pdf # Resume PDF
    ├── heel_photo.png       # Profile portrait
    └── og-image.png         # Social share preview
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.17 or later recommended)
- [npm](https://www.npmjs.com/) / [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/HeelSoni/My_Portfolio.git
cd My_Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables (Optional)

Create a `.env.local` file in the root directory if you want to enable the live contact form email delivery:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CONTACT_RECEIVER=heelsoni01@gmail.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 📬 Contact & Connect

- **Heel Soni** — AI/ML Developer & Data Analyst
- **GitHub**: [@HeelSoni](https://github.com/HeelSoni)
- **Portfolio**: [Heel Soni Portfolio](https://github.com/HeelSoni/My_Portfolio)
- **Email**: [heelsoni01@gmail.com](mailto:heelsoni01@gmail.com)

---

<div align="center">
  <sub>Designed & Developed with ❤️ by Heel Soni</sub>
</div>
