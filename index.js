// 
document.addEventListener("DOMContentLoaded", () => {

    // compile list of all breweries in CO
    // getCOBreweryDataBreweryData()

    // Take user input and display breweries that meet search criteria
    document.querySelector("#brewery-search-form").addEventListener("submit", e => {
        e.preventDefault();
        //console.log(e.target[0].value);
        getBreweries(e);
    });
});

// function getCOBreweryData() {
//     let pageNum = 1;
//     const coBreweryInfo = [];
//     // loop through brewery data until list length is less than 50
//     // loop through CO brewery data to develop list of all colorado breweries
//     while(pageNum < 10) {
//         fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=colorado&page=${pageNum}&per_page=$50`)
//         .then(res => res.json())
//         .then(data => {
//             // console.log(data.length);
//             coBreweryInfo.push(...data);
//         });
//         pageNum++;
//     }
//     // console.log(coBreweryInfo);

//     return coBreweryInfo;
// }

function getBreweries(e) {
    let pageNum = 1;
    const coBreweryInfo = [];
    // loop through brewery data until list length is less than 50
    // loop through CO brewery data to develop list of all colorado breweries
    while(pageNum < 10) {
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_state=colorado&page=${pageNum}&per_page=$50`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.length);
            coBreweryInfo.push(...data);
            if (coBreweryInfo.length > 400) {
                filterBreweries(e, coBreweryInfo);
            }
        });
        pageNum++;
    }
}

function filterBreweries(e, breweries) {
    let city = e.target[0].value;
    let zipcode = e.target[1].value;
    let type = e.target[2].value;

    console.log(type);

    console.log(e);
    // console.log(breweries);
    // console.log(zipcode);
    
    // filter depending on what was entered
    if (city) {
        breweries = handleUserFilter("city", city, breweries);
        console.log(breweries);
    }
    if (zipcode) {
        breweries = handleUserFilter("postal_code", zipcode, breweries);
        console.log(breweries);
    }
    if (type !== "select") {
        breweries = handleUserFilter("brewery_type", type, breweries);
        console.log(breweries);
    }
    // const filteredBreweries = breweries.filter(brew => brew.postal_code.substring(0,5) === zipcode);
    // console.log(breweries);

    // add breweries to the DOM that meet search criteria
    displayFilteredBreweries(breweries);

}

function handleUserFilter(searchTerm, userInput, breweries) {
    // maybe change this to switch statements?
    if (searchTerm === "postal_code") {
        return breweries.filter(brew => brew[searchTerm].substring(0,5) === userInput);
    }
    else {
        return breweries.filter(brew => brew[searchTerm] === userInput);
    }
}

function displayFilteredBreweries(filteredBreweries) {
    // loop through breweries and add them to the DOM
    filteredBreweries.forEach(brew => {
        let li = document.createElement("li");
        li.textContent = brew.name;
        document.querySelector("#filtered-brewery-names").appendChild(li);
    })
}
