//Repositorio del trabajo
const gitURL = "https://github.com/Suldrum/012-Rodrigo-Selene-y-Milesi-Gonzalo";
//Pagina de alojamiento del json
const url = "https://web-unicen.herokuapp.com/api/groups/012-Rodrigo-Selene-y-Milesi-Gonzalo/pedidos"; 

"use strict";

//////////////////////////////////// CARGA DE CONTENEDOR ////////////////////////////////////

// Carga el contenido de una pagina que le llega por referencia en el contenedor
function cargarPagina(pagina)
{   
    fetch(pagina, {
        method: 'GET',
        mode: 'cors',
    })
    .then(function(response){
        return response.text();    
    })
    .then(t => {
        document.querySelector("#contenedor").innerHTML ="";
        document.querySelector("#contenedor").innerHTML = t;
        // Si la pagina es pedido online inicio el script para realizar el pedido
        history.pushState(null, "", pagina);
        if (pagina === "pedido_online.html")
        {
            iniciarPedido();
        }
    })

}
let enlaces;
$("a").on("click", function(event)
{   
    event.preventDefault();
    // Tomo la referencia y creo un arreglo de string donde guardo cada seccion separada por "/"
    let urlInvocado = this.href.split("/");
    // La ultima posicion es la ruta relativa de la pagina
    let pagina = urlInvocado[urlInvocado.length-1];
    cargarPagina(pagina);
});

// La pagina que se carga al inicio por defecto es home.html
window.onload = function(){
    cargarPagina("home.html");
    
}

//////////////////////////////////// FIN CARGA DE CONTENEDOR ////////////////////////////////////

////////////////////////////////// BOTON MENU NAV ////////////////////////////////////

window.addEventListener('resize', reajustar);

function reajustar(){
    if (window.innerWidth >= 706.05){
        document.getElementById("listaNav").style.display = "flex";
    }else{
        document.getElementById("listaNav").style.display = "none";
    }
}
let btnmenu = document.getElementById('btnNav');
btnmenu.addEventListener("click", MostrarNav);

function  MostrarNav(){
    let listaMenu = document.getElementById("listaNav");
    if (listaMenu.style.display == "none"){
        listaMenu.style.display = "grid";
    }else
        listaMenu.style.display = "none";
}

///////////////////////////////// FIN BOTON MENU NAV ///////////////////////////////

//////////////////////////////////// PEDIDOS ONLINE ////////////////////////////////////

let productoFiltrado;
let valorCaptcha;

////////////////// FUNCIONES DE CARGA /////////////////////////

//Esta funcion crea los botones y eventos que se ejecutan en la pagina pedido_online.html
function iniciarPedido(){
    console.log("Iniciando Pedido");

productoFiltrado = document.getElementById("idProductoFiltro");

////////////////// BOTONES TABLA DINAMICA /////////////////////////

let btnAgregarPedido = document.getElementById('btnAgregar');
let btnAgregarRandom = document.getElementById('btnAgregarRandom');
let btnBorrarTabla = document.getElementById('btnBorrarTabla');

btnAgregarPedido.addEventListener('click', agregarNuevoPedido);
btnAgregarRandom.addEventListener('click', agregarPedidoRandom);
btnBorrarTabla.addEventListener('click', borrarTabla);

////////////////// FIN BOTONES TABLA DINAMICA /////////////////////////

productoFiltrado.addEventListener('keyup', filtrarProductos);
document.addEventListener("ready", actualizarTabla());

document.addEventListener("load", crearCaptcha());

// Limpia el formulario cada vez que se cargue la pagina
document.addEventListener("load", IDpedido.reset()); 
let btnenviar = document.getElementById('botonenviar');
btnenviar.addEventListener('click', validar);

}

//Esta funcion trae la informacion en el Heroku y la manda a la tabla
function actualizarTabla(){ 
    fetch(url)
    .then(function(respuesta){
        if(respuesta.ok) {
             return respuesta.json();
        }
        else {
            alert("Error al acceder al Heroku");
        }
    })
    .then(function(herukoJson){
        let tabla = document.getElementById("tablaPedido");
        while ((tabla.rows.length - 1) > 0)
        {
            tabla.deleteRow(-1);
        }
        herukoJson.pedidos.forEach(function(pedido){ 
            cargarPedido(pedido.thing, pedido._id);
        })
      //  console.log("la tabla se ha actualizado");
    })
    .then(function(){ 
        filtrarProductos();
    })
    .then(function(){ 
        setTimeout(function() {
                actualizarTabla();
        }, 15000);
    })
    .catch(function(error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      });    
}

