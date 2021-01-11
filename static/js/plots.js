let date = data.map(d=>d.date)
console.log(date)
//  Check your filtered movie titles.
let general = data.map(d=>d.INPC_GRAL)
console.log(general)

let telecom = data.map(d=>d.INPC_TELECOM)
console.log(telecom)

let empaquetamiento = data.map(d=>d.INPC_PQT)

// 4. Use the map method with the arrow function to return all the filtered movie metascores.
let trace1 ={
    x: date,
    y: general,
    type: "line",
    name: "INPC"
}
//  Check your filtered movie metascores.

let trace2 ={
    x: date,
    y: telecom,
    type: "line",
    name: "IPSTEL"
}

let trace3 ={
    x: date,
    y: empaquetamiento,
    type: "line",
    name: "IPSEMPQ"
}


let data1 = [trace1, trace2, trace3];

// 5. Create your trace.
let layout = {
    title : "Índices de precios: Consumidor (INPC),  Telecomunicaciones (IPSTEL) y Servicios Empaquetados (IPSEMPQ)"
}

// 6. Create the data array for our plot
Plotly.newPlot("line-plot", data1, layout);
