//Repositorio del trabajo
//const gitURL = "https://github.com/Suldrum/012-Rodrigo-Selene-y-Milesi-Gonzalo";

"use strict";

////////////// CARGA DE CONTENEDOR ////////////////////////////////////

window.onload = function()
{
    $("a").on("click", function(event)
    {
        event.preventDefault();
        document.querySelector("#contenedor").innerHTML ="";
        fetch(this.href, {
            method: 'GET',
            mode: 'cors',
        })
        .then(function(response){
            response.text()
            .then(t => document.querySelector("#contenedor").innerHTML = t);
        
        });
  
       
    });
}


////////////// FIN CARGA DE CONTENEDOR ////////////////////////////////////

////////////// BOTON MENU NAV ////////////////////////////////////

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
    var listaMenu = document.getElementById("listaNav");
    if (listaMenu.style.display == "none"){
        listaMenu.style.display = "grid";
    }else
        listaMenu.style.display = "none";
}

////////////// FIN BOTON MENU NAV ////////////////////////////////////