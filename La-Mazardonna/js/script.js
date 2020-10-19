"use strict";

const myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Origin', 'https://github.com/Suldrum');
myHeaders.append('Access-Control-Allow-Headers','Content-Type');
myHeaders.append('Access-Control-Allow-Credentials', 'true');
myHeaders.append('Access-Control-Allow-Methods', 'OPTIONS,POST,GET');


const gitURL = 'https://github.com/Suldrum/012-Rodrigo-Selene-y-Milesi-Gonzalo/tree/master/La-Mazardonna/js/arregloPedidos.json';
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

////    TABLA DE PEDIDOS ////
function cargarTabla(){

    /*
    myHeaders.open('GET', gitURL);
    myHeaders.responseType = 'json';
    myHeaders.send();
    myHeaders.onload = function() {
        console.log("aasss");
        const arregloPedidos = myHeaders.response;
        cargarPedido(arregloPedidos);
    }
    
  */

 fetch(gitURL, {
    headers: myHeaders
})
    // 1
   .then(response => response.json()) // 2
   .then(console.log) // 3
   .catch(console.log('Algo salió mal.'));

}

  function cargarPedido(jsonObj) {
    const aux = jsonObj;
    let tabla = document.getElementById("tablaPedido");

    
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
    
       tabla.appendChild(myFila);
      }
    */
   
   let fila = tabla.insertRow(-1);
    fila.insertCell(0).value =  aux[i].producto; ;
    fila.insertCell(1).value =  aux[i].cantidad;
    fila.insertCell(2).value =  aux[i].precio;


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
   
 


