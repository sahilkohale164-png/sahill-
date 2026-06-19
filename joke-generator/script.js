let currentJoke = '';
let jokeCount = 0;
let jokesHistory = [];
let selectedCategory = 'any';

// API Endpoints
const JOKE_APIS = {
    any: 'https://official-joke-api.appspot.com/random_joke',
    general: 'https://official-joke-api.appspot.com/jokes/general/random',
    programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
    'knock-knock': 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
};

// Fallback API (JokeAPI)
const JOKE_API_BACKUP = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

// Get random joke from API
async function getRandomJoke() {
    const getJokeBtn = document.getElementById('getJokeBtn');
    const loading = document.getElementById('loading');
    const jokeContent = document.getElementById('jokeContent');
    const shareBtn = document.getElementById('shareBtn');
    const copyBtn = document.getElementById('copyBtn');

    // Disable button and show loading
    getJokeBtn.disabled = true;
    loading.style.display = 'block';
    jokeContent.style.opacity = '0.5';

    try {
        let joke = null;
        const apiUrl = JOKE_APIS[selectedCategory];

        // Try primary API
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();

            // Handle array response (for category endpoints)
            if (Array.isArray(data)) {
                joke = data[0];
            } else {
                joke = data;
            }
        } catch (error) {
            console.log('Primary API failed, trying backup...');
            // Try backup API
            const response = await fetch(JOKE_API_BACKUP);
            if (!response.ok) throw new Error('Backup API Error');
            const data = await response.json();
            joke = data;
        }

        // Format joke
        if (joke) {
            // Handle Official Joke API format
            if (joke.setup && joke.delivery) {
                currentJoke = `${joke.setup}\n\n${joke.delivery}`;
            }
            // Handle JokeAPI format
            else if (joke.type === 'twopart') {
                currentJoke = `${joke.setup}\n\n${joke.delivery}`;
            } else if (joke.joke) {
                currentJoke = joke.joke;
            } else {
                currentJoke = 'No joke text available';
            }

            // Update display
            jokeContent.textContent = currentJoke;
            jokeContent.style.opacity = '1';

            // Show share and copy buttons
            shareBtn.style.display = 'inline-block';
            copyBtn.style.display = 'inline-block';

            // Update counter and history
            jokeCount++;
            document.getElementById('counter').textContent = jokeCount;
            addToHistory(currentJoke);

            // Show success message
            showMessage('😂 Joke loaded successfully!', 'success');
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeContent.textContent = '❌ Failed to load joke. Please try again!';
        jokeContent.style.opacity = '1';
        showMessage('Error loading joke: ' + error.message, 'error');
    } finally {
        // Re-enable button and hide loading
        getJokeBtn.disabled = false;
        loading.style.display = 'none';
    }
}

// Add joke to history
function addToHistory(joke) {
    // Truncate joke if too long
    const truncatedJoke = joke.length > 100 ? joke.substring(0, 100) + '...' : joke;
    jokesHistory.unshift(truncatedJoke);

    // Keep only last 10 jokes
    if (jokesHistory.length > 10) {
        jokesHistory.pop();
    }

    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    if (jokesHistory.length === 0) {
        historyList.innerHTML = '<li>No jokes yet</li>';
        return;
    }

    jokesHistory.forEach((joke, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${joke}`;
        historyList.appendChild(li);
    });
}

// Share joke
function shareJoke() {
    if (!currentJoke) return;

    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Check out this joke! 😂',
            text: currentJoke,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard and show message
        copyToClipboard();
        showMessage('Joke copied to clipboard! Share it manually.', 'success');
    }
}

// Copy joke to clipboard
function copyToClipboard() {
    if (!currentJoke) return;

    navigator.clipboard.writeText(currentJoke).then(() => {
        showMessage('✅ Joke copied to clipboard!', 'success');
    }).catch(err => {
        showMessage('❌ Failed to copy joke', 'error');
        console.error('Error copying:', err);
    });
}

// Update category
function updateCategory() {
    selectedCategory = document.getElementById('categorySelect').value;
    console.log('Category changed to:', selectedCategory);
}

// Show temporary message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;

    const jokeCard = document.querySelector('.joke-card');
    const existingMessage = jokeCard.querySelector('.success, .error');
    if (existingMessage) {
        existingMessage.remove();
    }

    jokeCard.appendChild(messageDiv);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Auto-load joke on page load
window.addEventListener('load', () => {
    getRandomJoke();
});

// Keyboard shortcut: Press Space to get new joke
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.activeElement === document.body) {
        e.preventDefault();
        getRandomJoke();
    }
});

console.log('🎲 Joke Generator loaded! Press Space to get a new joke.');
console.log('Available APIs:');
console.log('- Official Joke API:', JOKE_APIS.any);
console.log('- JokeAPI Backup:', JOKE_API_BACKUP);