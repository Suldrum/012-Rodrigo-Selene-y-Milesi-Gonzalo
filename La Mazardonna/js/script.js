"use strict";


const requestURL = 'https://github.com/Suldrum/012-Rodrigo-Selene-y-Milesi-Gonzalo/tree/master/La%20Mazardonna/js/arregloPedidos.json';
const request = new XMLHttpRequest();

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

////    TABLA DE PEDIDOS ////
function cargarTabla(){
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        console.log("aasss");
        const arregloPedidos = request.response;
        cargarPedido(arregloPedidos);
    }
}

  function cargarPedido(jsonObj) {
    const aux = jsonObj;
    
    for (var i = 0; i < aux.lenght; i++) {
        /*
        const myFila = document.createElement('tr');
        const myProducto = document.createElement('td');
        const myCantidad= document.createElement('td');
        const myPrecio = document.createElement('td');
    
        myProducto.textContent = aux[i].producto;
        myCantidad.textContent = aux[i].cantidad;
        myPrecio.textContent = aux[i].precio;

            
        myFila .appendChild(myProducto );
        myFila .appendChild(myCantidad);
        myFila .appendChild(myPrecio);
    
        section.appendChild(myFila);
      }
    */

    let tabla = document.getElementById("tablaPedido");
    let fila = tabla.insertRow(-1);

    let colProducto = fila.insertCell(0);
    let colCantidad = fila.insertCell(1);
    let colPrecio = fila.insertCell(2);

    colProducto.innerHTML = aux[i].producto;
    colCantidad.innerHTML = aux[i].cantidad;
    colPrecio.innerHTML = aux[i].precio;
  }
}
////    TABLA DE PEDIDOS ////

document.addEventListener("load", cargarTabla());


// CREANDO CAPTCHA

//carga al azar al cargar la pagina
let valorCaptcha;
function crearCaptcha(){
    let n1 = Math.floor((Math.random()*8+1) );
    let  n2 = Math.floor((Math.random()*9) );
    let n3 = Math.floor((Math.random()*9) );
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
    
document.addEventListener("load", IDpedido.reset()); /*Limpia el formulario cada vez que se cargue la pagina*/
let btnenviar = document.getElementById("botonenviar");
btnenviar.addEventListener("click", validar); 

//VALIDACION DEL FORMULARIO
function validar(){ 
    let IDcalle= document.getElementById("IDcalle").value;
    let  IDnumero = document.getElementById("IDnumero").value;
    if ((IDcalle == 0) || (IDnumero == 0)  ) {
        alert("Debes completar todos los campos correctamente");
    }     
    else{
        let captcha = document.getElementById("captchaintroducido").value;
        if (captcha !=  valorCaptcha){
            alert("El captcha introducido es incorrecto, por favor intente nuevamente");
        }
        else{
            alert("El formulario fue enviado correctamente");
            IDpedido.reset();
        }
        crearCaptcha();
    }

}
   
 


