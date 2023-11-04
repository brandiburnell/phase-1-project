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
    
    // console.log(breweries);
    // console.log(zipcode);
    console.log(breweries.filter(brew => brew.postal_code.substring(0,5) === zipcode));

}