//Esta funcion carga a la tabla un nuevo pedido.
  function cargarPedido(nuevoPedido, IDnuevoPedido) {
    // Recibe la direccion de la tabla y crea una fila siempre al final
    
    let tabla = document.getElementById("tablaPedido");
    let fila = tabla.insertRow(-1);

    /// El td del producto
    let producto = document.createElement("td");
    producto.textContent =nuevoPedido.producto; // el textContent del td es el producto
    fila.appendChild(producto);
    // El td del cantidad
    let cantidad = document.createElement("td");
    cantidad.textContent =nuevoPedido.cantidad ; // el textContent del td es el cantidad
    fila.appendChild(cantidad);
    // El td del precio
    let precio = document.createElement("td");
    precio.textContent =nuevoPedido.precio; // el textContent del td es el precio
    fila.appendChild(precio);
  
   //Crea el boton de editar, le asigna las propiedades
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";
    btnEditar.addEventListener('click', function(){editarPedido(fila, IDnuevoPedido);});
    fila.appendChild(btnEditar);
     //Crea el boton de borrar, le asigna las propiedades
    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "Borrar";
    btnBorrar.type = "button";
    btnBorrar.addEventListener('click', function(){borrarPedido(fila, IDnuevoPedido);});
    fila.appendChild(btnBorrar);
    // Finalmente agregamos la fila al cuerpo de la tabla
    tabla.appendChild(fila);
    // modifica el atributo "border" de la tabla y lo fija a "2";
     tabla.setAttribute("border", "2");  
}

//Esta funcion carga un selector con los productos existentes
function cargarSelector(elegirProducto)
{
    //A futuro se espera poder cargar el selector desde la base de datos  
    let producto = document.createElement("option");
    producto.value = "Pizza Muzarella";
    producto.innerHTML = "Pizza Muzarella";
    elegirProducto.appendChild(producto);

    let producto2 = document.createElement("option");
    producto2.value = "Pizza Napolitana";
    producto2.innerHTML = "Pizza Napolitana";
    elegirProducto.appendChild(producto2);

    let producto3 = document.createElement("option");
    producto3.value = "Empanada Carne";
    producto3.innerHTML = "Empanada Carne";
    elegirProducto.appendChild(producto3);

    let producto4 = document.createElement("option");
    producto4.value = "Empanada JyQ";
    producto4.innerHTML = "Empanada JyQ";
    elegirProducto.appendChild(producto4);
}

////////////////// FIN FUNCIONES DE CARGA /////////////////////////

////////////////// FUNCIONES DE CALCULO /////////////////////////

//Esta funcion calcula el precio total del pedido
function calcularValor (producto, cantidad){
 //A futuro se espera poder calcular el precio recibiendo el precio desde la base de datos
    let precio = 0;
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
    let total = precio * cantidad ;
    return total; 
}
////////////////// FIN FUNCIONES DE CALCULO /////////////////////////

////////////////// FUNCIONES DE AGREGAR /////////////////////////

//Esta funcion agrega al servidor un nuevo pedido
function agregarAlHeruku (pedido){
    let pedidoNuevo = {
        'thing': {
            'producto': pedido.producto,
            'cantidad': pedido.cantidad,
            'precio': pedido.precio
        }
    }

    // Escribe el objeto en el JSON del servidor
    fetch((url), {
        'method': 'POST',
        'headers': {
            'content-type': 'application/JSON'
        },
        'mode': 'cors',
        'body': JSON.stringify(pedidoNuevo)
    })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            }
            else {
                alert("La solicitud al servidor falló.");
            }
        })
        .then(function (herukoJson) {
            cargarPedido(pedido, herukoJson._id);
        })
}

//Esta funcion genera un producto random
function generarProducto(){
    //A futuro se espera poder elegir un producto de manera random desde la base de datos

    let aux =  Math.floor((Math.random()*4) );
    switch(aux){
        case 0:
            return "Pizza Muzarella";
        case 1:
            return "Pizza Napolitana";    
        case 2:
            return "Empanada Carne";
        case 3:
            return "Empanada JyQ";  
    }
}

//Esta funcion genera un cantidad random segun el producto que llega por parametro
function generarCantidad(producto){
    let compareWith = "pizza";
    if (compareWith.localeCompare(producto) < 1)
        return ( Math.floor((Math.random()*3+1)) )
    else
        return ( Math.floor((Math.random()*12+1)) )
    
}

//Esta funcion genera un pedido random 3 veces
function agregarPedidoRandom(){
    for (let i = 0; i < 3 ; i++){
        let productoRandom = generarProducto();
        let cantidadRandom = generarCantidad(productoRandom);
        let precio = calcularValor(productoRandom,cantidadRandom);
        let items = 
                {   "producto": productoRandom, 
                    "cantidad": cantidadRandom, 
                    "precio":  precio}; 
        agregarAlHeruku(items);
    }               
}                

