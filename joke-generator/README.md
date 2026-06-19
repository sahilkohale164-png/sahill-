# 😂 Random Joke Generator

A fun, interactive web application that fetches random jokes from external APIs. Get a laugh with just one click!

## 🎯 Features

✨ **Multiple Joke Categories**
- Any (Random)
- General
- Programming
- Knock-Knock

🎲 **Multiple API Sources**
- Official Joke API (Primary)
- JokeAPI v2 (Backup)
- Automatic fallback if primary fails

📊 **Joke History**
- Keeps track of last 10 jokes
- Easy reference to recently viewed jokes

🔄 **Share & Copy**
- Share jokes on social media
- Copy to clipboard with one click

⌨️ **Keyboard Shortcuts**
- Press Space to get a new joke instantly

🎨 **Beautiful UI**
- Gradient background
- Smooth animations
- Responsive design
- Mobile-friendly

📱 **Mobile Optimized**
- Works on all devices
- Touch-friendly buttons
- Responsive layout

## 🚀 Live Demo

**[Open Joke Generator](../)**

## 🛠️ Technologies Used

- HTML5
- CSS3 (Gradients, Animations, Flexbox)
- JavaScript (Async/Await, Fetch API)
- External APIs:
  - Official Joke API
  - JokeAPI v2

## 📋 How to Use

1. **Open the Application**
   - Open `index.html` in a web browser
   - Or visit the live demo link

2. **Get a Joke**
   - Click "🎲 Get a Joke" button
   - Or press Space key
   - Wait for the joke to load

3. **Select Category** (Optional)
   - Choose from dropdown:
     - Any (Random)
     - General
     - Programming
     - Knock-Knock
   - Next joke will be from selected category

4. **Share or Copy**
   - Click "📤 Share" to share on social media
   - Click "📋 Copy" to copy to clipboard

5. **View History**
   - All recent jokes appear in the sidebar
   - Shows last 10 jokes loaded

## 🔌 API Documentation

### Primary API: Official Joke API

**Endpoints:**
- Random Joke: `https://official-joke-api.appspot.com/random_joke`
- General: `https://official-joke-api.appspot.com/jokes/general/random`
- Programming: `https://official-joke-api.appspot.com/jokes/programming/random`
- Knock-Knock: `https://official-joke-api.appspot.com/jokes/knock-knock/random`

**Response Format:**
```json
{
  "type": "general",
  "setup": "Why don't scientists trust atoms?",
  "punchline": "Because they make up everything!",
  "id": 1
}
```

### Backup API: JokeAPI v2

**Endpoint:** `https://v2.jokeapi.dev/joke/Any`

**Features:**
- Blacklist flags for safe content
- Excludes: NSFW, Religious, Political, Racist, Sexist, Explicit

## 📂 Project Structure

```
joke-generator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ Installation

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahilkohale164-png/sahill-.git
   cd sahill-/joke-generator
   ```

2. **Open in browser**
   - Double-click `index.html`
   - Or use a local server:
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Or use Live Server (VS Code)**
   - Install Live Server extension
   - Right-click `index.html`
   - Select "Open with Live Server"

## 💡 Example Usage

```javascript
// Load a random joke
getRandomJoke();

// Share a joke
shareJoke();

// Copy joke to clipboard
copyToClipboard();

// Change category
selectCategory('programming');
```

## 🎨 UI Components

- **Joke Display Card** - Shows current joke
- **Get Joke Button** - Fetch new joke
- **Share Button** - Share on social media
- **Copy Button** - Copy to clipboard
- **Category Selector** - Choose joke type
- **Joke Counter** - Total jokes loaded
- **History Section** - Recent jokes list
- **Loading Spinner** - Async operation indicator

## ✨ Features Breakdown

### 1. Automatic Fallback
- If Official Joke API fails, JokeAPI v2 is used
- Ensures reliability even if one API is down

### 2. Error Handling
- Catches network errors
- Displays user-friendly error messages
- Console logging for debugging

### 3. Performance
- Loading indicator during API calls
- Disabled button to prevent duplicate requests
- Fade animations for smooth UX

### 4. Accessibility
- Keyboard support (Space key)
- Clear button labels with emojis
- Semantic HTML structure
- Mobile-friendly design

## 🌐 Browser Compatibility

✅ Chrome (Latest)
✅ Firefox (Latest)
✅ Safari (Latest)
✅ Edge (Latest)
✅ Mobile Browsers

## 🔒 Security

- No sensitive data stored
- Uses HTTPS APIs
- No cookies or tracking
- Client-side only processing
- Safe content filtering available

## 📊 Statistics

- **Jokes Loaded**: Counter displays total jokes fetched
- **History Size**: Last 10 jokes saved
- **API Response Time**: ~200-500ms
- **File Size**: ~15KB total

## 🐛 Known Issues & Solutions

### Issue: "Failed to load joke"
**Solution**: 
- Check internet connection
- Try refreshing page
- APIs might be temporarily down
- Clear browser cache

### Issue: Share button not working
**Solution**:
- Some browsers don't support Web Share API
- Use Copy button as alternative
- Works on Chrome, Firefox, Edge (latest versions)

## 🚀 Future Enhancements

- [ ] Dark mode toggle
- [ ] Favorite jokes bookmarking
- [ ] Export jokes as PDF
- [ ] Custom joke submission
- [ ] Multi-language support
- [ ] Joke rating system
- [ ] Random joke of the day
- [ ] Local storage for favorites

## 📞 Support

For issues or suggestions:
- Create an issue on GitHub
- Email: sahilkohale164@gmail.com
- Check API documentation:
  - [Official Joke API](https://github.com/15Dkk/official_joke_api)
  - [JokeAPI](https://jokeapi.dev/)

## 📄 License

MIT License - Free to use and modify

## 🙏 Credits

- **Official Joke API** - Primary data source
- **JokeAPI v2** - Backup data source
- Built with ❤️ for joke lovers

---

**Made with 😂 and ☕**