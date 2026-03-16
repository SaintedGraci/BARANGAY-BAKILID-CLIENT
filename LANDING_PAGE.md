# Barangay Bakilid Smart System - Landing Page

## Overview
Professional, modern landing page for the Barangay Bakilid Smart System - a government digital platform.

## Design Philosophy
- Professional government platform aesthetic
- Clean and minimal UI with lots of white space
- No cartoon illustrations - professional icons only
- Modern typography and subtle animations
- Designed to look like a professional municipal digital service

## Color Palette
- Primary Green: #1F7A63
- Secondary Blue: #2F6FED
- Background: White / Light Gray
- Text: Gray-900 for headings, Gray-600 for body
- Accent: Neutral colors

## Page Sections

### 1. Navigation Bar
- Sticky header with clean spacing
- Barangay Bakilid logo (bakilid.jpg)
- Navigation links: Home, Announcements, Request Documents, Login
- Mobile-responsive hamburger menu
- Professional spacing and typography

### 2. Hero Section
- Large bold headline: "Digital Services for Barangay Bakilid Residents"
- Professional description of services
- Two CTA buttons: "Request a Document" and "View Announcements"
- Statistics display (500+ Residents, 1,000+ Documents, 24/7 Access)
- Subtle background pattern
- No cartoon elements

### 3. Services Section
- Three professional service cards with line icons:
  - Resident Management (users icon)
  - Request Documents (document icon)
  - Announcements (megaphone icon)
- Clean hover effects with border color change
- Simple, professional design

### 4. Latest Announcements
- Three announcement cards with category badges
- Professional color coding (green, blue, gray)
- Date, title, preview text
- "Read More" links
- "View All Announcements" button

### 5. Call-to-Action Section
- Gradient background (green to blue)
- Professional headline: "Access Barangay Services Online"
- Two CTA buttons: "Login to Portal" and "Request a Document"
- Feature checkmarks highlighting benefits
- Subtle pattern overlay

### 6. Footer
- Barangay branding with logo
- Quick links and services navigation
- Contact information (address, phone, email)
- Social media icons
- Copyright text
- Professional layout

## Design Features
- Modern government digital service aesthetic
- Clean layouts with proper spacing
- Soft shadows and rounded corners (not too rounded)
- Professional line icons (no emojis or cartoon graphics)
- Subtle gradients
- Smooth transitions and hover effects
- Fully responsive design

## Running the Project

```bash
cd brgybakilid_client
npm install
npm run dev
```

Visit http://localhost:3001 to view the landing page.

## Tech Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Professional CSS animations

## Components Structure
```
app/
├── components/
│   ├── Header.tsx       - Professional navigation
│   ├── Hero.tsx         - Clean hero section
│   ├── Services.tsx     - Service cards with line icons
│   ├── Announcements.tsx - Professional announcement cards
│   ├── CTA.tsx          - Call-to-action section
│   └── Footer.tsx       - Professional footer
├── login/
│   └── page.tsx         - Resident login page
├── page.tsx             - Main landing page
├── layout.tsx           - Root layout
└── globals.css          - Global styles with professional animations
```

## Design Inspiration
Similar to professional government digital platforms like:
- GOV.UK
- Singapore Government Services
- Modern municipal websites
- Professional SaaS platforms