//Esta funcion genera un pedido leido desde la pagina
function agregarNuevoPedido(){
    let compareWith = "Nada";
    let inputProducto = document.querySelector('#IDproducto').value;
    let inputCantidad = parseInt(document.querySelector('#IDcantidad').value);
    //Se asegura que se haya elegido un producto del selector y que se haya pedido al menos un producto
    if (!(compareWith.indexOf(inputProducto) == 0) && (inputCantidad > 0)){
        let total = calcularValor(inputProducto,inputCantidad);
        let items = 
            {   "producto": inputProducto, 
                "cantidad": inputCantidad, 
                "precio":  total}; 
        agregarAlHeruku(items);
    } 
}
////////////////// FIN FUNCIONES DE AGREGAR /////////////////////////

////////////////// FUNCIONES DE BORRADO /////////////////////////

//Esta funcion elimina todos los datos del servidor y de la tabla en el html
function borrarTabla(){
let tabla = document.getElementById("tablaPedido");
  fetch(url)
        .then(function(respuesta){
            if(respuesta.ok) {
                return respuesta.json();
            }
            else {
                alert("No se puede acceder al servidor.");
            }
        })
        
        .then(function(herukoJson){
            herukoJson.pedidos.forEach(function(pedido){
                fetch((url+ '/' +pedido._id),{
                    'method':'DELETE',
                    'mode': 'cors'
                })
                .then(function(respuesta){
                    if(respuesta.ok) {
                        tabla.deleteRow(-1);
                    }
                    else {
                        alert("No se pudieron borrar los datos.");
                    }
                }
            );
        });
    });

}

//Esta funcion elimina un pedido del servidor y de la tabla en el html
function borrarPedido(fila, IDPedido)
{
    if (confirm("¿Seguro que desea eliminar este pedido?")) 
    { 
        fetch((url+ '/' +IDPedido),{
            'method':'DELETE',
            'mode': 'cors'
        })
        .then(function(respuesta){
            if(respuesta.ok) {
                let tabla = document.getElementById("tablaPedido");
                tabla.removeChild(fila);
            }
            else {
                alert("No se pudo eliminar el pedido");
            }
        });
    }
}

////////////////// FIN FUNCIONES DE BORRADO /////////////////////////

////////////////// FUNCIONES DE EDICION /////////////////////////

//Esta funcion edita un pedido del servidor, de no poder hacerlo restaura los valores viejos en la tabla
function editarHeroku(fila, IDPedido, valoresAnteriores)
{
    //Crea el pedido los valores de la fila alterada
    let pedidoEditado = {
        'thing': {
            'producto': fila.children[0].innerHTML,
            'cantidad':  (parseInt (fila.children[1].innerHTML)),
            'precio':  (parseInt (fila.children[2].innerHTML))
        }
    }
    
    //Encuentra el pedido por su ID y lo pisa con los datos nuevos
    fetch((url+ '/' +IDPedido),{
        'method':'PUT',
        'mode': 'cors',
        'headers': {
            'content-type': 'application/JSON'
        },
        'body': JSON.stringify(pedidoEditado)
    })
    .then(function(respuesta){
        if(!respuesta.ok) {
        //Si falla el PUT restaura los valores viejos en la tabla
            fila.children[0].innerHTML = valoresAnteriores.producto;
            fila.children[1].innerHTML = valoresAnteriores.cantidad;
            fila.children[2].innerHTML =  valoresAnteriores.precio;
            alert("No se pudo modificar el pedido");
        }
        else {
            //Si funciona el PUT da el aviso y devuelve el json
            alert("Datos modificados");
            return respuesta.json();
        }
    })
}

