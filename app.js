/*
=====================================
 BG CONTROL
 APP.JS CORE v2

 Conexión principal:
 Vercel
    ↓
 Apps Script
    ↓
 Google Sheets
=====================================
*/


const API = "https://script.google.com/macros/s/AKfycbzRo0LE3qL2Ys7VSegBxvMtls4IjiCyOkymYkrjgxokWlgKWcUpuQ85pUrLM0MuQpSoiw/exec";





// ===================================
// INICIO DE APLICACIÓN
// ===================================


document.addEventListener(
"DOMContentLoaded",
()=>{


cargarDashboard();


});







// ===================================
// CARGAR DASHBOARD
// ===================================


function cargarDashboard(){



mostrarCarga();



fetch(
API + "?accion=productos"
)



.then(
respuesta=>{


if(!respuesta.ok){

throw new Error(
"Error conectando API"
);

}


return respuesta.json();


}

)



.then(
productos=>{


actualizarDashboard(productos);


cargarInventario(productos);



mostrarConexion(true);


}

)



.catch(
error=>{


console.error(
"Error:",
error
);



mostrarConexion(false);



mostrarError();


}

);



}








// ===================================
// ACTUALIZAR TARJETAS
// ===================================


function actualizarDashboard(productos){



let total = productos.length;


let alertas = 0;


let valor = 0;





productos.forEach(
producto=>{



let stock =
Number(producto["STOCK ACTUAL"]);



let minimo =
Number(producto["STOCK MINIMO"]);



let costo =
Number(producto["COSTO UNITARIO"]);





valor +=
stock * costo;





if(stock <= minimo){

alertas++;

}


}

);





document.getElementById(
"totalProductos"
).innerHTML = total;




document.getElementById(
"totalAlertas"
).innerHTML = alertas;





document.getElementById(
"valorInventario"
).innerHTML =

"$ " +
valor.toLocaleString(
"es-CO"
);





}









// ===================================
// ESTADO API
// ===================================


function mostrarConexion(
estado
){



let indicador =
document.querySelector(
".status"
);



if(!indicador){

return;

}



if(estado){



indicador.innerHTML =
`

<span></span>

Conectado

`;



}

else{



indicador.innerHTML =
`

<span style="background:#FF3B30"></span>

Sin conexión

`;



}



}









// ===================================
// CARGA
// ===================================


function mostrarCarga(){



let tabla =
document.getElementById(
"productos"
);



if(tabla){



tabla.innerHTML =

`

<tr>

<td colspan="5">

Cargando inventario...

</td>

</tr>

`;



}


}









// ===================================
// ERROR
// ===================================


function mostrarError(){



let tabla =
document.getElementById(
"productos"
);



if(tabla){



tabla.innerHTML =

`

<tr>

<td colspan="5">

⚠️ No fue posible cargar inventario

</td>

</tr>

`;



}


}
