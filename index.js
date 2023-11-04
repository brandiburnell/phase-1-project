// 
document.addEventListener("DOMContentLoaded", () => compileBreweryData());


function fetchData() {
    fetch("https://api.openbrewerydb.org/v1/breweries")
        .then(res => res.json())
        .then(data => console.log(data));
}

function compileBreweryData() {

    fetch("https://api.openbrewerydb.org/v1/breweries?by_state=colorado")
    .then(res => res.json())
    .then(data => console.log(data));
}