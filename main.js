const key = '675c4b27f32e49574bb2b3e537188d5f';
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const mainContainer = document.querySelector('.main-container');

form.onsubmit = function (e) {
  e.preventDefault();
  let city = input.value.trim();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const html = `
        <div class="card">
          <span class="card-title"> ${data.name} </span>
          <sup class="country">${data.sys.country}</sup>
          <p class="temp"> ${Math.round(data.main.temp - 276)}&deg;</p>
          <p class="temp-fills">fills like <span class="deg">${Math.round(
            data.main.feels_like - 276
          )}&deg;</span></p>
          <img class="weather-img" src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="cloudy" />
          <p class="desc"> ${data.weather[0].description}</p>
        </div>`;

      mainContainer.innerHTML =
        html +
        '<div class="slider-container"><div class="main-slider"></div></div>';
      input.value = '';
    });

  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const forecasts = data.list;

      const forecastHTML = forecasts
        .map((forecast) => {
          const getMonthName = (month) => {
            const months = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ];
            return months[month];
          };
          const dateTime = new Date(forecast.dt_txt);

          const formattedDateTime = `${dateTime.getDate()} ${getMonthName(
            dateTime.getMonth()
          )}, ${String(dateTime.getHours()).padStart(2, '0')}:${String(
            dateTime.getMinutes()
          ).padStart(2, '0')}`;

          return `
          <div class="forecast-card">
            <p class = "card-date"> ${formattedDateTime}</p>
            <p class = "card-temp"> ${Math.round(
              forecast.main.temp - 276
            )}&deg;C</p>
            <p class = "card-feels">feels ${Math.round(
              forecast.main.feels_like - 276
            )}&deg;C</p>
            <img class = "card-img" src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }.png" alt="weather icon" />
            <p class = "card-desc">${forecast.weather[0].description.replace(
              'description: ',
              ''
            )}</p>
          </div>`;
        })
        .join('');

      document.querySelector('.main-slider').innerHTML = forecastHTML;

      $('.main-slider').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              arrows: false,
            },
          },
        ],
      });
    });
};