//Esta funcion deja de permitir la edicion de la tabla y que cambios ocurren
function guardarCambios(fila, valoresAnteriores, IDPedido)
{
//Las columnas dejan de permitir alteracion
    let producto = document.createElement("td");
    producto.textContent =fila.children[0].value; // el textContent del td es el selector
    fila.replaceChild(producto, fila.children[0]);
    fila.children[1].contentEditable = "false";
    producto.style.background = "whitesmoke";
    fila.children[1].style.background = "whitesmoke";
    //Si una cantidad no es un numero o negativa la vuelve 0
    if (isNaN(fila.children[1].innerHTML) || (parseInt (fila.children[1].innerHTML)) <1)
    {
        fila.children[1].innerHTML = '1';
    }
    //Verifica si hubo cambios
    if ( (producto.innerHTML != valoresAnteriores.producto) || (fila.children[1].innerHTML != valoresAnteriores.cantidad))
    {
          //Si encuentra cambios pregunta si los quiere mantener
        if (confirm("¿Seguro que alterar el pedido?"))
        {
            //Recalcula el precio
            fila.children[2].innerHTML = calcularValor(producto.innerHTML, parseInt (fila.children[1].innerHTML));
            //Aca se modifica el Heroku, de no poder regresa a los valore viejos
            editarHeroku(fila, IDPedido, valoresAnteriores);
        }
        else
        {
            //Vuelve a los valores anteriores
            producto.innerHTML= valoresAnteriores.producto;
            fila.children[1].innerHTML= valoresAnteriores.cantidad;
        }
    }
//Vuelve a poner el mismo boton que estaba antes, esto se hizo porque si solo modificabas el evento bucleaba
    let btnEditar = document.createElement("button");
    btnEditar.innerHTML = "Editar";
    btnEditar.type = "button";
    btnEditar.addEventListener('click', function(){editarPedido(fila, IDPedido);});
    fila.replaceChild(btnEditar,fila.children[3]);

}

//Esta funcion permite la edicion de la tabla
function editarPedido(fila, IDPedido)
{
//Se guardan los valores viejos
    let valoresAnteriores =
    {
        'producto': fila.children[0].innerHTML,
        'cantidad': fila.children[1].innerHTML,
        'total': fila.children[2].innerHTML
    };

//Las columnas se vuelven editables y se les ponen un fondo blanco para que quede mas claro
    fila.children[1].contentEditable = "true";
    fila.children[0].style.background = "white";
    fila.children[1].style.background = "white";

//Se crea un selector y este reemplaza al tr de producto
    let elegirProducto = document.createElement("select");
    cargarSelector(elegirProducto);
    fila.replaceChild(elegirProducto,fila.children[0] );
//Por defecto ya viene elegido el producto anterior
    elegirProducto.value = valoresAnteriores.producto;

//Se crea un boton que al apretarse confirma los cambios, este reemplaza el boton anterior
    let btnGuardar = document.createElement("button");
    btnGuardar.innerHTML = "Guardar";
    btnGuardar.type = "button";
    btnGuardar.addEventListener('click', function(){guardarCambios(fila, valoresAnteriores, IDPedido);});
    fila.replaceChild(btnGuardar,fila.children[3]);

}

////////////////// FIN FUNCIONES DE EDICION /////////////////////////

/////////// FILTROS TABLA DE PEDIDOS //////////////

function cumpleFiltro(columna, busqueda)
{
    //verifica si cumple con el criterio
  
    let compareWith = columna.innerHTML.toLowerCase(); 
    if (busqueda.length == 0 || (compareWith.indexOf(busqueda) > -1))
        return true;
    return false;
        
}

function filtroTabla(busqueda,columna)
{
    //"desaparece" las filas que no sea contengan lo buscado
    let tabla = document.getElementById("tablaPedido");
        for (let i = 1; i < tabla.rows.length; i++) {
            let cellsOfRow = tabla.rows[i].getElementsByTagName('td');
            let found = cumpleFiltro(cellsOfRow[columna],busqueda);
            if(found)
            {
                tabla.rows[i].style.display = "" ; 
            }else
                tabla.rows[i].style.display = "none" ;
        }
}

function filtrarProductos()
{
    let columna = 0;  
    filtroTabla(productoFiltrado.value, columna); 
}

/////////// FIN FILTROS TABLA DE PEDIDOS //////////////

/////////// CAPTCHA //////////////

function crearCaptcha(){
//carga al azar al cargar la pagina
    let n1 = Math.floor((Math.random()*8+1) );
    let  n2 = Math.floor((Math.random()*9) );
    let n3 = Math.floor((Math.random()*9) );
    valorCaptcha = n1*100+n2*10+n3;
    verCaptcha(n1,n2,n3);
}

function verCaptcha(n1,n2,n3) {    
//les digo que numero deben poner al cambiar el captcha
    document.getElementById("num1").src = "js/imgcaptcha/" + n1+".png";
    document.getElementById("num2").src = "js/imgcaptcha/" + n2+".png";
    document.getElementById("num3").src = "js/imgcaptcha/" + n3+".png";
}

/////////// FIN CAPTCHA //////////////

/////////// VALIDACION DE FORMULARIO //////////////

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
            //borrarTabla();
        }
        crearCaptcha();
    }
}
/////////// FIN VALIDACION DE FORMULARIO //////////////

//////////////////////////////////// FIN PEDIDOS ONLINE ////////////////////////////////////
