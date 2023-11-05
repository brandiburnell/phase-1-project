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
        // let li = document.createElement("li");
        // li.textContent = brew.name;
        // document.querySelector("#filtered-brewery-names").appendChild(li);
        createBreweryCard(brew);
    })
}

function createBreweryCard(brewery) {
    let brewDiv = document.createElement("div");
    brewDiv.className = "card";

    // add brewery name
    let brewName = document.createElement("h2");
    brewName.textContent = brewery.name;
    brewDiv.appendChild(brewName);

    // add address
        let address1 = document.createElement("p");
        if (brewery.address_1) {
            address1.textContent = brewery.address_1;
        }
        else {
            address1.textContent = "No address information found";
        }
        brewDiv.appendChild(address1);
    
    if (brewery.address_2) {
        let br = document.createElement("br");
        brewDiv.appendChild(br);
        let address2 = document.createElement("p");
        address2.textContent = brewery.address_2;
        brewDiv.appendChild(address2);
    } 
    if (brewery.address_3) {
        let address3 = document.createElement("p");
        address3.textContent = brewery.address_3;
        brewDiv.appendChild(address3);
    }


    // add city
    let br = document.createElement("br");
    brewDiv.appendChild(br);

    let brewCity = document.createElement("p");
    brewCity.textContent = brewery.city;
    brewDiv.appendChild(brewCity);

    // add state
    brewDiv.appendChild(br);
    let brewState = document.createElement("p");
    brewState.textContent = brewery.state_province;
    brewDiv.appendChild(brewState);

    // add phone number
    

    // add visited button
    let btn = document.createElement("button");
    btn.className = "visited-button";
    btn.textContent = "visited";
    brewDiv.appendChild(btn);

    // add button listener

    // add brewery to website
    document.querySelector("#brewery-container").appendChild(brewDiv);
}
