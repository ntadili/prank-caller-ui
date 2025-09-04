# Prankie 🎭

Prankie is a fun web app built with **React** and **Vite** that lets users create and launch prank calls using AI voices.  
The project is currently in development and serves as a playground to practice modern frontend and backend skills.

---

## 🎥 Demo
<p align="center">
  <img src="/public/baseknowledge2.gif" width="600"/>
</p>

---

## 🚀 Tech Stack
- **React 18** + **Vite 5** (fast dev environment with HMR)  
- **Tailwind CSS** (for styling)  
- **Supabase** (authentication & database)  
- **Node.js + Express** (backend integration)  

---

## 📂 Project Structure
```plaintext
client/
 ├─ dist/                  # Production build output
 ├─ node_modules/          # Project dependencies
 ├─ public/                # Static assets (served as-is)
 ├─ src/
 │   ├─ assets/            # Images, icons, and other static assets
 │   ├─ components/        # Reusable UI components
 │   ├─ constants/         # App-wide constants
 │   ├─ hooks/             # Custom React hooks
 │   ├─ pages/             # Page-level views
 │   ├─ styles/            # Global styles (Tailwind entry)
 │   │   └─ index.css
 │   ├─ App.jsx            # Root React component
 │   └─ main.jsx           # App entry point
 ├─ .env                   # Environment variables
 ├─ .gitignore             # Git ignore rules
 ├─ components.json        # UI config (shadcn/ui setup if used)
 ├─ eslint.config.js       # ESLint configuration
 ├─ index.html             # HTML entry file
 ├─ jsconfig.json          # Path aliases + IntelliSense
 ├─ notes.txt              # Dev notes
 ├─ package.json           # Project metadata and dependencies
 ├─ package-lock.json      # Lockfile for dependencies
 ├─ postcss.config.js      # PostCSS configuration
 ├─ tailwind.config.js     # Tailwind configuration
 ├─ vite.config.js         # Vite configuration
 └─ README.md              # Project documentation

📝 Status
Currently building the authentication system with Supabase.