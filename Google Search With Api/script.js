const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions-list');
const searchBtn = document.getElementById('search-btn');
let debounceTimer;
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const query = searchInput.value.trim();
    if (query.length > 0) {
        debounceTimer = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);
    } else {
        hideSuggestions();
    }
});
async function fetchSuggestions(query) {
    try {
        const response = await fetch(`https://cloudsearch.googleapis.com/v1/query/suggest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                requestOptions: {
                    searchApplicationId: 'searchapplications/default'
                }
            })
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        const suggestions = (data.suggestResults || []).map(res => res.suggestedQuery);
        displaySuggestions(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions from Cloud Search:', error);
    }
}
function displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    suggestionsList.innerHTML = '';
    suggestions.slice(0, 6).forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> ${suggestion}`;
        div.onclick = () => {
            searchInput.value = suggestion;
            performSearch(suggestion);
        };
        suggestionsList.appendChild(div);
    });
    suggestionsList.classList.add('active');
}
function hideSuggestions() {
    suggestionsList.classList.remove('active');
    setTimeout(() => {
        suggestionsList.innerHTML = '';
    }, 300);
}
function performSearch(query) {
    if (!query) query = searchInput.value.trim();
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
}
searchBtn.onclick = () => performSearch();
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        hideSuggestions();
    }
});