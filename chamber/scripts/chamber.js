// === Hamburger button (adding it here so that it goes across all pages)

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
});


// ==== event listener for page loading
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.id;

  if (page === "home") {
    getWeather();
  }
  if (page === "join") {
    document.querySelectorAll('.mem-card').forEach(card => {
      const modal = card.querySelector('.memberinfo');
      const openBtn = card.querySelector('.modalbtn');
      const closeBtn = card.querySelector('.close');

      openBtn.addEventListener('click', () => {
        modal.showModal();
      });

      closeBtn.addEventListener('click', () => {
        modal.close();
      });
    });
  }
  if (page === "thankyou") {
    thanksMessage();
  }
});



// ====Weather Information
const latitude = 35.7796;
const longitude = -78.6382;
const openMeteoURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=auto`;

async function getWeather() {
  try {
    const response = await fetch(openMeteoURL);
    const data = await response.json();

    displayCurrentWeather(data.current);
    displayForecast(data.daily);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayCurrentWeather(current) {
  const weatherSection = document.querySelector(".current-content");

  const code = current.weather_code;
  const description = weatherCodeMap[code] || "Unknown";
  const iconName = getIconFilename(code);
  const iconPath = `images/${iconName}`;

  weatherSection.innerHTML += `
    <img src="${iconPath}" alt="${description}" width="64" height="64">
    <p>Temperature: ${current.temperature_2m}°F <br> <br> ${description} </p>
  `;
}

function displayForecast(daily) {
  const forecastSection = document.querySelector(".forecast");

  forecastSection.innerHTML = "<h2>3-Day Forecast</h2>";

  for (let i = 0; i < 3; i++) {
    const day = new Date(daily.time[i]).toLocaleDateString("en-US", {
      weekday: "long",
    });

    const desc = weatherCodeMap[daily.weather_code[i]] || "Unknown";

    forecastSection.innerHTML += `
      <div>
        <p><strong>${day}</strong></p>
        <p>${daily.temperature_2m_max[i]}°F</p>
      </div>
    `;
  }
}

const weatherCodeMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight showers",
  81: "Moderate showers",
  82: "Violent showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm with hail"
};

function getIconFilename(code) {
  if ([0].includes(code)) return "weather-sunny.svg"; // Clear sky
  if ([1, 2].includes(code)) return "weather-partly-cloudy.svg"; // Mainly clear, Partly cloudy
  if ([3].includes(code)) return "weather-cloudy.svg"; // Overcast
  if ([45, 48].includes(code)) return "weather-windy.svg"; // Fog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "weather-rainy.svg"; // Rain
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "weather-snowflake.svg"; // Snow
  if ([95, 96, 99].includes(code)) return "weather-lightning.svg"; // Thunderstorm
  if ([56, 57, 66, 67].includes(code)) return "weather-snowflake.svg"; // Freezing drizzle/rain

  return "thermometer-sun.svg"; // Default fallback
}

// Join to Thank You page
function thanksMessage() {
  const data = new URLSearchParams(window.location.search);
  const fname = data.get("fname");
  const lname = data.get("lname");
  const email = data.get("email");
  const mphone = data.get("mphone");
  const org = data.get("orgname");


  document.getElementById("userThanks").textContent = `Welcome, ${fname}! We're glad you joined.`;

  const messageDiv = document.querySelector("#message");

  messageDiv.innerHTML = `
  <h3>Together we will build a brighter and successful future!</h3>
  <p>First Name: ${fname}</p>
  <p>Last Name: ${lname}</p>
  <p>Email: ${email}</p>
  <p>Mobile Phone: ${mphone}</p>
  <p>Organination: ${org}</p>
  `;
}