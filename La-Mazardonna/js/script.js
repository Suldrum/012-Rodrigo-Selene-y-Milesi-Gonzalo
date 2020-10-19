"use strict";
/*
const myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Headers', ' Content-Type');
myHeaders.append('Access-Control-Allow-Origin', ' *');
myHeaders.append('Access-Control-Allow-Credentials', ' true');
myHeaders.append('Access-Control-Allow-Methods', ' OPTIONS,POST,GET');

*/

const gitURL = 'https:///github.com/Suldrum/012-Rodrigo-Selene-y-Milesi-Gonzalo/tree/master/La-Mazardonna/js/arregloPedidos.json';
//const request = new XMLHttpRequest();


//BOTON MENU NAV

let btnmenu = document.getElementById("btnNav");

function  MostrarNav(){
    var listaMenu = document.getElementById("listaNav");
    if (listaMenu.style.display == "none"){
        listaMenu.style.display = "grid";
    }else
        listaMenu.style.display = "none";
}

btnmenu.addEventListener("click", MostrarNav);


function cargarJson()
{

    var pedidos = [
       { "producto": "Empanada de carne", "cantidad": 2, "precio":  0},
        { "producto": "Empanada de jamon", "cantidad": 1, "precio":  0}]; 
    
        for(var i in pedidos) {    
        
            var item = pedidos[i];   
        
            pedidosJson.push({ 
                "producto" : item.producto,
                "cantidad"  : item.cantidad,
                "precio"      : item.precio
            });
        }

}


/////////// TABLA DE PEDIDOS //////////////

let pedidosJson =  new Array();
document.addEventListener("load", cargarTabla());

function cargarTabla() {
    cargarJson();
    for(var i in pedidosJson) {      
        var item = pedidosJson[i];
        cargarPedido(item); 

    }
}

  function cargarPedido(nuevoPedido) {
    // Recibe la direccion de la tabla y crea una fila siempre al final

    var tabla = document.getElementById("tablaPedido");
    var fila = tabla.insertRow(-1);

    /// El td del producto
    var producto = document.createElement("td");
    producto.textContent =nuevoPedido.producto; // el textContent del td es el producto
    fila.appendChild(producto);
    // El td del cantidad
    var cantidad = document.createElement("td");
    cantidad.textContent =nuevoPedido.cantidad ; // el textContent del td es el cantidad
    fila.appendChild(cantidad);
    // El td del precio
    var precio = document.createElement("td");
    precio.textContent =nuevoPedido.precio; // el textContent del td es el precio
    fila.appendChild(precio);
    // Finalmente agregamos la fila al cuerpo de la tabla
    tabla.appendChild(fila);

    /*
    // modifica el atributo "border" de la tabla y lo fija a "2";
     tabla.setAttribute("border", "2");
    */
}

function borrarPedido(fila)
{
    var tabla = document.getElementById("tablaPedido");
    tabla.removeChild(fila);
}

function editarPedido(fila){
    //devolveria los valores de la fila a donde se ingresan, al darle a confirmar los modifica en la misma fila?
    
}

/////////// FIN TABLA DE PEDIDOS //////////////


/////////// CAPTCHA //////////////

let valorCaptcha;
function crearCaptcha(){
//carga al azar al cargar la pagina
    var n1 = Math.floor((Math.random()*8+1) );
    var  n2 = Math.floor((Math.random()*9) );
    var n3 = Math.floor((Math.random()*9) );
    valorCaptcha = n1*100+n2*10+n3;
    verCaptcha(n1,n2,n3);
}

document.addEventListener("load", crearCaptcha());


function verCaptcha(n1,n2,n3) {    
//les digo que numero deben poner al cambiar el captcha
        
    console.log(n1,n2,n3);
    document.getElementById("num1").src = "js/imgcaptcha/" + n1+".png";
    document.getElementById("num2").src = "js/imgcaptcha/" + n2+".png";
    document.getElementById("num3").src = "js/imgcaptcha/" + n3+".png";
}

/////////// FIN CAPTCHA //////////////


/////////// VALIDACION DE FORMULARIO //////////////
document.addEventListener("load", IDpedido.reset()); /*Limpia el formulario cada vez que se cargue la pagina*/
let btnenviar = document.getElementById("botonenviar");
btnenviar.addEventListener("click", validar); 

function validar(){ 
    var IDcalle= document.getElementById("IDcalle").value;
    var  IDnumero = document.getElementById("IDnumero").value;
    if ((IDcalle == 0) || (IDnumero == 0)  ) {
        alert("Debes completar todos los campos correctamente");
    }     
    else{
        var captcha = document.getElementById("captchaintroducido").value;
        if (captcha !=  valorCaptcha){
            alert("El captcha introducido es incorrecto, por favor intente nuevamente");
        }
        else{
            alert("El formulario fue enviado correctamente");
            IDpedido.reset();
        }
        crearCaptcha();
    }
/////////// FIN DE VALIDACION DE FORMULARIO //////////////
}
   
 


