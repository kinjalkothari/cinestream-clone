# 🎬 CineStream

![CineStream Cover Image](https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop)

CineStream is a production-grade, Netflix-inspired OTT (Over-The-Top) platform built entirely with vanilla web technologies (HTML, CSS, JavaScript) without any external frameworks. It demonstrates a deep understanding of DOM manipulation, client-side state management, responsive UI/UX design, and modular JavaScript architecture.

## ✨ Key Features

- **Multi-Profile System:** Netflix-style "Who's watching?" screen with isolated user sessions and customized avatars.
- **AI-Powered "Mood" Discovery:** A simulated NLP feature where users can type their mood (e.g., "I want something dark and thrilling") to dynamically filter and recommend content.
- **Client-Side State Persistence:** Utilizes `localStorage` to save individual profile data, including watchlists, star ratings, and watch progress.
- **Smart "Continue Watching":** Interacting with a title automatically simulates watch progress and generates a dynamic "Continue Watching" row with progress bars.
- **Real YouTube Trailer Integration:** Interactive modals that embed and auto-play actual HD trailers for popular movies and TV shows.
- **Debounced Autocomplete Search:** Instant filtering across titles, genres, and cast members without lag.
- **Glassmorphism UI & Theming:** Premium dark-mode interface with frosted glass effects, smooth micro-animations, and a fully functional light-mode toggle.

## 🛠️ Tech Stack

- **Structure:** Semantic HTML5
- **Styling:** Vanilla CSS3 (CSS Variables, Flexbox, CSS Grid, Keyframe Animations)
- **Logic:** Vanilla JavaScript (ES6+ Modules, DOM Events)
- **Data Storage:** JSON (Simulated local DB) & Browser `localStorage`
- **Icons & Fonts:** FontAwesome 6, Google Fonts (Inter, Bebas Neue)

## 🚀 Live Demo

[Live Demo Link Here] <!-- Replace with your GitHub Pages URL -->

## 💻 How to Run Locally

Because this project relies strictly on vanilla web technologies, no build steps or backend servers are required!

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cinestream-clone.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cinestream-clone
   ```
3. Simply open `index.html` in any modern web browser.
   *(Note: For the best experience, you can also run it through a local server like VS Code's "Live Server" extension).*

## 🧠 Architecture Highlights

- **No Frameworks:** Proves foundational knowledge of JavaScript mechanics rather than relying on React/Vue abstractions.
- **Modular Design:** Logic is separated by concern (`auth.js`, `home.js`, `profiles.js`, `data.js`) avoiding monolithic spaghetti code.
- **Event Delegation:** Used efficiently for dynamic elements like dynamically generated movie cards and search results.
