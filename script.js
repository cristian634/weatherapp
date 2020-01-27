
var tempEl = $("#temperature");
var humidityEl = $("#humidity");
var windEl = $("#windSpeed");
var uvEl = $("#uvIndex");
var searchEl = $("#searchArea");
var previousEl = $("#previousSearches");
var searchBoxEl = $("#searchBox");
var cityTitleEl = $("cityTitle");

var previousSearchesArray=[];
$(document).ready(function(){
    var storedItems = JSON.parse(localStorage.getItem("previousSearchesArray"));
    console.log(storedItems);
    for (i=0; i < storedItems.length; i++){
        previousEl.append($("<li>").append($("<button>")).text(storedItems[i]));
    }

    $("#searchButton").on("click", function(){
        event.preventDefault();
    
        console.log("search clicked");
        var newEntry = searchBoxEl.val();
        previousEl.append($("<li>").append($("<button>")).text(newEntry));
    
        var q = searchBoxEl.val();
        previousSearchesArray.push(q);
        localStorage.setItem("previousSearchesArray", JSON.stringify(previousSearchesArray));
        searchBoxEl.val("");
        var setings = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.openweathermap.org/data/2.5/forecast?q="+q+"&cnt=6&APPID=47a19ca76ca4ea61a61737d5c4cea0d9", 
            "method": "GET"
            // "url": "https://openweathermap.org/api&APPID=47a19ca76ca4ea61a61737d5c4cea0d9&q=Denver"
        
           
        }
        $.ajax(setings).done(function (respone) {
            var city = respone.city.name;
            var tempF = parseFloat(((respone.list[0].main.temp - 273.15)*1.8)+32).toFixed(2); 
            var humid = respone.list[0].main.humidity;
            var wind = respone.list[0].wind.speed;
            
            cityTitleEl.text(city);
            tempEl.text(tempF + "F");
            humidityEl.text(humid +"%");
            windEl.text(wind + "MPH");
    
            console.log();
            console.log(respone);
            for (i = 1; i < respone.list.length; i++){
                var newCard = $("<di>").attr("class", "card").attr("style","width: 18rem;");
                var newUl = $("<ul>").attr("list-group list-group-flush");
                var newLi = $("<li>").attr("list-group-item");
                var newTemp = parseFloat(((respone.list[i].main.temp - 273.15)*1.8)+32).toFixed(2)
                var newHumidity = respone.list[i].main.humidity;
                newCard.append(newUl);
                newCard.append(newLi).text("Temp: "+newTemp+"F");
                newCard.append(newLi).text("Humidity: "+newHumidity+"%");
                $("#forecast").append(newCard)
            }
            // console.log(respone)
        })
    });
});

