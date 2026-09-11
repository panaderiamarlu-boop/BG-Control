const API = "https://script.google.com/macros/s/AKfycbzRo0LE3qL2Ys7VSegBxvMtls4IjiCyOkymYkrjgxokWlgKWcUpuQ85pUrLM0MuQpSoiw/exec";



fetch(API + "?accion=productos")


.then(res => res.json())


.then(data => {


console.log(data);



document.getElementById("totalProductos").innerHTML = data.length;



let alertas = 0;

let valor = 0;



data.forEach(producto=>{


let stock = Number(producto["STOCK ACTUAL"]);

let minimo = Number(producto["STOCK MINIMO"]);

let costo = Number(producto["COSTO UNITARIO"]);



valor += stock * costo;



if(stock <= minimo){

alertas++;

}


});



document.getElementById("totalAlertas").innerHTML = alertas;



document.getElementById("valorInventario").innerHTML =

"$ " + valor.toLocaleString("es-CO");



cargarInventario(data);



})


.catch(error=>{


console.error(
"Error conectando API:",
error
);


});
