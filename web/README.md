# Civil Engineer AI Planner - Web Version

🌐 **Live Web Application** for Civil Engineering & Architecture Planning

## Features

✅ **Plot Input Panel**
- Length, Width, Direction inputs
- Budget planning
- Real-time area calculations
- Plot type detection

✅ **AI Room Suggestions**
- Intelligent layout suggestions
- Compact, Medium, Spacious configurations
- Area optimization
- Built-up percentage calculation

✅ **Vastu Compliance Checker**
- 10-point Vastu analysis
- Percentage scoring
- Detailed recommendations
- Color-coded compliance status

✅ **2D Floor Plan Generator**
- Canvas-based visualization
- Color-coded rooms
- Real-time drawing
- PNG export capability

✅ **3D Visualization**
- Three.js interactive 3D models
- Drag-to-rotate camera controls
- Room visualization with labels
- PNG export

✅ **Cost Estimator**
- Material calculations (Cement, Bricks, Steel, Sand, Gravel)
- Labor cost estimation
- 15% contingency buffer
- Budget comparison
- Detailed breakdown

## Tech Stack

- **Frontend**: React 18
- **3D**: Three.js
- **Build**: Create React App / Vite
- **Styling**: CSS3
- **Export**: html2canvas, jsPDF

## Installation

```bash
cd web

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Development

```bash
# Start dev server (runs on http://localhost:3000)
npm start

# Or with Vite
npm run dev
```

## Build

```bash
# Production build
npm run build

# Output in build/ folder
```

## Project Structure

```
web/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Sidebar.js/css
│   │   ├── PlotInput.js/css
│   │   ├── RoomSuggestions.js/css
│   │   ├── VastuChecker.js/css
│   │   ├── FloorPlan2D.js/css
│   │   ├── FloorPlan3D.js/css
│   │   └── CostEstimator.js/css
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Usage

1. **Enter Plot Details** - Length, Width, Direction, Budget
2. **Get AI Suggestions** - Auto room layout recommendations
3. **Check Vastu** - Analyze Vastu compliance
4. **View Plans** - See 2D and 3D visualizations
5. **Calculate Costs** - Get detailed material & cost breakdown
6. **Export** - Download images and reports

## Deployment

### Netlify
```bash
npm run build
# Deploy 'build' folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy 'build' folder to Vercel
```

### GitHub Pages
```bash
# Update package.json with "homepage": "https://yourusername.github.io/repo"
npm run build
```

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## License

MIT License

---

**Built with ❤️ for Civil Engineers & Architects**