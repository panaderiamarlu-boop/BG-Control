/*
=====================================
 BG CONTROL
 APP.JS CORE v3

 Conexión:
 Vercel
    ↓
 Apps Script JSONP
    ↓
 Google Sheets
=====================================
*/


const API = "/api/google";




// ===================================
// INICIO
// ===================================

document.addEventListener(
"DOMContentLoaded",
()=>{

    cargarDashboard();

});





// ===================================
// CARGAR PRODUCTOS JSONP
// ===================================


function cargarDashboard(){


mostrarCarga();


const script = document.createElement("script");


const callbackName =
"bgProductosCallback";


window[callbackName] = function(productos){


    console.log(
        "Productos recibidos:",
        productos
    );


    actualizarDashboard(productos);


    cargarInventario(productos);


    mostrarConexion(true);



    delete window[callbackName];

    script.remove();


};



script.src =
API +
"?accion=productos&callback=" +
callbackName;



script.onerror = function(){


    console.error(
        "Error conectando API"
    );


    mostrarConexion(false);


    mostrarError();


};



document.body.appendChild(script);



}







// ===================================
// ACTUALIZAR DASHBOARD
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



valor += stock * costo;



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
// TABLA INVENTARIO
// ===================================


function cargarInventario(productos){



let tabla =
document.getElementById(
"productos"
);



if(!tabla){

return;

}



tabla.innerHTML="";




productos.forEach(producto=>{



let stock =
producto["STOCK ACTUAL"];



let minimo =
producto["STOCK MINIMO"];



let estado =
stock <= minimo
? "⚠️ Bajo"
: "✅ OK";



tabla.innerHTML +=

`

<tr>

<td>
${producto.NOMBRE || ""}
</td>


<td>
${producto.CATEGORIA || ""}
</td>


<td>
${stock}
</td>


<td>
${minimo}
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
