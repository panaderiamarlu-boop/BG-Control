function abrirFormularioProducto(){

document.getElementById("modalProducto").style.display="flex";

}



function cerrarFormularioProducto(){

document.getElementById("modalProducto").style.display="none";

}




function guardarProducto(){


let producto = {


ID:"P"+Date.now(),


CODIGO:document.getElementById("codigo").value,


NOMBRE:document.getElementById("nombre").value,


TIPO:document.getElementById("tipo").value,


CATEGORIA:document.getElementById("categoria").value,


UNIDAD:document.getElementById("unidad").value,


STOCK:Number(
document.getElementById("stock").value
),


STOCK_MINIMO:Number(
document.getElementById("minimo").value
),


COSTO:Number(
document.getElementById("costo").value
),


PRECIO:Number(
document.getElementById("precio").value
)


};



fetch(API+"?accion=crearProducto",{


method:"POST",


body:JSON.stringify(producto)


})


.then(res=>res.json())


.then(data=>{


alert(data.mensaje);


cerrarFormularioProducto();


location.reload();


})


.catch(error=>{


console.error(error);


alert("Error guardando producto");


});


}
