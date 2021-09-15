let city;
let citySaved = [];

// Search
$(".search-button").on("click", function (){
    city = $(".form-input").val().trim();
    console.log(city);
    if (city == null) {
        return;
    }
    else {
        city = city[0].toUpperCase() + city.substring(1);
        $(".form-input").val("");
        arrayCheck();
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


