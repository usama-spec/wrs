const addressInput = document.getElementById("address");
const suggestions = document.getElementById("suggestions");
const searchBtn = document.getElementById("searchBtn");
const latInput = document.getElementById("lat");
const lonInput = document.getElementById("lon");
const weatherInfo = document.getElementById("weatherInfo");
const emptyData = document.getElementById("empty-data");
function getWeatherIcon(code) {
    if (code === 0) {
        return "<img src='./assets/weather/clear.svg' alt='Clear' />";
    }
    if (code >= 1 && code <= 3) {
        return "<img src='./assets/weather/clouds.svg' alt='Cloudy' />";
    }
    if (code >= 45 && code <= 48) {
        return "<img src='./assets/weather/atmosphere.svg' alt='Fog' />";
    }
    if (code >= 51 && code <= 57) {
        return "<img src='./assets/weather/drizzle.svg' alt='Drizzle' />";
    }
    if (code >= 61 && code <= 67) {
        return "<img src='./assets/weather/rain.svg' alt='Rain' />";
    }
    if (code >= 71 && code <= 77) {
        return "<img src='./assets/weather/snow.svg' alt='Snow' />";
    }
    if (code >= 80 && code <= 82) {
        return "<img src='./assets/weather/rain.svg' alt='Rain Showers' />";
    }
    if (code >= 85 && code <= 86) {
        return "<img src='./assets/weather/snow.svg' alt='Snow Showers' />";
    }
    if (code >= 95 && code <= 99) {
        return "<img src='./assets/weather/thunderstorm.svg' alt='Thunderstorm' />";
    }
   return "<img src='./assets/weather/atmosphere.svg' alt='Weather' />";
}
addressInput.addEventListener("input", async () => {
    const query = addressInput.value.trim();
    if (!query || query.length <= 3) {
        suggestions.innerHTML = "";
        suggestions.classList.add("hidden");
        return;
    }
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
        )}&addressdetails=1&limit=5`;
        const res = await fetch(url);
        const data = await res.json();
        suggestions.innerHTML = "";
        suggestions.classList.remove("hidden");
        suggestions.classList.add("flex");
        data.forEach(item => {
            const div = document.createElement("div");
            div.className =
                "cursor-pointer p-3 rounded-lg suggation-list hover:bg-white/20 transition text-sm text-slate-200";
            div.dataset.lat = item.lat;
            div.dataset.lon = item.lon;
            div.innerText = item.display_name;
            suggestions.appendChild(div);
        });
    } catch (err) {
        console.error("Location error:", err);
    }
});
suggestions.addEventListener("click", (e) => {
    if (!e.target.classList.contains("suggation-list")) return;
    addressInput.value = e.target.innerText;
    latInput.value = e.target.dataset.lat;
    lonInput.value = e.target.dataset.lon;
    suggestions.classList.add("hidden");
    suggestions.innerHTML = "";
});
searchBtn.addEventListener("click", async () => {
    const lat = latInput.value;
    const lon = lonInput.value;
    if (!lat || !lon) {
        alert("Please select a location from suggestions");
        return;
    }
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const res = await fetch(url);
        const data = await res.json();
        const weather = data.current_weather;
        const icon = getWeatherIcon(weather.weathercode);
        emptyData.classList.add("hidden");
        weatherInfo.classList.remove("hidden");
        weatherInfo.innerHTML = `
    <div class="flex flex-col items-center gap-6">
        <h2 class="text-2xl font-semibold tracking-wide">
            ${addressInput.value}
        </h2>
        <div class="weather-icon">
            ${getWeatherIcon(weather.weathercode)}
        </div>
        <div class="text-6xl font-bold">
            ${weather.temperature}°
            <span class="text-2xl font-medium">C</span>
        </div>
        <div class="flex gap-8 text-slate-300 text-sm">
            <div>
                <span class="block text-slate-400">Wind</span>
                ${weather.windspeed} km/h
            </div>
            <div>
                <span class="block text-slate-400">Direction</span>
                ${weather.winddirection}°
            </div>
        </div>
        <div class="text-xs text-slate-400 mt-2">
            Updated: ${new Date(weather.time).toLocaleString()}
        </div>
    </div>
`;
    } catch (err) {
        console.error("Weather error:", err);
    }
});
document.addEventListener("click", (e) => {
    if (!e.target.closest("#address") && !e.target.closest("#suggestions")) {
        suggestions.classList.add("hidden");
    }
});