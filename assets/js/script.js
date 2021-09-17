let city;
var apiKey = "12524a4796d1cd5b9b5d525171960baf";
var date = moment().format("(M/D/YY)")

let citySaved =  JSON.parse(localStorage.getItem("cities"));

// Check if data is in local storage
function onOpen() {
    if (JSON.parse(localStorage.getItem("cities")) == null) {
        console.log("It's null");
        let citySavedLocal = [];
        window.citySaved = citySavedLocal;
        return citySaved;
    }
    else {
        var citySavedLocal = JSON.parse(localStorage.getItem("cities"));
        window.citySaved = citySavedLocal;
        return citySaved;
    }
}

// Check if data is in local storage, write previous search array
onOpen();
previousSearch();

// Search button click
$(".search-button").on("click", function (){
    city = $(".form-input").val().trim();
    console.log(city);
    if (city === '') {
        return;
    }
    else {
        city = city[0].toUpperCase() + city.substring(1);
        $(".form-input").val("");
        var saveDiv = document.getElementById("saved");
        saveDiv.parentNode.removeChild(saveDiv);
        var newSaveDiv = document.createElement("div");
        newSaveDiv.setAttribute("id", "saved");
        newSaveDiv.setAttribute("class", "saved");
        document.getElementById("interactive-side").appendChild(newSaveDiv);
        arrayCheck();
        previousSearch();
        apiFetch();
    }
});

// Check array, clear duplicates
function arrayCheck() {
    citySaved = window.citySaved;
    console.log("City is " + city);
    console.log(citySaved);
    console.log(citySaved.indexOf(city));
    if (citySaved.indexOf(city) === -1) {
        citySaved.unshift(city);
        localStorage.setItem("cities",JSON.stringify(citySaved));
        console.log(citySaved);
    }
    else if (citySaved.indexOf(city) > -1) {
        console.log("repeat");
        for (i = 0; i < citySaved.length; i++) {
            if (citySaved[i] === city) {
                citySaved.splice(i, 1);
                citySaved.unshift(city);
                localStorage.setItem("cities",JSON.stringify(citySaved));
                console.log(citySaved);
            }
        }
    }
}

// Write Saved items, establish button click for prev items
function previousSearch() {
    if (citySaved == null) {
        return;
    }
    else {
        for (i = 0; i < 10; i++) {
            // var citySavedStore = JSON.parse(localStorage.getItem("cities"));
            var citySavedStore = citySaved;
            var searchText = citySavedStore[i];
            //console.log(searchText);
            if (citySavedStore[i] == null) {
                return;
            }
            else {
                var prevSearchButt = document.createElement("button");
                prevSearchButt.addEventListener("click", apiFetchPrev);
                prevSearchButt.setAttribute("class", "prev-search-butt")
                prevSearchButt.innerHTML = citySavedStore[i];
                document.getElementById("saved").appendChild(prevSearchButt);
            }
        }
    }
}

//Fetch data for new search item
function apiFetch() {
    // Write a fetch request to the Giphy API
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey)
    .then(function(response){
        return response.json();
    }).then(function(response) {
        cityLong = response.coord.lon;
        console.log("The longitude is " + cityLong);
        cityLat = response.coord.lat;
        console.log("The latittued is " + cityLat);
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+cityLat+"&lon="+cityLong+"&exclude=minutely,hourly,daily,alerts&units=imperial&appId="+apiKey)
        .then(function(result){
            return result.json();
        }).then(function(result){
            cityIcon = result.current.weather[0].icon;
            cityIconImage = "http://openweathermap.org/img/wn/" + cityIcon + "@2x.png";
            statusImg = document.createElement("img");
            statusImg.setAttribute("id", "current-icon");
            statusImg.setAttribute("src", cityIconImage);
            cityTemp = result.current.temp;
            cityHum = result.current.humidity;
            cityUV = result.current.uvi;
            cityWind = result.current.wind_speed;
            $("#current-location").html(city + " " + date + " ");
            $("#current-location").append(statusImg);
            $("#temp").html("Temp: " + cityTemp + "&deg; F");
            $("#wind").html("Wind: " + cityWind + " MPH");
            $("#humidity").html("Humidity: " + cityHum + "%");
            $("#uv-index").html(" " + cityUV + " ");
            if (cityUV < 2.99 ) {
                document.getElementById("uv-index").style.backgroundColor = 'green';
                document.getElementById("uv-index").style.color = 'white';
            }
            else if (cityUV >= 3 & cityUV <= 5.99) {
                document.getElementById("uv-index").style.backgroundColor = 'yellow';   
                document.getElementById("uv-index").style.color = 'black';             
            }
            else if (cityUV >= 6 & cityUV <= 7.99) {
                document.getElementById("uv-index").style.backgroundColor = 'orange';
                document.getElementById("uv-index").style.color = 'black'; 
            }
            else if (cityUV >= 8 & cityUV <= 10.99) {
                document.getElementById("uv-index").style.backgroundColor = 'red';
                document.getElementById("uv-index").style.color = 'black'; 
            }
            else if (cityUV >= 11) {
                document.getElementById("uv-index").style.backgroundColor = 'purple';
                document.getElementById("uv-index").style.color = 'white';
            }
        });
        fetch("https://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&cnt=5&units=imperial&appid="+apiKey)
        .then(function(result){
            return result.json();
        }).then(function(result){
            console.log(result);
        });
    });
}

//Fetch data for prev search items
function apiFetchPrev() {
    city = $(this).html();
    // Api main call code should work if placed after here no need to modify??
    apiFetch();
}