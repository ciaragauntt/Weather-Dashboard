
let tempEl = document.getElementById("temp")
let windEl = document.getElementById("wind")
let humidityEl = document.getElementById("humidity")
let UVEl = document.getElementById("UV")
let cityEl = document.getElementById("cityName")
let buttonEl = document.getElementById("search")
let dateEl = document.getElementById("date")
let cloudEl = document.getElementById("cloudicon")
let searchHistoryEl = document.getElementById("searchHistory")
let weatherData = async function(cityName) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=c4f4d8f939cc3b3bf4bab7873fc3e3c4`).then(res => res.json()).then(data => data)
    //console.log(response);
    //console.log(response.coord.lat);
    tempEl.innerHTML = "Temp: " + response.main.temp;
    windEl.innerHTML = "Wind Speed: " + response.wind.speed;
    humidityEl.innerHTML = "Humidity: " + response.main.humidity;
    cityEl.innerHTML = response.name;
    dateEl.innerHTML = moment().format("MM/DD/YYYY");

    //5 day forcast

    let forcastdata = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${response.coord.lat}&lon=${response.coord.lat}&units=imperial&appid=c4f4d8f939cc3b3bf4bab7873fc3e3c4`).then(res => res.json()).then(data => data)
    // console.log(forcastdata)
    let forcastList = forcastdata.list.slice(0, 5)
    console.log(forcastList)
    for (let i = 0; i < forcastList.length; i++) {
        let forcastTempEl = document.getElementById(`temp_${i}`);
        forcastTempEl.innerHTML = "Temperature: " + forcastList[i].main.temp
    }
    for (let i = 0; i < forcastList.length; i++) {
        let forcastWindEl = document.getElementById(`wind_${i}`);
        forcastWindEl.innerHTML = "Wind Speed: " + forcastList[i].wind.speed
    }
    for (let i = 0; i < forcastList.length; i++) {
        let forcastHumidityEl = document.getElementById(`humidity_${i}`);
        forcastHumidityEl.innerHTML = "Humidity: " + forcastList[i].main.humidity
    }
    for (let i = 0; i < forcastList.length; i++) {
        let forcastDateEl = document.getElementById(`date_0`);
        forcastDateEl.innerHTML = moment().add(1, 'days').calendar();
        let forcastDateEl1 = document.getElementById(`date_1`);
        forcastDateEl1.innerHTML = moment().add(2, 'days').calendar();
        let forcastDateEl2 = document.getElementById(`date_2`);
        forcastDateEl2.innerHTML = moment().add(3, 'days').calendar();
        let forcastDateEl3 = document.getElementById(`date_3`);
        forcastDateEl3.innerHTML = moment().add(4, 'days').calendar();
        let forcastDateEl4 = document.getElementById(`date_4`);
        forcastDateEl4.innerHTML = moment().add(5, 'days').calendar();
    }
    // for(let i=0; i<forcastList.length; i++){
    //   let forcastCloudEl = document.getElementById('cloudIcon').src
    //   forcastCloudEl.innerHTML=`http://openweathermap.org/img/w/${forcastList[i].weather[0].icon}.png`;
    // }

}
let data = async function (cityName) {
    // let inputvalue = document.getElementById("enterCity").value
    weatherData(cityName);
    //local Storage info
    var new_data = document.getElementById('enterCity').value;
    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', '[]');
    }
    var old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);
    console.log(old_data);
    localStorage.setItem('data', JSON.stringify(old_data));

// add local storage to html as button
loadSearchHistory();

}
function findWeatherDetails(){
    let inputValue = document.getElementById("enterCity").value;
    data(inputValue);
}
function loadSearchHistory() {
    searchHistoryEl.innerHTML = "";
    let cities = JSON.parse(localStorage.getItem('data')) || []
    let ol = document.createElement("ol")
    for(let i=0; i<cities.length; i++){
        let listItem = document.createElement("li")
        listItem.classList.add("no-style")
        let button = document.createElement("button");
        button.classList.add("history");
        button.addEventListener('click', function (e){ 
            console.log(e.target.innerHTML)
            weatherData(e.target.innerHTML)
    } )
        button.innerHTML = cities[i]
        listItem.appendChild(button)
        ol.appendChild(listItem)
    }
    console.log(ol);

    searchHistoryEl.append(ol);

    var historyButtons = document.querySelectorAll(".history");
    for(var i=0; i < historyButtons.length; i++) {
        historyButtons[i].style.backgroundColor = "grey";
        historyButtons[i].style.width = "100%";
        historyButtons[i].style.padding = "10px";
        historyButtons[i].style.display = "center";
    }
}

// get the color to change with the UV index

loadSearchHistory();

buttonEl.addEventListener("click", findWeatherDetails);