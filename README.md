# 🏗️ Civil Engineer AI Planner

**Professional Civil Engineering & Architecture Planning Application**

## Features

✅ **Plot Input & Configuration**
- Length, Width, Direction (N/E/S/W)
- Budget Planning
- Real-time Area Calculation

✅ **AI Room Suggestions**
- Intelligent room layout based on plot size
- Compact, Medium, Spacious configurations
- Area optimization

✅ **Vastu Compliance Checker**
- 10-point Vastu analysis
- Compliance scoring (0-100%)
- Room positioning recommendations
- Direction-based improvements

✅ **2D Floor Plan Generator**
- Canvas-based visualization
- Color-coded rooms
- Dimension display
- PNG export

✅ **3D Visualization**
- Three.js 3D modeling
- Interactive camera controls
- Room visualization
- Labels and dimensions
- PNG export

✅ **Cost Estimator**
- Material calculation (Cement, Bricks, Steel, Sand, Gravel)
- Labor cost estimation
- 15% contingency buffer
- Cost per sq.meter
- Budget comparison

✅ **PDF Report Export**
- Complete project report
- All visualizations included
- Professional formatting

✅ **Dark UI Dashboard**
- Modern dark theme
- Responsive design
- Smooth animations
- Easy navigation

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **3D Visualization**: Three.js
- **PDF Export**: html2pdf.js, jsPDF
- **Desktop**: Electron
- **Image Processing**: html2canvas

## Installation

```bash
# Install dependencies
npm install

# Start development
npm start

# Build for Windows
npm run build-win
```

## Usage

1. **Input Plot Details**: Enter length, width, direction, and budget
2. **Generate Layout**: Click to create AI suggestions
3. **Check Vastu**: Analyze Vastu compliance
4. **View Plans**: See 2D and 3D visualizations
5. **Estimate Costs**: Get detailed cost breakdown
6. **Export Report**: Download PDF with all details

## Project Structure

```
civil-engineer-ai-app/
├── main.js              # Electron main process
├── preload.js           # Electron preload script
├── package.json         # Dependencies
├── src/
│   ├── index.html       # Main UI
│   ├── styles.css       # Styling
│   ├── app.js           # Core logic
│   ├── aiPlanner.js     # AI room suggestions
│   ├── vastuCalc.js     # Vastu checker
│   ├── canvas2d.js      # 2D floor plan
│   ├── canvas3d.js      # 3D visualization
│   └── costEstimator.js # Cost calculation
└── README.md
```

## Key Features Explained

### AI Room Suggestion
- Analyzes plot area
- Suggests optimal room configuration
- Calculates built-up percentage
- Optimizes space usage

### Vastu Compliance
- Checks 10 key Vastu principles
- Gives weighted scoring
- Provides recommendations
- Shows compliance percentage

### Cost Estimation
- Calculates material quantities needed
- Uses standard construction rates
- Includes labor costs
- Adds contingency buffer
- Compares with budget

### 3D Visualization
- Interactive camera controls
- Drag to rotate
- Color-coded rooms
- Real-time rendering

## Building for Windows

This app is optimized for Windows desktop:

```bash
npm run build-win
```

Output will be in `dist/` folder.

## Future Enhancements

- [ ] 360° panoramic view
- [ ] Material supplier integration
- [ ] Budget optimization AI
- [ ] Structural analysis
- [ ] Lighting simulation
- [ ] Multi-floor support
- [ ] Team collaboration
- [ ] Cloud sync

## License

MIT License - Feel free to use and modify

## Support

For issues and suggestions, create an issue on GitHub.

---

**Made with ❤️ for Civil Engineers & Architects**