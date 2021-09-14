let city;
let citySaved = [];

// Search
$(".search-button").on("click", function (){
    var city = $(".form-input").val();
    console.log(city);
    arrayCheck();
    console.log(citySaved);
});

function arrayCheck() {
    for (i = 0; i < citySaved.length; i++) {
        console.log(citySaved[i])
        if ($(citySaved[i]).val() != city.val()) {
            citySaved.push(city);
        }
        else if (citySaved[i].val() === city.val()) {
            console.log("Repeat");
        }
    }
}
