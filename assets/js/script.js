let city;
// let citySaved = [];

let citySaved =  JSON.parse(localStorage.getItem("cities"));
console.log(JSON.parse(localStorage.getItem("cities")));

// Check if data is in local storage
function onOpen() {
    if (JSON.parse(localStorage.getItem("cities")) == null) {
        console.log("It's null");
        let citySavedLocal = [];
        window.citySaved = citySavedLocal;
        console.log(window.citySaved);
        return citySaved;
    }
    else {
        var citySavedLocal = JSON.parse(localStorage.getItem("cities"));
        window.citySaved = citySavedLocal;
        console.log("It's something");
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
    }
});

// Prev search button clicked, call to api
$(".prev-search-butt").on("click", function (){
    city = $(this).html();
    console.log(city);
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

// Write Saved items
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
                prevSearchButt.setAttribute("class", "prev-search-butt")
                prevSearchButt.innerHTML = citySavedStore[i];
                document.getElementById("saved").appendChild(prevSearchButt);
            }
        }
    }
}
