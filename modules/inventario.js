function cargarInventario(productos){


let tabla = "";


productos.forEach(producto=>{


let stock = Number(producto["STOCK ACTUAL"]);

let minimo = Number(producto["STOCK MINIMO"]);


let estado = "";



if(stock <= minimo){

estado = "🔴 Bajo";

}

else if(stock <= minimo * 1.5){

estado = "🟡 Atención";

}

else{

estado = "🟢 OK";

}



tabla += `

<tr>

<td>${producto.NOMBRE}</td>

<td>${producto.CATEGORIA}</td>

<td>${stock} ${producto.UNIDAD}</td>

<td>${minimo}</td>

<td>${estado}</td>

</tr>

`;


});


document.getElementById("productos").innerHTML = tabla;


}
