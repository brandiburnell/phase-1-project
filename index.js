// 
document.addEventListener("DOMContentLoaded", () => {

    // compile list of all breweries in CO
    // getCOBreweryDataBreweryData()
});

function getCOBreweryData() {
    
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
        });
        pageNum++;
    }
    // console.log(coBreweryInfo);

    return coBreweryInfo;
}