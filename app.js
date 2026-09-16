/*
=====================================
 BG CONTROL
 APP.JS CORE v4

 Arquitectura:
 Vercel
    ↓
 /api/google
    ↓
 Apps Script
    ↓
 Google Sheets
=====================================
*/


// NUEVO PUENTE VERCEL
const API = "/api/google";




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


.then(respuesta=>{


if(!respuesta.ok){

throw new Error(
"Error conectando API"
);

}


return respuesta.json();


})


.then(productos=>{


console.log(
"Productos recibidos:",
productos
);



if(!Array.isArray(productos)){


throw new Error(
"La API no devolvió productos"
);


}



actualizarDashboard(productos);


cargarInventario(productos);


mostrarConexion(true);



})


.catch(error=>{


console.error(
"Error:",
error
);


mostrarConexion(false);


mostrarError();


});


}








// ===================================
// ACTUALIZAR TARJETAS DASHBOARD
// ===================================


function actualizarDashboard(productos){



let total =
productos.length;



let alertas = 0;


let valor = 0;





productos.forEach(producto=>{


let stock =
Number(producto["STOCK ACTUAL"]) || 0;



let minimo =
Number(producto["STOCK MINIMO"]) || 0;



let costo =
Number(producto["COSTO UNITARIO"]) || 0;



valor +=
stock * costo;



if(stock <= minimo){

alertas++;

}



});





const totalProductos =
document.getElementById(
"totalProductos"
);



if(totalProductos){

totalProductos.innerHTML =
total;

}




const totalAlertas =
document.getElementById(
"totalAlertas"
);



if(totalAlertas){

totalAlertas.innerHTML =
alertas;

}





const valorInventario =
document.getElementById(
"valorInventario"
);



if(valorInventario){


valorInventario.innerHTML =

"$ " +

valor.toLocaleString(
"es-CO"
);


}


}









// ===================================
// CARGAR TABLA INVENTARIO
// ===================================


function cargarInventario(productos){



const tabla =
document.getElementById(
"productos"
);



if(!tabla){

return;

}



tabla.innerHTML="";




productos.forEach(producto=>{


let stock =
Number(producto["STOCK ACTUAL"]) || 0;



let minimo =
Number(producto["STOCK MINIMO"]) || 0;



let estado =
stock <= minimo
?
"⚠️ Bajo"
:
"✅ OK";




tabla.innerHTML +=

`

<tr>

<td>
${producto["NOMBRE"] || ""}
</td>


<td>
${producto["CATEGORIA"] || ""}
</td>


<td>
${producto["UNIDAD"] || ""}
</td>


<td>
${stock}
</td>


<td>
${estado}
</td>


</tr>

`;



});


}









// ===================================
// ESTADO CONEXIÓN
// ===================================


function mostrarConexion(
estado
){



const indicador =
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



}else{


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



const tabla =
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



const tabla =
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
