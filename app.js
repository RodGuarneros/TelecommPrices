
// Assign the data from `data.js` to a descriptive variable
let sightings = data;
let finaltable = null;

// selecting all the tbody elements (sights)
let sights = d3.select("tbody")
let filtered = 0;

// Select the button
let button = d3.select("#filter-btn");

// Select the form
let form = d3.select("#form");

const jsonDownload = d3.select("#download-json");
const csvDownload = d3.select("#download-csv");

// Create event handlers (what happen when user clicks the botton)
button.on("click", runEnter);
form.on("submit",runEnter);
//-------------------------------------
// fill by default the table with all data, this could be inpractical if we have a lot of objects, but in this case is ok
sightings.forEach(a => {
    let rowinit = sights.append("tr")
    for(i in a){
        rowinit.append("td").text(a[i]);
    }
});
//-------------------------------------
// Complete the event handler function for the filter form
function runEnter() {

// Prevent the page from refreshing
    d3.event.preventDefault();
// flag th table is filtered
    filtered = 1;
  
// new filtering based on every inputValue but evaluating full conditions  
    // let filteredData = sightings.filter(sight => (sight.datetime === d3.select("#datetime").property("value")) && 
    //     (sight.city === d3.select("#city").property("value").toLowerCase()) &&
    //     (sight.state === d3.select("#state").property("value").toLowerCase()) &&
    //     (sight.country === d3.select("#country").property("value").toLowerCase()) &&
    //     (sight.shape === d3.select("#shape").property("value").toLowerCase()) &&
    //     (sight.duration === d3.select("#duration").property("value").toLowerCase()) &&
    //     (sight.comments === d3.select("#comments").property("value").toLowerCase()));

// stablish the reference of fields and get the values entered by the user (inputs)
    let dateUser =  d3.select("#date").property("value");
// stablishing a selective filter to take in to account only entered values by the user
if(dateUser){
    
    filtered = 1;

    let userInputs = [["date", dateUser]];
    let inputsExist = userInputs.filter(input => input[1] !== "");
    let final = inputsExist.map(m => "row." + m[0] + " == " + "'" + m[1] + "'").join(" && ");

    finaltable = sightings.filter(row => eval(final));
// wipe out the tbody to be able to write out new table
    sights.html("")

// Loop so as to fill the table with every element in filteredData
    finaltable.forEach(d =>{
        let cell = sights.append("tr")
        for(x in d){
            cell.append("td").text(d[x]);
        }
    }); 
}; 

}

// defining reference to the button reset
let reset = d3.select("#reset-btn")
// Create event handlers 
reset.on("click", resetFilter);

// reset table to original display
function resetFilter(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // reset the form
    document.getElementById("form").reset();
    // flag that table is not filtered
    filtered = 0;
    // wipe out the tbody to be able to write out new table
    sights.html("");
    // fill in observations only where date matches user input
    sightings.forEach(a => {
        let rowinit = sights.append("tr")
        for(i in a){
            rowinit.append("td").text(a[i]);
        }
    });
}

// define what happens when user clicks the button
button.on("click", filterObs);
reset.on("click", resetData);
jsonDownload.on("click", downloadJSON);
csvDownload.on("click", downloadCSV);

// download query results as CSV file
function arrayToCSV(objArray) {
    let csv = '';
    let header = Object.keys(objArray[0]).join(',');
    let values = objArray.map(o => Object.values(o).join(',')).join('\n');

    csv += header + '\n' + values;
    return csv;
}

// return full table or filtered table
function tableReturned(filtered_val){
    if (filtered_val){
        return finaltable;
    } else {
        return sightings;
    }
}

// download query results as CSV file
function downloadCSV(){
    let jsonFile = tableReturned(filtered);
    let csvDownloadFile = arrayToCSV(jsonFile);

    let blob = new Blob([csvDownloadFile], {
        type: "text/plain;charset=utf-8"
    });

    saveAs(blob, "precios.csv");
}

// download query results as JSON file
function downloadJSON(){
    let jsonDownloadFile = tableReturned(filtered);

    let blob = new Blob([JSON.stringify(jsonDownloadFile,undefined,2)], {
        type: "application/json"
    });

    saveAs(blob, "precios.json");
}

// run filterObs function if Enter key is pressed
function enterFilterObs(){
    if (d3.event.keyCode == 13){
        filterObs();
    }
}



// alternatively allow user to just hit Enter to filter for any field
d3.selectAll(".form-control").on("keyup",enterFilterObs);

