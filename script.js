let tempEl = document.getElementById("temp")
let windEl = document.getElementById("wind")
let humidityEl = document.getElementById("humidity")
let UVEl = document.getElementById("UV")
let cityEl = document.getElementById("cityName")
let buttonEl = document.getElementById("search")
let data = async function (){
    let inputvalue = document.getElementById("enterCity").value
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=c4f4d8f939cc3b3bf4bab7873fc3e3c4`).then(res=>res.json()).then(data=>data)
    //console.log(response);
    //console.log(response.coord.lat);
    tempEl.innerHTML = response.main.temp;
    windEl.innerHTML = response.wind.speed;
    humidityEl.innerHTML = response.main.humidity;
    cityEl.innerHTML = response.name;
    let forcastdata = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${response.coord.lat}&lon=${response.coord.lat}&appid=c4f4d8f939cc3b3bf4bab7873fc3e3c4`).then(res=>res.json()).then(data=>data)
    // console.log(forcastdata)
    let forcastList = forcastdata.list.slice(0, 5)
    console.log(forcastList)
    for(let i=0; i<forcastList.length; i++){
        let forcastTempEl = document.getElementById(`temp_${i}`);
        forcastTempEl.innerHTML= "Temperature " + forcastList[i].main.temp
    }
}
//call all things by id in html

//get moment.js to work with the dates

// get the weather for today to display

// get the weather for the 5 day forcast to display

// get the color to change with the UV index

// get the city to save into local storage and display 

buttonEl.addEventListener("click", data)