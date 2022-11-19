function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayTemperature(response) {
	console.log(response.data);

	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(response.data.temperature.current);

	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = response.data.city;

	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.condition.description;

	let feelsLike = Math.round(response.data.temperature.feels_like);
	let feelsLikeElement = document.querySelector("#feelsLike");
	feelsLikeElement.innerHTML = `Feels like: ${feelsLike}°C`;

	let humidity = Math.round(response.data.temperature.humidity);
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = `Humidity: ${humidity}%`;

	let wind = Math.round(response.data.wind.speed);
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = `Wind: ${wind} km/h`;

	let dateElement = document.querySelector("#date");
	dateElement.innerHTML = formatDate(response.data.time * 1000);

	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute("src", response.data.condition.icon_url);
	iconElement.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
	let apiKey = "2afbc670a6b48bo2065e3872ftab04ec";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}

function showCurrentLocation(position) {
	console.log(position.coords.longitude);
	console.log(position.coords.latitude);
	let lon = position.coords.longitude;
	let lat = position.coords.latitude;
	let apiKey = "a31f78f87t560f5753c48d67dbo90d74";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let LocateButton = document.querySelector("#locate-button");
LocateButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
