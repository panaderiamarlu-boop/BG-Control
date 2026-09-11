/*
====================================
 BG CONTROL
 MOVIMIENTOS v1

 Entradas y salidas de inventario
====================================
*/


function abrirMovimiento(){


document.getElementById(
"modalMovimiento"
).style.display="flex";


}



function cerrarMovimiento(){


document.getElementById(
"modalMovimiento"
).style.display="none";


}






function guardarMovimiento(){



let movimiento={



TIPO:

document.getElementById(
"tipoMovimiento"
).value,



PRODUCTO:

document.getElementById(
"productoMovimiento"
).value,



CANTIDAD:

Number(
document.getElementById(
"cantidadMovimiento"
).value
),



MOTIVO:

document.getElementById(
"motivoMovimiento"
).value,



USUARIO:

"ADMIN"



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
res=>res.json()
)



.then(
data=>{


alert(
data.mensaje
);



cerrarMovimiento();



location.reload();



}

)



.catch(
error=>{


console.error(error);


alert(
"Error creando movimiento"
);


}

);



}
