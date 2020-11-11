"use strict";

const url = "http://web-unicen.herokuapp.com/api/groups/2-hernandezFLoberia/TPE3corador/";
let pedidosJson =  new Array();

//BOTON MENU NAV

let btnmenu = document.getElementById('btnNav');
window.addEventListener('resize', reajustar);

function reajustar(){
    if (window.innerWidth >= 706.05){
        document.getElementById("listaNav").style.display = "flex";
    }else{
        document.getElementById("listaNav").style.display = "none";
    }
}

function  MostrarNav(){
    var listaMenu = document.getElementById("listaNav");
    if (listaMenu.style.display == "none"){
        listaMenu.style.display = "grid";
    }else
        listaMenu.style.display = "none";
}

btnmenu.addEventListener("click", MostrarNav);

document.addEventListener("load", cargarTabla());

//BOTONES TABLA DINAMICA//
let btnAgregarPedido = document.getElementById('btnAgregar');
let btnAgregarRandom = document.getElementById('btnAgregarRandom');
let btnBorrarTabla = document.getElementById('btnBorrarTabla');

btnAgregarPedido.addEventListener('click', agregarNuevoPedido);
btnAgregarRandom.addEventListener('click', agregarPedidoRandom);
btnBorrarTabla.addEventListener('click', borrarTabla);


function calcularValor (producto, cantidad){
    var precio = 0;
    switch(producto){
        case "Pizza Muzarella":
            precio = 100;
            break; 
        case "Pizza Napolitana":
            precio = 125;
            break;     
        case "Empanada Carne":
            precio = 40;
            break; 
        case "Empanada JyQ":
            precio = 40;
            break;   
    }
    var total = precio * cantidad ;
    return total; 
}

function agregarNuevoPedido(){
    var compareWith = "Nada";
    var inputProducto = document.querySelector('#IDproducto').value;
    var inputCantidad = parseInt(document.querySelector('#IDcantidad').value);
    if (!(compareWith.indexOf(inputProducto) == 0) && (inputCantidad > 0)){
        var total = calcularValor(inputProducto,inputCantidad);
        var items = 
            {   "producto": inputProducto, 
                "cantidad": inputCantidad, 
                "precio":  total}; 
        agregarElemArr(items);
        cargarPedido(items);
    } 
}

function generarProducto(){
    var aux =  Math.floor((Math.random()*4) );
    var producto = '';
    switch(aux){
        case 0:
            return producto = "Pizza Muzarella";
        case 1:
            return producto = "Pizza Napolitana";    
        case 2:
            return producto = "Empanada Carne";
        case 3:
            return producto = "Empanada JyQ";  
    }
}

function generarCantidad(producto){
    var compareWith = "pizza";
    var cantidad;
    if (compareWith.localeCompare(producto) < 1){
        return cantidad = Math.floor((Math.random()*3+1) );
    }else{
        return cantidad = Math.floor((Math.random()*12+1) );
    }
}

function agregarPedidoRandom(){
    for (var i = 0; i < 3 ; i++){
        var productoRandom = generarProducto();
        var cantidadRandom = generarCantidad(productoRandom);
        var precio = calcularValor(productoRandom,cantidadRandom);
        var items = 
                {   "producto": productoRandom, 
                    "cantidad": cantidadRandom, 
                    "precio":  precio}; 
        agregarElemArr(items);
        cargarPedido(items);     
    }               
}                

function borrarTabla(){
    var tabla = document.getElementById("tablaPedido");
    var cantFilas = tabla.rows.length - 1;
    while (cantFilas > 0)
    {
        tabla.deleteRow(cantFilas);
        cantFilas= cantFilas - 1;
    }
  
}


function agregarElemArr (pedido){
    pedidosJson.push({ 
        "producto" : pedido.producto,
        "cantidad" : pedido.cantidad,
        "precio"   : pedido.precio
    });
}


/////////// TABLA DE PEDIDOS //////////////



function cargarTabla() {
    fetch(url)
    .then(function(respuesta){
        if(respuesta.ok) {
            return respuesta.json();
        }
        else {
            alert("Ha ocurrido un error al cargar la tabla. :(");
        }
    })
    .then(function(herukoJson){
       herukoJson.TPE3corador.forEach(function(A){
       pedidosJson.push(A.thing);
       //cargarPedido(pedidos.thing);
       })
    })
    .catch(function(error) {console.log(error)})
 
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

    
    // modifica el atributo "border" de la tabla y lo fija a "2";
     tabla.setAttribute("border", "2");
     document.addEventListener("load", filtrarProductos());    
}



function cumpleFiltro(columna, busqueda)
{
    //verifica si cumple con el criterio
    var compareWith = columna.innerHTML.toLowerCase(); 
    if (busqueda.length == 0 || (compareWith.indexOf(busqueda) > -1))
        return true;
    return false;
        
}

function filtroTabla(busqueda,columna, color)
{
    //"desaparece" las filas que no sea contengan lo buscado
    var tabla = document.getElementById("tablaPedido");
        for (var i = 1; i < tabla.rows.length; i++) {
            var cellsOfRow = tabla.rows[i].getElementsByTagName('td');
            var found = cumpleFiltro(cellsOfRow[columna],busqueda);
            if(found)
            {
                tabla.rows[i].style.color = color ;
            }
        }
}

function filtrarProductos()
{
    var columna = 0;  
    //manda por parametro el "tipo" de producto, la columna donde estan y el estilo
    filtroTabla("empanada",columna, 'green');
    filtroTabla("pizza",columna, 'red');
}

document.addEventListener("load", filtrarProductos());

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
    document.getElementById("num1").src = "js/imgcaptcha/" + n1+".png";
    document.getElementById("num2").src = "js/imgcaptcha/" + n2+".png";
    document.getElementById("num3").src = "js/imgcaptcha/" + n3+".png";
}

/////////// FIN CAPTCHA //////////////


/////////// VALIDACION DE FORMULARIO //////////////
document.addEventListener("load", IDpedido.reset()); /*Limpia el formulario cada vez que se cargue la pagina*/
let btnenviar = document.getElementById('botonenviar');
btnenviar.addEventListener('click', validar); 

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