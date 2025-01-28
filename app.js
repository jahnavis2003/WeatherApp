let weather = {
    "apiKey": "d1ae8fa1fdca1ad4e9ece0f188c8e7d7",
    "unsplashApiKey":"Wa02PsHlD2TKsC3Czq13yi6qiOh3kowaTPmuKPdnrP4",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid="
        + this.apiKey
        ).then((response) => response.json())
         .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const{temp,humidity} = data.main;
        const{speed} = data.wind;
        // console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        
    },
   
    fetchBackGround: function(city) {
        fetch("https://api.unsplash.com/search/photos?client_id="+this.unsplashApiKey+"&query="+city+"&orientation=landscape").then((response) => response.json()).then((data) => this.displayBackground(data));
    },
    displayBackground: function(data) {
        const {regular} = data.results[1].urls;
        console.log(regular);
        document.body.style.backgroundImage = "url('"+regular+"')";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
        this.fetchBackGround(document.querySelector(".search-bar").value);
    }
    
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Tokyo");