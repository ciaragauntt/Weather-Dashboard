
let tempEl = document.getElementById("temp")
let windEl = document.getElementById("wind")
let humidityEl = document.getElementById("humidity")
let UVEl = document.getElementById("UV")
let cityEl = document.getElementById("cityName")
let buttonEl = document.getElementById("search")
let dateEl = document.getElementById("date")
let cloudEl = document.getElementById("cloudicon")
let data = async function (){
    let inputvalue = document.getElementById("enterCity").value
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&units=imperial&appid=c4f4d8f939cc3b3bf4bab7873fc3e3c4`).then(res=>res.json()).then(data=>data)
    //console.log(response);
    //console.log(response.coord.lat);
    tempEl.innerHTML = "Temp: " + response.main.temp;
    windEl.innerHTML = "Wind Speed: " + response.wind.speed;
    humidityEl.innerHTML ="Humidity: " + response.main.humidity;
    cityEl.innerHTML = response.name;
    dateEl.innerHTML = moment().format("MM/DD/YYYY");

    let forcastdata = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${response.coord.lat}&lon=${response.coord.lat}&units=imperial&appid=c4f4d8f939cc3b3bf4bab7873fc3e3c4`).then(res=>res.json()).then(data=>data)
    // console.log(forcastdata)
    let forcastList = forcastdata.list.slice(0, 5)
    console.log(forcastList)
    for(let i=0; i<forcastList.length; i++){
        let forcastTempEl = document.getElementById(`temp_${i}`);
        forcastTempEl.innerHTML= "Temperature: " + forcastList[i].main.temp
    }
    for(let i=0; i<forcastList.length; i++){
        let forcastWindEl = document.getElementById(`wind_${i}`);
        forcastWindEl.innerHTML = "Wind Speed: " + forcastList[i].wind.speed
    }
    for(let i=0; i<forcastList.length; i++){
        let forcastHumidityEl = document.getElementById(`humidity_${i}`);
        forcastHumidityEl.innerHTML = "Humidity: " + forcastList[i].main.humidity
    }
    for(let i=0; i<forcastList.length; i++){
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
    for(let i=0; i<forcastList.length; i++){
      let forcastCloudEl = document.getElementById('cloudIcon').src
      forcastCloudEl.innerHTML=`http://openweathermap.org/img/w/${forcastList[i].weather[0].icon}.png`;
    }
}
window.localStorage.setItem("cityEl", "data");
localStorage.getItem("cityEl");

//call all things by id in html

//get moment.js to work with the dates

// get the weather for today to display

// get the weather for the 5 day forcast to display

// get the color to change with the UV index

// get the city to save into local storage and display 

buttonEl.addEventListener("click", data)