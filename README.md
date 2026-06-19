# Civil Engineer AI Planner

Free web-based civil engineering planning tool with AI suggestions, Vastu compliance checker, 2D/3D visualization, and cost estimation.

## 🌐 Live Demo
**[Visit Civil Engineer AI Planner](https://sahilkohale164-png.github.io/sahill-/)**

## Features

### 📐 Plot Input
- Enter plot length and width
- Choose road direction (N/E/S/W)
- Set budget
- Real-time area calculation

### 🧠 AI Room Suggestions
- Automatic room layout based on plot size
- Compact, Medium, Spacious options
- Area optimization
- Built-up percentage calculation

### 🔯 Vastu Compliance Checker
- 10-point Vastu analysis
- Percentage scoring (0-100%)
- Detailed recommendations
- Color-coded compliance status

### 📐 2D Floor Plan
- Canvas-based visualization
- Color-coded rooms
- Direction indicator
- PNG download

### 🎨 3D Visualization
- Interactive 3D models
- Drag to rotate view
- Room labels and dimensions
- PNG export

### 💰 Cost Estimator
- Material calculations:
  - Cement (bags)
  - Bricks (pieces)
  - Steel (kg)
  - Sand (cu.ft)
  - Gravel (cu.ft)
- Labor cost estimation
- 15% contingency buffer
- Budget comparison

## 🎨 Design Features

- 🌙 Dark UI Dashboard
- ⚡ Smooth animations
- 📱 Fully responsive
- 🎯 Intuitive navigation
- ✨ Professional gradients

## 🛠️ Technology Stack

- React 18
- Three.js (3D Graphics)
- Canvas API
- CSS3 (Modern Styling)
- GitHub Pages (Hosting)

## 📦 Installation & Usage

### Local Development

```bash
# Clone repository
git clone https://github.com/sahilkohale164-png/sahill-.git
cd sahill-/web

# Install dependencies
npm install

# Start development server
npm start
```

App will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🚀 How to Use

1. **Enter Plot Details**
   - Plot length (in meters)
   - Plot width (in meters)
   - Road direction
   - Budget amount
   - Click "Generate Layout"

2. **Get AI Suggestions**
   - View auto-generated room layouts
   - See total built-up area
   - Check area breakdown

3. **Check Vastu Compliance**
   - Click "Check Vastu Compliance"
   - Get percentage score
   - Read recommendations

4. **View Floor Plans**
   - **2D Plan**: Traditional top-view drawing
   - **3D View**: Interactive 3D model
   - Drag 3D view to rotate

5. **Calculate Costs**
   - Get material quantity estimates
   - Labor cost calculation
   - Budget comparison
   - Download breakdown

## 💡 Key Features Explained

### AI Room Suggestions
- **Compact Plot** (< 800 m²): 4 rooms
- **Medium Plot** (800-1200 m²): 6 rooms
- **Spacious Plot** (> 1200 m²): 8 rooms

### Vastu Rules Checked
1. North/East entrance
2. Master bedroom in SW
3. Kitchen in SE
4. Living room central
5. Prayer room in NE
6. Toilets away from center
7. Square/rectangular plot
8. Water features in NE
9. Open space on East
10. Level plot without slopes

### Cost Calculation
- Based on standard construction rates
- Current rates (2024-2025):
  - Cement: ₹350/bag
  - Bricks: ₹8/piece
  - Steel: ₹65/kg
  - Labor: ₹150/sq.ft

## 🎯 Vastu Scoring

- **85-100%**: Excellent compliance ✅
- **70-84%**: Good compliance 🟢
- **50-69%**: Average compliance 🟡
- **Below 50%**: Needs improvement 🔴

## 📊 Project Structure

```
sahill-/
├── web/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── PlotInput.js
│   │   │   ├── RoomSuggestions.js
│   │   │   ├── VastuChecker.js
│   │   │   ├── FloorPlan2D.js
│   │   │   ├── FloorPlan3D.js
│   │   │   └── CostEstimator.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
├── main.js (Electron desktop app)
├── preload.js
├── src/ (Desktop app files)
└── README.md
```

## 🌐 Deployment

This app is deployed on **GitHub Pages**

**Live URL**: [https://sahilkohale164-png.github.io/sahill-/](https://sahilkohale164-png.github.io/sahill-/)

### Deploy to Your Own GitHub Pages

1. Fork the repository
2. Enable GitHub Pages in settings
3. Set source to `gh-pages` branch
4. Run: `npm run build && npm run deploy`

## 📱 Browser Support

✅ Chrome/Chromium (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Edge (Latest)
✅ Mobile browsers

## 🔐 Privacy

- ✅ No data collection
- ✅ No tracking
- ✅ All calculations local
- ✅ No internet required after load

## 📝 License

MIT License - Free to use and modify

## 👨‍💻 Author

Sahil Kohale

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: sahilkohale164@gmail.com

---

**Made with ❤️ for Civil Engineers & Architects**

**[🔗 Visit Live Demo](https://sahilkohale164-png.github.io/sahill-/)**