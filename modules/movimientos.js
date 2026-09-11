/*
====================================
 BG CONTROL
 MOVIMIENTOS v2

 Selector inteligente de productos
====================================
*/


// ==================================
// ABRIR MODAL
// ==================================

function abrirMovimiento(){


document.getElementById(
"modalMovimiento"
).style.display="flex";


cargarProductosMovimiento();


}



// ==================================
// CERRAR MODAL
// ==================================

function cerrarMovimiento(){


document.getElementById(
"modalMovimiento"
).style.display="none";


}






// ==================================
// CARGAR PRODUCTOS
// ==================================

function cargarProductosMovimiento(){



fetch(
API+"?accion=productos"
)



.then(
respuesta=>respuesta.json()
)



.then(
productos=>{


let selector =
document.getElementById(
"productoMovimiento"
);



selector.innerHTML =
`
<option value="">
Seleccione producto
</option>
`;



productos.forEach(producto=>{


let opcion =
document.createElement(
"option"
);



opcion.value =
producto.NOMBRE;



opcion.textContent =

producto.NOMBRE +
" (" +
producto["STOCK ACTUAL"] +
" " +
producto.UNIDAD +
")";



selector.appendChild(opcion);



});


})


.catch(
error=>{


console.error(
"Error cargando productos:",
error
);


}

);



}








// ==================================
// GUARDAR MOVIMIENTO
// ==================================


function guardarMovimiento(){



let tipo =

document.getElementById(
"tipoMovimiento"
).value;



let producto =

document.getElementById(
"productoMovimiento"
).value;



let cantidad =

Number(
document.getElementById(
"cantidadMovimiento"
).value
);



let motivo =

document.getElementById(
"motivoMovimiento"
).value;





if(!producto){


alert(
"Seleccione un producto"
);


return;


}




if(!cantidad || cantidad<=0){


alert(
"Ingrese una cantidad válida"
);


return;


}







let movimiento={



TIPO:tipo,


PRODUCTO:producto,


CANTIDAD:cantidad,


MOTIVO:motivo,


USUARIO:"ADMIN"



};






fetch(

API+"?accion=crearMovimiento",

{


method:"POST",


body:

JSON.stringify(movimiento)


}


)





.then(

respuesta=>

respuesta.json()

)





.then(

resultado=>{


alert(
resultado.mensaje
);



cerrarMovimiento();



location.reload();



}

)





.catch(

error=>{


console.error(error);


alert(
"Error guardando movimiento"
);


}

);



}
