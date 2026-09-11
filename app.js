const API = "https://bg-control-six.vercel.app";


fetch(API+"?accion=productos")


.then(res=>res.json())


.then(data=>{


document.getElementById("totalProductos").innerHTML=data.length;


let alertas=0;
let valor=0;

let filas="";


data.forEach(producto=>{


let stock=Number(producto["STOCK ACTUAL"]);

let minimo=Number(producto["STOCK MINIMO"]);

let costo=Number(producto["COSTO UNITARIO"]);



valor += stock*costo;



if(stock<=minimo){

alertas++;

}



filas+=`

<tr>

<td>${producto.NOMBRE}</td>

<td>${producto.CATEGORIA}</td>

<td>${stock} ${producto.UNIDAD}</td>

<td>${minimo}</td>

</tr>

`;


});



document.getElementById("totalAlertas").innerHTML=alertas;


document.getElementById("valorInventario").innerHTML=

"$ "+valor.toLocaleString("es-CO");



document.getElementById("productos").innerHTML=filas;


});
