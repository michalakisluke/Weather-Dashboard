let city;
let citySaved = [];

// Search
$(".search-button").on("click", function (){
    var city = $(".form-input").val();
    console.log(city);
    arrayCheck();
});

// Check array, clear duplicates
function arrayCheck(citySaved, city) {
    if (citySaved.indexOf(city) === -1) {
        citySaved.push(city);
        console.log(citySaved);
    }
    else if (citySaved.indexOf(city) > -1) {
        console.log("repeat");
    }
}

// function arrayCheck() {
//     for (i = 0; i < citySaved.length; i++) {
//         console.log(citySaved[i])
//         if (citySaved.length = 0) {
//             citySaved[i] = city;
//         }
//         else {
//             if ($(citySaved[i].val()) != $(city.val())) {
//                 citySaved[i] = city;
//             }
//             else if ($(citySaved[i].val()) === $(city.val())) {
//                 console.log("Repeat");
//             }
//         }
//     }
// }
