let city;
let citySaved = [];

// Search
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

// Check array, clear duplicates
function arrayCheck() {
    console.log("City is " + city);
    console.log(citySaved.indexOf(city));
    if (citySaved.indexOf(city) === -1) {
        citySaved.unshift(city);
        console.log(citySaved);
    }
    else if (citySaved.indexOf(city) > -1) {
        console.log("repeat");
        for (i = 0; i < citySaved.length; i++) {
            if (citySaved[i] === city) {
                citySaved.splice(i, 1);
                citySaved.unshift(city);
                console.log(citySaved);
            }
        }
    }
}

// Write Saved items

function previousSearch() {
    for (i = 0; i < 10; i++) {
        var searchText = citySaved[i];
        console.log(searchText);
        if (citySaved[i] == null) {
            return;
        }
        else {
            var prevSearchButt = document.createElement("button");
            prevSearchButt.setAttribute("id", "prev-search-butt")
            prevSearchButt.innerHTML = citySaved[i];
            document.getElementById("saved").appendChild(prevSearchButt);
        }
    }
}


