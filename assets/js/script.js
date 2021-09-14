let city;
let citySaved = [];

// Search
$(".search-button").on("click", function (){
    city = $(".form-input").val();
    console.log(city);
    arrayCheck();
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


