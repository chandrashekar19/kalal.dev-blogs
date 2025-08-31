# Kalal Tech Blog Application

A modern, responsive tech blog application built with React, TypeScript, and Tailwind CSS. Features a clean design with dark/light mode support, category filtering, search functionality, and beautiful code syntax highlighting.

## ✨ Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 🔍 **Search & Filter** - Find articles by title, content, or category
- 🎨 **Syntax Highlighting** - Beautiful code blocks with proper formatting
- 📝 **Markdown Support** - Rich content rendering with GitHub Flavored Markdown
- 🏷️ **Category System** - Organize posts by technology and topics
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Markdown**: React Markdown with syntax highlighting
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives with custom styling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd kalal-tech-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── BlogCard.tsx    # Blog post card component
│   ├── CategoryFilter.tsx
│   └── SearchBar.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Home page with blog list
│   ├── BlogDetail.tsx  # Individual blog post page
│   └── NotFound.tsx
├── data/               # Mock data and content
│   └── mockBlogData.ts
├── mock/               # Blog content in markdown
│   └── blogs/
│       └── tech/       # Tech category posts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Images and static assets
```

## 📝 Adding New Blog Posts

1. **Create markdown file**
   ```bash
   # Add your post to src/mock/blogs/tech/your-post.md
   ```

2. **Update blog data**
   Add post metadata to `src/data/mock.ts`:
   ```typescript
   {
     id: 'unique-id',
     title: 'Your Post Title',
     excerpt: 'Brief description...',
     content: 'your-post.md',
     author: 'Author Name',
     date: '2024-01-01',
     category: 'category-name',
     readTime: 5,
     image: '/path/to/image.jpg'
   }
   ```

## 🎨 Customization

### Design System
The app uses a comprehensive design system defined in:
- `src/index.css` - CSS custom properties and base styles
- `tailwind.config.ts` - Tailwind configuration with custom tokens


## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Other Platforms
The built files in the `dist/` folder can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


## 🙏 Acknowledgments.

- UI components inspired by [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
